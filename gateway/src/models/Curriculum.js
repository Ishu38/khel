import mongoose from 'mongoose';
import { CURRICULUM_BOARDS, LANGUAGES } from '@khel/shared';

// Deeply nested curriculum tree: Board → Grade → Subject → Unit → Topic → Learning Outcomes
const learningOutcomeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
  keywords: [String],
  bloomsLevel: { type: String, enum: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'] },
});

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: Number,
  learningOutcomes: [learningOutcomeSchema],
  gameCount: { type: Number, default: 0 },
});

const unitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: Number,
  topics: [topicSchema],
});

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: String,
  units: [unitSchema],
});

const curriculumSchema = new mongoose.Schema({
  board: {
    type: String,
    enum: Object.values(CURRICULUM_BOARDS),
    required: true,
  },
  grade: { type: String, required: true },
  gradeNumeric: { type: Number, required: true },
  language: {
    type: String,
    enum: Object.values(LANGUAGES).map(l => l.id),
    default: 'en',
  },
  subjects: [subjectSchema],
}, { timestamps: true });

curriculumSchema.index({ board: 1, gradeNumeric: 1 });
curriculumSchema.index({ 'subjects.units.topics.name': 'text', 'subjects.units.topics.learningOutcomes.description': 'text' });

export default mongoose.model('Curriculum', curriculumSchema);
