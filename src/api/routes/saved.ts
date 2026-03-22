import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/saved?userId=...
router.get('/', (req, res) => {
  const { userId } = req.query;
  try {
    const saved = db.prepare(`
      SELECT s.*, l.title, l.address, l.price 
      FROM saved_properties s
      JOIN listings l ON s.listing_id = l.id
      WHERE s.user_id = ?
    `).all(userId);
    res.json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/saved
router.post('/', (req, res) => {
  const { userId, listingId } = req.body;
  try {
    const info = db.prepare('INSERT INTO saved_properties (user_id, listing_id) VALUES (?, ?)').run(userId, listingId);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/saved/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM saved_properties WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
