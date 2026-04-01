"""
Language content generator (English & Hindi).
Generates items locally for:
- Phonics, letter recognition, CVC words
- Spelling patterns, sight words
- Grammar (nouns, verbs, tenses, singular/plural)
- Hindi varnamala, matra
Falls back to LLM for comprehension and creative tasks.
"""

import random
from app.schemas.game import GameItem
from app.services.content_generators.base import BaseContentGenerator


# ─── Word banks ───────────────────────────────────────────────────────────────

CVC_WORDS = ["cat", "dog", "pen", "red", "sit", "hop", "bug", "sun", "map", "fin",
             "bat", "cup", "hen", "pin", "run", "dot", "fan", "nut", "log", "pig"]

SIGHT_WORDS = ["the", "is", "a", "I", "my", "it", "and", "to", "we", "in",
               "he", "she", "was", "you", "are", "on", "at", "do", "can", "go"]

NOUNS = ["dog", "tree", "book", "house", "river", "teacher", "ball", "flower", "train", "cloud",
         "market", "village", "school", "bird", "mountain", "garden", "table", "kitchen", "friend", "doctor"]

VERBS = ["run", "eat", "read", "play", "sing", "jump", "write", "sleep", "cook", "dance",
         "swim", "draw", "climb", "think", "laugh", "cry", "walk", "fly", "open", "close"]

ADJECTIVES = ["big", "small", "red", "happy", "tall", "fast", "bright", "cold", "soft", "loud",
              "sweet", "round", "young", "clean", "dark", "heavy", "quiet", "sharp", "wide", "dry"]

ANTONYMS = [
    ("big", "small"), ("hot", "cold"), ("fast", "slow"), ("happy", "sad"),
    ("tall", "short"), ("light", "dark"), ("open", "close"), ("up", "down"),
    ("hard", "soft"), ("clean", "dirty"), ("loud", "quiet"), ("new", "old"),
    ("thick", "thin"), ("long", "short"), ("wet", "dry"), ("full", "empty"),
]

SINGULAR_PLURAL = [
    ("cat", "cats"), ("box", "boxes"), ("baby", "babies"), ("leaf", "leaves"),
    ("bus", "buses"), ("child", "children"), ("tooth", "teeth"), ("mouse", "mice"),
    ("man", "men"), ("city", "cities"), ("fly", "flies"), ("dish", "dishes"),
    ("key", "keys"), ("wolf", "wolves"), ("tomato", "tomatoes"), ("story", "stories"),
]

HINDI_SWAR = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ"]
HINDI_SWAR_WORDS = ["अनार", "आम", "इमली", "ईख", "उल्लू", "ऊन", "एक", "ऐनक", "ओखली", "औरत"]

HINDI_VYANJAN = ["क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ",
                 "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ",
                 "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"]
HINDI_VYANJAN_WORDS = ["कमल", "खरगोश", "गमला", "घर", "चम्मच", "छतरी", "जहाज़", "झंडा", "टमाटर", "ठेला",
                       "डमरू", "ढोल", "तरबूज़", "थैला", "दवात", "धनुष", "नल", "पतंग", "फल",
                       "बकरी", "भालू", "मछली", "यज्ञ", "रथ", "लट्टू", "वन", "शेर", "सेब", "हाथी"]

RHYMING_GROUPS = [
    ["cat", "bat", "hat", "mat", "rat"],
    ["dog", "log", "fog", "hog", "jog"],
    ["pen", "hen", "ten", "den", "men"],
    ["cake", "lake", "make", "bake", "rake"],
    ["ball", "tall", "wall", "call", "fall"],
    ["ring", "sing", "king", "wing", "bring"],
]


