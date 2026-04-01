"""
Pedagogical Intent Parser — NL prompt analysis.

Two-layer approach:
1. Rule-based keyword extraction (fast, no API call)
2. DeepSeek fallback for ambiguous prompts

Extracts: subject, topic, grade, game_type preference, language, board
"""

import re
from openai import AsyncOpenAI
from app.core.config import settings
from app.core.constants import (
    GameType,
    DevelopmentalStage,
    CurriculumBoard,
    get_stage_for_age,
    GAME_STAGE_MAP,
)
from pydantic import BaseModel


class ParsedIntent(BaseModel):
    subject: str | None = None
    topic: str | None = None
    grade: str | None = None
    grade_numeric: int | None = None
    board: CurriculumBoard | None = None
    game_type: GameType | None = None
    language: str = "en"
    target_age: int | None = None
    keywords: list[str] = []
    confidence: float = 0.0


# ─── Subject keyword maps ────────────────────────────────────────────────────

SUBJECT_KEYWORDS: dict[str, list[str]] = {
    "Mathematics": [
        "math", "maths", "mathematics", "addition", "subtraction", "multiply",
        "multiplication", "division", "divide", "fraction", "decimal", "number",
        "counting", "algebra", "geometry", "perimeter", "area", "percentage",
        "ratio", "table", "tables", "times table", "place value", "HCF", "LCM",
        "integer", "exponent", "equation", "calculation", "arithmetic",
    ],
    "English": [
        "english", "grammar", "spelling", "vocabulary", "reading", "writing",
        "noun", "verb", "adjective", "pronoun", "tense", "sentence", "phonics",
        "letter", "alphabet", "word", "rhyming", "comprehension", "singular",
        "plural", "preposition", "antonym", "synonym", "CVC",
    ],
    "Hindi": [
        "hindi", "varnamala", "swar", "vyanjan", "matra", "hindi grammar",
        "sangya", "sarvanam", "kriya", "visheshan", "vachan", "ling",
        "hindi spelling", "hindi reading",
    ],
    "EVS": [
        "evs", "environment", "science", "plant", "animal", "water", "food",
        "body", "senses", "weather", "community", "helper", "shelter",
        "transport", "season",
    ],
    "Science": [
        "science", "physics", "chemistry", "biology", "force", "energy",
        "light", "shadow", "reflection", "circuit", "electricity", "magnet",
        "acid", "base", "photosynthesis", "digestion", "respiration",
        "organism", "cell", "heat", "temperature", "motion", "speed",
        "separation", "mixture", "solution",
    ],
}

# ─── Grade extraction patterns ───────────────────────────────────────────────

GRADE_PATTERNS = [
    (r'\bclass\s*(?:VII|7)\b', 'Class VII', 7),
    (r'\bclass\s*(?:VI|6)\b', 'Class VI', 6),
    (r'\bclass\s*(?:V|5)\b', 'Class V', 5),
    (r'\bclass\s*(?:IV|4)\b', 'Class IV', 4),
    (r'\bclass\s*(?:III|3)\b', 'Class III', 3),
    (r'\bclass\s*(?:II|2)\b', 'Class II', 2),
    (r'\bclass\s*(?:I|1)\b', 'Class I', 1),
    (r'\bkg\b|\bkindergarten\b', 'KG', 0),
    (r'\bnursery\b', 'Nursery', -1),
    (r'\bpre[\s-]*nursery\b', 'Pre-Nursery', -2),
    (r'\bgrade\s*(\d+)\b', None, None),  # handled dynamically
]

# ─── Game type keyword hints ─────────────────────────────────────────────────

GAME_TYPE_HINTS: dict[str, GameType] = {
    "match": GameType.TAP_MATCH,
    "matching": GameType.TAP_MATCH,
    "tap": GameType.TAP_MATCH,
    "sort": GameType.DRAG_SORT,
    "sorting": GameType.DRAG_SORT,
    "drag": GameType.DRAG_SORT,
    "arrange": GameType.DRAG_SORT,
    "order": GameType.DRAG_SORT,
    "maze": GameType.MAZE_RUNNER,
    "navigate": GameType.MAZE_RUNNER,
    "word": GameType.WORD_BUILDER,
    "spell": GameType.WORD_BUILDER,
    "spelling": GameType.WORD_BUILDER,
    "quiz": GameType.QUIZ_ADVENTURE,
    "mcq": GameType.QUIZ_ADVENTURE,
    "question": GameType.QUIZ_ADVENTURE,
    "story": GameType.QUIZ_ADVENTURE,
    "shop": GameType.STRATEGY_SIM,
    "simulation": GameType.STRATEGY_SIM,
    "strategy": GameType.STRATEGY_SIM,
    "code": GameType.CODE_AND_PLAY,
    "coding": GameType.CODE_AND_PLAY,
    "block": GameType.CODE_AND_PLAY,
    "race": GameType.MULTIPLAYER_RACE,
    "compete": GameType.MULTIPLAYER_RACE,
    "multiplayer": GameType.MULTIPLAYER_RACE,
}

# ─── Board detection ─────────────────────────────────────────────────────────

BOARD_KEYWORDS: dict[str, CurriculumBoard] = {
    "ncert": CurriculumBoard.NCERT,
    "cbse": CurriculumBoard.CBSE,
    "icse": CurriculumBoard.ICSE,
    "state board": CurriculumBoard.STATE,
    "montessori": CurriculumBoard.MONTESSORI,
    "ib": CurriculumBoard.IB_PYP,
    "pyp": CurriculumBoard.IB_PYP,
}

