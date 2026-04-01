import mongoose from 'mongoose';
import { CURRICULUM_BOARDS } from '@khel/shared';

const classroomStudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  childId: { type: mongoose.Schema.Types.ObjectId },
  childName: { type: String, required: true },
  age: { type: Number, required: true, min: 3, max: 14 },
}, { _id: true });

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  school: { type: String, trim: true },
  grade: { type: String },
  board: {
    type: String,
    enum: [...Object.values(CURRICULUM_BOARDS), null],
  },
  students: [classroomStudentSchema],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

classroomSchema.index({ teacher: 1 });

export default mongoose.model('Classroom', classroomSchema);
