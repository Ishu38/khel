import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  childId: { type: mongoose.Schema.Types.ObjectId },
  childName: { type: String },
  score: { type: Number, required: true },
  accuracy: { type: Number, min: 0, max: 1 },
  completedAt: { type: Date, default: Date.now },
  duration: { type: Number }, // ms
}, { _id: true });

const leaderboardSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true, unique: true },
  entries: [entrySchema],
  // Weekly reset tracking
  weekStart: { type: Date },
  weeklyEntries: [entrySchema],
}, { timestamps: true });

leaderboardSchema.index({ game: 1 });
leaderboardSchema.index({ 'entries.score': -1 });

export default mongoose.model('Leaderboard', leaderboardSchema);
