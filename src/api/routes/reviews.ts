import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/reviews?listingId=...
router.get('/', (req, res) => {
  const { listingId } = req.query;
  try {
    const reviews = db.prepare('SELECT * FROM reviews WHERE listing_id = ? ORDER BY created_at DESC').all(listingId);
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/reviews
router.post('/', (req, res) => {
  const { studentId, listingId, rating, comment } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO reviews (student_id, listing_id, rating, comment)
      VALUES (?, ?, ?, ?)
    `).run(studentId, listingId, rating, comment);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
