/**
 * IB PYP (Primary Years Programme) Curriculum Seed Data
 * Organized by transdisciplinary themes and subject areas.
 * Ages 3-12 (Early Years through PYP5).
 */

const ibData = [
  // ─── IB PYP EARLY YEARS (Age 3-5) ─────────────────────────────────────────
  {
    board: 'ib_pyp',
    grade: 'Early Years (3-5)',
    gradeNumeric: 0,
    language: 'en',
    subjects: [
      {
        name: 'Language',
        code: 'IB-LANG-EY',
        units: [
          {
            name: 'Oral Communication',
            order: 1,
            topics: [
              {
                name: 'Listening and Speaking',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-LANG-EY-1.1', description: 'Listens attentively and responds to stories, rhymes, and instructions', keywords: ['listening', 'oral', 'communication', 'stories'], bloomsLevel: 'understand' },
                  { code: 'IB-LANG-EY-1.2', description: 'Expresses ideas using complete sentences in conversations', keywords: ['speaking', 'expression', 'sentences', 'oral language'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Emergent Literacy',
            order: 2,
            topics: [
              {
                name: 'Print Awareness and Phonics',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-LANG-EY-2.1', description: 'Understands that print carries meaning; tracks text left to right, top to bottom', keywords: ['print awareness', 'concepts of print', 'directionality'], bloomsLevel: 'understand' },
                  { code: 'IB-LANG-EY-2.2', description: 'Identifies letter-sound correspondences for consonants and short vowels', keywords: ['phonics', 'letter-sound', 'consonants', 'vowels'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Mathematics',
        code: 'IB-MATH-EY',
        units: [
          {
            name: 'Number',
            order: 1,
            topics: [
              {
                name: 'Counting and Cardinality',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-EY-1.1', description: 'Counts with one-to-one correspondence up to 20; understands cardinality', keywords: ['counting', 'cardinality', 'one-to-one', 'number'], bloomsLevel: 'understand' },
                  { code: 'IB-MATH-EY-1.2', description: 'Subitizes (instantly recognizes) small quantities up to 5 without counting', keywords: ['subitizing', 'quantity', 'number sense'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Shape and Space',
            order: 2,
            topics: [
              {
                name: '2D and 3D Shapes',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-EY-2.1', description: 'Describes, sorts, and compares 2D and 3D shapes using informal language', keywords: ['shapes', '2D', '3D', 'sorting', 'spatial'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Position and Pattern',
                order: 2,
                learningOutcomes: [
                  { code: 'IB-MATH-EY-3.1', description: 'Uses positional language (above, below, next to, between) and creates repeating patterns', keywords: ['position', 'patterns', 'spatial language', 'repeating'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── IB PYP 1-2 (Age 6-8) ─────────────────────────────────────────────────
  {
    board: 'ib_pyp',
    grade: 'PYP 1-2 (6-8)',
    gradeNumeric: 1,
    language: 'en',
    subjects: [
      {
        name: 'Language',
        code: 'IB-LANG-P12',
        units: [
          {
            name: 'Reading',
            order: 1,
            topics: [
              {
                name: 'Decoding and Fluency',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-LANG-P12-1.1', description: 'Decodes unfamiliar words using phonics, context clues, and picture cues', keywords: ['decoding', 'phonics', 'context clues', 'reading strategies'], bloomsLevel: 'apply' },
                  { code: 'IB-LANG-P12-1.2', description: 'Reads grade-level text fluently with expression and comprehension', keywords: ['fluency', 'expression', 'comprehension', 'reading'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Comprehension Strategies',
                order: 2,
                learningOutcomes: [
                  { code: 'IB-LANG-P12-2.1', description: 'Makes predictions, connections, and inferences while reading', keywords: ['predictions', 'connections', 'inferences', 'comprehension'], bloomsLevel: 'analyze' },
                ],
              },
            ],
          },
          {
            name: 'Writing',
            order: 2,
            topics: [
              {
                name: 'Narrative and Informational Writing',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-LANG-P12-3.1', description: 'Writes simple narratives with a beginning, middle, and end', keywords: ['narrative', 'writing', 'story structure', 'beginning middle end'], bloomsLevel: 'create' },
                  { code: 'IB-LANG-P12-3.2', description: 'Writes informational texts with facts organized by topic', keywords: ['informational writing', 'facts', 'organization'], bloomsLevel: 'create' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Mathematics',
        code: 'IB-MATH-P12',
        units: [
          {
            name: 'Number',
            order: 1,
            topics: [
              {
                name: 'Place Value and Operations',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P12-1.1', description: 'Understands place value in 2-digit numbers; adds and subtracts within 100', keywords: ['place value', 'addition', 'subtraction', '2-digit'], bloomsLevel: 'apply' },
                  { code: 'IB-MATH-P12-1.2', description: 'Solves word problems using multiple strategies (drawings, number lines, equations)', keywords: ['word problems', 'strategies', 'problem solving'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Measurement',
            order: 2,
            topics: [
              {
                name: 'Length, Mass, Time',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P12-2.1', description: 'Measures length using standard units (cm, m); compares and orders measurements', keywords: ['measurement', 'length', 'centimeters', 'meters', 'comparison'], bloomsLevel: 'apply' },
                  { code: 'IB-MATH-P12-2.2', description: 'Tells time to the quarter hour; understands duration of events', keywords: ['time', 'clock', 'quarter hour', 'duration'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Data Handling',
            order: 3,
            topics: [
              {
                name: 'Collecting and Representing Data',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P12-3.1', description: 'Collects data through surveys; creates and reads pictographs and tally charts', keywords: ['data', 'pictograph', 'tally chart', 'survey', 'representation'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Science (within UOI)',
        code: 'IB-SCI-P12',
        units: [
          {
            name: 'How the World Works',
            order: 1,
            topics: [
              {
                name: 'Living and Non-Living Things',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-SCI-P12-1.1', description: 'Distinguishes living from non-living things using observable characteristics', keywords: ['living', 'non-living', 'characteristics', 'classification'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Materials and Their Properties',
                order: 2,
                learningOutcomes: [
                  { code: 'IB-SCI-P12-2.1', description: 'Describes and classifies materials by observable properties (hard/soft, rough/smooth, transparent/opaque)', keywords: ['materials', 'properties', 'classification', 'observation'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── IB PYP 3-4 (Age 8-10) ────────────────────────────────────────────────
  {
    board: 'ib_pyp',
    grade: 'PYP 3-4 (8-10)',
    gradeNumeric: 3,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'IB-MATH-P34',
        units: [
          {
            name: 'Number',
            order: 1,
            topics: [
              {
                name: 'Multiplication and Division',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P34-1.1', description: 'Understands multiplication as repeated addition and array models; recalls facts to 10×10', keywords: ['multiplication', 'arrays', 'facts', 'repeated addition'], bloomsLevel: 'apply' },
                  { code: 'IB-MATH-P34-1.2', description: 'Divides with remainders; relates division to multiplication', keywords: ['division', 'remainders', 'inverse', 'relationship'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Fractions and Decimals',
                order: 2,
                learningOutcomes: [
                  { code: 'IB-MATH-P34-2.1', description: 'Compares, orders, and finds equivalent fractions; places fractions on a number line', keywords: ['fractions', 'equivalent', 'comparison', 'number line'], bloomsLevel: 'apply' },
                  { code: 'IB-MATH-P34-2.2', description: 'Reads and writes decimals to hundredths; connects to fractions and money', keywords: ['decimals', 'hundredths', 'money', 'fraction-decimal'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Pattern and Function',
            order: 2,
            topics: [
              {
                name: 'Number Patterns and Rules',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P34-3.1', description: 'Identifies, extends, and describes number patterns; writes rules using words and symbols', keywords: ['patterns', 'rules', 'sequences', 'algebra readiness'], bloomsLevel: 'analyze' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Science (within UOI)',
        code: 'IB-SCI-P34',
        units: [
          {
            name: 'How the World Works',
            order: 1,
            topics: [
              {
                name: 'Forces and Energy',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-SCI-P34-1.1', description: 'Investigates push/pull forces, gravity, friction, and magnetism through experiments', keywords: ['forces', 'gravity', 'friction', 'magnetism', 'investigation'], bloomsLevel: 'analyze' },
                  { code: 'IB-SCI-P34-1.2', description: 'Identifies forms of energy (light, heat, sound, electrical) and energy transformations', keywords: ['energy', 'forms', 'transformation', 'light', 'heat', 'sound'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Earth and Space',
                order: 2,
                learningOutcomes: [
                  { code: 'IB-SCI-P34-2.1', description: 'Explains day/night and seasons as a result of Earth\'s rotation and revolution', keywords: ['earth', 'rotation', 'revolution', 'seasons', 'day night'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
          {
            name: 'Sharing the Planet',
            order: 2,
            topics: [
              {
                name: 'Ecosystems and Interdependence',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-SCI-P34-3.1', description: 'Describes food chains and food webs; explains the roles of producers, consumers, and decomposers', keywords: ['food chain', 'food web', 'ecosystem', 'producers', 'consumers'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── IB PYP 5 (Age 10-12) ─────────────────────────────────────────────────
  {
    board: 'ib_pyp',
    grade: 'PYP 5 (10-12)',
    gradeNumeric: 5,
    language: 'en',
    subjects: [
      {
        name: 'Mathematics',
        code: 'IB-MATH-P5',
        units: [
          {
            name: 'Number',
            order: 1,
            topics: [
              {
                name: 'Ratio, Proportion, Percentage',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P5-1.1', description: 'Solves real-world problems involving ratios, rates, and percentages', keywords: ['ratio', 'proportion', 'percentage', 'real world', 'application'], bloomsLevel: 'apply' },
                  { code: 'IB-MATH-P5-1.2', description: 'Uses order of operations (BODMAS/PEMDAS) in multi-step calculations', keywords: ['order of operations', 'BODMAS', 'PEMDAS', 'multi-step'], bloomsLevel: 'apply' },
                ],
              },
              {
                name: 'Integers',
                order: 2,
                learningOutcomes: [
                  { code: 'IB-MATH-P5-2.1', description: 'Adds, subtracts, multiplies, and divides integers; applies in real contexts (temperature, elevation)', keywords: ['integers', 'negative numbers', 'operations', 'real context'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Pattern, Function, Algebra',
            order: 2,
            topics: [
              {
                name: 'Variables and Equations',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P5-3.1', description: 'Writes and evaluates algebraic expressions; solves one-step equations', keywords: ['algebra', 'expressions', 'equations', 'variables', 'solving'], bloomsLevel: 'apply' },
                  { code: 'IB-MATH-P5-3.2', description: 'Graphs points on a coordinate plane; identifies patterns in coordinate pairs', keywords: ['coordinate plane', 'graphing', 'ordered pairs', 'patterns'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Data Handling',
            order: 3,
            topics: [
              {
                name: 'Statistics and Probability',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-MATH-P5-4.1', description: 'Calculates mean, median, and mode; selects appropriate measure for a dataset', keywords: ['mean', 'median', 'mode', 'statistics', 'central tendency'], bloomsLevel: 'analyze' },
                  { code: 'IB-MATH-P5-4.2', description: 'Describes probability of events using fractions; conducts probability experiments', keywords: ['probability', 'fractions', 'experiments', 'likelihood'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Science (within UOI)',
        code: 'IB-SCI-P5',
        units: [
          {
            name: 'How the World Works',
            order: 1,
            topics: [
              {
                name: 'Chemistry — Mixtures and Solutions',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-SCI-P5-1.1', description: 'Distinguishes mixtures from solutions; describes methods of separation', keywords: ['mixtures', 'solutions', 'separation', 'dissolving'], bloomsLevel: 'understand' },
                ],
              },
              {
                name: 'Physics — Motion, Speed, Simple Machines',
                order: 2,
                learningOutcomes: [
                  { code: 'IB-SCI-P5-2.1', description: 'Measures and calculates speed (distance/time); designs simple machines to solve problems', keywords: ['speed', 'motion', 'simple machines', 'design', 'force'], bloomsLevel: 'apply' },
                ],
              },
            ],
          },
          {
            name: 'Who We Are',
            order: 2,
            topics: [
              {
                name: 'Human Body Systems',
                order: 1,
                learningOutcomes: [
                  { code: 'IB-SCI-P5-3.1', description: 'Explains the function and interaction of circulatory, respiratory, and digestive systems', keywords: ['body systems', 'circulatory', 'respiratory', 'digestive', 'interaction'], bloomsLevel: 'understand' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default ibData;
