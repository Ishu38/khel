from app.services.content_generators.math_gen import MathContentGenerator
from app.services.content_generators.language_gen import LanguageContentGenerator
from app.services.content_generators.science_gen import ScienceContentGenerator
from app.services.content_generators.evs_gen import EVSContentGenerator

GENERATORS: dict[str, type] = {
    "Mathematics": MathContentGenerator,
    "English": LanguageContentGenerator,
    "Hindi": LanguageContentGenerator,
    "Science": ScienceContentGenerator,
    "EVS": EVSContentGenerator,
}


def get_generator(subject: str):
    """Get the domain-specific content generator for a subject."""
    gen_class = GENERATORS.get(subject)
    if gen_class:
        return gen_class()
    return None
