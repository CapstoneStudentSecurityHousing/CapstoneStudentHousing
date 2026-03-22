import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/listings
router.get('/', (req, res) => {
  try {
    const listings = db.prepare('SELECT * FROM listings WHERE status = ?').all('Active');
    res.json(listings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/listings
router.post('/', (req, res) => {
  const { landlordId, title, address, price, description, beds, baths } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO listings (landlord_id, title, address, price, description, beds, baths) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(landlordId, title, address, price, description, beds, baths);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
