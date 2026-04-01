import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { USER_ROLES, SUBSCRIPTION_TIERS, LANGUAGES } from '@khel/shared';

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 3, max: 14 },
  grade: { type: String },
  preferredLanguage: { type: String, default: 'en' },
  avatarUrl: { type: String },
}, { _id: true, timestamps: true });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.PARENT,
  },
  subscription: {
    tier: {
      type: String,
      enum: Object.keys(SUBSCRIPTION_TIERS).map(k => k.toLowerCase()),
      default: 'free',
    },
    razorpaySubscriptionId: { type: String },
    expiresAt: { type: Date },
  },
  preferredLanguage: {
    type: String,
    enum: Object.values(LANGUAGES).map(l => l.id),
    default: 'en',
  },
  children: [childSchema],
  // Teacher-specific
  school: { type: String },
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.toSafeJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export default mongoose.model('User', userSchema);
