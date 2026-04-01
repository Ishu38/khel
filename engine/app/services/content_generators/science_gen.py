"""
Science content generator (Class V-VII).
Generates quiz items for Physics, Chemistry, Biology topics.
Most science content requires LLM for rich question generation,
but we provide structured domain context for better accuracy.
"""

import random
from app.schemas.game import GameItem
from app.services.content_generators.base import BaseContentGenerator


# ─── Fact banks for local generation ──────────────────────────────────────────

BODY_ORGANS = [
    ("Heart", "Pumps blood throughout the body", ["Digests food", "Filters air", "Produces bile"]),
    ("Lungs", "Help in breathing and gas exchange", ["Pump blood", "Digest food", "Filter waste"]),
    ("Brain", "Controls all body functions and thinking", ["Pumps blood", "Digests food", "Filters urine"]),
    ("Stomach", "Digests food using acids and enzymes", ["Pumps blood", "Filters air", "Controls thinking"]),
    ("Kidneys", "Filter blood and remove waste as urine", ["Pump blood", "Digest food", "Control breathing"]),
    ("Liver", "Produces bile and detoxifies blood", ["Pumps blood", "Filters air", "Controls muscles"]),
]

SIMPLE_MACHINES = [
    ("Lever", "See-saw, scissors, bottle opener", ["Screw", "Pulley", "Wedge"]),
    ("Wheel and Axle", "Doorknob, bicycle wheel, steering wheel", ["Lever", "Inclined plane", "Screw"]),
    ("Pulley", "Flagpole, well, crane", ["Lever", "Wheel and axle", "Wedge"]),
    ("Inclined Plane", "Ramp, slide, staircase", ["Lever", "Pulley", "Screw"]),
    ("Wedge", "Axe, knife, doorstop", ["Lever", "Pulley", "Wheel and axle"]),
    ("Screw", "Bottle cap, drill bit, spiral staircase", ["Lever", "Pulley", "Wedge"]),
]

CONDUCTORS_INSULATORS = [
    ("Iron nail", "Conductor", ["Insulator", "Semiconductor", "Magnet"]),
    ("Rubber band", "Insulator", ["Conductor", "Semiconductor", "Magnet"]),
    ("Copper wire", "Conductor", ["Insulator", "Semiconductor", "Magnet"]),
    ("Plastic ruler", "Insulator", ["Conductor", "Semiconductor", "Magnet"]),
    ("Aluminium foil", "Conductor", ["Insulator", "Semiconductor", "Magnet"]),
    ("Wooden stick", "Insulator", ["Conductor", "Semiconductor", "Magnet"]),
    ("Steel spoon", "Conductor", ["Insulator", "Semiconductor", "Magnet"]),
    ("Glass rod", "Insulator", ["Conductor", "Semiconductor", "Magnet"]),
]

SEPARATION_METHODS = [
    ("Sand and water", "Filtration", ["Evaporation", "Magnetic separation", "Sieving"]),
    ("Salt and water", "Evaporation", ["Filtration", "Sieving", "Magnetic separation"]),
    ("Rice and stones", "Sieving", ["Filtration", "Evaporation", "Magnetic separation"]),
    ("Iron filings and sand", "Magnetic separation", ["Filtration", "Evaporation", "Sieving"]),
    ("Wheat and husk", "Winnowing", ["Filtration", "Evaporation", "Sieving"]),
    ("Cream from milk", "Centrifugation", ["Filtration", "Evaporation", "Sieving"]),
]

ACIDS_BASES = [
    ("Lemon juice", "Acid", ["Base", "Neutral", "Salt"]),
    ("Soap solution", "Base", ["Acid", "Neutral", "Salt"]),
    ("Vinegar", "Acid", ["Base", "Neutral", "Salt"]),
    ("Baking soda solution", "Base", ["Acid", "Neutral", "Salt"]),
    ("Curd", "Acid", ["Base", "Neutral", "Salt"]),
    ("Lime water", "Base", ["Acid", "Neutral", "Salt"]),
    ("Orange juice", "Acid", ["Base", "Neutral", "Salt"]),
    ("Milk of magnesia", "Base", ["Acid", "Neutral", "Salt"]),
]


