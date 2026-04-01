"""NCERT curriculum data for Classes I-VII."""

NCERT_CURRICULUM: list[dict] = [
    {
        "board": "ncert",
        "grade": "Class I",
        "grade_numeric": 1,
        "subjects": [
            {
                "name": "Mathematics",
                "code": "MATH",
                "units": [
                    {
                        "name": "Numbers",
                        "order": 1,
                        "topics": [
                            {
                                "name": "Counting 1-100",
                                "order": 1,
                                "learning_outcomes": [
                                    {"code": "M1.1.1", "description": "Count objects up to 100", "keywords": ["counting", "numbers"], "blooms_level": "remember"},
                                    {"code": "M1.1.2", "description": "Read and write numerals up to 100", "keywords": ["numerals", "writing"], "blooms_level": "understand"},
                                ]
                            },
                            {
                                "name": "Addition up to 20",
                                "order": 2,
                                "learning_outcomes": [
                                    {"code": "M1.1.3", "description": "Add two single-digit numbers", "keywords": ["addition", "sum"], "blooms_level": "apply"},
                                ]
                            },
                            {
                                "name": "Subtraction up to 20",
                                "order": 3,
                                "learning_outcomes": [
                                    {"code": "M1.1.4", "description": "Subtract single-digit numbers", "keywords": ["subtraction", "minus"], "blooms_level": "apply"},
                                ]
                            },
                        ]
                    },
                    {
                        "name": "Shapes and Space",
                        "order": 2,
                        "topics": [
                            {"name": "Basic Shapes", "order": 1, "learning_outcomes": [
                                {"code": "M1.2.1", "description": "Identify circle, square, triangle, rectangle", "keywords": ["shapes", "geometry"], "blooms_level": "remember"}
                            ]},
                        ]
                    },
                    {
                        "name": "Measurement",
                        "order": 3,
                        "topics": [
                            {"name": "Comparing Lengths", "order": 1, "learning_outcomes": [
                                {"code": "M1.3.1", "description": "Compare lengths using longer/shorter", "keywords": ["length", "compare"], "blooms_level": "understand"}
                            ]},
                        ]
                    },
                ]
            },
            {
                "name": "English",
                "code": "ENG",
                "units": [
                    {
                        "name": "Alphabet and Phonics",
                        "order": 1,
                        "topics": [
                            {"name": "Alphabet Recognition", "order": 1, "learning_outcomes": [
                                {"code": "E1.1.1", "description": "Identify and name all 26 letters", "keywords": ["alphabet", "letters"], "blooms_level": "remember"}
                            ]},
                            {"name": "Phonics Basics", "order": 2, "learning_outcomes": [
                                {"code": "E1.1.2", "description": "Associate letters with their sounds", "keywords": ["phonics", "sounds"], "blooms_level": "understand"}
                            ]},
                            {"name": "CVC Words", "order": 3, "learning_outcomes": [
                                {"code": "E1.1.3", "description": "Read three-letter CVC words", "keywords": ["cvc", "reading", "words"], "blooms_level": "apply"}
                            ]},
                        ]
                    },
                    {
                        "name": "Sight Words",
                        "order": 2,
                        "topics": [
                            {"name": "Common Sight Words", "order": 1, "learning_outcomes": [
                                {"code": "E1.2.1", "description": "Recognize and read 20 common sight words", "keywords": ["sight words", "reading"], "blooms_level": "remember"}
                            ]},
                        ]
                    },
                ]
            },
            {
                "name": "EVS",
                "code": "EVS",
                "units": [
                    {
                        "name": "My Body",
                        "order": 1,
                        "topics": [
                            {"name": "Body Parts", "order": 1, "learning_outcomes": [
                                {"code": "V1.1.1", "description": "Name major body parts and their functions", "keywords": ["body", "parts"], "blooms_level": "remember"}
                            ]},
                            {"name": "Five Senses", "order": 2, "learning_outcomes": [
                                {"code": "V1.1.2", "description": "Identify the five senses and their organs", "keywords": ["senses", "organs"], "blooms_level": "understand"}
                            ]},
                        ]
                    },
                    {
                        "name": "My Family and Friends",
                        "order": 2,
                        "topics": [
                            {"name": "Family Members", "order": 1, "learning_outcomes": [
                                {"code": "V1.2.1", "description": "Identify family relationships", "keywords": ["family", "relationships"], "blooms_level": "understand"}
                            ]},
                        ]
                    },
                ]
            },
        ]
    },
    {
        "board": "ncert",
        "grade": "Class II",
        "grade_numeric": 2,
        "subjects": [
            {
                "name": "Mathematics",
                "code": "MATH",
                "units": [
                    {"name": "Numbers up to 200", "order": 1, "topics": [
                        {"name": "Place Value", "order": 1, "learning_outcomes": [
                            {"code": "M2.1.1", "description": "Understand tens and ones place value", "keywords": ["place value", "tens", "ones"], "blooms_level": "understand"}
                        ]},
                        {"name": "Addition with carry", "order": 2, "learning_outcomes": [
                            {"code": "M2.1.2", "description": "Add two-digit numbers with regrouping", "keywords": ["addition", "carry", "regrouping"], "blooms_level": "apply"}
                        ]},
                        {"name": "Subtraction with borrow", "order": 3, "learning_outcomes": [
                            {"code": "M2.1.3", "description": "Subtract two-digit numbers with borrowing", "keywords": ["subtraction", "borrow"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Multiplication Introduction", "order": 2, "topics": [
                        {"name": "Skip Counting", "order": 1, "learning_outcomes": [
                            {"code": "M2.2.1", "description": "Skip count by 2s, 5s, 10s", "keywords": ["skip counting", "patterns"], "blooms_level": "apply"}
                        ]},
                        {"name": "Multiplication as Repeated Addition", "order": 2, "learning_outcomes": [
                            {"code": "M2.2.2", "description": "Understand multiplication as groups of equal size", "keywords": ["multiplication", "groups", "repeated addition"], "blooms_level": "understand"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "English",
                "code": "ENG",
                "units": [
                    {"name": "Reading and Comprehension", "order": 1, "topics": [
                        {"name": "Simple Sentences", "order": 1, "learning_outcomes": [
                            {"code": "E2.1.1", "description": "Read and understand simple sentences", "keywords": ["reading", "sentences"], "blooms_level": "understand"}
                        ]},
                        {"name": "Nouns and Verbs", "order": 2, "learning_outcomes": [
                            {"code": "E2.1.2", "description": "Identify nouns and action verbs in sentences", "keywords": ["nouns", "verbs", "grammar"], "blooms_level": "understand"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "EVS",
                "code": "EVS",
                "units": [
                    {"name": "Plants Around Us", "order": 1, "topics": [
                        {"name": "Parts of a Plant", "order": 1, "learning_outcomes": [
                            {"code": "V2.1.1", "description": "Identify root, stem, leaf, flower, fruit", "keywords": ["plant", "parts"], "blooms_level": "remember"}
                        ]},
                        {"name": "Uses of Plants", "order": 2, "learning_outcomes": [
                            {"code": "V2.1.2", "description": "Describe how plants provide food, shelter, medicine", "keywords": ["plants", "uses", "food"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Animals Around Us", "order": 2, "topics": [
                        {"name": "Animal Habitats", "order": 1, "learning_outcomes": [
                            {"code": "V2.2.1", "description": "Match animals to their homes", "keywords": ["animals", "habitats", "homes"], "blooms_level": "understand"}
                        ]},
                        {"name": "Animal Sounds", "order": 2, "learning_outcomes": [
                            {"code": "V2.2.2", "description": "Identify common animal sounds", "keywords": ["animals", "sounds"], "blooms_level": "remember"}
                        ]},
                    ]},
                ]
            },
        ]
    },
    {
        "board": "ncert",
        "grade": "Class III",
        "grade_numeric": 3,
        "subjects": [
            {
                "name": "Mathematics",
                "code": "MATH",
                "units": [
                    {"name": "Numbers up to 1000", "order": 1, "topics": [
                        {"name": "Three-digit Numbers", "order": 1, "learning_outcomes": [
                            {"code": "M3.1.1", "description": "Read, write and compare three-digit numbers", "keywords": ["three-digit", "numbers", "compare"], "blooms_level": "understand"}
                        ]},
                        {"name": "Addition and Subtraction", "order": 2, "learning_outcomes": [
                            {"code": "M3.1.2", "description": "Add and subtract three-digit numbers", "keywords": ["addition", "subtraction", "three-digit"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Multiplication Tables", "order": 2, "topics": [
                        {"name": "Tables 2 to 10", "order": 1, "learning_outcomes": [
                            {"code": "M3.2.1", "description": "Recall multiplication tables from 2 to 10", "keywords": ["multiplication", "tables", "times"], "blooms_level": "remember"}
                        ]},
                        {"name": "Division as Sharing", "order": 2, "learning_outcomes": [
                            {"code": "M3.2.2", "description": "Divide objects into equal groups", "keywords": ["division", "sharing", "equal groups"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Fractions", "order": 3, "topics": [
                        {"name": "Half and Quarter", "order": 1, "learning_outcomes": [
                            {"code": "M3.3.1", "description": "Identify half and quarter of a whole", "keywords": ["fractions", "half", "quarter"], "blooms_level": "understand"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "English",
                "code": "ENG",
                "units": [
                    {"name": "Grammar", "order": 1, "topics": [
                        {"name": "Singular and Plural", "order": 1, "learning_outcomes": [
                            {"code": "E3.1.1", "description": "Convert singular nouns to plural form", "keywords": ["singular", "plural", "nouns"], "blooms_level": "apply"}
                        ]},
                        {"name": "Adjectives", "order": 2, "learning_outcomes": [
                            {"code": "E3.1.2", "description": "Use adjectives to describe nouns", "keywords": ["adjectives", "describing words"], "blooms_level": "apply"}
                        ]},
                        {"name": "Antonyms", "order": 3, "learning_outcomes": [
                            {"code": "E3.1.3", "description": "Identify pairs of opposite words", "keywords": ["antonyms", "opposites"], "blooms_level": "remember"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "EVS",
                "code": "EVS",
                "units": [
                    {"name": "Food and Nutrition", "order": 1, "topics": [
                        {"name": "Food Groups", "order": 1, "learning_outcomes": [
                            {"code": "V3.1.1", "description": "Classify food into energy, body-building, protective groups", "keywords": ["food", "nutrition", "groups"], "blooms_level": "analyze"}
                        ]},
                        {"name": "Sources of Food", "order": 2, "learning_outcomes": [
                            {"code": "V3.1.2", "description": "Identify plant and animal food sources", "keywords": ["food", "sources", "plants", "animals"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Water", "order": 2, "topics": [
                        {"name": "Water Sources", "order": 1, "learning_outcomes": [
                            {"code": "V3.2.1", "description": "Name different sources of water", "keywords": ["water", "sources", "river", "well"], "blooms_level": "remember"}
                        ]},
                        {"name": "Water Cycle", "order": 2, "learning_outcomes": [
                            {"code": "V3.2.2", "description": "Describe the basic water cycle", "keywords": ["water cycle", "evaporation", "rain"], "blooms_level": "understand"}
                        ]},
                    ]},
                ]
            },
        ]
    },
    {
        "board": "ncert",
        "grade": "Class IV",
        "grade_numeric": 4,
        "subjects": [
            {
                "name": "Mathematics",
                "code": "MATH",
                "units": [
                    {"name": "Large Numbers", "order": 1, "topics": [
                        {"name": "Numbers up to 10000", "order": 1, "learning_outcomes": [
                            {"code": "M4.1.1", "description": "Read, write and compare four-digit numbers", "keywords": ["four-digit", "compare", "place value"], "blooms_level": "understand"}
                        ]},
                        {"name": "Multiplication by 2-digit", "order": 2, "learning_outcomes": [
                            {"code": "M4.1.2", "description": "Multiply two and three-digit numbers by a two-digit number", "keywords": ["multiplication", "two-digit"], "blooms_level": "apply"}
                        ]},
                        {"name": "Long Division", "order": 3, "learning_outcomes": [
                            {"code": "M4.1.3", "description": "Divide numbers using long division method", "keywords": ["division", "long division"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Fractions and Decimals", "order": 2, "topics": [
                        {"name": "Equivalent Fractions", "order": 1, "learning_outcomes": [
                            {"code": "M4.2.1", "description": "Find equivalent fractions and compare fractions", "keywords": ["fractions", "equivalent", "compare"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Geometry", "order": 3, "topics": [
                        {"name": "Angles", "order": 1, "learning_outcomes": [
                            {"code": "M4.3.1", "description": "Identify right angles, acute and obtuse angles", "keywords": ["angles", "right angle", "geometry"], "blooms_level": "understand"}
                        ]},
                        {"name": "Perimeter", "order": 2, "learning_outcomes": [
                            {"code": "M4.3.2", "description": "Calculate perimeter of simple shapes", "keywords": ["perimeter", "shapes"], "blooms_level": "apply"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "English",
                "code": "ENG",
                "units": [
                    {"name": "Grammar and Vocabulary", "order": 1, "topics": [
                        {"name": "Tenses", "order": 1, "learning_outcomes": [
                            {"code": "E4.1.1", "description": "Use simple present, past and future tenses", "keywords": ["tenses", "present", "past", "future"], "blooms_level": "apply"}
                        ]},
                        {"name": "Synonyms and Antonyms", "order": 2, "learning_outcomes": [
                            {"code": "E4.1.2", "description": "Match words with their synonyms and antonyms", "keywords": ["synonyms", "antonyms", "vocabulary"], "blooms_level": "understand"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "EVS",
                "code": "EVS",
                "units": [
                    {"name": "Community Helpers", "order": 1, "topics": [
                        {"name": "Helpers Around Us", "order": 1, "learning_outcomes": [
                            {"code": "V4.1.1", "description": "Identify community helpers and their roles", "keywords": ["community", "helpers", "professions"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Matter and Materials", "order": 2, "topics": [
                        {"name": "States of Matter", "order": 1, "learning_outcomes": [
                            {"code": "V4.2.1", "description": "Classify matter into solid, liquid and gas", "keywords": ["matter", "solid", "liquid", "gas"], "blooms_level": "understand"}
                        ]},
                    ]},
                ]
            },
        ]
    },
    {
        "board": "ncert",
        "grade": "Class V",
        "grade_numeric": 5,
        "subjects": [
            {
                "name": "Mathematics",
                "code": "MATH",
                "units": [
                    {"name": "Numbers to Lakhs", "order": 1, "topics": [
                        {"name": "Large Numbers and Place Value", "order": 1, "learning_outcomes": [
                            {"code": "M5.1.1", "description": "Read and write numbers up to 1,00,000 in Indian place value system", "keywords": ["lakhs", "place value", "indian system"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Fractions and Decimals", "order": 2, "topics": [
                        {"name": "Operations on Fractions", "order": 1, "learning_outcomes": [
                            {"code": "M5.2.1", "description": "Add and subtract fractions with unlike denominators", "keywords": ["fractions", "add", "subtract", "unlike denominators"], "blooms_level": "apply"}
                        ]},
                        {"name": "Decimals", "order": 2, "learning_outcomes": [
                            {"code": "M5.2.2", "description": "Convert fractions to decimals and compare", "keywords": ["decimals", "fractions", "convert"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Geometry and Measurement", "order": 3, "topics": [
                        {"name": "Area", "order": 1, "learning_outcomes": [
                            {"code": "M5.3.1", "description": "Calculate area of rectangles and squares", "keywords": ["area", "rectangle", "square"], "blooms_level": "apply"}
                        ]},
                        {"name": "Volume", "order": 2, "learning_outcomes": [
                            {"code": "M5.3.2", "description": "Understand the concept of volume using unit cubes", "keywords": ["volume", "cubes"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Percentages", "order": 4, "topics": [
                        {"name": "Introduction to Percentages", "order": 1, "learning_outcomes": [
                            {"code": "M5.4.1", "description": "Convert fractions and decimals to percentages", "keywords": ["percentage", "percent", "convert"], "blooms_level": "apply"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "Science",
                "code": "SCI",
                "units": [
                    {"name": "Human Body", "order": 1, "topics": [
                        {"name": "Organ Systems", "order": 1, "learning_outcomes": [
                            {"code": "S5.1.1", "description": "Name major organ systems and their functions", "keywords": ["organs", "body", "systems"], "blooms_level": "remember"}
                        ]},
                    ]},
                    {"name": "Simple Machines", "order": 2, "topics": [
                        {"name": "Types of Simple Machines", "order": 1, "learning_outcomes": [
                            {"code": "S5.2.1", "description": "Identify 6 types of simple machines and give examples", "keywords": ["simple machines", "lever", "pulley", "wheel"], "blooms_level": "understand"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "English",
                "code": "ENG",
                "units": [
                    {"name": "Advanced Grammar", "order": 1, "topics": [
                        {"name": "Parts of Speech", "order": 1, "learning_outcomes": [
                            {"code": "E5.1.1", "description": "Identify and use all eight parts of speech", "keywords": ["parts of speech", "grammar"], "blooms_level": "apply"}
                        ]},
                        {"name": "Comprehension", "order": 2, "learning_outcomes": [
                            {"code": "E5.1.2", "description": "Read passages and answer inferential questions", "keywords": ["comprehension", "reading", "inference"], "blooms_level": "analyze"}
                        ]},
                    ]},
                ]
            },
        ]
    },
    {
        "board": "ncert",
        "grade": "Class VI",
        "grade_numeric": 6,
        "subjects": [
            {
                "name": "Mathematics",
                "code": "MATH",
                "units": [
                    {"name": "Number System", "order": 1, "topics": [
                        {"name": "Knowing Our Numbers", "order": 1, "learning_outcomes": [
                            {"code": "M6.1.1", "description": "Work with numbers up to crores, estimate sums and differences", "keywords": ["crores", "estimation", "large numbers"], "blooms_level": "apply"}
                        ]},
                        {"name": "Whole Numbers", "order": 2, "learning_outcomes": [
                            {"code": "M6.1.2", "description": "Properties of whole numbers including successor and predecessor", "keywords": ["whole numbers", "properties"], "blooms_level": "understand"}
                        ]},
                        {"name": "Negative Numbers and Integers", "order": 3, "learning_outcomes": [
                            {"code": "M6.1.3", "description": "Understand integers and represent on number line", "keywords": ["integers", "negative", "number line"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Algebra", "order": 2, "topics": [
                        {"name": "Introduction to Algebra", "order": 1, "learning_outcomes": [
                            {"code": "M6.2.1", "description": "Use variables and form simple algebraic expressions", "keywords": ["algebra", "variables", "expressions"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Ratio and Proportion", "order": 3, "topics": [
                        {"name": "Ratios", "order": 1, "learning_outcomes": [
                            {"code": "M6.3.1", "description": "Express ratios and find equivalent ratios", "keywords": ["ratio", "proportion"], "blooms_level": "apply"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "Science",
                "code": "SCI",
                "units": [
                    {"name": "Materials", "order": 1, "topics": [
                        {"name": "Sorting Materials", "order": 1, "learning_outcomes": [
                            {"code": "S6.1.1", "description": "Group materials by properties: transparency, hardness, solubility", "keywords": ["materials", "properties", "sorting"], "blooms_level": "analyze"}
                        ]},
                        {"name": "Separation of Substances", "order": 2, "learning_outcomes": [
                            {"code": "S6.1.2", "description": "Use handpicking, sieving, filtration, evaporation, decantation", "keywords": ["separation", "filtration", "evaporation"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Living World", "order": 2, "topics": [
                        {"name": "Getting to Know Plants", "order": 1, "learning_outcomes": [
                            {"code": "S6.2.1", "description": "Classify plants as herbs, shrubs and trees; identify parts", "keywords": ["plants", "classification", "herbs", "shrubs"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Electricity and Circuits", "order": 3, "topics": [
                        {"name": "Electric Circuits", "order": 1, "learning_outcomes": [
                            {"code": "S6.3.1", "description": "Build simple circuits and identify conductors/insulators", "keywords": ["circuits", "conductors", "insulators", "electricity"], "blooms_level": "apply"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "English",
                "code": "ENG",
                "units": [
                    {"name": "Language Skills", "order": 1, "topics": [
                        {"name": "Active and Passive Voice", "order": 1, "learning_outcomes": [
                            {"code": "E6.1.1", "description": "Convert sentences between active and passive voice", "keywords": ["active", "passive", "voice"], "blooms_level": "apply"}
                        ]},
                        {"name": "Direct and Indirect Speech", "order": 2, "learning_outcomes": [
                            {"code": "E6.1.2", "description": "Convert direct speech to indirect and vice versa", "keywords": ["direct speech", "indirect speech", "reported"], "blooms_level": "apply"}
                        ]},
                    ]},
                ]
            },
        ]
    },
    {
        "board": "ncert",
        "grade": "Class VII",
        "grade_numeric": 7,
        "subjects": [
            {
                "name": "Mathematics",
                "code": "MATH",
                "units": [
                    {"name": "Numbers", "order": 1, "topics": [
                        {"name": "Integers", "order": 1, "learning_outcomes": [
                            {"code": "M7.1.1", "description": "Perform operations on integers including multiplication and division", "keywords": ["integers", "operations", "multiply", "divide"], "blooms_level": "apply"}
                        ]},
                        {"name": "Fractions and Decimals", "order": 2, "learning_outcomes": [
                            {"code": "M7.1.2", "description": "Multiply and divide fractions and decimals", "keywords": ["fractions", "decimals", "multiply", "divide"], "blooms_level": "apply"}
                        ]},
                        {"name": "Rational Numbers", "order": 3, "learning_outcomes": [
                            {"code": "M7.1.3", "description": "Understand rational numbers and represent on number line", "keywords": ["rational", "numbers", "number line"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Algebra", "order": 2, "topics": [
                        {"name": "Simple Equations", "order": 1, "learning_outcomes": [
                            {"code": "M7.2.1", "description": "Solve simple linear equations", "keywords": ["equations", "algebra", "solve"], "blooms_level": "apply"}
                        ]},
                        {"name": "Exponents and Powers", "order": 2, "learning_outcomes": [
                            {"code": "M7.2.2", "description": "Understand exponents and apply laws of exponents", "keywords": ["exponents", "powers", "laws"], "blooms_level": "apply"}
                        ]},
                    ]},
                    {"name": "Data Handling", "order": 3, "topics": [
                        {"name": "Mean, Median, Mode", "order": 1, "learning_outcomes": [
                            {"code": "M7.3.1", "description": "Calculate mean, median and mode of data sets", "keywords": ["mean", "median", "mode", "statistics"], "blooms_level": "apply"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "Science",
                "code": "SCI",
                "units": [
                    {"name": "Chemistry", "order": 1, "topics": [
                        {"name": "Acids, Bases and Salts", "order": 1, "learning_outcomes": [
                            {"code": "S7.1.1", "description": "Classify substances as acids, bases or neutral using indicators", "keywords": ["acids", "bases", "salts", "indicators"], "blooms_level": "analyze"}
                        ]},
                    ]},
                    {"name": "Physics", "order": 2, "topics": [
                        {"name": "Heat and Temperature", "order": 1, "learning_outcomes": [
                            {"code": "S7.2.1", "description": "Distinguish between heat and temperature; modes of heat transfer", "keywords": ["heat", "temperature", "conduction", "convection", "radiation"], "blooms_level": "understand"}
                        ]},
                        {"name": "Light", "order": 2, "learning_outcomes": [
                            {"code": "S7.2.2", "description": "Understand reflection, refraction and dispersion of light", "keywords": ["light", "reflection", "refraction"], "blooms_level": "understand"}
                        ]},
                    ]},
                    {"name": "Biology", "order": 3, "topics": [
                        {"name": "Nutrition in Plants and Animals", "order": 1, "learning_outcomes": [
                            {"code": "S7.3.1", "description": "Compare autotrophic and heterotrophic nutrition", "keywords": ["nutrition", "photosynthesis", "autotrophic", "heterotrophic"], "blooms_level": "analyze"}
                        ]},
                    ]},
                ]
            },
            {
                "name": "English",
                "code": "ENG",
                "units": [
                    {"name": "Advanced Language", "order": 1, "topics": [
                        {"name": "Clauses and Phrases", "order": 1, "learning_outcomes": [
                            {"code": "E7.1.1", "description": "Identify and use main and subordinate clauses", "keywords": ["clauses", "phrases", "subordinate"], "blooms_level": "analyze"}
                        ]},
                        {"name": "Spelling and Vocabulary", "order": 2, "learning_outcomes": [
                            {"code": "E7.1.2", "description": "Use context clues to determine word meanings", "keywords": ["vocabulary", "context clues", "spelling"], "blooms_level": "analyze"}
                        ]},
                    ]},
                ]
            },
        ]
    },
]

# Topic prerequisites map (topic -> list of prerequisite topics)
TOPIC_PREREQUISITES: dict[str, list[str]] = {
    "Addition up to 20": ["Counting 1-100"],
    "Subtraction up to 20": ["Counting 1-100"],
    "Place Value": ["Counting 1-100"],
    "Addition with carry": ["Addition up to 20", "Place Value"],
    "Subtraction with borrow": ["Subtraction up to 20", "Place Value"],
    "Skip Counting": ["Counting 1-100"],
    "Multiplication as Repeated Addition": ["Skip Counting", "Addition up to 20"],
    "Three-digit Numbers": ["Place Value"],
    "Addition and Subtraction": ["Addition with carry", "Subtraction with borrow"],
    "Tables 2 to 10": ["Multiplication as Repeated Addition"],
    "Division as Sharing": ["Tables 2 to 10"],
    "Half and Quarter": ["Division as Sharing"],
    "Numbers up to 10000": ["Three-digit Numbers"],
    "Multiplication by 2-digit": ["Tables 2 to 10"],
    "Long Division": ["Division as Sharing", "Multiplication by 2-digit"],
    "Equivalent Fractions": ["Half and Quarter"],
    "Angles": ["Basic Shapes"],
    "Perimeter": ["Addition and Subtraction", "Basic Shapes"],
    "Large Numbers and Place Value": ["Numbers up to 10000"],
    "Operations on Fractions": ["Equivalent Fractions"],
    "Decimals": ["Operations on Fractions"],
    "Area": ["Perimeter", "Multiplication by 2-digit"],
    "Volume": ["Area"],
    "Introduction to Percentages": ["Decimals"],
    "Knowing Our Numbers": ["Large Numbers and Place Value"],
    "Whole Numbers": ["Knowing Our Numbers"],
    "Negative Numbers and Integers": ["Whole Numbers"],
    "Introduction to Algebra": ["Whole Numbers"],
    "Ratios": ["Operations on Fractions"],
    "Integers": ["Negative Numbers and Integers"],
    "Fractions and Decimals": ["Operations on Fractions", "Decimals"],
    "Rational Numbers": ["Integers", "Fractions and Decimals"],
    "Simple Equations": ["Introduction to Algebra"],
    "Exponents and Powers": ["Tables 2 to 10"],
    "Mean, Median, Mode": ["Operations on Fractions"],
    "CVC Words": ["Phonics Basics"],
    "Common Sight Words": ["Alphabet Recognition"],
    "Simple Sentences": ["CVC Words", "Common Sight Words"],
    "Nouns and Verbs": ["Simple Sentences"],
    "Singular and Plural": ["Nouns and Verbs"],
    "Adjectives": ["Nouns and Verbs"],
    "Antonyms": ["Adjectives"],
    "Tenses": ["Singular and Plural"],
    "Synonyms and Antonyms": ["Antonyms"],
    "Parts of Speech": ["Tenses", "Adjectives"],
    "Comprehension": ["Parts of Speech"],
    "Active and Passive Voice": ["Tenses"],
    "Direct and Indirect Speech": ["Tenses"],
    "Clauses and Phrases": ["Active and Passive Voice"],
    "Spelling and Vocabulary": ["Synonyms and Antonyms"],
    "Five Senses": ["Body Parts"],
    "Uses of Plants": ["Parts of a Plant"],
    "Animal Habitats": ["Animal Sounds"],
    "Sources of Food": ["Food Groups"],
    "Water Cycle": ["Water Sources"],
    "States of Matter": ["Water Cycle"],
    "Sorting Materials": ["States of Matter"],
    "Separation of Substances": ["Sorting Materials"],
    "Electric Circuits": ["Sorting Materials"],
    "Acids, Bases and Salts": ["Separation of Substances"],
    "Nutrition in Plants and Animals": ["Getting to Know Plants"],
}
