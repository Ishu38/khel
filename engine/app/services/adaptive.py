"""
Enhanced adaptive difficulty engine.
Combines rule-based ZPD targeting with Item Response Theory (IRT) estimates.
"""
from __future__ import annotations

import math
from dataclasses import dataclass, field

from app.schemas.game import AdaptRequest, AdaptResponse


DIFFICULTY_LEVELS: list[str] = ["very_easy", "easy", "medium", "hard", "very_hard"]
DIFFICULTY_THETA: dict[str, float] = {"very_easy": -2.0, "easy": -1.0, "medium": 0.0, "hard": 1.0, "very_hard": 2.0}
TARGET_ACCURACY_MIN: float = 0.70
TARGET_ACCURACY_MAX: float = 0.80


@dataclass
class PlayerProfile:
    """In-memory player profile for a session."""
    ability_theta: float = 0.0
    response_history: list[bool] = field(default_factory=list)
    topic_accuracy: dict[str, list[bool]] = field(default_factory=dict)
    frustration_count: int = 0
    streak: int = 0  # positive = correct streak, negative = wrong streak
    total_time_ms: int = 0
    response_count: int = 0


# Session-level profiles (in production, persist to DB)
_profiles: dict[str, PlayerProfile] = {}


def get_or_create_profile(session_id: str) -> PlayerProfile:
    if session_id not in _profiles:
        _profiles[session_id] = PlayerProfile()
    return _profiles[session_id]


def irt_probability(theta: float, difficulty: float, discrimination: float = 1.0) -> float:
    """2PL IRT model: probability of correct response."""
    exponent: float = discrimination * (theta - difficulty)
    exponent = max(-10.0, min(10.0, exponent))  # clamp to avoid overflow
    return 1.0 / (1.0 + math.exp(-exponent))


def update_ability_estimate(profile: PlayerProfile, item_difficulty: float, correct: bool) -> float:
    """
    Simple EAP-like ability update using response.
    Nudge theta toward correct difficulty region.
    """
    step: float = 0.3
    if correct:
        profile.ability_theta += step * (1.0 - irt_probability(profile.ability_theta, item_difficulty))
    else:
        profile.ability_theta -= step * irt_probability(profile.ability_theta, item_difficulty)
    # Clamp to reasonable range
    profile.ability_theta = max(-3.0, min(3.0, profile.ability_theta))
    return profile.ability_theta


def theta_to_difficulty(theta: float) -> str:
    """Map IRT theta to nearest difficulty level."""
    best: str = "medium"
    best_dist: float = float("inf")
    for level, t in DIFFICULTY_THETA.items():
        dist: float = abs(theta - t)
        if dist < best_dist:
            best_dist = dist
            best = level
    return best


def detect_frustration(profile: PlayerProfile, response_time_ms: int | None) -> bool:
    """Detect frustration signals."""
    signals: int = 0
    # Rapid tapping
    if response_time_ms is not None and response_time_ms < 300:
        signals += 1
    # Long streak of wrong answers
    if profile.streak <= -3:
        signals += 1
    # Too many frustration events
    if profile.frustration_count >= 2:
        signals += 1
    return signals >= 1


def detect_boredom(profile: PlayerProfile, response_time_ms: int | None) -> bool:
    """Detect boredom signals."""
    # Long correct streak may indicate too easy
    if profile.streak >= 5:
        return True
    # Very long pause (disengagement)
    if response_time_ms is not None and response_time_ms > 15000 and profile.streak >= 2:
        return True
    return False


