from pydantic import BaseModel, Field
from app.core.constants import GameType, CurriculumBoard


class GameItem(BaseModel):
    prompt: str
    correct_answer: str | int | list[str]
    distractors: list[str | int] = []
    hint: str = ""
    points: int = 10


class GameLevel(BaseModel):
    order: int
    title: str
    difficulty: str = "medium"
    items: list[GameItem]


class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=5, max_length=500)
    game_type: GameType | None = None
    target_age: int = Field(default=8, ge=3, le=14)
    language: str = "en"
    board: CurriculumBoard | None = None
    grade: str | None = None
    subject: str | None = None
    user_id: str | None = None


class GeneratedGame(BaseModel):
    title: str
    description: str
    game_type: GameType
    developmental_stage: str
    min_age: int
    max_age: int
    language: str
    curriculum: dict = {}
    levels: list[GameLevel]
    settings: dict = {}
    tags: list[str] = []
    ai_generated: bool = True
    original_prompt: str


class AdaptRequest(BaseModel):
    session_id: str
    current_difficulty: str
    recent_accuracy: float = Field(default=0.0, ge=0.0, le=1.0)
    frustration_events: int = 0
    responses_count: int = 0
    topic: str | None = None
    correct: bool | None = None
    response_time_ms: int | None = None


class AdaptResponse(BaseModel):
    recommended_difficulty: str
    reason: str
    hint: str | None = None
    ability_estimate: float | None = None
    confidence: float | None = None
    weak_topics: list[str] | None = None
