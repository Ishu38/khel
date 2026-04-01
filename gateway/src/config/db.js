import mongoose from 'mongoose';
import env from './env.js';

export async function connectDB() {
  try {
    const uri = env.mongoUri;
    console.log(`[khel] Connecting to MongoDB: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')}`);
    await mongoose.connect(uri);
    console.log('[khel] MongoDB connected successfully');
  } catch (err) {
    console.error('[khel] MongoDB connection error:', err.message);
    process.exit(1);
  }
}
