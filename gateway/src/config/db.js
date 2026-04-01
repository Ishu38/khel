import mongoose from 'mongoose';
import env from './env.js';

export async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri);
    console.log(`[khel] MongoDB connected: ${env.mongoUri}`);
  } catch (err) {
    console.error('[khel] MongoDB connection error:', err.message);
    process.exit(1);
  }
}
