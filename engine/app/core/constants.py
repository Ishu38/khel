"""Mirrors @khel/shared constants for the Python side."""

from enum import Enum


class DevelopmentalStage(str, Enum):
    SENSORIMOTOR_PREOPERATIONAL = "sensorimotor_preoperational"
    PREOPERATIONAL = "preoperational"
    CONCRETE_OPERATIONAL = "concrete_operational"
    FORMAL_OPERATIONAL = "formal_operational"


class GameType(str, Enum):
    TAP_MATCH = "tap_match"
    DRAG_SORT = "drag_sort"
    MAZE_RUNNER = "maze_runner"
    WORD_BUILDER = "word_builder"
    QUIZ_ADVENTURE = "quiz_adventure"
    STRATEGY_SIM = "strategy_sim"
    CODE_AND_PLAY = "code_and_play"
    MULTIPLAYER_RACE = "multiplayer_race"


class CurriculumBoard(str, Enum):
    NCERT = "ncert"
    CBSE = "cbse"
    ICSE = "icse"
    STATE = "state"
    MONTESSORI = "montessori"
    IB_PYP = "ib_pyp"


# Piaget stage → age range mapping
STAGE_AGE_RANGES: dict[DevelopmentalStage, tuple[int, int]] = {
    DevelopmentalStage.SENSORIMOTOR_PREOPERATIONAL: (3, 4),
    DevelopmentalStage.PREOPERATIONAL: (4, 6),
    DevelopmentalStage.CONCRETE_OPERATIONAL: (6, 9),
    DevelopmentalStage.FORMAL_OPERATIONAL: (9, 12),
}

# Game type → allowed stages
GAME_STAGE_MAP: dict[GameType, list[DevelopmentalStage]] = {
    GameType.TAP_MATCH: [DevelopmentalStage.SENSORIMOTOR_PREOPERATIONAL, DevelopmentalStage.PREOPERATIONAL],
    GameType.DRAG_SORT: [DevelopmentalStage.CONCRETE_OPERATIONAL],
    GameType.MAZE_RUNNER: [DevelopmentalStage.CONCRETE_OPERATIONAL],
    GameType.WORD_BUILDER: [DevelopmentalStage.CONCRETE_OPERATIONAL, DevelopmentalStage.FORMAL_OPERATIONAL],
    GameType.QUIZ_ADVENTURE: [DevelopmentalStage.FORMAL_OPERATIONAL],
    GameType.STRATEGY_SIM: [DevelopmentalStage.FORMAL_OPERATIONAL],
    GameType.CODE_AND_PLAY: [DevelopmentalStage.CONCRETE_OPERATIONAL, DevelopmentalStage.FORMAL_OPERATIONAL],
    GameType.MULTIPLAYER_RACE: [DevelopmentalStage.CONCRETE_OPERATIONAL, DevelopmentalStage.FORMAL_OPERATIONAL],
}


def get_stage_for_age(age: int) -> DevelopmentalStage:
    for stage, (min_age, max_age) in STAGE_AGE_RANGES.items():
        if min_age <= age < max_age:
            return stage
    return DevelopmentalStage.FORMAL_OPERATIONAL
