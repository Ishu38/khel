import { Router } from 'express';
import GameSession from '../models/GameSession.js';
import Game from '../models/Game.js';
import Curriculum from '../models/Curriculum.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// GET /api/analytics/child/:childId/progress — detailed progress report
router.get('/child/:childId/progress', authenticate, async (req, res, next) => {
  try {
    const { childId } = req.params;

    const sessions = await GameSession.find({ childId })
      .sort({ startedAt: -1 })
      .populate('game', 'title gameType curriculum')
      .lean();

    const totalSessions = sessions.length;
    const avgAccuracy = totalSessions
      ? sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions
      : 0;
    const totalPlayTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

    // Group by subject -> topic
    const subjectMap = {};
    for (const s of sessions) {
      const subject = s.game?.curriculum?.subject || 'unknown';
      const topic = s.game?.curriculum?.topic || 'unknown';

      if (!subjectMap[subject]) subjectMap[subject] = {};
      if (!subjectMap[subject][topic]) subjectMap[subject][topic] = [];
      subjectMap[subject][topic].push(s);
    }

    // Build subject breakdown
    const subjectBreakdown = {};
    const strongTopics = [];
    const weakTopics = [];

    for (const [subject, topics] of Object.entries(subjectMap)) {
      const topicEntries = [];
      let subjectTotalAccuracy = 0;
      let subjectSessionCount = 0;

      for (const [topic, topicSessions] of Object.entries(topics)) {
        const count = topicSessions.length;
        const topicAvgAccuracy = count
          ? topicSessions.reduce((sum, s) => sum + s.accuracy, 0) / count
          : 0;
        const topicAvgScore = count
          ? topicSessions.reduce((sum, s) => sum + s.score, 0) / count
          : 0;

        // Trend: compare last 3 vs first 3
        const sorted = [...topicSessions].sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt));
        const first3 = sorted.slice(0, 3);
        const last3 = sorted.slice(-3);
        const first3Avg = first3.length
          ? first3.reduce((sum, s) => sum + s.accuracy, 0) / first3.length
          : 0;
        const last3Avg = last3.length
          ? last3.reduce((sum, s) => sum + s.accuracy, 0) / last3.length
          : 0;

        let trend = 'stable';
        if (last3Avg - first3Avg > 0.05) trend = 'improving';
        else if (first3Avg - last3Avg > 0.05) trend = 'declining';

        topicEntries.push({
          topic,
          sessions: count,
          avgAccuracy: topicAvgAccuracy,
          avgScore: topicAvgScore,
          trend,
        });

        subjectTotalAccuracy += topicAvgAccuracy * count;
        subjectSessionCount += count;

        if (topicAvgAccuracy > 0.8) strongTopics.push(topic);
        if (topicAvgAccuracy < 0.6) weakTopics.push(topic);
      }

      subjectBreakdown[subject] = {
        topics: topicEntries,
        avgAccuracy: subjectSessionCount
          ? subjectTotalAccuracy / subjectSessionCount
          : 0,
      };
    }

    const recentSessions = sessions.slice(0, 10);

    res.json({
      overall: {
        totalSessions,
        avgAccuracy,
        totalPlayTime,
        strongTopics,
        weakTopics,
      },
      subjectBreakdown,
      recentSessions,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/analytics/child/:childId/learning-gaps — learning gap detection
router.get('/child/:childId/learning-gaps', authenticate, async (req, res, next) => {
  try {
    const { childId } = req.params;

    const sessions = await GameSession.find({ childId })
      .populate('game', 'title gameType curriculum')
      .lean();

    // Group by topic
    const topicMap = {};
    for (const s of sessions) {
      const topic = s.game?.curriculum?.topic;
      if (!topic) continue;
      if (!topicMap[topic]) topicMap[topic] = [];
      topicMap[topic].push(s);
    }

    // Identify weak areas
    const gaps = [];
    for (const [topic, topicSessions] of Object.entries(topicMap)) {
      const avgAccuracy = topicSessions.reduce((sum, s) => sum + s.accuracy, 0) / topicSessions.length;

      // Trend check
      const sorted = [...topicSessions].sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt));
      const first3 = sorted.slice(0, 3);
      const last3 = sorted.slice(-3);
      const first3Avg = first3.length
        ? first3.reduce((sum, s) => sum + s.accuracy, 0) / first3.length
        : 0;
      const last3Avg = last3.length
        ? last3.reduce((sum, s) => sum + s.accuracy, 0) / last3.length
        : 0;
      const declining = first3Avg - last3Avg > 0.05;

      if (avgAccuracy < 0.6 || declining) {
        let recommendation = '';
        if (avgAccuracy < 0.4) {
          recommendation = 'Needs significant practice. Consider starting with easier difficulty levels.';
        } else if (avgAccuracy < 0.6) {
          recommendation = 'Needs more practice. Try games with adaptive difficulty enabled.';
        } else if (declining) {
          recommendation = 'Performance is declining. Review fundamentals and try varied game types.';
        }

        gaps.push({
          topic,
          accuracy: avgAccuracy,
          sessionsPlayed: topicSessions.length,
          declining,
          recommendation,
        });
      }
    }

    // Cross-reference with Curriculum to find related unplayed topics
    const playedTopics = Object.keys(topicMap);
    const boards = [...new Set(sessions.map(s => s.game?.curriculum?.board).filter(Boolean))];
    const subjects = [...new Set(sessions.map(s => s.game?.curriculum?.subject).filter(Boolean))];

    const curricula = await Curriculum.find({
      ...(boards.length ? { board: { $in: boards } } : {}),
    }).lean();

    const allCurriculumTopics = [];
    for (const cur of curricula) {
      for (const subj of cur.subjects) {
        if (subjects.length && !subjects.includes(subj.name)) continue;
        for (const unit of subj.units) {
          for (const topic of unit.topics) {
            if (!playedTopics.includes(topic.name)) {
              allCurriculumTopics.push(topic.name);
            }
          }
        }
      }
    }
    const unplayedTopics = [...new Set(allCurriculumTopics)];

    // Find games matching weak or unplayed topics
    const weakTopicNames = gaps.map(g => g.topic);
    const suggestTopics = [...new Set([...weakTopicNames, ...unplayedTopics.slice(0, 5)])];

    const suggestedGames = await Game.find({
      published: true,
      'curriculum.topic': { $in: suggestTopics },
    })
      .select('title gameType curriculum minAge maxAge')
      .limit(10)
      .lean();

    res.json({ gaps, unplayedTopics, suggestedGames });
  } catch (err) {
    next(err);
  }
});

// GET /api/analytics/child/:childId/recommendations — game recommendations
router.get('/child/:childId/recommendations', authenticate, async (req, res, next) => {
  try {
    const { childId } = req.params;

    const sessions = await GameSession.find({ childId })
      .populate('game', 'title gameType curriculum')
      .lean();

    // Identify weak topics
    const topicMap = {};
    for (const s of sessions) {
      const topic = s.game?.curriculum?.topic;
      if (!topic) continue;
      if (!topicMap[topic]) topicMap[topic] = [];
      topicMap[topic].push(s);
    }

    const weakTopics = [];
    for (const [topic, topicSessions] of Object.entries(topicMap)) {
      const avgAccuracy = topicSessions.reduce((sum, s) => sum + s.accuracy, 0) / topicSessions.length;
      if (avgAccuracy < 0.6) weakTopics.push({ topic, avgAccuracy });
    }

    // Find unplayed topics from curriculum
    const playedTopics = Object.keys(topicMap);
    const boards = [...new Set(sessions.map(s => s.game?.curriculum?.board).filter(Boolean))];

    const curricula = await Curriculum.find({
      ...(boards.length ? { board: { $in: boards } } : {}),
    }).lean();

    const unplayedTopics = [];
    for (const cur of curricula) {
      for (const subj of cur.subjects) {
        for (const unit of subj.units) {
          for (const topic of unit.topics) {
            if (!playedTopics.includes(topic.name)) {
              unplayedTopics.push(topic.name);
            }
          }
        }
      }
    }
    const uniqueUnplayed = [...new Set(unplayedTopics)];

    // Fetch recommended games
    const targetTopics = [
      ...weakTopics.map(w => w.topic),
      ...uniqueUnplayed.slice(0, 5),
    ];

    const games = await Game.find({
      published: true,
      'curriculum.topic': { $in: targetTopics },
    })
      .select('title gameType curriculum minAge maxAge description')
      .limit(15)
      .lean();

    // Build recommendations with reasons
    const recommendations = games.map(game => {
      const topic = game.curriculum?.topic;
      const weakMatch = weakTopics.find(w => w.topic === topic);
      let reason;
      if (weakMatch) {
        reason = `Practice recommended: accuracy on "${topic}" is ${(weakMatch.avgAccuracy * 100).toFixed(0)}%`;
      } else {
        reason = `New topic to explore: "${topic}"`;
      }
      return { game, reason };
    });

    res.json({ recommendations });
  } catch (err) {
    next(err);
  }
});

export default router;
