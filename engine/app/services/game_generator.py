"""
5-step AI game generation pipeline:
1. Parse pedagogical intent from natural language prompt (intent_parser)
2. Classify developmental stage (rule-based Piaget)
3. Select game type + mechanics
4. Generate content: domain generators (local) OR DeepSeek API (open-ended)
5. Assemble into playable game config (game_assembler)
"""

import json
from openai import AsyncOpenAI
from app.core.config import settings
from app.core.constants import (
    GameType,
    DevelopmentalStage,
    get_stage_for_age,
    GAME_STAGE_MAP,
    STAGE_AGE_RANGES,
)
from app.schemas.game import GenerateRequest, GeneratedGame, GameLevel, GameItem
from app.services.intent_parser import parse_intent
from app.services.content_generators import get_generator
from app.services.game_assembler import assemble_levels


SYSTEM_PROMPT = """You are Khel's AI game content generator. You create educational game content for Indian children aged 3-12.

Rules:
- All content must be age-appropriate and curriculum-aligned (NCERT/CBSE/ICSE/Montessori/IB PYP)
- Support the specified language (default English)
- Generate engaging, culturally relevant content for Indian students
- Generate 18-21 items total (will be split into 3 levels of 6-7 items each)
- Items should progress from easy to hard
- Include hints that guide without giving away answers
- Distractors should be plausible but clearly wrong to a student who has learned the topic

You MUST respond with valid JSON. No markdown, no explanation — only the JSON object."""


def _classify_stage(age: int) -> DevelopmentalStage:
    """Rule-based Piaget stage classification."""
    return get_stage_for_age(age)


def _select_game_type(
    stage: DevelopmentalStage, requested_type: GameType | None
) -> GameType:
    """Select appropriate game type, respecting developmental guardrails."""
    if requested_type:
        allowed_stages = GAME_STAGE_MAP.get(requested_type, [])
        if stage in allowed_stages:
            return requested_type
    stage_defaults: dict[DevelopmentalStage, GameType] = {
        DevelopmentalStage.SENSORIMOTOR_PREOPERATIONAL: GameType.TAP_MATCH,
        DevelopmentalStage.PREOPERATIONAL: GameType.TAP_MATCH,
        DevelopmentalStage.CONCRETE_OPERATIONAL: GameType.MAZE_RUNNER,
        DevelopmentalStage.FORMAL_OPERATIONAL: GameType.QUIZ_ADVENTURE,
    }
    return stage_defaults[stage]


def _get_deepseek_client() -> AsyncOpenAI:
    """Create DeepSeek client using OpenAI-compatible API."""
    return AsyncOpenAI(
        api_key=settings.deepseek_api_key,
        base_url=settings.deepseek_base_url,
    )


