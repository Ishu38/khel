"""
EVS (Environmental Studies) content generator — KG to Class IV.
Covers: My Body, Animals, Plants, Food, Water, Community Helpers, Weather, Shelter, Transport.
Most items generated locally from fact banks.
"""

import random
from app.schemas.game import GameItem
from app.services.content_generators.base import BaseContentGenerator


# ─── Fact banks ───────────────────────────────────────────────────────────────

BODY_PARTS = [
    ("eyes", "seeing"), ("ears", "hearing"), ("nose", "smelling"),
    ("tongue", "tasting"), ("skin", "touching"),
]

ANIMALS_SOUNDS = [
    ("Dog", "Bark"), ("Cat", "Meow"), ("Cow", "Moo"), ("Lion", "Roar"),
    ("Duck", "Quack"), ("Horse", "Neigh"), ("Sheep", "Baa"), ("Hen", "Cluck"),
    ("Crow", "Caw"), ("Frog", "Croak"),
]

ANIMALS_HOMES = [
    ("Dog", "Kennel"), ("Bird", "Nest"), ("Rabbit", "Burrow"), ("Bee", "Hive"),
    ("Lion", "Den"), ("Spider", "Web"), ("Horse", "Stable"), ("Fish", "Water/Pond"),
    ("Cow", "Shed"), ("Ant", "Anthill"),
]

ANIMALS_FOOD = [
    ("Cow", "Herbivore", "Grass and plants"),
    ("Lion", "Carnivore", "Meat"),
    ("Bear", "Omnivore", "Plants and meat"),
    ("Rabbit", "Herbivore", "Carrots and grass"),
    ("Eagle", "Carnivore", "Fish and small animals"),
    ("Hen", "Omnivore", "Grains, insects, and worms"),
    ("Deer", "Herbivore", "Leaves and grass"),
    ("Tiger", "Carnivore", "Meat"),
    ("Dog", "Omnivore", "Meat, rice, and bread"),
    ("Elephant", "Herbivore", "Leaves, bananas, and sugarcane"),
]

PLANT_PARTS = [
    ("Root", "Absorbs water and minerals from soil", "Carrot, radish, turnip"),
    ("Stem", "Carries water and food; supports the plant", "Sugarcane, potato (underground stem)"),
    ("Leaf", "Makes food through photosynthesis", "Spinach, mint, neem"),
    ("Flower", "Helps in reproduction; attracts pollinators", "Rose, sunflower, marigold"),
    ("Fruit", "Contains seeds; develops from the flower", "Mango, apple, tomato"),
    ("Seed", "Grows into a new plant", "Bean, pea, wheat"),
]

FOOD_GROUPS = [
    ("Rice", "Grains / Cereals"), ("Milk", "Dairy"), ("Apple", "Fruits"),
    ("Carrot", "Vegetables"), ("Egg", "Protein"), ("Butter", "Fats"),
    ("Bread", "Grains / Cereals"), ("Paneer", "Dairy / Protein"),
    ("Banana", "Fruits"), ("Spinach", "Vegetables"),
]

WATER_SOURCES = ["Rain", "River", "Well", "Tap", "Lake", "Pond", "Spring", "Sea"]

COMMUNITY_HELPERS = [
    ("Doctor", "Treats sick people"), ("Teacher", "Teaches students"),
    ("Farmer", "Grows crops and food"), ("Police", "Maintains law and order"),
    ("Postman", "Delivers letters and parcels"), ("Firefighter", "Puts out fires"),
    ("Carpenter", "Makes furniture from wood"), ("Tailor", "Stitches clothes"),
]

WATER_CYCLE_STEPS = [
    ("Evaporation", "Water heats up and turns into water vapour"),
    ("Condensation", "Water vapour cools and forms clouds"),
    ("Precipitation", "Water falls as rain, snow, or hail"),
    ("Collection", "Water collects in rivers, lakes, and oceans"),
]


