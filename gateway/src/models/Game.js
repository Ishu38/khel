import mongoose from 'mongoose';
import { GAME_TYPES, CURRICULUM_BOARDS, LANGUAGES } from '@khel/shared';

const spriteSchema = new mongoose.Schema({
  key: { type: String, required: true },
  url: { type: String, required: true },
  width: Number,
  height: Number,
  animations: [{ name: String, frames: [Number], frameRate: Number }],
});

const levelSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['very_easy', 'easy', 'medium', 'hard', 'very_hard'], default: 'medium' },
  config: { type: mongoose.Schema.Types.Mixed, required: true },
  // Nested content items (questions, challenges, etc.)
  items: [{
    prompt: String,
    correctAnswer: mongoose.Schema.Types.Mixed,
    distractors: [mongoose.Schema.Types.Mixed],
    hint: String,
    points: { type: Number, default: 10 },
  }],
});

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, maxlength: 500 },
  gameType: {
    type: String,
    enum: Object.values(GAME_TYPES).map(gt => gt.id),
    required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Developmental stage gating
  minAge: { type: Number, required: true, min: 3 },
  maxAge: { type: Number, required: true, max: 14 },
  developmentalStage: { type: String, required: true },
  // Curriculum alignment
  curriculum: {
    board: { type: String, enum: [...Object.values(CURRICULUM_BOARDS), null] },
    grade: String,
    subject: String,
    topic: String,
    learningOutcomes: [String],
  },
  language: {
    type: String,
    enum: Object.values(LANGUAGES).map(l => l.id),
    default: 'en',
  },
  // Game content — deeply nested tree
  sprites: [spriteSchema],
  levels: [levelSchema],
  settings: {
    timeLimit: Number,
    livesCount: { type: Number, default: 3 },
    adaptiveDifficulty: { type: Boolean, default: true },
    backgroundMusic: String,
    theme: { type: String, default: 'default' },
  },
  // Metadata
  tags: [String],
  thumbnail: String,
  published: { type: Boolean, default: false },
  playCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  // AI generation metadata
  aiGenerated: { type: Boolean, default: false },
  originalPrompt: String,
}, { timestamps: true });

gameSchema.index({ gameType: 1, developmentalStage: 1 });
gameSchema.index({ 'curriculum.board': 1, 'curriculum.grade': 1, 'curriculum.subject': 1 });
gameSchema.index({ createdBy: 1, published: 1 });
gameSchema.index({ tags: 1 });

export default mongoose.model('Game', gameSchema);
