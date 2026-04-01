"""
Per-game-type content assemblers.
Transform raw content items into Phaser-ready game configs for each game type.
"""

from app.schemas.game import GameItem, GameLevel
from app.core.constants import GameType


def assemble_levels(
    game_type: GameType,
    items: list[GameItem],
    title: str,
) -> list[GameLevel]:
    """Split items into difficulty-graded levels and attach game-type-specific config."""
    assembler = ASSEMBLERS.get(game_type, _default_assembler)
    return assembler(items, title)


def _tap_match_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Tap & Match: items become card pairs. 4-6 pairs per level."""
    levels = []
    chunks = _chunk_items(items, 5)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Level {i + 1}: {'Warm Up' if i == 0 else 'Challenge' if i == 1 else 'Master'}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _drag_sort_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Drag & Sort: items need ordering. Prompt = full set, answer = correct order."""
    levels = []
    chunks = _chunk_items(items, 6)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Level {i + 1}: Sort It Out",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _maze_runner_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Maze Runner: items become gate challenges. 5-7 gates per level."""
    levels = []
    chunks = _chunk_items(items, 6)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Maze {i + 1}: {'Forest Path' if i == 0 else 'Mountain Trail' if i == 1 else 'Dragon Cave'}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _word_builder_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Word Builder: items are words to build from scrambled letters."""
    levels = []
    chunks = _chunk_items(items, 6)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Level {i + 1}: {'Simple Words' if i == 0 else 'Tricky Words' if i == 1 else 'Expert Words'}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _quiz_adventure_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Quiz Adventure: story-driven MCQs. 6-8 questions per level."""
    levels = []
    chunks = _chunk_items(items, 7)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Chapter {i + 1}: {'The Beginning' if i == 0 else 'The Journey' if i == 1 else 'The Final Quest'}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _strategy_sim_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Strategy/Sim: scenario-based items with multi-step consequences."""
    levels = []
    chunks = _chunk_items(items, 5)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Day {i + 1}: {'Setup' if i == 0 else 'Growing' if i == 1 else 'Profit!'}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _code_and_play_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Code & Play: items become block-coding challenges."""
    levels = []
    chunks = _chunk_items(items, 5)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Stage {i + 1}: {'Hello World' if i == 0 else 'Loops' if i == 1 else 'Functions'}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _multiplayer_race_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Multiplayer Race: speed-based items."""
    levels = []
    chunks = _chunk_items(items, 8)
    difficulties = ["easy", "medium", "hard"]

    for i, chunk in enumerate(chunks[:3]):
        levels.append(GameLevel(
            order=i + 1,
            title=f"Race {i + 1}: {'Sprint' if i == 0 else 'Hurdles' if i == 1 else 'Grand Prix'}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        ))
    return levels


def _default_assembler(items: list[GameItem], title: str) -> list[GameLevel]:
    """Fallback assembler."""
    chunks = _chunk_items(items, 6)
    difficulties = ["easy", "medium", "hard"]
    return [
        GameLevel(
            order=i + 1,
            title=f"Level {i + 1}",
            difficulty=difficulties[min(i, 2)],
            items=chunk,
        )
        for i, chunk in enumerate(chunks[:3])
    ]


def _chunk_items(items: list[GameItem], chunk_size: int) -> list[list[GameItem]]:
    """Split items into chunks of approximately chunk_size."""
    return [items[i:i + chunk_size] for i in range(0, len(items), chunk_size)]


ASSEMBLERS = {
    GameType.TAP_MATCH: _tap_match_assembler,
    GameType.DRAG_SORT: _drag_sort_assembler,
    GameType.MAZE_RUNNER: _maze_runner_assembler,
    GameType.WORD_BUILDER: _word_builder_assembler,
    GameType.QUIZ_ADVENTURE: _quiz_adventure_assembler,
    GameType.STRATEGY_SIM: _strategy_sim_assembler,
    GameType.CODE_AND_PLAY: _code_and_play_assembler,
    GameType.MULTIPLAYER_RACE: _multiplayer_race_assembler,
}
