// ─── Developmental Stages (Piaget) ───────────────────────────────────────────

export const DEVELOPMENTAL_STAGES = {
  SENSORIMOTOR_PREOPERATIONAL: {
    id: 'sensorimotor_preoperational',
    label: 'Pre-Nursery',
    ageRange: [3, 4],
    piagetStage: 'Sensorimotor / Early Preoperational',
    mechanics: ['tap', 'drag', 'color_match', 'sound_response'],
  },
  PREOPERATIONAL: {
    id: 'preoperational',
    label: 'Nursery–KG',
    ageRange: [4, 6],
    piagetStage: 'Preoperational',
    mechanics: ['pattern_recognition', 'sorting', 'simple_sequencing', 'tap', 'drag', 'color_match', 'sound_response'],
  },
  CONCRETE_OPERATIONAL: {
    id: 'concrete_operational',
    label: 'Class I–III',
    ageRange: [6, 9],
    piagetStage: 'Concrete Operational',
    mechanics: ['logic_puzzle', 'arithmetic', 'story_branching', 'pattern_recognition', 'sorting', 'sequencing'],
  },
  FORMAL_OPERATIONAL: {
    id: 'formal_operational',
    label: 'Class IV–VII',
    ageRange: [9, 12],
    piagetStage: 'Formal Operational',
    mechanics: ['strategy', 'variables', 'cause_effect', 'basic_scripting', 'logic_puzzle', 'arithmetic', 'story_branching'],
  },
};

// ─── Game Types ──────────────────────────────────────────────────────────────

export const GAME_TYPES = {
  TAP_MATCH:       { id: 'tap_match',       label: 'Tap & Match',       minAge: 3,  maxAge: 6,  stages: ['sensorimotor_preoperational', 'preoperational'] },
  DRAG_SORT:       { id: 'drag_sort',       label: 'Drag & Sort',       minAge: 6,  maxAge: 9,  stages: ['concrete_operational'] },
  MAZE_RUNNER:     { id: 'maze_runner',     label: 'Maze Runner',       minAge: 6,  maxAge: 9,  stages: ['concrete_operational'] },
  WORD_BUILDER:    { id: 'word_builder',    label: 'Word Builder',      minAge: 8,  maxAge: 11, stages: ['concrete_operational', 'formal_operational'] },
  QUIZ_ADVENTURE:  { id: 'quiz_adventure',  label: 'Quiz Adventure',    minAge: 9,  maxAge: 12, stages: ['formal_operational'] },
  STRATEGY_SIM:    { id: 'strategy_sim',    label: 'Strategy / Sim',    minAge: 10, maxAge: 12, stages: ['formal_operational'] },
  CODE_AND_PLAY:   { id: 'code_and_play',   label: 'Code & Play',       minAge: 8,  maxAge: 12, stages: ['concrete_operational', 'formal_operational'] },
  MULTIPLAYER_RACE:{ id: 'multiplayer_race', label: 'Multiplayer Race', minAge: 8,  maxAge: 12, stages: ['concrete_operational', 'formal_operational'] },
};

// ─── Subscription Tiers ──────────────────────────────────────────────────────

export const SUBSCRIPTION_TIERS = {
  FREE:      { id: 'free',      label: 'Free',      priceINR: 0,    maxGames: 0,   ads: true,  analytics: false },
  PARENT:    { id: 'parent',    label: 'Parent',     priceINR: 299,  maxGames: -1, ads: false, analytics: true  },
  CLASSROOM: { id: 'classroom', label: 'Classroom',  priceINR: 99,   maxGames: -1, ads: false, analytics: true, perStudent: true, maxStudents: 40 },
  DISTRICT:  { id: 'district',  label: 'District',   priceINR: null, maxGames: -1, ads: false, analytics: true, whiteLabelable: true },
};

// ─── Curriculum Boards ───────────────────────────────────────────────────────

export const CURRICULUM_BOARDS = {
  NCERT:      'ncert',
  CBSE:       'cbse',
  ICSE:       'icse',
  STATE:      'state',
  MONTESSORI: 'montessori',
  IB_PYP:     'ib_pyp',
};

// ─── Supported Languages ─────────────────────────────────────────────────────

export const LANGUAGES = {
  EN: { id: 'en', label: 'English' },
  HI: { id: 'hi', label: 'Hindi' },
  TA: { id: 'ta', label: 'Tamil' },
  BN: { id: 'bn', label: 'Bengali' },
  BHO: { id: 'bho', label: 'Bhojpuri' },
  MR: { id: 'mr', label: 'Marathi' },
  TE: { id: 'te', label: 'Telugu' },
  KN: { id: 'kn', label: 'Kannada' },
};

// ─── User Roles ──────────────────────────────────────────────────────────────

export const USER_ROLES = {
  STUDENT: 'student',
  PARENT:  'parent',
  TEACHER: 'teacher',
  ADMIN:   'admin',
};

// ─── Adaptive Difficulty ─────────────────────────────────────────────────────

export const ADAPTIVE_CONFIG = {
  TARGET_ACCURACY_MIN: 0.70,
  TARGET_ACCURACY_MAX: 0.80,
  FRUSTRATION_RAPID_TAP_MS: 300,
  FRUSTRATION_LONG_PAUSE_S: 15,
  DIFFICULTY_LEVELS: ['very_easy', 'easy', 'medium', 'hard', 'very_hard'],
};

// ─── Helper: get stage for age ───────────────────────────────────────────────

export function getStageForAge(age) {
  const stages = Object.values(DEVELOPMENTAL_STAGES);
  for (const stage of stages) {
    if (age >= stage.ageRange[0] && age < stage.ageRange[1]) {
      return stage;
    }
  }
  return stages[stages.length - 1];
}

// ─── Helper: filter game types by developmental stage ────────────────────────

export function getGameTypesForStage(stageId) {
  return Object.values(GAME_TYPES).filter(gt => gt.stages.includes(stageId));
}
