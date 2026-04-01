/**
 * Montessori Curriculum Seed Data
 * Organized by Montessori planes of development and areas of learning.
 * Ages 3-12 (First and Second Planes).
 */

const montessoriData = [
  // ─── FIRST PLANE: CASA DEI BAMBINI (Age 3-6) ──────────────────────────────
  {
    board: 'montessori',
    grade: 'Casa (3-6)',
    gradeNumeric: 0,
    language: 'en',
    subjects: [
      {
        name: 'Practical Life',
        code: 'MON-PL',
        units: [
          {
            name: 'Care of Self',
            order: 1,
            topics: [
              {
                name: 'Pouring, Spooning, and Transferring',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-PL-1.1', description: 'Pours water between jugs without spilling; transfers grains with a spoon', keywords: ['pouring', 'transferring', 'fine motor', 'practical life'], bloomsLevel: 'apply' },
                  { code: 'MON-PL-1.2', description: 'Buttons, zips, and laces independently', keywords: ['dressing', 'frames', 'independence', 'fine motor'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Grace and Courtesy',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-PL-2.1', description: 'Demonstrates greetings, turn-taking, and polite interruption', keywords: ['grace', 'courtesy', 'social skills', 'manners'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Sensorial',
        code: 'MON-SEN',
        units: [
          {
            name: 'Visual Discrimination',
            order: 1,
            topics: [
              {
                name: 'Pink Tower, Brown Stair, Red Rods',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-SEN-1.1', description: 'Grades objects by size — large to small (Pink Tower), thick to thin (Brown Stair), long to short (Red Rods)', keywords: ['grading', 'seriation', 'size', 'dimensions'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Color Tablets',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-SEN-2.1', description: 'Matches and grades colors from primary to fine shade distinctions (Color Boxes 1-3)', keywords: ['color matching', 'grading', 'shades', 'visual discrimination'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Geometric Solids & Shapes',
            order: 2,
            topics: [
              {
                name: 'Geometric Solids',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-SEN-3.1', description: 'Identifies sphere, cube, cone, cylinder, prism, and pyramid by touch and sight', keywords: ['geometric solids', '3D shapes', 'stereognostic'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Geometric Cabinet',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-SEN-4.1', description: 'Identifies and names circles, triangles, rectangles, polygons, and curved figures', keywords: ['geometry', 'shapes', '2D', 'geometric cabinet'], bloomsLevel: 'remember' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Language',
        code: 'MON-LANG',
        units: [
          {
            name: 'Oral Language & Phonics',
            order: 1,
            topics: [
              {
                name: 'Sandpaper Letters',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-LANG-1.1', description: 'Traces sandpaper letters while saying the phonetic sound (multi-sensory association)', keywords: ['sandpaper letters', 'phonics', 'letter sounds', 'tactile'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Moveable Alphabet',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-LANG-2.1', description: 'Builds CVC and phonetic words using the moveable alphabet', keywords: ['moveable alphabet', 'encoding', 'spelling', 'phonetic words'], bloomsLevel: 'apply' },
                  { code: 'MON-LANG-2.2', description: 'Writes first sentences using moveable alphabet before pencil writing', keywords: ['sentence building', 'moveable alphabet', 'composition'], bloomsLevel: 'create' },
                ],
              },
            ],
          },
          {
            name: 'Reading',
            order: 2,
            topics: [
              {
                name: 'Pink, Blue, Green Series',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-LANG-3.1', description: 'Reads 3-letter phonetic words (Pink Series: CVC)', keywords: ['pink series', 'CVC', 'phonetic reading'], bloomsLevel: 'apply' },
                  { code: 'MON-LANG-3.2', description: 'Reads words with blends and digraphs (Blue Series)', keywords: ['blue series', 'blends', 'digraphs'], bloomsLevel: 'apply' },
                  { code: 'MON-LANG-3.3', description: 'Reads words with long vowels and complex phonograms (Green Series)', keywords: ['green series', 'phonograms', 'long vowels'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Mathematics',
        code: 'MON-MATH',
        units: [
          {
            name: 'Counting and Number Sense',
            order: 1,
            topics: [
              {
                name: 'Number Rods and Sandpaper Numbers',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-MATH-1.1', description: 'Associates quantity (Number Rods 1-10) with numeral (Sandpaper Numbers)', keywords: ['number rods', 'sandpaper numbers', 'quantity', 'association'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Spindle Box and Cards & Counters',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-MATH-2.1', description: 'Understands zero as an empty set (Spindle Box); identifies odd and even numbers (Cards & Counters)', keywords: ['zero', 'odd', 'even', 'number sense'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Decimal System (Golden Beads)',
            order: 2,
            topics: [
              {
                name: 'Introduction to Decimal System',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-MATH-3.1', description: 'Identifies unit, ten-bar, hundred-square, and thousand-cube using golden bead material', keywords: ['golden beads', 'decimal system', 'place value', 'units', 'tens', 'hundreds', 'thousands'], bloomsLevel: 'understand' },
                  { code: 'MON-MATH-3.2', description: 'Performs 4-digit addition, subtraction, multiplication, and division with golden bead material (concrete)', keywords: ['golden beads', 'operations', 'concrete arithmetic'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Cultural Studies',
        code: 'MON-CUL',
        units: [
          {
            name: 'Geography',
            order: 1,
            topics: [
              {
                name: 'Land and Water Forms',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-CUL-1.1', description: 'Identifies land and water forms — island/lake, peninsula/gulf, isthmus/strait, cape/bay', keywords: ['land forms', 'water forms', 'geography', 'Montessori globes'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Puzzle Maps',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-CUL-2.1', description: 'Identifies continents and countries using Montessori puzzle maps', keywords: ['continents', 'countries', 'puzzle maps', 'world geography'], bloomsLevel: 'remember' },
                ],
              },
            ],
          },
          {
            name: 'Botany & Zoology',
            order: 2,
            topics: [
              {
                name: 'Botany Cabinet',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-CUL-3.1', description: 'Identifies leaf shapes and parts of a plant using botany cabinet and nomenclature cards', keywords: ['botany', 'leaf shapes', 'plant parts', 'nomenclature'], bloomsLevel: 'remember' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── SECOND PLANE: ELEMENTARY (Age 6-12) ───────────────────────────────────
  {
    board: 'montessori',
    grade: 'Lower Elementary (6-9)',
    gradeNumeric: 2,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MON-MATH-LE',
        units: [
          {
            name: 'Arithmetic with Materials',
            order: 1,
            topics: [
              {
                name: 'Stamp Game & Bead Frames',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-MATH-LE-1.1', description: 'Performs multi-digit addition, subtraction, multiplication using Stamp Game (abstract bridge from golden beads)', keywords: ['stamp game', 'operations', 'multi-digit', 'abstraction'], bloomsLevel: 'apply' },
                  { code: 'MON-MATH-LE-1.2', description: 'Performs long multiplication and division using Small and Large Bead Frames', keywords: ['bead frames', 'multiplication', 'division', 'long'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Fractions (Fraction Circles)',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-MATH-LE-2.1', description: 'Performs operations on fractions using Montessori fraction circles (concrete to abstract)', keywords: ['fractions', 'fraction circles', 'operations', 'equivalence'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Geometry',
            order: 2,
            topics: [
              {
                name: 'Constructive Triangles',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-MATH-LE-3.1', description: 'Constructs quadrilaterals and polygons from triangles; discovers that all shapes derive from triangles', keywords: ['constructive triangles', 'geometry', 'composition'], bloomsLevel: 'analyze' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Language',
        code: 'MON-LANG-LE',
        units: [
          {
            name: 'Grammar (Function of Words)',
            order: 1,
            topics: [
              {
                name: 'Grammar Symbols',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-LANG-LE-1.1', description: 'Identifies and symbolizes 9 parts of speech using Montessori grammar symbols (noun=black triangle, verb=red circle, etc.)', keywords: ['grammar symbols', 'parts of speech', 'Montessori grammar'], bloomsLevel: 'understand' },
                  { code: 'MON-LANG-LE-1.2', description: 'Performs sentence analysis — identifies subject, predicate, and objects', keywords: ['sentence analysis', 'subject', 'predicate', 'grammar'], bloomsLevel: 'analyze' },
                ],
              },
            ],
          },
          {
            name: 'Creative Writing',
            order: 2,
            topics: [
              {
                name: 'Research and Report Writing',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-LANG-LE-2.1', description: 'Writes research reports on Great Lesson topics using multiple sources', keywords: ['research', 'writing', 'reports', 'Great Lessons'], bloomsLevel: 'create' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Cosmic Education',
        code: 'MON-COS',
        units: [
          {
            name: 'Great Lessons',
            order: 1,
            topics: [
              {
                name: 'Coming of the Universe',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-COS-1.1', description: 'Narrates the story of the creation of the universe — Big Bang, formation of Earth, states of matter', keywords: ['universe', 'Big Bang', 'cosmic education', 'Great Lesson 1'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Coming of Life',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-COS-2.1', description: 'Describes the Timeline of Life — from single-celled organisms to complex life', keywords: ['evolution', 'timeline of life', 'Great Lesson 2', 'biology'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Coming of Humans',
                order: 3,
                learningOutcomes: [
                  { code: 'MON-COS-3.1', description: 'Explores the Timeline of Humans — needs of shelter, food, communication, transportation across civilizations', keywords: ['human history', 'civilizations', 'Great Lesson 3', 'fundamental needs'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Story of Writing',
                order: 4,
                learningOutcomes: [
                  { code: 'MON-COS-4.1', description: 'Traces the history of written communication — pictographs to alphabets', keywords: ['writing history', 'pictographs', 'alphabet', 'Great Lesson 4'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Story of Numbers',
                order: 5,
                learningOutcomes: [
                  { code: 'MON-COS-5.1', description: 'Traces the history of mathematics — from tally marks to positional number systems', keywords: ['number history', 'tally', 'numeral systems', 'Great Lesson 5'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── UPPER ELEMENTARY (Age 9-12) ───────────────────────────────────────────
  {
    board: 'montessori',
    grade: 'Upper Elementary (9-12)',
    gradeNumeric: 5,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'MON-MATH-UE',
        units: [
          {
            name: 'Advanced Operations',
            order: 1,
            topics: [
              {
                name: 'Racks and Tubes (Long Division)',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-MATH-UE-1.1', description: 'Performs long division with multi-digit divisors using Racks and Tubes material', keywords: ['long division', 'racks and tubes', 'multi-digit'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Squaring and Cubing',
                order: 2,
                learningOutcomes: [
                  { code: 'MON-MATH-UE-2.1', description: 'Computes squares and cubes using Montessori bead chains and decanomial layout', keywords: ['squaring', 'cubing', 'bead chains', 'decanomial'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Algebraic Concepts',
                order: 3,
                learningOutcomes: [
                  { code: 'MON-MATH-UE-3.1', description: 'Uses binomial and trinomial cubes to explore algebraic formulas concretely', keywords: ['binomial cube', 'trinomial cube', 'algebra', 'concrete'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Geometry',
            order: 2,
            topics: [
              {
                name: 'Area, Volume, and Measurement',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-MATH-UE-4.1', description: 'Derives area formulas for parallelogram, triangle, and circle using material manipulation', keywords: ['area', 'derivation', 'geometry', 'formulas'], bloomsLevel: 'analyze' },
                  { code: 'MON-MATH-UE-4.2', description: 'Calculates volume of rectangular prisms, cylinders, and triangular prisms', keywords: ['volume', '3D', 'prism', 'cylinder'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Science',
        code: 'MON-SCI-UE',
        units: [
          {
            name: 'Physical Science',
            order: 1,
            topics: [
              {
                name: 'States of Matter and Chemistry',
                order: 1,
                learningOutcomes: [
                  { code: 'MON-SCI-UE-1.1', description: 'Explains states of matter transitions and molecular behavior using experiments', keywords: ['states of matter', 'molecules', 'solid', 'liquid', 'gas'], bloomsLevel: 'understand' },
                  { code: 'MON-SCI-UE-1.2', description: 'Identifies elements and reads the periodic table (first 20 elements)', keywords: ['elements', 'periodic table', 'chemistry'], bloomsLevel: 'remember' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default montessoriData;
