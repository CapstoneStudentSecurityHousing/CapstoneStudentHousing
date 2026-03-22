import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/bookings
router.get('/', (req, res) => {
  const { studentId, landlordId } = req.query;
  try {
    let bookings;
    if (studentId) {
      bookings = db.prepare(`
        SELECT b.*, l.title as propertyTitle, l.address 
        FROM bookings b 
        JOIN listings l ON b.listing_id = l.id 
        WHERE b.student_id = ?
      `).all(studentId);
    } else if (landlordId) {
      bookings = db.prepare(`
        SELECT b.*, l.title as propertyTitle, l.address, u.full_name as studentName 
        FROM bookings b 
        JOIN listings l ON b.listing_id = l.id 
        JOIN users u ON b.student_id = u.id
        WHERE l.landlord_id = ?
      `).all(landlordId);
    } else {
      bookings = db.prepare('SELECT * FROM bookings').all();
    }
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/bookings
router.post('/', (req, res) => {
  const { studentId, listingId, moveInDate, duration } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO bookings (student_id, listing_id, move_in_date, duration) 
      VALUES (?, ?, ?, ?)
    `).run(studentId, listingId, moveInDate, duration);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
