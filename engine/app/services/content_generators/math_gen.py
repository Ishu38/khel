"""
Mathematics content generator.
Generates curriculum-accurate math items WITHOUT LLM calls for:
- Arithmetic (addition, subtraction, multiplication, division)
- Tables, factors, multiples
- Fractions, decimals, percentages
Falls back to LLM for word problems and geometry.
"""

import random
from app.schemas.game import GameItem
from app.services.content_generators.base import BaseContentGenerator


class MathContentGenerator(BaseContentGenerator):

    LOCAL_TOPICS = {
        "addition", "subtraction", "multiplication", "division",
        "tables", "times table", "multiplication tables",
        "counting", "numbers", "place value",
        "factors", "multiples", "HCF", "LCM",
        "fractions", "decimals", "percentage",
        "comparison", "ordering",
    }

    def can_generate_locally(self, topic: str, grade_numeric: int) -> bool:
        topic_lower = topic.lower()
        return any(kw in topic_lower for kw in self.LOCAL_TOPICS)

    def generate_items(self, topic: str, grade_numeric: int, count: int, difficulty: str) -> list[GameItem]:
        topic_lower = topic.lower()

        if "multiplication" in topic_lower or "table" in topic_lower:
            return self._multiplication_items(grade_numeric, count, difficulty)
        elif "addition" in topic_lower:
            return self._addition_items(grade_numeric, count, difficulty)
        elif "subtraction" in topic_lower:
            return self._subtraction_items(grade_numeric, count, difficulty)
        elif "division" in topic_lower:
            return self._division_items(grade_numeric, count, difficulty)
        elif "fraction" in topic_lower:
            return self._fraction_items(grade_numeric, count, difficulty)
        elif "counting" in topic_lower or "number" in topic_lower:
            return self._counting_items(grade_numeric, count, difficulty)
        elif "factor" in topic_lower or "multiple" in topic_lower:
            return self._factor_items(grade_numeric, count, difficulty)
        else:
            return self._addition_items(grade_numeric, count, difficulty)

    def get_domain_prompt_context(self, topic: str, grade_numeric: int) -> str:
        contexts = {
            0: "Numbers 1-50, basic shapes, colors, simple patterns. Use concrete objects (fruits, animals, toys).",
            1: "Numbers to 100, addition/subtraction within 20, basic shapes, time (hour hand). Use everyday objects.",
            2: "Numbers to 200, 2-digit add/sub with regrouping, multiplication readiness (2,3 tables), Indian money.",
            3: "Numbers to 1000, multiplication tables 2-10, division basics, fractions (1/2, 1/4, 3/4).",
            4: "Numbers to 10000, factors/multiples, like fractions operations, perimeter/area, rounding.",
            5: "Numbers to 1,00,000 (Indian system), decimals, percentages, angles, symmetry.",
            6: "Integers, HCF/LCM, intro algebra, ratio/proportion, basic geometry proofs.",
            7: "Rational numbers, exponents, algebraic expressions, linear equations, triangles, statistics.",
        }
        return contexts.get(grade_numeric, contexts[3])

    # ─── Generators ───────────────────────────────────────────────────────────

    def _multiplication_items(self, grade: int, count: int, difficulty: str) -> list[GameItem]:
        items = []
        ranges = {
            "very_easy": (2, 3, 5),
            "easy": (2, 5, 10),
            "medium": (2, 10, 10),
            "hard": (3, 12, 12),
            "very_hard": (6, 12, 12),
        }
        min_a, max_a, max_b = ranges.get(difficulty, (2, 10, 10))

        for _ in range(count):
            a = random.randint(min_a, max_a)
            b = random.randint(2, max_b)
            correct = a * b
            distractors = self._numeric_distractors(correct, min_val=0)

            items.append(GameItem(
                prompt=f"What is {a} × {b}?",
                correct_answer=str(correct),
                distractors=[str(d) for d in distractors],
                hint=f"Think: {a} groups of {b}",
                points=10,
            ))
        return items

    def _addition_items(self, grade: int, count: int, difficulty: str) -> list[GameItem]:
        items = []
        max_vals = {"very_easy": 10, "easy": 20, "medium": 100, "hard": 500, "very_hard": 1000}
        max_val = max_vals.get(difficulty, 100)

        for _ in range(count):
            a = random.randint(1, max_val)
            b = random.randint(1, max_val)
            correct = a + b
            distractors = self._numeric_distractors(correct, min_val=0)

            items.append(GameItem(
                prompt=f"What is {a} + {b}?",
                correct_answer=str(correct),
                distractors=[str(d) for d in distractors],
                hint=f"Start with {a} and count up {b} more",
                points=10,
            ))
        return items

    def _subtraction_items(self, grade: int, count: int, difficulty: str) -> list[GameItem]:
        items = []
        max_vals = {"very_easy": 10, "easy": 20, "medium": 100, "hard": 500, "very_hard": 1000}
        max_val = max_vals.get(difficulty, 100)

        for _ in range(count):
            a = random.randint(2, max_val)
            b = random.randint(1, a)
            correct = a - b
            distractors = self._numeric_distractors(correct, min_val=0)

            items.append(GameItem(
                prompt=f"What is {a} − {b}?",
                correct_answer=str(correct),
                distractors=[str(d) for d in distractors],
                hint=f"Start with {a} and take away {b}",
                points=10,
            ))
        return items

    def _division_items(self, grade: int, count: int, difficulty: str) -> list[GameItem]:
        items = []
        max_divisor = {"very_easy": 3, "easy": 5, "medium": 10, "hard": 12, "very_hard": 15}
        max_d = max_divisor.get(difficulty, 10)

        for _ in range(count):
            divisor = random.randint(2, max_d)
            quotient = random.randint(1, 12)
            dividend = divisor * quotient
            distractors = self._numeric_distractors(quotient, min_val=1)

            items.append(GameItem(
                prompt=f"What is {dividend} ÷ {divisor}?",
                correct_answer=str(quotient),
                distractors=[str(d) for d in distractors],
                hint=f"How many groups of {divisor} fit in {dividend}?",
                points=10,
            ))
        return items

    def _fraction_items(self, grade: int, count: int, difficulty: str) -> list[GameItem]:
        items = []
        for _ in range(count):
            denominator = random.choice([2, 3, 4, 5, 6, 8])
            numerator = random.randint(1, denominator - 1)
            # Compare fractions
            num2 = random.randint(1, denominator - 1)
            while num2 == numerator:
                num2 = random.randint(1, denominator - 1)

            if numerator > num2:
                correct = f"{numerator}/{denominator}"
                prompt = f"Which is larger: {numerator}/{denominator} or {num2}/{denominator}?"
            else:
                correct = f"{num2}/{denominator}"
                prompt = f"Which is larger: {numerator}/{denominator} or {num2}/{denominator}?"

            items.append(GameItem(
                prompt=prompt,
                correct_answer=correct,
                distractors=[f"{numerator}/{denominator}" if correct != f"{numerator}/{denominator}" else f"{num2}/{denominator}", "They are equal", f"{denominator}/{numerator}"],
                hint="With the same denominator, the bigger numerator means a bigger fraction",
                points=10,
            ))
        return items

    def _counting_items(self, grade: int, count: int, difficulty: str) -> list[GameItem]:
        items = []
        max_vals = {"very_easy": 10, "easy": 20, "medium": 50, "hard": 100, "very_hard": 200}
        max_val = max_vals.get(difficulty, 20)

        for _ in range(count):
            sequence_start = random.randint(1, max_val - 5)
            step = random.choice([1, 2, 5, 10]) if difficulty in ("medium", "hard", "very_hard") else 1
            sequence = [sequence_start + step * i for i in range(4)]
            missing_idx = random.randint(1, 3)
            correct = sequence[missing_idx]

            display = [str(n) if i != missing_idx else "?" for i, n in enumerate(sequence)]
            distractors = self._numeric_distractors(correct, min_val=1)

            items.append(GameItem(
                prompt=f"What comes next? {', '.join(display)}",
                correct_answer=str(correct),
                distractors=[str(d) for d in distractors],
                hint=f"The numbers go up by {step} each time",
                points=10,
            ))
        return items

    def _factor_items(self, grade: int, count: int, difficulty: str) -> list[GameItem]:
        items = []
        max_n = {"very_easy": 12, "easy": 20, "medium": 36, "hard": 50, "very_hard": 100}
        max_num = max_n.get(difficulty, 36)

        for _ in range(count):
            n = random.randint(4, max_num)
            factors = [i for i in range(1, n + 1) if n % i == 0]
            if len(factors) >= 2:
                # "Is X a factor of N?"
                test = random.choice([random.choice(factors), random.randint(2, n)])
                is_factor = test in factors
                correct = "Yes" if is_factor else "No"

                items.append(GameItem(
                    prompt=f"Is {test} a factor of {n}?",
                    correct_answer=correct,
                    distractors=["No" if is_factor else "Yes", "Maybe", f"Only if {n} is even"],
                    hint=f"A factor divides the number evenly with no remainder",
                    points=10,
                ))
        return items

    # ─── Helpers ──────────────────────────────────────────────────────────────

    @staticmethod
    def _numeric_distractors(correct: int, min_val: int = 0, count: int = 3) -> list[int]:
        """Generate plausible wrong answers near the correct value."""
        distractors = set()
        offsets = [-2, -1, 1, 2, 3, -3, 5, -5, 10, -10]
        random.shuffle(offsets)
        for offset in offsets:
            d = correct + offset
            if d != correct and d >= min_val:
                distractors.add(d)
            if len(distractors) >= count:
                break
        # Pad if needed
        while len(distractors) < count:
            d = random.randint(max(min_val, correct - 20), correct + 20)
            if d != correct:
                distractors.add(d)
        return list(distractors)[:count]
