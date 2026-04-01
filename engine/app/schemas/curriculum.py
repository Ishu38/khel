from pydantic import BaseModel


class LearningOutcome(BaseModel):
    code: str
    description: str
    keywords: list[str] = []
    blooms_level: str = "understand"  # remember|understand|apply|analyze|evaluate|create


class Topic(BaseModel):
    name: str
    order: int = 0
    learning_outcomes: list[LearningOutcome] = []


class Unit(BaseModel):
    name: str
    order: int = 0
    topics: list[Topic] = []


class Subject(BaseModel):
    name: str
    code: str = ""
    units: list[Unit] = []


class CurriculumNode(BaseModel):
    board: str
    grade: str
    grade_numeric: int
    subjects: list[Subject] = []


class StageInfo(BaseModel):
    age: int
    stage: str
    stage_label: str
    available_game_types: list[str]


class CurriculumSearchResult(BaseModel):
    board: str
    grade: str
    subject: str
    topic: str
    learning_outcomes: list[str] = []


class TopicSequence(BaseModel):
    subject: str
    topics: list[str]
    prerequisites: dict[str, list[str]] = {}