class ScienceContentGenerator(BaseContentGenerator):

    LOCAL_TOPICS = {
        "organ", "body", "machine", "simple machine", "conductor", "insulator",
        "separation", "filtration", "acid", "base", "circuit",
    }

    def can_generate_locally(self, topic: str, grade_numeric: int) -> bool:
        topic_lower = topic.lower()
        return any(kw in topic_lower for kw in self.LOCAL_TOPICS)

    def generate_items(self, topic: str, grade_numeric: int, count: int, difficulty: str) -> list[GameItem]:
        topic_lower = topic.lower()

        if "organ" in topic_lower or "body" in topic_lower:
            return self._organ_items(count)
        elif "machine" in topic_lower:
            return self._simple_machine_items(count)
        elif "conductor" in topic_lower or "insulator" in topic_lower:
            return self._conductor_items(count)
        elif "separation" in topic_lower or "filtration" in topic_lower:
            return self._separation_items(count)
        elif "acid" in topic_lower or "base" in topic_lower:
            return self._acid_base_items(count)
        else:
            return self._organ_items(count)

    def get_domain_prompt_context(self, topic: str, grade_numeric: int) -> str:
        if grade_numeric <= 4:
            return "EVS-level science: parts of plants, food groups, weather, materials. Use simple language, relate to daily life."
        elif grade_numeric == 5:
            return "Class V science: organ systems, seed germination, simple machines. Use correct scientific terms with simple explanations."
        elif grade_numeric == 6:
            return "Class VI science: light/shadows/reflection, electric circuits, conductors/insulators, separation of substances, classification of organisms."
        else:
            return "Class VII science: heat transfer, acids/bases/indicators, photosynthesis, nutrition, respiration, motion/speed. Use precise scientific vocabulary."

    def _organ_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(BODY_ORGANS, min(count, len(BODY_ORGANS)))
        for organ, function, distractors in selected:
            items.append(GameItem(
                prompt=f"What is the main function of the {organ}?",
                correct_answer=function,
                distractors=distractors,
                hint=f"Think about what the {organ.lower()} does every day",
                points=10,
            ))
        return items

    def _simple_machine_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(SIMPLE_MACHINES, min(count, len(SIMPLE_MACHINES)))
        for machine, examples, distractors in selected:
            items.append(GameItem(
                prompt=f"Which simple machine? Examples: {examples}",
                correct_answer=machine,
                distractors=distractors,
                hint=f"Think about how these tools make work easier",
                points=10,
            ))
        return items

    def _conductor_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(CONDUCTORS_INSULATORS, min(count, len(CONDUCTORS_INSULATORS)))
        for material, answer, distractors in selected:
            items.append(GameItem(
                prompt=f"Is a {material.lower()} a conductor or insulator of electricity?",
                correct_answer=answer,
                distractors=distractors,
                hint="Metals usually conduct electricity, non-metals usually don't",
                points=10,
            ))
        return items

    def _separation_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(SEPARATION_METHODS, min(count, len(SEPARATION_METHODS)))
        for mixture, method, distractors in selected:
            items.append(GameItem(
                prompt=f"Which method is best to separate {mixture.lower()}?",
                correct_answer=method,
                distractors=distractors,
                hint="Think about the difference in properties of the two substances",
                points=10,
            ))
        return items

    def _acid_base_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(ACIDS_BASES, min(count, len(ACIDS_BASES)))
        for substance, answer, distractors in selected:
            items.append(GameItem(
                prompt=f"Is {substance.lower()} an acid or a base?",
                correct_answer=answer,
                distractors=distractors,
                hint="Sour-tasting substances are usually acids; bitter/slippery ones are bases",
                points=10,
            ))
        return items