def compute_adaptation(req: AdaptRequest) -> AdaptResponse:
    """
    Main adaptive engine entry point.
    Combines IRT ability estimation with ZPD targeting and affective state detection.
    """
    profile: PlayerProfile = get_or_create_profile(req.session_id)

    # Update profile with latest response
    if req.correct is not None:
        profile.response_history.append(req.correct)
        if req.correct:
            profile.streak = max(0, profile.streak) + 1
        else:
            profile.streak = min(0, profile.streak) - 1

    if req.response_time_ms is not None:
        profile.total_time_ms += req.response_time_ms
    profile.response_count += 1

    # Track per-topic accuracy
    if req.topic and req.correct is not None:
        if req.topic not in profile.topic_accuracy:
            profile.topic_accuracy[req.topic] = []
        profile.topic_accuracy[req.topic].append(req.correct)

    # IRT ability update
    current_diff_theta: float = DIFFICULTY_THETA.get(req.current_difficulty, 0.0)
    if req.correct is not None:
        update_ability_estimate(profile, current_diff_theta, req.correct)

    # Early return if not enough data
    if len(profile.response_history) < 3:
        return AdaptResponse(
            recommended_difficulty=req.current_difficulty,
            reason="insufficient_data",
            ability_estimate=profile.ability_theta,
        )

    # Affective state detection
    frustrated: bool = detect_frustration(profile, req.response_time_ms)
    bored: bool = detect_boredom(profile, req.response_time_ms)

    if frustrated:
        profile.frustration_count += 1
        # Drop difficulty by one level
        current_idx: int = DIFFICULTY_LEVELS.index(req.current_difficulty)
        new_idx: int = max(0, current_idx - 1)
        return AdaptResponse(
            recommended_difficulty=DIFFICULTY_LEVELS[new_idx],
            reason="frustration_detected",
            hint=_get_encouragement_hint(profile),
            ability_estimate=profile.ability_theta,
            confidence=0.8,
        )

    if bored:
        current_idx = DIFFICULTY_LEVELS.index(req.current_difficulty)
        new_idx = min(len(DIFFICULTY_LEVELS) - 1, current_idx + 1)
        return AdaptResponse(
            recommended_difficulty=DIFFICULTY_LEVELS[new_idx],
            reason="boredom_detected",
            ability_estimate=profile.ability_theta,
            confidence=0.7,
        )

    # ZPD targeting: use recent accuracy window
    window: list[bool] = profile.response_history[-10:]
    recent_accuracy: float = sum(window) / len(window)

    # IRT-based recommendation
    irt_recommended: str = theta_to_difficulty(profile.ability_theta)
    irt_idx: int = DIFFICULTY_LEVELS.index(irt_recommended)

    # ZPD-based recommendation
    current_idx = DIFFICULTY_LEVELS.index(req.current_difficulty)
    zpd_idx: int = current_idx
    if recent_accuracy > TARGET_ACCURACY_MAX and current_idx < len(DIFFICULTY_LEVELS) - 1:
        zpd_idx = current_idx + 1
    elif recent_accuracy < TARGET_ACCURACY_MIN and current_idx > 0:
        zpd_idx = current_idx - 1

    # Blend IRT and ZPD (weighted average, favor ZPD early, IRT later)
    irt_weight: float = min(0.6, len(profile.response_history) / 30)
    zpd_weight: float = 1.0 - irt_weight
    blended_idx: int = round(irt_weight * irt_idx + zpd_weight * zpd_idx)
    blended_idx = max(0, min(len(DIFFICULTY_LEVELS) - 1, blended_idx))
    recommended: str = DIFFICULTY_LEVELS[blended_idx]

    reason: str = "zpd_targeting"
    if recommended != req.current_difficulty:
        if blended_idx > current_idx:
            reason = "too_easy"
        else:
            reason = "too_hard"

    # Identify weak topics for hints
    hint: str | None = None
    weak_topics: list[str] = _get_weak_topics(profile)
    if weak_topics and recent_accuracy < TARGET_ACCURACY_MIN:
        hint = f"Focus areas: {', '.join(weak_topics[:3])}"

    return AdaptResponse(
        recommended_difficulty=recommended,
        reason=reason,
        hint=hint,
        ability_estimate=profile.ability_theta,
        confidence=min(1.0, len(profile.response_history) / 20),
        weak_topics=weak_topics,
    )


def get_session_analytics(session_id: str) -> dict:
    """Return session-level learning analytics."""
    profile: PlayerProfile | None = _profiles.get(session_id)
    if not profile:
        return {"error": "Session not found"}

    total: int = len(profile.response_history)
    correct: int = sum(profile.response_history)

    topic_stats: dict[str, dict] = {}
    for topic, responses in profile.topic_accuracy.items():
        topic_stats[topic] = {
            "attempts": len(responses),
            "correct": sum(responses),
            "accuracy": sum(responses) / len(responses) if responses else 0,
        }

    return {
        "session_id": session_id,
        "ability_theta": profile.ability_theta,
        "total_responses": total,
        "correct_responses": correct,
        "accuracy": correct / total if total > 0 else 0,
        "avg_response_time_ms": profile.total_time_ms / total if total > 0 else 0,
        "frustration_events": profile.frustration_count,
        "current_streak": profile.streak,
        "topic_stats": topic_stats,
        "weak_topics": _get_weak_topics(profile),
        "recommended_difficulty": theta_to_difficulty(profile.ability_theta),
    }


def _get_weak_topics(profile: PlayerProfile) -> list[str]:
    """Identify topics where accuracy is below threshold."""
    weak: list[str] = []
    for topic, responses in profile.topic_accuracy.items():
        if len(responses) >= 2:
            acc: float = sum(responses) / len(responses)
            if acc < 0.6:
                weak.append(topic)
    return weak


def _get_encouragement_hint(profile: PlayerProfile) -> str:
    """Generate an encouragement message based on state."""
    if profile.streak <= -4:
        return "Take a deep breath! You're learning — every mistake helps."
    if profile.frustration_count >= 3:
        return "You're doing great! Let's try something a bit easier."
    return "Keep going! You've got this."