class EVSContentGenerator(BaseContentGenerator):

    LOCAL_TOPICS = {
        "body", "senses", "animal", "sound", "home", "habitat",
        "plant", "food", "water", "helper", "community",
        "fruit", "vegetable", "shelter", "water cycle",
        "herbivore", "carnivore", "omnivore",
    }

    def can_generate_locally(self, topic: str, grade_numeric: int) -> bool:
        topic_lower = topic.lower()
        return any(kw in topic_lower for kw in self.LOCAL_TOPICS)

    def generate_items(self, topic: str, grade_numeric: int, count: int, difficulty: str) -> list[GameItem]:
        topic_lower = topic.lower()

        if "sense" in topic_lower or "body" in topic_lower:
            return self._senses_items(count)
        elif "sound" in topic_lower:
            return self._animal_sound_items(count)
        elif "home" in topic_lower or "habitat" in topic_lower or "shelter" in topic_lower:
            return self._animal_home_items(count)
        elif "herbivore" in topic_lower or "carnivore" in topic_lower or "omnivore" in topic_lower or "food chain" in topic_lower:
            return self._animal_food_items(count)
        elif "plant" in topic_lower:
            return self._plant_items(count)
        elif "food" in topic_lower or "fruit" in topic_lower or "vegetable" in topic_lower:
            return self._food_group_items(count)
        elif "water cycle" in topic_lower:
            return self._water_cycle_items(count)
        elif "water" in topic_lower:
            return self._water_source_items(count)
        elif "helper" in topic_lower or "community" in topic_lower:
            return self._community_helper_items(count)
        elif "animal" in topic_lower:
            return self._animal_sound_items(count)
        else:
            return self._senses_items(count)

    def get_domain_prompt_context(self, topic: str, grade_numeric: int) -> str:
        if grade_numeric <= 1:
            return "EVS for KG-Class I: my body, five senses, animals & sounds, plants, food, family. Use pictures and simple matching."
        elif grade_numeric <= 2:
            return "EVS for Class II: water sources, community helpers, our helpers, animals homes, food sources. Relate to child's neighbourhood."
        elif grade_numeric <= 3:
            return "EVS for Class III (NCERT Looking Around): housing types, animal food/shelter, herbivore/carnivore/omnivore."
        else:
            return "EVS for Class IV: water cycle, maps & directions, food preservation, environmental pollution. More analytical questions."

    def _senses_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(BODY_PARTS, min(count, len(BODY_PARTS)))
        for part, sense in selected:
            others = [s for _, s in BODY_PARTS if s != sense]
            items.append(GameItem(
                prompt=f"Which sense do we use our {part} for?",
                correct_answer=sense.capitalize(),
                distractors=[o.capitalize() for o in random.sample(others, min(3, len(others)))],
                hint=f"What do your {part} help you do?",
                points=10,
            ))
        return items

    def _animal_sound_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(ANIMALS_SOUNDS, min(count, len(ANIMALS_SOUNDS)))
        for animal, sound in selected:
            others = [s for _, s in ANIMALS_SOUNDS if s != sound]
            items.append(GameItem(
                prompt=f"What sound does a {animal.lower()} make?",
                correct_answer=sound,
                distractors=random.sample(others, 3),
                hint=f"Think of the sound you hear when you see a {animal.lower()}",
                points=10,
            ))
        return items

    def _animal_home_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(ANIMALS_HOMES, min(count, len(ANIMALS_HOMES)))
        for animal, home in selected:
            others = [h for _, h in ANIMALS_HOMES if h != home]
            items.append(GameItem(
                prompt=f"Where does a {animal.lower()} live?",
                correct_answer=home,
                distractors=random.sample(others, 3),
                hint=f"Think about where you might find a {animal.lower()}",
                points=10,
            ))
        return items

    def _animal_food_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(ANIMALS_FOOD, min(count, len(ANIMALS_FOOD)))
        for animal, category, food in selected:
            items.append(GameItem(
                prompt=f"A {animal.lower()} is a:",
                correct_answer=category,
                distractors=[c for c in ["Herbivore", "Carnivore", "Omnivore"] if c != category],
                hint=f"A {animal.lower()} eats {food.lower()}",
                points=10,
            ))
        return items

    def _plant_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(PLANT_PARTS, min(count, len(PLANT_PARTS)))
        for part, function, examples in selected:
            others = [f for _, f, _ in PLANT_PARTS if f != function]
            items.append(GameItem(
                prompt=f"What is the function of the {part.lower()} of a plant?",
                correct_answer=function,
                distractors=random.sample(others, min(3, len(others))),
                hint=f"Examples: {examples}",
                points=10,
            ))
        return items

    def _food_group_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(FOOD_GROUPS, min(count, len(FOOD_GROUPS)))
        for food, group in selected:
            others = list({g for _, g in FOOD_GROUPS if g != group})
            items.append(GameItem(
                prompt=f"Which food group does '{food}' belong to?",
                correct_answer=group,
                distractors=random.sample(others, min(3, len(others))),
                hint=f"Think about what type of food {food.lower()} is",
                points=10,
            ))
        return items

    def _water_source_items(self, count: int) -> list[GameItem]:
        items = []
        for _ in range(min(count, 5)):
            source = random.choice(WATER_SOURCES)
            items.append(GameItem(
                prompt=f"Is '{source}' a source of water?",
                correct_answer="Yes",
                distractors=["No", "Only in summer", "Only in cities"],
                hint="Think about where water comes from in nature",
                points=10,
            ))
        return items

    def _water_cycle_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(WATER_CYCLE_STEPS, min(count, len(WATER_CYCLE_STEPS)))
        for step, description in selected:
            others = [s for s, _ in WATER_CYCLE_STEPS if s != step]
            items.append(GameItem(
                prompt=f"Which step of the water cycle? {description}",
                correct_answer=step,
                distractors=others + ["Absorption"],
                hint="The water cycle has 4 main steps",
                points=10,
            ))
        return items[:count]

    def _community_helper_items(self, count: int) -> list[GameItem]:
        items = []
        selected = random.sample(COMMUNITY_HELPERS, min(count, len(COMMUNITY_HELPERS)))
        for helper, role in selected:
            others = [r for _, r in COMMUNITY_HELPERS if r != role]
            items.append(GameItem(
                prompt=f"Who {role.lower()}?",
                correct_answer=helper,
                distractors=random.sample([h for h, _ in COMMUNITY_HELPERS if h != helper], 3),
                hint=f"This person helps the community by their work",
                points=10,
            ))
        return items
