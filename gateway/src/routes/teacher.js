import { Router } from 'express';
import Classroom from '../models/Classroom.js';
import User from '../models/User.js';
import Game from '../models/Game.js';
import GameSession from '../models/GameSession.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// All teacher routes require authentication + teacher role
router.use(authenticate, requireRole('teacher'));

// POST /api/teacher/classrooms — create a classroom
router.post('/classrooms', async (req, res, next) => {
  try {
    const { name, school, grade, board } = req.body;

    const classroom = await Classroom.create({
      name,
      school,
      grade,
      board,
      teacher: req.user._id,
    });

    // Add classroom id to the teacher's user record
    await User.findByIdAndUpdate(req.user._id, {
      $push: { classrooms: classroom._id },
    });

    res.status(201).json(classroom);
  } catch (err) {
    next(err);
  }
});

// GET /api/teacher/classrooms — list teacher's classrooms with student count
router.get('/classrooms', async (req, res, next) => {
  try {
    const classrooms = await Classroom.find({ teacher: req.user._id })
      .lean();

    const result = classrooms.map(c => ({
      ...c,
      studentCount: c.students.length,
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/teacher/classrooms/:id — get classroom details with students
router.get('/classrooms/:id', async (req, res, next) => {
  try {
    const classroom = await Classroom.findOne({
      _id: req.params.id,
      teacher: req.user._id,
    })
      .populate('games', 'title gameType curriculum minAge maxAge')
      .lean();

    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    res.json(classroom);
  } catch (err) {
    next(err);
  }
});

// POST /api/teacher/classrooms/:id/students — add student to classroom
router.post('/classrooms/:id/students', async (req, res, next) => {
  try {
    const { childName, age, user, childId } = req.body;

    const classroom = await Classroom.findOne({
      _id: req.params.id,
      teacher: req.user._id,
    });
    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    classroom.students.push({ childName, age, user, childId });
    await classroom.save();

    res.status(201).json(classroom);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/teacher/classrooms/:id/students/:studentId — remove student
router.delete('/classrooms/:id/students/:studentId', async (req, res, next) => {
  try {
    const classroom = await Classroom.findOne({
      _id: req.params.id,
      teacher: req.user._id,
    });
    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    classroom.students.pull({ _id: req.params.studentId });
    await classroom.save();

    res.json(classroom);
  } catch (err) {
    next(err);
  }
});

// POST /api/teacher/classrooms/:id/games — assign a game to the classroom
router.post('/classrooms/:id/games', async (req, res, next) => {
  try {
    const { gameId } = req.body;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const classroom = await Classroom.findOne({
      _id: req.params.id,
      teacher: req.user._id,
    });
    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    if (!classroom.games.includes(gameId)) {
      classroom.games.push(gameId);
      await classroom.save();
    }

    res.json(classroom);
  } catch (err) {
    next(err);
  }
});

// GET /api/teacher/classrooms/:id/analytics — class-wide analytics
router.get('/classrooms/:id/analytics', async (req, res, next) => {
  try {
    const classroom = await Classroom.findOne({
      _id: req.params.id,
      teacher: req.user._id,
    }).lean();
    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    const childIds = classroom.students.map(s => s.childId).filter(Boolean);

    const sessions = await GameSession.find({ childId: { $in: childIds } })
      .populate('game', 'title curriculum')
      .lean();

    const totalSessions = sessions.length;
    const avgAccuracy = totalSessions
      ? sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions
      : 0;

    // Topic breakdown: sessions per topic with avg accuracy
    const topicMap = {};
    for (const s of sessions) {
      const topic = s.game?.curriculum?.topic || 'unknown';
      if (!topicMap[topic]) topicMap[topic] = { sessions: 0, totalAccuracy: 0 };
      topicMap[topic].sessions += 1;
      topicMap[topic].totalAccuracy += s.accuracy;
    }
    const topicBreakdown = Object.entries(topicMap).map(([topic, data]) => ({
      topic,
      sessions: data.sessions,
      avgAccuracy: data.sessions ? data.totalAccuracy / data.sessions : 0,
    }));

    // Student performance
    const studentMap = {};
    for (const s of sessions) {
      const cid = String(s.childId);
      if (!studentMap[cid]) studentMap[cid] = { sessions: 0, totalAccuracy: 0, totalScore: 0 };
      studentMap[cid].sessions += 1;
      studentMap[cid].totalAccuracy += s.accuracy;
      studentMap[cid].totalScore += s.score;
    }
    const studentPerformance = classroom.students.map(student => {
      const data = studentMap[String(student.childId)] || { sessions: 0, totalAccuracy: 0, totalScore: 0 };
      return {
        childId: student.childId,
        childName: student.childName,
        sessions: data.sessions,
        avgAccuracy: data.sessions ? data.totalAccuracy / data.sessions : 0,
        totalScore: data.totalScore,
      };
    });

    // Difficulty distribution
    const difficultyDistribution = {};
    for (const s of sessions) {
      const d = s.currentDifficulty || 'medium';
      difficultyDistribution[d] = (difficultyDistribution[d] || 0) + 1;
    }

    res.json({
      avgAccuracy,
      totalSessions,
      topicBreakdown,
      studentPerformance,
      difficultyDistribution,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