class LanguageContentGenerator(BaseContentGenerator):

    LOCAL_TOPICS = {
        "phonics", "letter", "alphabet", "CVC", "sight words",
        "noun", "verb", "adjective", "grammar", "spelling",
        "singular", "plural", "opposite", "antonym", "rhyming",
        "varnamala", "swar", "vyanjan", "matra", "hindi letter",
        "tense", "past", "present", "future",
    }

    def can_generate_locally(self, topic: str, grade_numeric: int) -> bool:
        topic_lower = topic.lower()
        return any(kw in topic_lower for kw in self.LOCAL_TOPICS)

    def generate_items(self, topic: str, grade_numeric: int, count: int, difficulty: str) -> list[GameItem]:
        topic_lower = topic.lower()

        if "varnamala" in topic_lower or "swar" in topic_lower:
            return self._hindi_swar_items(count)
        elif "vyanjan" in topic_lower:
            return self._hindi_vyanjan_items(count)
        elif "cvc" in topic_lower or ("phonics" in topic_lower and grade_numeric <= 1):
            return self._cvc_items(count)
        elif "sight" in topic_lower:
            return self._sight_word_items(count)
        elif "noun" in topic_lower:
            return self._noun_items(count)
        elif "verb" in topic_lower:
            return self._verb_items(count)
        elif "adjective" in topic_lower:
            return self._adjective_items(count)
        elif "singular" in topic_lower or "plural" in topic_lower:
            return self._singular_plural_items(count)
        elif "opposite" in topic_lower or "antonym" in topic_lower:
            return self._antonym_items(count)
        elif "rhym" in topic_lower:
            return self._rhyming_items(count)
        elif "spelling" in topic_lower:
            return self._spelling_items(count)
        else:
            return self._noun_items(count)

    def get_domain_prompt_context(self, topic: str, grade_numeric: int) -> str:
        if grade_numeric <= 0:
            return "Focus on phonics, letter recognition, CVC words, sight words. Use simple 3-4 letter words. Include picture associations."
        elif grade_numeric <= 2:
            return "Blends, digraphs, sight words, nouns/verbs, singular/plural, opposites. Sentences of 5-8 words."
        elif grade_numeric <= 4:
            return "Parts of speech, tenses, sentence types, spelling patterns. Reading comprehension of short passages."
        else:
            return "Advanced grammar, tenses (past/present/future), pronouns, prepositions, reading comprehension, creative writing prompts."

    # ─── English generators ───────────────────────────────────────────────────

    def _cvc_items(self, count: int) -> list[GameItem]:
        items = []
        words = random.sample(CVC_WORDS, min(count, len(CVC_WORDS)))
        for word in words:
            # Scramble letters
            letters = list(word)
            scrambled = letters[:]
            random.shuffle(scrambled)
            while scrambled == letters:
                random.shuffle(scrambled)

            items.append(GameItem(
                prompt=f"Unscramble: {' '.join(scrambled).upper()}",
                correct_answer=word,
                distractors=random.sample([w for w in CVC_WORDS if w != word], 3),
                hint=f"It starts with '{word[0].upper()}'",
                points=10,
            ))
        return items

    def _sight_word_items(self, count: int) -> list[GameItem]:
        items = []
        words = random.sample(SIGHT_WORDS, min(count, len(SIGHT_WORDS)))
        for word in words:
            others = [w for w in SIGHT_WORDS if w != word]
            items.append(GameItem(
                prompt=f"Find the word: {word.upper()}",
                correct_answer=word,
                distractors=random.sample(others, 3),
                hint=f"This word has {len(word)} letters",
                points=10,
            ))
        return items

    def _noun_items(self, count: int) -> list[GameItem]:
        items = []
        for _ in range(count):
            noun = random.choice(NOUNS)
            verb = random.choice(VERBS)
            adj = random.choice(ADJECTIVES)
            items.append(GameItem(
                prompt=f"Which is a naming word (noun)? {noun}, {verb}, {adj}",
                correct_answer=noun,
                distractors=[verb, adj, random.choice(["quickly", "very", "always"])],
                hint="A noun is a person, place, animal, or thing",
                points=10,
            ))
        return items

    def _verb_items(self, count: int) -> list[GameItem]:
        items = []
        for _ in range(count):
            verb = random.choice(VERBS)
            noun = random.choice(NOUNS)
            adj = random.choice(ADJECTIVES)
            items.append(GameItem(
                prompt=f"Which is an action word (verb)? {verb}, {noun}, {adj}",
                correct_answer=verb,
                distractors=[noun, adj, random.choice(["slowly", "under", "between"])],
                hint="A verb is something you can DO",
                points=10,
            ))
        return items

    def _adjective_items(self, count: int) -> list[GameItem]:
        items = []
        for _ in range(count):
            adj = random.choice(ADJECTIVES)
            noun = random.choice(NOUNS)
            verb = random.choice(VERBS)
            items.append(GameItem(
                prompt=f"Which is a describing word (adjective)? {noun}, {adj}, {verb}",
                correct_answer=adj,
                distractors=[noun, verb, random.choice(["and", "but", "the"])],
                hint="An adjective describes how something looks, feels, or sounds",
                points=10,
            ))
        return items

    def _singular_plural_items(self, count: int) -> list[GameItem]:
        items = []
        pairs = random.sample(SINGULAR_PLURAL, min(count, len(SINGULAR_PLURAL)))
        for singular, plural in pairs:
            wrong = [p[1] for p in SINGULAR_PLURAL if p[1] != plural]
            items.append(GameItem(
                prompt=f"What is the plural of '{singular}'?",
                correct_answer=plural,
                distractors=random.sample(wrong, min(3, len(wrong))),
                hint=f"One {singular}, many ___",
                points=10,
            ))
        return items

    def _antonym_items(self, count: int) -> list[GameItem]:
        items = []
        pairs = random.sample(ANTONYMS, min(count, len(ANTONYMS)))
        for word, opposite in pairs:
            wrong_opposites = [p[1] for p in ANTONYMS if p[1] != opposite]
            items.append(GameItem(
                prompt=f"What is the opposite of '{word}'?",
                correct_answer=opposite,
                distractors=random.sample(wrong_opposites, min(3, len(wrong_opposites))),
                hint=f"Think of what is completely different from '{word}'",
                points=10,
            ))
        return items

    def _rhyming_items(self, count: int) -> list[GameItem]:
        items = []
        for _ in range(count):
            group = random.choice(RHYMING_GROUPS)
            target = random.choice(group)
            match = random.choice([w for w in group if w != target])
            non_rhymes = random.sample([w for g in RHYMING_GROUPS if g != group for w in g], 3)

            items.append(GameItem(
                prompt=f"Which word rhymes with '{target}'?",
                correct_answer=match,
                distractors=non_rhymes,
                hint=f"It sounds like '{target}' at the end",
                points=10,
            ))
        return items

    def _spelling_items(self, count: int) -> list[GameItem]:
        words = ["school", "friend", "because", "beautiful", "together", "different",
                 "thought", "through", "enough", "caught", "brought", "sometimes"]
        items = []
        selected = random.sample(words, min(count, len(words)))
        for word in selected:
            # Create misspellings
            misspellings = []
            chars = list(word)
            for _ in range(3):
                m = chars[:]
                idx = random.randint(0, len(m) - 1)
                m[idx] = random.choice("abcdefghijklmnopqrstuvwxyz")
                misspellings.append("".join(m))

            items.append(GameItem(
                prompt=f"Which spelling is correct?",
                correct_answer=word,
                distractors=misspellings[:3],
                hint=f"The word starts with '{word[:2]}'",
                points=10,
            ))
        return items

    # ─── Hindi generators ─────────────────────────────────────────────────────

    def _hindi_swar_items(self, count: int) -> list[GameItem]:
        items = []
        indices = random.sample(range(len(HINDI_SWAR)), min(count, len(HINDI_SWAR)))
        for i in indices:
            swar = HINDI_SWAR[i]
            word = HINDI_SWAR_WORDS[i] if i < len(HINDI_SWAR_WORDS) else ""
            others = [s for s in HINDI_SWAR if s != swar]

            items.append(GameItem(
                prompt=f"'{word}' शब्द किस स्वर से शुरू होता है?" if word else f"इस स्वर को पहचानो: {swar}",
                correct_answer=swar,
                distractors=random.sample(others, 3),
                hint=f"ध्यान से देखो — '{word}' का पहला अक्षर" if word else "यह एक स्वर है",
                points=10,
            ))
        return items

    def _hindi_vyanjan_items(self, count: int) -> list[GameItem]:
        items = []
        indices = random.sample(range(min(len(HINDI_VYANJAN), len(HINDI_VYANJAN_WORDS))), min(count, len(HINDI_VYANJAN_WORDS)))
        for i in indices:
            vyanjan = HINDI_VYANJAN[i]
            word = HINDI_VYANJAN_WORDS[i]
            others = [v for v in HINDI_VYANJAN if v != vyanjan]

            items.append(GameItem(
                prompt=f"'{word}' शब्द किस व्यंजन से शुरू होता है?",
                correct_answer=vyanjan,
                distractors=random.sample(others, 3),
                hint=f"'{word}' बोलो — पहली ध्वनि क्या है?",
                points=10,
            ))
        return items
