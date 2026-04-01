import { Router } from 'express';
import Game from '../models/Game.js';
import { authenticate } from '../middleware/auth.js';
import { enforceAgeGate } from '../middleware/ageGate.js';
import { SUBSCRIPTION_TIERS } from '@khel/shared';
import { canCreateGame, requirePremium } from '../middleware/subscription.js';

const router = Router();

// GET /api/games — list/search published games
router.get('/', async (req, res, next) => {
  try {
    const { gameType, stage, board, grade, subject, topic, language, page = 1, limit = 20 } = req.query;

    const filter = { published: true };
    if (gameType) filter.gameType = gameType;
    if (stage) filter.developmentalStage = stage;
    if (board) filter['curriculum.board'] = board;
    if (grade) filter['curriculum.grade'] = grade;
    if (subject) filter['curriculum.subject'] = subject;
    if (topic) filter['curriculum.topic'] = topic;
    if (language) filter.language = language;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [games, total] = await Promise.all([
      Game.find(filter).sort({ playCount: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Game.countDocuments(filter),
    ]);

    res.json({ games, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    next(err);
  }
});

// GET /api/games/:id
router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).lean();
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    next(err);
  }
});

// POST /api/games — create game (requires paid subscription)
router.post('/', authenticate, requirePremium, enforceAgeGate, async (req, res, next) => {
  try {
    // Check if user can create games based on subscription
    const { canCreate, error, limit, current, tier, upgrade } = await canCreateGame(req.user);
    
    if (!canCreate) {
      return res.status(403).json({
        error,
        limit,
        current,
        tier,
        upgrade,
      });
    }

    const game = await Game.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
});

// PUT /api/games/:id — update own game
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const game = await Game.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!game) return res.status(404).json({ error: 'Game not found or not owned by you' });

    Object.assign(game, req.body);
    await game.save();
    res.json(game);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/games/:id
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const result = await Game.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!result) return res.status(404).json({ error: 'Game not found or not owned by you' });
    res.json({ message: 'Game deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
