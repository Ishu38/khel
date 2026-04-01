"""Base class for domain-specific content generators."""

from abc import ABC, abstractmethod
from app.schemas.game import GameItem


class BaseContentGenerator(ABC):
    """
    Domain-specific content generators produce curriculum-accurate game items.
    They can generate items WITHOUT an LLM call for well-defined domains (e.g., math facts),
    falling back to DeepSeek for open-ended content.
    """

    @abstractmethod
    def can_generate_locally(self, topic: str, grade_numeric: int) -> bool:
        """Whether this generator can produce items without an LLM call."""
        ...

    @abstractmethod
    def generate_items(self, topic: str, grade_numeric: int, count: int, difficulty: str) -> list[GameItem]:
        """Generate game items for the given topic. Returns structured items."""
        ...

    @abstractmethod
    def get_domain_prompt_context(self, topic: str, grade_numeric: int) -> str:
        """Return domain-specific context to inject into LLM prompts for better accuracy."""
        ...
