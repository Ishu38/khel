from fastapi import APIRouter, Query
from app.core.constants import get_stage_for_age, GAME_STAGE_MAP, GameType, DevelopmentalStage
from app.core.curriculum_data import NCERT_CURRICULUM, TOPIC_PREREQUISITES
from app.schemas.curriculum import (
    StageInfo, CurriculumSearchResult, TopicSequence
)

router = APIRouter(prefix="/api/curriculum", tags=["curriculum"])


@router.get("/stage/{age}", response_model=StageInfo)
async def get_stage_info(age: int) -> StageInfo:
    stage = get_stage_for_age(age)
    game_types = [
        gt.value for gt, stages in GAME_STAGE_MAP.items() if stage in stages
    ]
    labels: dict[DevelopmentalStage, str] = {
        DevelopmentalStage.SENSORIMOTOR_PREOPERATIONAL: "Pre-Nursery (3-4)",
        DevelopmentalStage.PREOPERATIONAL: "Nursery-KG (4-6)",
        DevelopmentalStage.CONCRETE_OPERATIONAL: "Class I-III (6-9)",
        DevelopmentalStage.FORMAL_OPERATIONAL: "Class IV-VII (9-12)",
    }
    return StageInfo(
        age=age,
        stage=stage.value,
        stage_label=labels.get(stage, stage.value),
        available_game_types=game_types,
    )


@router.get("/boards")
async def list_boards() -> list[dict]:
    boards: set[str] = set()
    for c in NCERT_CURRICULUM:
        boards.add(c["board"])
    return [{"id": b, "label": b.upper()} for b in sorted(boards)]


@router.get("/grades")
async def list_grades(board: str = "ncert") -> list[dict]:
    grades: list[dict] = []
    for c in NCERT_CURRICULUM:
        if c["board"] == board:
            grades.append({"grade": c["grade"], "grade_numeric": c["grade_numeric"]})
    return sorted(grades, key=lambda g: g["grade_numeric"])


@router.get("/subjects")
async def list_subjects(board: str = "ncert", grade_numeric: int = 1) -> list[dict]:
    for c in NCERT_CURRICULUM:
        if c["board"] == board and c["grade_numeric"] == grade_numeric:
            return [{"name": s["name"], "code": s.get("code", "")} for s in c["subjects"]]
    return []


@router.get("/topics")
async def list_topics(
    board: str = "ncert",
    grade_numeric: int = 1,
    subject: str = "Mathematics",
) -> list[dict]:
    for c in NCERT_CURRICULUM:
        if c["board"] == board and c["grade_numeric"] == grade_numeric:
            for s in c["subjects"]:
                if s["name"].lower() == subject.lower():
                    topics: list[dict] = []
                    for unit in s["units"]:
                        for topic in unit["topics"]:
                            topics.append({
                                "unit": unit["name"],
                                "topic": topic["name"],
                                "order": topic.get("order", 0),
                                "learning_outcomes": [
                                    {"code": lo["code"], "description": lo["description"], "blooms_level": lo.get("blooms_level", "understand")}
                                    for lo in topic.get("learning_outcomes", [])
                                ],
                                "prerequisites": TOPIC_PREREQUISITES.get(topic["name"], []),
                            })
                    return topics
    return []


@router.get("/search", response_model=list[CurriculumSearchResult])
async def search_curriculum(q: str = Query(..., min_length=2)) -> list[CurriculumSearchResult]:
    q_lower = q.lower()
    results: list[CurriculumSearchResult] = []
    for c in NCERT_CURRICULUM:
        for s in c["subjects"]:
            for unit in s["units"]:
                for topic in unit["topics"]:
                    match = q_lower in topic["name"].lower()
                    if not match:
                        for lo in topic.get("learning_outcomes", []):
                            if q_lower in lo["description"].lower() or any(q_lower in kw for kw in lo.get("keywords", [])):
                                match = True
                                break
                    if match:
                        results.append(CurriculumSearchResult(
                            board=c["board"],
                            grade=c["grade"],
                            subject=s["name"],
                            topic=topic["name"],
                            learning_outcomes=[lo["description"] for lo in topic.get("learning_outcomes", [])],
                        ))
    return results


@router.get("/sequence", response_model=TopicSequence)
async def get_topic_sequence(
    board: str = "ncert",
    subject: str = "Mathematics",
    from_grade: int = 1,
    to_grade: int = 7,
) -> TopicSequence:
    topics: list[str] = []
    prereqs: dict[str, list[str]] = {}
    for c in NCERT_CURRICULUM:
        if c["board"] == board and from_grade <= c["grade_numeric"] <= to_grade:
            for s in c["subjects"]:
                if s["name"].lower() == subject.lower():
                    for unit in s["units"]:
                        for topic in unit["topics"]:
                            topics.append(topic["name"])
                            if topic["name"] in TOPIC_PREREQUISITES:
                                prereqs[topic["name"]] = TOPIC_PREREQUISITES[topic["name"]]
    return TopicSequence(subject=subject, topics=topics, prerequisites=prereqs)


@router.get("/tree")
async def get_curriculum_tree(board: str = "ncert", grade_numeric: int | None = None) -> list[dict]:
    results: list[dict] = []
    for c in NCERT_CURRICULUM:
        if c["board"] == board:
            if grade_numeric is not None and c["grade_numeric"] != grade_numeric:
                continue
            results.append(c)
    return results
