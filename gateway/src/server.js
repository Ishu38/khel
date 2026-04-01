import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initSocket } from './socket.js';

// Routes
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/games.js';
import sessionRoutes from './routes/sessions.js';
import curriculumRoutes from './routes/curriculum.js';
import generateRoutes from './routes/generate.js';
import leaderboardRoutes from './routes/leaderboards.js';
import teacherRoutes from './routes/teacher.js';
import analyticsRoutes from './routes/analytics.js';
import paymentRoutes from './routes/payments.js';

const app = express();
const httpServer = createServer(app);

// ─── Socket.io ──────────────────────────────────────────────────────────────
initSocket(httpServer);

// ─── Middleware ───────────────────────────────────────────────────────────────
// Allow CORS for production URLs
const allowedOrigins = [
  env.clientUrl,
  'http://localhost:5173',
  'https://khel-psi.vercel.app',
  'https://khel-mu-lac.vercel.app',
  'https://client-mu-lac.vercel.app',
  process.env.ALLOWED_ORIGINS?.split(',') || []
].filter(Boolean);

app.use(cors({ 
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json({ limit: '5mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/leaderboards', leaderboardRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'khel-gateway', timestamp: new Date().toISOString() });
});

// ─── Error handling ──────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ───────────────────────────────────────────────────────────────────
async function start() {
  await connectDB();
  httpServer.listen(env.port, '0.0.0.0', () => {
    console.log(`[khel] Gateway running on http://0.0.0.0:${env.port}`);
    console.log(`[khel] Environment: ${env.nodeEnv}`);
  });
}

start();