# ─── Language detection ──────────────────────────────────────────────────────

LANGUAGE_KEYWORDS: dict[str, str] = {
    "hindi": "hi",
    "tamil": "ta",
    "bengali": "bn",
    "bangla": "bn",
    "bhojpuri": "bho",
    "marathi": "mr",
    "telugu": "te",
    "kannada": "kn",
    "english": "en",
}

# Age hints from text
AGE_PATTERN = re.compile(r'\b(\d{1,2})\s*(?:year|yr|age)', re.IGNORECASE)


def _rule_based_parse(prompt: str) -> ParsedIntent:
    """Fast keyword-based extraction. No API call."""
    lower = prompt.lower()
    intent = ParsedIntent()
    matched_count = 0

    # Subject detection
    for subject, keywords in SUBJECT_KEYWORDS.items():
        for kw in keywords:
            if kw in lower:
                intent.subject = subject
                intent.keywords.append(kw)
                matched_count += 1
                break
        if intent.subject:
            break

    # Grade detection
    for pattern, grade_str, grade_num in GRADE_PATTERNS:
        m = re.search(pattern, prompt, re.IGNORECASE)
        if m:
            if grade_str is None:
                # Dynamic grade pattern
                num = int(m.group(1))
                intent.grade = f"Class {_to_roman(num)}" if num <= 7 else f"Grade {num}"
                intent.grade_numeric = num
            else:
                intent.grade = grade_str
                intent.grade_numeric = grade_num
            matched_count += 1
            break

    # Game type detection
    for keyword, gt in GAME_TYPE_HINTS.items():
        if keyword in lower:
            intent.game_type = gt
            matched_count += 1
            break

    # Board detection
    for keyword, board in BOARD_KEYWORDS.items():
        if keyword in lower:
            intent.board = board
            matched_count += 1
            break

    # Language detection
    for keyword, lang_code in LANGUAGE_KEYWORDS.items():
        if keyword in lower:
            # Don't set language to "hindi" if subject is already Hindi
            if intent.subject == "Hindi" and keyword == "hindi":
                continue
            intent.language = lang_code
            break

    # Age detection
    age_match = AGE_PATTERN.search(prompt)
    if age_match:
        age = int(age_match.group(1))
        if 3 <= age <= 14:
            intent.target_age = age
            matched_count += 1

    # Infer age from grade if not explicitly given
    if not intent.target_age and intent.grade_numeric is not None:
        grade_age_map = {-2: 3, -1: 4, 0: 5, 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12}
        intent.target_age = grade_age_map.get(intent.grade_numeric, 8)

    # Confidence based on how many fields we extracted
    intent.confidence = min(matched_count / 4.0, 1.0)

    return intent


def _to_roman(n: int) -> str:
    """Convert 1-7 to Roman numerals."""
    romans = {1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII"}
    return romans.get(n, str(n))


async def _deepseek_parse(prompt: str, partial: ParsedIntent) -> ParsedIntent:
    """Use DeepSeek for ambiguous prompts where rule-based confidence is low."""
    client = AsyncOpenAI(
        api_key=settings.deepseek_api_key,
        base_url=settings.deepseek_base_url,
    )

    system = """You are a pedagogical intent parser for an Indian educational game platform.
Extract structured information from the user's game creation prompt.
Respond ONLY with a JSON object:
{
  "subject": "Mathematics|English|Hindi|EVS|Science|null",
  "topic": "specific topic or null",
  "grade": "Class I|Class II|...|Class VII|KG|Nursery|Pre-Nursery|null",
  "grade_numeric": "integer (-2 to 7) or null",
  "board": "ncert|cbse|icse|montessori|ib_pyp|state|null",
  "game_type": "tap_match|drag_sort|maze_runner|word_builder|quiz_adventure|strategy_sim|code_and_play|multiplayer_race|null",
  "language": "en|hi|ta|bn|bho|mr|te|kn",
  "target_age": "integer 3-14 or null",
  "keywords": ["extracted", "topic", "keywords"]
}"""

    response = await client.chat.completions.create(
        model=settings.model_id,
        max_tokens=512,
        temperature=0.1,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
    )

    import json
    data = json.loads(response.choices[0].message.content)

    # Merge: prefer rule-based values where available, fill gaps with DeepSeek
    if not partial.subject and data.get("subject"):
        partial.subject = data["subject"]
    if not partial.topic and data.get("topic"):
        partial.topic = data["topic"]
    if not partial.grade and data.get("grade"):
        partial.grade = data["grade"]
        partial.grade_numeric = data.get("grade_numeric")
    if not partial.board and data.get("board"):
        try:
            partial.board = CurriculumBoard(data["board"])
        except ValueError:
            pass
    if not partial.game_type and data.get("game_type"):
        try:
            partial.game_type = GameType(data["game_type"])
        except ValueError:
            pass
    if not partial.target_age and data.get("target_age"):
        partial.target_age = data["target_age"]
    if data.get("keywords"):
        partial.keywords.extend(data["keywords"])

    partial.confidence = 1.0
    return partial


async def parse_intent(prompt: str) -> ParsedIntent:
    """
    Parse pedagogical intent from a natural language game creation prompt.
    Uses rule-based extraction first, falls back to DeepSeek for low-confidence results.
    """
    intent = _rule_based_parse(prompt)

    # If confidence is low (< 0.5), use DeepSeek to fill gaps
    if intent.confidence < 0.5:
        intent = await _deepseek_parse(prompt, intent)

    # Default target age if still missing
    if not intent.target_age:
        intent.target_age = 8

    return intent
