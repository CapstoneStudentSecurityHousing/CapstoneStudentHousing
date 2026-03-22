import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/reports (Admin only)
router.get('/', (req, res) => {
  try {
    const reports = db.prepare('SELECT * FROM reports ORDER BY created_at DESC').all();
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/reports
router.post('/', (req, res) => {
  const { reporterId, listingId, reason, details } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO reports (reporter_id, listing_id, reason, details)
      VALUES (?, ?, ?, ?)
    `).run(reporterId, listingId, reason, details);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
