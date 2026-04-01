import { Router } from 'express';
import Curriculum from '../models/Curriculum.js';

const router = Router();

// GET /api/curriculum — list by board and grade
router.get('/', async (req, res, next) => {
  try {
    const { board, grade, subject } = req.query;
    const filter = {};
    if (board) filter.board = board;
    if (grade) filter.gradeNumeric = parseInt(grade);

    let query = Curriculum.find(filter).lean();
    const results = await query;

    // If subject specified, filter subjects within results
    if (subject) {
      for (const doc of results) {
        doc.subjects = doc.subjects.filter(s => s.name.toLowerCase().includes(subject.toLowerCase()));
      }
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
});

// GET /api/curriculum/search — full-text search across topics and learning outcomes
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

    const results = await Curriculum.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } }).limit(20).lean();

    res.json(results);
  } catch (err) {
    next(err);
  }
});

export default router;
