import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  levelOrder: Number,
  itemIndex: Number,
  answer: mongoose.Schema.Types.Mixed,
  correct: Boolean,
  responseTimeMs: Number,
  timestamp: { type: Date, default: Date.now },
});

const sessionSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  childId: { type: mongoose.Schema.Types.ObjectId },
  // Performance tracking
  responses: [responseSchema],
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0, min: 0, max: 1 },
  // Adaptive difficulty state
  currentDifficulty: { type: String, enum: ['very_easy', 'easy', 'medium', 'hard', 'very_hard'], default: 'medium' },
  difficultyAdjustments: [{
    from: String,
    to: String,
    reason: { type: String, enum: ['too_easy', 'too_hard', 'frustration_detected', 'zpd_targeting'] },
    atResponse: Number,
  }],
  // Frustration signals
  frustrationEvents: [{
    type: { type: String, enum: ['rapid_tap', 'long_pause', 'repeated_wrong'] },
    timestamp: Date,
    context: mongoose.Schema.Types.Mixed,
  }],
  // Session metadata
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  duration: Number,
  completed: { type: Boolean, default: false },
}, { timestamps: true });

sessionSchema.index({ player: 1, game: 1 });
sessionSchema.index({ childId: 1, startedAt: -1 });

export default mongoose.model('GameSession', sessionSchema);
