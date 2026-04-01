import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { requirePremium } from '../middleware/subscription.js';
import { callEngine } from '../services/engineProxy.js';

const router = Router();

// POST /api/generate — AI game generation (prompt → playable game)
// Requires premium subscription (AI generation is a paid feature)
router.post('/', authenticate, requirePremium, async (req, res, next) => {
  try {
    const { prompt, gameType, targetAge, language, board, grade, subject } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });

    // Forward to FastAPI engine — non-blocking
    const gameData = await callEngine('/api/generate', {
      prompt,
      gameType,
      targetAge,
      language: language || 'en',
      board,
      grade,
      subject,
      userId: req.user._id.toString(),
    });

    res.json(gameData);
  } catch (err) {
    next(err);
  }
});

export default router;
