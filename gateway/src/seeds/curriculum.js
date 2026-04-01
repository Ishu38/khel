/**
 * NCERT Curriculum Seed Data — Pre-Nursery through Class VII
 * Mapped to NCF 2023 / NCERT learning outcomes.
 * Structure: Board → Grade → Subject → Unit → Topic → Learning Outcomes (with Bloom's taxonomy)
 */

const curriculumData = [
  // ─── PRE-NURSERY (Age 3-4) ─────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Pre-Nursery',
    gradeNumeric: 0,
    language: 'en',
    subjects: [
      {
        name: 'Early Literacy',
        code: 'EL-PN',
        units: [
          {
            name: 'Letter Recognition',
            order: 1,
            topics: [
              {
                name: 'English Alphabet (A-Z)',
                order: 1,
                learningOutcomes: [
                  { code: 'EL-PN-1.1', description: 'Recognizes and names uppercase letters A-Z', keywords: ['alphabet', 'letters', 'uppercase'], bloomsLevel: 'remember' },
                  { code: 'EL-PN-1.2', description: 'Associates letters with their sounds (phonics)', keywords: ['phonics', 'letter sounds'], bloomsLevel: 'understand' },
                  { code: 'EL-PN-1.3', description: 'Matches uppercase to lowercase letters', keywords: ['matching', 'uppercase', 'lowercase'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Hindi Varnamala',
                order: 2,
                learningOutcomes: [
                  { code: 'EL-PN-2.1', description: 'Recognizes Hindi swar (vowels) — अ to औ', keywords: ['hindi', 'varnamala', 'swar', 'vowels'], bloomsLevel: 'remember' },
                  { code: 'EL-PN-2.2', description: 'Recognizes Hindi vyanjan (consonants) — क to ज्ञ', keywords: ['hindi', 'varnamala', 'vyanjan', 'consonants'], bloomsLevel: 'remember' },
                  { code: 'EL-PN-2.3', description: 'Associates Hindi letters with pictures of objects starting with that letter', keywords: ['hindi', 'picture association'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Pre-Writing Skills',
            order: 2,
            topics: [
              {
                name: 'Tracing and Patterns',
                order: 1,
                learningOutcomes: [
                  { code: 'EL-PN-3.1', description: 'Traces straight lines, curves, and zig-zag patterns', keywords: ['tracing', 'patterns', 'pre-writing'], bloomsLevel: 'apply' },
                  { code: 'EL-PN-3.2', description: 'Traces letter shapes with finger and crayon', keywords: ['tracing', 'letters', 'motor skills'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Early Numeracy',
        code: 'EN-PN',
        units: [
          {
            name: 'Numbers 1-10',
            order: 1,
            topics: [
              {
                name: 'Counting and Recognition',
                order: 1,
                learningOutcomes: [
                  { code: 'EN-PN-1.1', description: 'Counts objects from 1 to 10', keywords: ['counting', 'numbers', '1-10'], bloomsLevel: 'remember' },
                  { code: 'EN-PN-1.2', description: 'Recognizes and names numerals 1-10', keywords: ['numeral recognition', 'numbers'], bloomsLevel: 'remember' },
                  { code: 'EN-PN-1.3', description: 'Matches numerals to quantity of objects', keywords: ['number-quantity', 'matching', 'one-to-one'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Shapes and Colors',
            order: 2,
            topics: [
              {
                name: 'Basic Shapes',
                order: 1,
                learningOutcomes: [
                  { code: 'EN-PN-2.1', description: 'Identifies and names circle, square, triangle, rectangle', keywords: ['shapes', 'geometry', 'circle', 'square', 'triangle'], bloomsLevel: 'remember' },
                  { code: 'EN-PN-2.2', description: 'Sorts objects by shape', keywords: ['sorting', 'shapes', 'classification'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Colors',
                order: 2,
                learningOutcomes: [
                  { code: 'EN-PN-3.1', description: 'Identifies and names primary colors (red, blue, yellow)', keywords: ['colors', 'primary colors'], bloomsLevel: 'remember' },
                  { code: 'EN-PN-3.2', description: 'Sorts and groups objects by color', keywords: ['sorting', 'colors', 'grouping'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── NURSERY (Age 4-5) ─────────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Nursery',
    gradeNumeric: -1,
    language: 'en',
    subjects: [
      {
        name: 'English',
        code: 'ENG-NUR',
        units: [
          {
            name: 'Phonics & Reading Readiness',
            order: 1,
            topics: [
              {
                name: 'Phonemic Awareness',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-NUR-1.1', description: 'Identifies beginning sounds in words', keywords: ['phonics', 'beginning sounds', 'initial sounds'], bloomsLevel: 'understand' },
                  { code: 'ENG-NUR-1.2', description: 'Identifies rhyming words', keywords: ['rhyming', 'phonics', 'word families'], bloomsLevel: 'understand' },
                  { code: 'ENG-NUR-1.3', description: 'Blends two-letter sounds (CVC readiness)', keywords: ['blending', 'CVC', 'phonics'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Sight Words',
                order: 2,
                learningOutcomes: [
                  { code: 'ENG-NUR-2.1', description: 'Reads 10-15 common sight words (the, is, a, I, my, it, and, to, we, in)', keywords: ['sight words', 'reading', 'high frequency'], bloomsLevel: 'remember' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Mathematics',
        code: 'MATH-NUR',
        units: [
          {
            name: 'Numbers 1-20',
            order: 1,
            topics: [
              {
                name: 'Counting to 20',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-NUR-1.1', description: 'Counts objects from 1 to 20 in sequence', keywords: ['counting', 'numbers', '1-20'], bloomsLevel: 'remember' },
                  { code: 'MATH-NUR-1.2', description: 'Writes numerals 1-20', keywords: ['writing numbers', 'numerals'], bloomsLevel: 'apply' },
                  { code: 'MATH-NUR-1.3', description: 'Compares groups — more, less, equal', keywords: ['comparison', 'more', 'less', 'equal'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Patterns',
            order: 2,
            topics: [
              {
                name: 'Simple Patterns',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-NUR-2.1', description: 'Recognizes and extends AB and ABC patterns using colors, shapes, or objects', keywords: ['patterns', 'AB pattern', 'sequencing'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── KG (Age 5-6) ──────────────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'KG',
    gradeNumeric: 0,
    language: 'en',
    subjects: [
      {
        name: 'English',
        code: 'ENG-KG',
        units: [
          {
            name: 'Reading Foundations',
            order: 1,
            topics: [
              {
                name: 'CVC Words',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-KG-1.1', description: 'Reads three-letter CVC words (cat, dog, pen, red, sit)', keywords: ['CVC', 'reading', 'phonics', 'decoding'], bloomsLevel: 'apply' },
                  { code: 'ENG-KG-1.2', description: 'Writes simple CVC words from dictation', keywords: ['spelling', 'CVC', 'writing'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Simple Sentences',
                order: 2,
                learningOutcomes: [
                  { code: 'ENG-KG-2.1', description: 'Reads simple 3-4 word sentences', keywords: ['reading', 'sentences', 'comprehension'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Mathematics',
        code: 'MATH-KG',
        units: [
          {
            name: 'Numbers to 50',
            order: 1,
            topics: [
              {
                name: 'Counting and Number Names',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-KG-1.1', description: 'Counts objects from 1 to 50', keywords: ['counting', 'numbers', '1-50'], bloomsLevel: 'remember' },
                  { code: 'MATH-KG-1.2', description: 'Reads and writes number names one to ten', keywords: ['number names', 'writing'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Addition Readiness',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-KG-2.1', description: 'Adds two groups of objects (total up to 10) using concrete materials', keywords: ['addition', 'concrete', 'combining'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'EVS',
        code: 'EVS-KG',
        units: [
          {
            name: 'My World',
            order: 1,
            topics: [
              {
                name: 'My Body',
                order: 1,
                learningOutcomes: [
                  { code: 'EVS-KG-1.1', description: 'Names major body parts (head, eyes, ears, nose, hands, legs)', keywords: ['body parts', 'human body'], bloomsLevel: 'remember' },
                  { code: 'EVS-KG-1.2', description: 'Identifies five senses and their associated organs', keywords: ['five senses', 'sense organs'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Animals Around Us',
                order: 2,
                learningOutcomes: [
                  { code: 'EVS-KG-2.1', description: 'Identifies and names common domestic and wild animals', keywords: ['animals', 'domestic', 'wild'], bloomsLevel: 'remember' },
                  { code: 'EVS-KG-2.2', description: 'Matches animals to their sounds and habitats', keywords: ['animal sounds', 'habitats', 'matching'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CLASS I (Age 6-7) ─────────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Class I',
    gradeNumeric: 1,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MATH-1',
        units: [
          {
            name: 'Numbers (Shapes in Maths / Maths Magic)',
            order: 1,
            topics: [
              {
                name: 'Numbers up to 100',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-1-1.1', description: 'Reads and writes numerals up to 100', keywords: ['numbers', 'numerals', '1-100'], bloomsLevel: 'remember' },
                  { code: 'MATH-1-1.2', description: 'Compares numbers using greater than, less than, equal to', keywords: ['comparison', 'greater than', 'less than'], bloomsLevel: 'understand' },
                  { code: 'MATH-1-1.3', description: 'Orders numbers in ascending and descending order', keywords: ['ordering', 'ascending', 'descending', 'sequencing'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Addition (up to 20)',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-1-2.1', description: 'Adds two single-digit numbers with sum up to 18', keywords: ['addition', 'single digit', 'sum'], bloomsLevel: 'apply' },
                  { code: 'MATH-1-2.2', description: 'Solves simple word problems involving addition', keywords: ['addition', 'word problems'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Subtraction (up to 20)',
                order: 3,
                learningOutcomes: [
                  { code: 'MATH-1-3.1', description: 'Subtracts single-digit numbers from numbers up to 18', keywords: ['subtraction', 'single digit', 'take away'], bloomsLevel: 'apply' },
                  { code: 'MATH-1-3.2', description: 'Solves simple word problems involving subtraction', keywords: ['subtraction', 'word problems'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Measurement',
            order: 2,
            topics: [
              {
                name: 'Length and Weight',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-1-4.1', description: 'Compares objects using longer/shorter, heavier/lighter', keywords: ['measurement', 'comparison', 'length', 'weight'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Time',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-1-5.1', description: 'Reads time on a clock (hour hand only)', keywords: ['time', 'clock', 'hour'], bloomsLevel: 'understand' },
                  { code: 'MATH-1-5.2', description: 'Sequences daily activities by time (morning, afternoon, night)', keywords: ['time', 'sequencing', 'daily routine'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Geometry',
            order: 3,
            topics: [
              {
                name: 'Shapes and Spatial Understanding',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-1-6.1', description: 'Identifies and names 2D shapes — circle, square, rectangle, triangle, oval', keywords: ['2D shapes', 'geometry', 'identification'], bloomsLevel: 'remember' },
                  { code: 'MATH-1-6.2', description: 'Identifies shapes in everyday objects', keywords: ['shapes', 'real world', 'observation'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'English',
        code: 'ENG-1',
        units: [
          {
            name: 'Reading',
            order: 1,
            topics: [
              {
                name: 'Blends and Digraphs',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-1-1.1', description: 'Reads words with initial blends (bl, cl, fl, gr, st, tr)', keywords: ['blends', 'phonics', 'reading'], bloomsLevel: 'apply' },
                  { code: 'ENG-1-1.2', description: 'Reads words with digraphs (sh, ch, th, wh)', keywords: ['digraphs', 'phonics', 'reading'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Reading Comprehension',
                order: 2,
                learningOutcomes: [
                  { code: 'ENG-1-2.1', description: 'Reads short passages (40-60 words) and answers who/what/where questions', keywords: ['comprehension', 'reading', 'questions'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Grammar',
            order: 2,
            topics: [
              {
                name: 'Nouns and Verbs',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-1-3.1', description: 'Identifies naming words (nouns) in simple sentences', keywords: ['nouns', 'grammar', 'naming words'], bloomsLevel: 'understand' },
                  { code: 'ENG-1-3.2', description: 'Identifies action words (verbs) in simple sentences', keywords: ['verbs', 'grammar', 'action words'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'EVS',
        code: 'EVS-1',
        units: [
          {
            name: 'Plants',
            order: 1,
            topics: [
              {
                name: 'Parts of a Plant',
                order: 1,
                learningOutcomes: [
                  { code: 'EVS-1-1.1', description: 'Identifies and names parts of a plant — root, stem, leaf, flower, fruit', keywords: ['plants', 'parts', 'root', 'stem', 'leaf'], bloomsLevel: 'remember' },
                  { code: 'EVS-1-1.2', description: 'Describes what plants need to grow (sunlight, water, air, soil)', keywords: ['plant needs', 'growth', 'sunlight', 'water'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Food',
            order: 2,
            topics: [
              {
                name: 'Healthy Food',
                order: 1,
                learningOutcomes: [
                  { code: 'EVS-1-2.1', description: 'Classifies food into fruits, vegetables, grains, dairy', keywords: ['food groups', 'nutrition', 'classification'], bloomsLevel: 'understand' },
                  { code: 'EVS-1-2.2', description: 'Identifies sources of food — plants and animals', keywords: ['food sources', 'plants', 'animals'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CLASS II (Age 7-8) ────────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Class II',
    gradeNumeric: 2,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MATH-2',
        units: [
          {
            name: 'Numbers and Operations',
            order: 1,
            topics: [
              {
                name: 'Numbers up to 200',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-2-1.1', description: 'Reads, writes, and compares numbers up to 200', keywords: ['numbers', 'place value', 'comparison'], bloomsLevel: 'understand' },
                  { code: 'MATH-2-1.2', description: 'Identifies place value of digits in 2-digit numbers (tens and ones)', keywords: ['place value', 'tens', 'ones'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Addition and Subtraction (2-digit)',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-2-2.1', description: 'Adds two 2-digit numbers without regrouping', keywords: ['addition', '2-digit', 'no carry'], bloomsLevel: 'apply' },
                  { code: 'MATH-2-2.2', description: 'Adds two 2-digit numbers with regrouping (carrying)', keywords: ['addition', 'regrouping', 'carrying'], bloomsLevel: 'apply' },
                  { code: 'MATH-2-2.3', description: 'Subtracts 2-digit numbers with and without borrowing', keywords: ['subtraction', '2-digit', 'borrowing'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Multiplication Readiness',
                order: 3,
                learningOutcomes: [
                  { code: 'MATH-2-3.1', description: 'Understands multiplication as repeated addition', keywords: ['multiplication', 'repeated addition', 'groups'], bloomsLevel: 'understand' },
                  { code: 'MATH-2-3.2', description: 'Recites multiplication tables of 2 and 3', keywords: ['tables', 'multiplication', '2 times', '3 times'], bloomsLevel: 'remember' },
                ],
              },
            ],
          },
          {
            name: 'Money',
            order: 2,
            topics: [
              {
                name: 'Indian Currency',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-2-4.1', description: 'Identifies Indian coins (₹1, ₹2, ₹5, ₹10) and notes (₹10, ₹20, ₹50, ₹100)', keywords: ['money', 'currency', 'coins', 'notes', 'rupees'], bloomsLevel: 'remember' },
                  { code: 'MATH-2-4.2', description: 'Adds amounts of money and makes simple change', keywords: ['money', 'addition', 'change', 'transaction'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'English',
        code: 'ENG-2',
        units: [
          {
            name: 'Grammar',
            order: 1,
            topics: [
              {
                name: 'Singular and Plural',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-2-1.1', description: 'Converts singular nouns to plural using -s, -es, -ies rules', keywords: ['singular', 'plural', 'grammar', 'nouns'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Tenses (Simple Present)',
                order: 2,
                learningOutcomes: [
                  { code: 'ENG-2-2.1', description: 'Uses is/am/are correctly in sentences', keywords: ['tenses', 'is am are', 'grammar', 'present tense'], bloomsLevel: 'apply' },
                  { code: 'ENG-2-2.2', description: 'Writes sentences in simple present tense', keywords: ['present tense', 'sentence writing'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Vocabulary',
            order: 2,
            topics: [
              {
                name: 'Opposites and Rhyming',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-2-3.1', description: 'Identifies opposites (antonyms) of common words', keywords: ['opposites', 'antonyms', 'vocabulary'], bloomsLevel: 'understand' },
                  { code: 'ENG-2-3.2', description: 'Identifies and creates rhyming word pairs', keywords: ['rhyming', 'word families', 'phonics'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'EVS',
        code: 'EVS-2',
        units: [
          {
            name: 'Water',
            order: 1,
            topics: [
              {
                name: 'Sources and Uses of Water',
                order: 1,
                learningOutcomes: [
                  { code: 'EVS-2-1.1', description: 'Lists sources of water — rain, river, well, tap', keywords: ['water', 'sources', 'rain', 'river'], bloomsLevel: 'remember' },
                  { code: 'EVS-2-1.2', description: 'Describes uses of water in daily life and importance of saving water', keywords: ['water conservation', 'uses of water'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Our Helpers',
            order: 2,
            topics: [
              {
                name: 'Community Helpers',
                order: 1,
                learningOutcomes: [
                  { code: 'EVS-2-2.1', description: 'Identifies community helpers (doctor, teacher, farmer, police, postman) and their roles', keywords: ['community helpers', 'occupations', 'roles'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CLASS III (Age 8-9) ───────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Class III',
    gradeNumeric: 3,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MATH-3',
        units: [
          {
            name: 'Numbers and Operations',
            order: 1,
            topics: [
              {
                name: 'Numbers up to 1000',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-3-1.1', description: 'Reads, writes, and compares 3-digit numbers', keywords: ['3-digit', 'numbers', 'place value', 'hundreds'], bloomsLevel: 'understand' },
                  { code: 'MATH-3-1.2', description: 'Identifies place value — hundreds, tens, ones', keywords: ['place value', 'hundreds', 'tens', 'ones', 'expanded form'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Multiplication Tables (2-10)',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-3-2.1', description: 'Recites and applies multiplication tables from 2 to 10', keywords: ['multiplication', 'tables', 'times tables'], bloomsLevel: 'remember' },
                  { code: 'MATH-3-2.2', description: 'Multiplies a 2-digit number by a 1-digit number', keywords: ['multiplication', '2-digit', '1-digit'], bloomsLevel: 'apply' },
                  { code: 'MATH-3-2.3', description: 'Solves word problems involving multiplication', keywords: ['multiplication', 'word problems'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Division',
                order: 3,
                learningOutcomes: [
                  { code: 'MATH-3-3.1', description: 'Understands division as equal sharing and grouping', keywords: ['division', 'sharing', 'grouping', 'equal parts'], bloomsLevel: 'understand' },
                  { code: 'MATH-3-3.2', description: 'Divides 2-digit numbers by single-digit divisors', keywords: ['division', 'quotient', 'remainder'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Fractions (Introduction)',
                order: 4,
                learningOutcomes: [
                  { code: 'MATH-3-4.1', description: 'Identifies half (1/2), quarter (1/4), and three-quarters (3/4) of a shape or group', keywords: ['fractions', 'half', 'quarter', 'parts'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'English',
        code: 'ENG-3',
        units: [
          {
            name: 'Grammar',
            order: 1,
            topics: [
              {
                name: 'Parts of Speech',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-3-1.1', description: 'Identifies nouns, verbs, and adjectives in sentences', keywords: ['nouns', 'verbs', 'adjectives', 'parts of speech'], bloomsLevel: 'understand' },
                  { code: 'ENG-3-1.2', description: 'Uses adjectives to describe nouns in sentences', keywords: ['adjectives', 'describing words', 'sentences'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Sentence Types',
                order: 2,
                learningOutcomes: [
                  { code: 'ENG-3-2.1', description: 'Differentiates statements, questions, and exclamations', keywords: ['sentence types', 'question', 'statement', 'exclamation'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Spelling',
            order: 2,
            topics: [
              {
                name: 'Common Word Patterns',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-3-3.1', description: 'Spells words with common patterns (-tion, -ight, -ould, double letters)', keywords: ['spelling', 'word patterns', 'spelling rules'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'EVS',
        code: 'EVS-3',
        units: [
          {
            name: 'Looking Around (NCERT)',
            order: 1,
            topics: [
              {
                name: 'Housing and Shelter',
                order: 1,
                learningOutcomes: [
                  { code: 'EVS-3-1.1', description: 'Compares different types of houses (kutcha, pucca, flat, hut) and building materials', keywords: ['houses', 'shelter', 'building materials', 'kutcha', 'pucca'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Animals — Food and Shelter',
                order: 2,
                learningOutcomes: [
                  { code: 'EVS-3-2.1', description: 'Classifies animals as herbivores, carnivores, and omnivores', keywords: ['animals', 'herbivore', 'carnivore', 'omnivore', 'food chain'], bloomsLevel: 'understand' },
                  { code: 'EVS-3-2.2', description: 'Describes how different animals build shelters (nest, burrow, den, web)', keywords: ['animal shelters', 'nest', 'burrow', 'adaptation'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CLASS IV (Age 9-10) ───────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Class IV',
    gradeNumeric: 4,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MATH-4',
        units: [
          {
            name: 'Numbers and Operations',
            order: 1,
            topics: [
              {
                name: 'Large Numbers (up to 10,000)',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-4-1.1', description: 'Reads, writes, and compares numbers up to 10,000', keywords: ['large numbers', '4-digit', 'place value', 'thousands'], bloomsLevel: 'understand' },
                  { code: 'MATH-4-1.2', description: 'Rounds numbers to nearest 10, 100, 1000', keywords: ['rounding', 'estimation', 'approximation'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Factors and Multiples',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-4-2.1', description: 'Finds factors of numbers up to 50', keywords: ['factors', 'divisibility', 'factor pairs'], bloomsLevel: 'apply' },
                  { code: 'MATH-4-2.2', description: 'Lists multiples of numbers 2-12', keywords: ['multiples', 'skip counting', 'multiplication'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Fractions',
                order: 3,
                learningOutcomes: [
                  { code: 'MATH-4-3.1', description: 'Compares and orders like fractions', keywords: ['fractions', 'comparison', 'ordering', 'like fractions'], bloomsLevel: 'understand' },
                  { code: 'MATH-4-3.2', description: 'Adds and subtracts like fractions', keywords: ['fraction addition', 'fraction subtraction', 'like fractions'], bloomsLevel: 'apply' },
                  { code: 'MATH-4-3.3', description: 'Converts between improper fractions and mixed numbers', keywords: ['improper fractions', 'mixed numbers', 'conversion'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Geometry',
            order: 2,
            topics: [
              {
                name: 'Perimeter and Area',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-4-4.1', description: 'Calculates perimeter of squares and rectangles', keywords: ['perimeter', 'square', 'rectangle', 'measurement'], bloomsLevel: 'apply' },
                  { code: 'MATH-4-4.2', description: 'Calculates area of squares and rectangles using formula', keywords: ['area', 'square', 'rectangle', 'length', 'breadth'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'EVS',
        code: 'EVS-4',
        units: [
          {
            name: 'Looking Around (NCERT)',
            order: 1,
            topics: [
              {
                name: 'The Water Cycle',
                order: 1,
                learningOutcomes: [
                  { code: 'EVS-4-1.1', description: 'Explains the water cycle — evaporation, condensation, precipitation, collection', keywords: ['water cycle', 'evaporation', 'condensation', 'precipitation'], bloomsLevel: 'understand' },
                  { code: 'EVS-4-1.2', description: 'Describes causes and effects of water pollution', keywords: ['water pollution', 'causes', 'effects', 'conservation'], bloomsLevel: 'analyze' },
                ],
              },
              {
                name: 'Maps and Directions',
                order: 2,
                learningOutcomes: [
                  { code: 'EVS-4-2.1', description: 'Reads simple maps using symbols, legend, and cardinal directions (N, S, E, W)', keywords: ['maps', 'directions', 'north', 'south', 'east', 'west', 'legend'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'English',
        code: 'ENG-4',
        units: [
          {
            name: 'Grammar',
            order: 1,
            topics: [
              {
                name: 'Tenses',
                order: 1,
                learningOutcomes: [
                  { code: 'ENG-4-1.1', description: 'Identifies and uses simple past, present, and future tenses', keywords: ['tenses', 'past', 'present', 'future', 'grammar'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Pronouns and Prepositions',
                order: 2,
                learningOutcomes: [
                  { code: 'ENG-4-2.1', description: 'Uses personal pronouns (I, he, she, it, we, they) correctly', keywords: ['pronouns', 'personal pronouns', 'grammar'], bloomsLevel: 'apply' },
                  { code: 'ENG-4-2.2', description: 'Uses common prepositions (in, on, under, behind, between) in sentences', keywords: ['prepositions', 'grammar', 'position words'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CLASS V (Age 10-11) ───────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Class V',
    gradeNumeric: 5,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MATH-5',
        units: [
          {
            name: 'Numbers and Operations',
            order: 1,
            topics: [
              {
                name: 'Large Numbers (up to 1,00,000)',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-5-1.1', description: 'Reads, writes numbers up to 1,00,000 in Indian and International place value system', keywords: ['lakhs', 'place value', 'Indian system', 'International system'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Decimals',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-5-2.1', description: 'Understands decimal notation for tenths and hundredths', keywords: ['decimals', 'tenths', 'hundredths', 'decimal point'], bloomsLevel: 'understand' },
                  { code: 'MATH-5-2.2', description: 'Adds and subtracts decimals up to 2 decimal places', keywords: ['decimal addition', 'decimal subtraction'], bloomsLevel: 'apply' },
                  { code: 'MATH-5-2.3', description: 'Converts fractions to decimals and vice versa', keywords: ['fraction to decimal', 'conversion'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Percentage',
                order: 3,
                learningOutcomes: [
                  { code: 'MATH-5-3.1', description: 'Understands percentage as parts per 100', keywords: ['percentage', 'percent', 'parts per hundred'], bloomsLevel: 'understand' },
                  { code: 'MATH-5-3.2', description: 'Converts between fractions, decimals, and percentages', keywords: ['conversion', 'fraction', 'decimal', 'percentage'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Geometry',
            order: 2,
            topics: [
              {
                name: 'Angles',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-5-4.1', description: 'Identifies and measures angles — acute, right, obtuse, straight', keywords: ['angles', 'acute', 'right angle', 'obtuse', 'protractor'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Symmetry and Patterns',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-5-5.1', description: 'Identifies lines of symmetry in 2D shapes', keywords: ['symmetry', 'line of symmetry', 'reflection'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Science',
        code: 'SCI-5',
        units: [
          {
            name: 'Living World',
            order: 1,
            topics: [
              {
                name: 'Human Body — Organ Systems',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-5-1.1', description: 'Names and locates major organs — heart, lungs, brain, stomach, kidneys', keywords: ['organs', 'human body', 'organ systems'], bloomsLevel: 'remember' },
                  { code: 'SCI-5-1.2', description: 'Describes the function of digestive and respiratory systems', keywords: ['digestion', 'respiration', 'organ function'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Seed Germination and Plant Reproduction',
                order: 2,
                learningOutcomes: [
                  { code: 'SCI-5-2.1', description: 'Describes the process of seed germination — conditions needed and stages', keywords: ['germination', 'seeds', 'plant growth', 'conditions'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Physical World',
            order: 2,
            topics: [
              {
                name: 'Simple Machines',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-5-3.1', description: 'Identifies six simple machines — lever, wheel and axle, pulley, inclined plane, wedge, screw', keywords: ['simple machines', 'lever', 'pulley', 'force'], bloomsLevel: 'remember' },
                  { code: 'SCI-5-3.2', description: 'Gives examples of simple machines in everyday life', keywords: ['simple machines', 'real world', 'examples'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CLASS VI (Age 11-12) ──────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Class VI',
    gradeNumeric: 6,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MATH-6',
        units: [
          {
            name: 'Number System',
            order: 1,
            topics: [
              {
                name: 'Whole Numbers and Integers',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-6-1.1', description: 'Represents integers on a number line and performs operations', keywords: ['integers', 'number line', 'positive', 'negative'], bloomsLevel: 'apply' },
                  { code: 'MATH-6-1.2', description: 'Applies properties of whole numbers — commutativity, associativity, distributivity', keywords: ['properties', 'commutativity', 'associativity', 'distributivity'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'HCF and LCM',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-6-2.1', description: 'Finds HCF and LCM of numbers using prime factorization', keywords: ['HCF', 'LCM', 'prime factorization', 'GCD'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Algebra',
            order: 2,
            topics: [
              {
                name: 'Introduction to Algebra',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-6-3.1', description: 'Uses variables (letters) to represent unknown quantities', keywords: ['algebra', 'variables', 'expressions', 'unknown'], bloomsLevel: 'understand' },
                  { code: 'MATH-6-3.2', description: 'Solves simple linear equations in one variable', keywords: ['equations', 'linear', 'solving', 'algebra'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Ratio and Proportion',
            order: 3,
            topics: [
              {
                name: 'Ratio and Proportion',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-6-4.1', description: 'Expresses quantities as ratios and simplifies them', keywords: ['ratio', 'simplification', 'comparison'], bloomsLevel: 'apply' },
                  { code: 'MATH-6-4.2', description: 'Solves problems involving direct proportion', keywords: ['proportion', 'direct proportion', 'unitary method'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Science',
        code: 'SCI-6',
        units: [
          {
            name: 'Physics',
            order: 1,
            topics: [
              {
                name: 'Light, Shadows, and Reflections',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-6-1.1', description: 'Explains how shadows are formed and what affects their size/shape', keywords: ['shadows', 'light', 'opaque', 'transparent', 'translucent'], bloomsLevel: 'understand' },
                  { code: 'SCI-6-1.2', description: 'Describes reflection of light and formation of images in plane mirrors', keywords: ['reflection', 'mirror', 'image', 'light'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Electricity and Circuits',
                order: 2,
                learningOutcomes: [
                  { code: 'SCI-6-2.1', description: 'Draws and identifies components of a simple electric circuit (cell, wire, bulb, switch)', keywords: ['circuit', 'electricity', 'cell', 'bulb', 'switch'], bloomsLevel: 'apply' },
                  { code: 'SCI-6-2.2', description: 'Classifies materials as conductors and insulators', keywords: ['conductors', 'insulators', 'materials', 'electricity'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Chemistry',
            order: 2,
            topics: [
              {
                name: 'Separation of Substances',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-6-3.1', description: 'Describes methods of separation — filtration, evaporation, sieving, magnetic separation', keywords: ['separation', 'filtration', 'evaporation', 'sieving', 'mixture'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Biology',
            order: 3,
            topics: [
              {
                name: 'Living Organisms — Characteristics and Classification',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-6-4.1', description: 'Lists characteristics of living organisms (growth, respiration, reproduction, response)', keywords: ['living things', 'characteristics', 'MRS GREN'], bloomsLevel: 'remember' },
                  { code: 'SCI-6-4.2', description: 'Classifies plants and animals into basic groups', keywords: ['classification', 'plants', 'animals', 'groups'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CLASS VII (Age 12-13) ─────────────────────────────────────────────────
  {
    board: 'ncert',
    grade: 'Class VII',
    gradeNumeric: 7,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MATH-7',
        units: [
          {
            name: 'Number System',
            order: 1,
            topics: [
              {
                name: 'Rational Numbers',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-7-1.1', description: 'Performs operations on rational numbers (addition, subtraction, multiplication, division)', keywords: ['rational numbers', 'fractions', 'operations'], bloomsLevel: 'apply' },
                  { code: 'MATH-7-1.2', description: 'Represents rational numbers on a number line', keywords: ['rational numbers', 'number line', 'representation'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Exponents and Powers',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-7-2.1', description: 'Expresses numbers using exponents and understands laws of exponents', keywords: ['exponents', 'powers', 'base', 'laws of exponents'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Algebra',
            order: 2,
            topics: [
              {
                name: 'Algebraic Expressions',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-7-3.1', description: 'Identifies terms, coefficients, and like terms in algebraic expressions', keywords: ['algebraic expressions', 'terms', 'coefficients', 'like terms'], bloomsLevel: 'understand' },
                  { code: 'MATH-7-3.2', description: 'Adds and subtracts algebraic expressions', keywords: ['algebra', 'addition', 'subtraction', 'expressions'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Linear Equations in One Variable',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-7-4.1', description: 'Solves linear equations involving integers and fractions', keywords: ['linear equations', 'solving', 'integers', 'fractions'], bloomsLevel: 'apply' },
                  { code: 'MATH-7-4.2', description: 'Translates word problems into linear equations and solves them', keywords: ['word problems', 'equations', 'translation', 'application'], bloomsLevel: 'analyze' },
                ],
              },
            ],
          },
          {
            name: 'Geometry',
            order: 3,
            topics: [
              {
                name: 'Triangles and Properties',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-7-5.1', description: 'Classifies triangles by sides and angles; applies angle sum property', keywords: ['triangles', 'classification', 'angle sum', 'equilateral', 'isosceles'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Congruence of Triangles',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-7-6.1', description: 'Identifies congruent triangles using SSS, SAS, ASA, RHS criteria', keywords: ['congruence', 'SSS', 'SAS', 'ASA', 'RHS', 'triangles'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Data Handling',
            order: 4,
            topics: [
              {
                name: 'Mean, Median, Mode',
                order: 1,
                learningOutcomes: [
                  { code: 'MATH-7-7.1', description: 'Calculates mean, median, and mode of a data set', keywords: ['mean', 'median', 'mode', 'average', 'statistics'], bloomsLevel: 'apply' },
                  { code: 'MATH-7-7.2', description: 'Reads and interprets bar graphs and pie charts', keywords: ['bar graph', 'pie chart', 'data interpretation'], bloomsLevel: 'analyze' },
                ],
              },
              {
                name: 'Probability (Introduction)',
                order: 2,
                learningOutcomes: [
                  { code: 'MATH-7-8.1', description: 'Understands probability as a measure of chance (0 to 1)', keywords: ['probability', 'chance', 'likely', 'unlikely', 'certain'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Science',
        code: 'SCI-7',
        units: [
          {
            name: 'Physics',
            order: 1,
            topics: [
              {
                name: 'Heat and Temperature',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-7-1.1', description: 'Differentiates between heat and temperature; reads a thermometer', keywords: ['heat', 'temperature', 'thermometer', 'conduction'], bloomsLevel: 'understand' },
                  { code: 'SCI-7-1.2', description: 'Explains modes of heat transfer — conduction, convection, radiation', keywords: ['conduction', 'convection', 'radiation', 'heat transfer'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Motion and Speed',
                order: 2,
                learningOutcomes: [
                  { code: 'SCI-7-2.1', description: 'Calculates speed using distance/time; interprets distance-time graphs', keywords: ['speed', 'distance', 'time', 'motion', 'graph'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Chemistry',
            order: 2,
            topics: [
              {
                name: 'Acids, Bases, and Salts',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-7-3.1', description: 'Identifies acids and bases using indicators (litmus, turmeric, china rose)', keywords: ['acids', 'bases', 'indicators', 'litmus', 'pH'], bloomsLevel: 'apply' },
                  { code: 'SCI-7-3.2', description: 'Describes neutralization reaction and gives everyday examples', keywords: ['neutralization', 'acid-base', 'salt', 'reaction'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Biology',
            order: 3,
            topics: [
              {
                name: 'Nutrition in Plants and Animals',
                order: 1,
                learningOutcomes: [
                  { code: 'SCI-7-4.1', description: 'Explains photosynthesis — raw materials, products, and conditions', keywords: ['photosynthesis', 'chlorophyll', 'sunlight', 'CO2', 'nutrition'], bloomsLevel: 'understand' },
                  { code: 'SCI-7-4.2', description: 'Describes the human digestive system and its functions', keywords: ['digestion', 'digestive system', 'enzymes', 'absorption'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Respiration in Organisms',
                order: 2,
                learningOutcomes: [
                  { code: 'SCI-7-5.1', description: 'Differentiates aerobic and anaerobic respiration', keywords: ['respiration', 'aerobic', 'anaerobic', 'breathing', 'cellular'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default curriculumData;
