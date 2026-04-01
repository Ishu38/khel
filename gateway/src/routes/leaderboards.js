import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';
import { authenticate } from '../middleware/auth.js';
import { getIO } from '../socket.js';

const router = Router();

// GET /api/leaderboards/:gameId — get leaderboard for a game
router.get('/:gameId', async (req, res, next) => {
  try {
    const lb = await Leaderboard.findOne({ game: req.params.gameId })
      .populate('entries.user', 'name');
    if (!lb) return res.json({ game: req.params.gameId, entries: [], weeklyEntries: [] });

    // Return top 50 sorted by score desc
    const entries = [...lb.entries]
      .sort((a, b) => b.score - a.score || a.duration - b.duration)
      .slice(0, 50);
    const weeklyEntries = [...lb.weeklyEntries]
      .sort((a, b) => b.score - a.score || a.duration - b.duration)
      .slice(0, 50);

    res.json({ game: req.params.gameId, entries, weeklyEntries });
  } catch (err) {
    next(err);
  }
});

// POST /api/leaderboards/:gameId — submit a score
router.post('/:gameId', authenticate, async (req, res, next) => {
  try {
    const { childId, childName, score, accuracy, duration } = req.body;

    const entry = {
      user: req.user._id,
      childId,
      childName: childName || req.user.name,
      score,
      accuracy,
      duration,
      completedAt: new Date(),
    };

    let lb = await Leaderboard.findOne({ game: req.params.gameId });
    if (!lb) {
      lb = new Leaderboard({ game: req.params.gameId, entries: [], weeklyEntries: [], weekStart: getWeekStart() });
    }

    // Reset weekly if needed
    const currentWeekStart = getWeekStart();
    if (!lb.weekStart || lb.weekStart.getTime() !== currentWeekStart.getTime()) {
      lb.weeklyEntries = [];
      lb.weekStart = currentWeekStart;
    }

    lb.entries.push(entry);
    lb.weeklyEntries.push(entry);

    // Keep only top 200 all-time
    if (lb.entries.length > 200) {
      lb.entries.sort((a, b) => b.score - a.score);
      lb.entries = lb.entries.slice(0, 200);
    }

    await lb.save();

    // Emit real-time update
    try {
      const io = getIO();
      io.emit('leaderboard:update', { gameId: req.params.gameId, entry });
    } catch { /* socket not ready */ }

    // Find rank
    const rank = lb.entries.filter(e => e.score > score).length + 1;

    res.status(201).json({ entry, rank, totalEntries: lb.entries.length });
  } catch (err) {
    next(err);
  }
});

// GET /api/leaderboards/global/top — global top players across all games
router.get('/global/top', async (req, res, next) => {
  try {
    const leaderboards = await Leaderboard.find({});
    const playerScores = {};

    for (const lb of leaderboards) {
      for (const entry of lb.entries) {
        const key = entry.childId?.toString() || entry.user.toString();
        if (!playerScores[key]) {
          playerScores[key] = { name: entry.childName, totalScore: 0, gamesPlayed: 0, avgAccuracy: 0, accuracySum: 0 };
        }
        playerScores[key].totalScore += entry.score;
        playerScores[key].gamesPlayed += 1;
        playerScores[key].accuracySum += (entry.accuracy || 0);
      }
    }

    const rankings = Object.entries(playerScores)
      .map(([id, data]) => ({
        playerId: id,
        name: data.name,
        totalScore: data.totalScore,
        gamesPlayed: data.gamesPlayed,
        avgAccuracy: data.gamesPlayed ? data.accuracySum / data.gamesPlayed : 0,
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 100);

    res.json({ rankings });
  } catch (err) {
    next(err);
  }
});

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export default router;