async def generate_game(request: GenerateRequest) -> GeneratedGame:
    """Full 5-step pipeline: prompt → playable game."""

    # ── Step 1: Parse pedagogical intent ──────────────────────────────────────
    intent = await parse_intent(request.prompt)

    # Merge explicit request fields over parsed intent
    target_age = request.target_age or intent.target_age or 8
    language = request.language or intent.language or "en"
    board = request.board or intent.board
    subject = request.subject or intent.subject
    grade = request.grade or intent.grade
    grade_numeric = intent.grade_numeric or _age_to_grade(target_age)

    # ── Step 2: Classify developmental stage ──────────────────────────────────
    stage = _classify_stage(target_age)

    # ── Step 3: Select game type ──────────────────────────────────────────────
    game_type = _select_game_type(stage, request.game_type or intent.game_type)

    # ── Step 4: Generate content ──────────────────────────────────────────────
    # Try domain-specific local generator first (fast, no API cost)
    generator = get_generator(subject) if subject else None
    topic = intent.topic or request.prompt
    items = []

    if generator and generator.can_generate_locally(topic, grade_numeric):
        # Local generation — produces 18 items across 3 difficulty levels
        for diff in ["easy", "medium", "hard"]:
            items.extend(generator.generate_items(topic, grade_numeric, 6, diff))
    else:
        # Fall back to DeepSeek API for open-ended content
        items = await _generate_items_via_deepseek(
            prompt=request.prompt,
            game_type=game_type,
            target_age=target_age,
            language=language,
            board=board,
            grade=grade,
            subject=subject,
            stage=stage,
            generator=generator,
            topic=topic,
            grade_numeric=grade_numeric,
        )

    # ── Step 5: Assemble into game config ─────────────────────────────────────
    age_range = STAGE_AGE_RANGES[stage]
    title = intent.topic or request.prompt[:60]
    levels = assemble_levels(game_type, items, title)

    # Build curriculum metadata
    curriculum = {}
    if board:
        curriculum["board"] = board.value if hasattr(board, "value") else board
    if grade:
        curriculum["grade"] = grade
    if subject:
        curriculum["subject"] = subject
    if intent.topic:
        curriculum["topic"] = intent.topic
    if intent.keywords:
        curriculum["learningOutcomes"] = intent.keywords[:5]

    return GeneratedGame(
        title=f"{subject or 'Fun'}: {intent.topic or request.prompt[:40]}",
        description=f"A {game_type.value.replace('_', ' ')} game for age {target_age} — {intent.topic or request.prompt[:50]}",
        game_type=game_type,
        developmental_stage=stage.value,
        min_age=age_range[0],
        max_age=age_range[1],
        language=language,
        curriculum=curriculum,
        levels=levels,
        settings={
            "timeLimit": 300 if game_type != GameType.MULTIPLAYER_RACE else 120,
            "livesCount": 3,
            "adaptiveDifficulty": True,
            "backgroundMusic": "playful",
            "theme": _pick_theme(subject, game_type),
        },
        tags=intent.keywords[:8],
        ai_generated=True,
        original_prompt=request.prompt,
    )


async def _generate_items_via_deepseek(
    prompt: str,
    game_type: GameType,
    target_age: int,
    language: str,
    board,
    grade: str | None,
    subject: str | None,
    stage: DevelopmentalStage,
    generator,
    topic: str,
    grade_numeric: int,
) -> list[GameItem]:
    """Generate items using DeepSeek when local generators can't handle the topic."""
    client = _get_deepseek_client()

    # Inject domain context if generator exists
    domain_context = ""
    if generator:
        domain_context = f"\n\nDomain context: {generator.get_domain_prompt_context(topic, grade_numeric)}"

    user_prompt = f"""Generate 18 educational game items for a {game_type.value} game.

Request: "{prompt}"

Target age: {target_age} years
Language: {language}
Developmental stage: {stage.value}
Board: {board.value if board and hasattr(board, 'value') else board or 'NCERT'}
Grade: {grade or 'auto-detect'}
Subject: {subject or 'auto-detect'}{domain_context}

Generate exactly 18 items (6 easy, 6 medium, 6 hard) in this JSON format:
{{
  "items": [
    {{
      "prompt": "question or task shown to the student",
      "correct_answer": "the correct answer",
      "distractors": ["wrong1", "wrong2", "wrong3"],
      "hint": "helpful hint without giving away the answer",
      "points": 10
    }}
  ]
}}"""

    response = await client.chat.completions.create(
        model=settings.model_id,
        max_tokens=4096,
        temperature=0.7,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
    )

    response_text = response.choices[0].message.content
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0]
    elif "```" in response_text:
        response_text = response_text.split("```")[1].split("```")[0]

    data = json.loads(response_text.strip())
    raw_items = data.get("items", data.get("levels", [{}])[0].get("items", []) if "levels" in data else [])

    return [GameItem(**item) for item in raw_items]


def _age_to_grade(age: int) -> int:
    """Approximate grade numeric from age."""
    return max(0, age - 5)


def _pick_theme(subject: str | None, game_type: GameType) -> str:
    """Pick a visual theme based on subject and game type."""
    themes = {
        "Mathematics": "space",
        "English": "library",
        "Hindi": "festival",
        "Science": "laboratory",
        "EVS": "nature",
    }
    return themes.get(subject or "", "adventure")
