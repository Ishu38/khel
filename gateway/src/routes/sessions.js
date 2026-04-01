import { Router } from 'express';
import GameSession from '../models/GameSession.js';
import Game from '../models/Game.js';
import { authenticate } from '../middleware/auth.js';
import { ADAPTIVE_CONFIG } from '@khel/shared';

const router = Router();

// POST /api/sessions — start a game session
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { gameId, childId } = req.body;
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const session = await GameSession.create({
      game: gameId,
      player: req.user._id,
      childId,
      currentDifficulty: 'medium',
    });

    // Increment play count
    await Game.findByIdAndUpdate(gameId, { $inc: { playCount: 1 } });

    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

// POST /api/sessions/:id/respond — record a response and adapt difficulty
router.post('/:id/respond', authenticate, async (req, res, next) => {
  try {
    const session = await GameSession.findOne({ _id: req.params.id, player: req.user._id });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (session.completed) return res.status(400).json({ error: 'Session already completed' });

    const { levelOrder, itemIndex, answer, correct, responseTimeMs } = req.body;
    session.responses.push({ levelOrder, itemIndex, answer, correct, responseTimeMs });

    // Update score
    if (correct) session.score += req.body.points || 10;
    session.maxScore += req.body.points || 10;
    session.accuracy = session.score / session.maxScore;

    // ─── Rule-based adaptive difficulty (ZPD targeting) ────────────
    const recentWindow = session.responses.slice(-10);
    const recentAccuracy = recentWindow.filter(r => r.correct).length / recentWindow.length;
    const difficulties = ADAPTIVE_CONFIG.DIFFICULTY_LEVELS;
    const currentIdx = difficulties.indexOf(session.currentDifficulty);

    let adjustment = null;

    // Frustration detection: rapid tapping
    if (responseTimeMs < ADAPTIVE_CONFIG.FRUSTRATION_RAPID_TAP_MS && !correct) {
      session.frustrationEvents.push({ type: 'rapid_tap', timestamp: new Date(), context: { responseTimeMs } });
    }

    if (recentWindow.length >= 5) {
      if (recentAccuracy > ADAPTIVE_CONFIG.TARGET_ACCURACY_MAX && currentIdx < difficulties.length - 1) {
        const newDifficulty = difficulties[currentIdx + 1];
        adjustment = { from: session.currentDifficulty, to: newDifficulty, reason: 'too_easy', atResponse: session.responses.length };
        session.currentDifficulty = newDifficulty;
      } else if (recentAccuracy < ADAPTIVE_CONFIG.TARGET_ACCURACY_MIN && currentIdx > 0) {
        const newDifficulty = difficulties[currentIdx - 1];
        adjustment = { from: session.currentDifficulty, to: newDifficulty, reason: 'too_hard', atResponse: session.responses.length };
        session.currentDifficulty = newDifficulty;
      }
    }

    if (adjustment) session.difficultyAdjustments.push(adjustment);
    await session.save();

    res.json({
      currentDifficulty: session.currentDifficulty,
      accuracy: session.accuracy,
      score: session.score,
      adjustment,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/sessions/:id/complete
router.post('/:id/complete', authenticate, async (req, res, next) => {
  try {
    const session = await GameSession.findOne({ _id: req.params.id, player: req.user._id });
    if (!session) return res.status(404).json({ error: 'Session not found' });

    session.completed = true;
    session.completedAt = new Date();
    session.duration = Date.now() - session.startedAt.getTime();
    await session.save();

    res.json(session);
  } catch (err) {
    next(err);
  }
});

// GET /api/sessions/child/:childId — parent dashboard: child's play history
router.get('/child/:childId', authenticate, async (req, res, next) => {
  try {
    const sessions = await GameSession.find({
      player: req.user._id,
      childId: req.params.childId,
    })
      .sort({ startedAt: -1 })
      .limit(50)
      .populate('game', 'title gameType curriculum')
      .lean();

    // Aggregate stats
    const totalSessions = sessions.length;
    const avgAccuracy = sessions.length
      ? sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
      : 0;
    const totalTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    const topicsPlayed = [...new Set(sessions.map(s => s.game?.curriculum?.topic).filter(Boolean))];

    res.json({
      sessions,
      stats: { totalSessions, avgAccuracy, totalTimeMs: totalTime, topicsPlayed },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
