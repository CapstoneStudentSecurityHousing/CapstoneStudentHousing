import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/messages?userId=...
router.get('/', (req, res) => {
  const { userId } = req.query;
  try {
    const messages = db.prepare(`
      SELECT * FROM messages 
      WHERE sender_id = ? OR receiver_id = ? 
      ORDER BY timestamp ASC
    `).all(userId, userId);
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/messages
router.post('/', (req, res) => {
  const { senderId, senderName, receiverId, receiverName, text, bookingId, participants } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO messages (sender_id, sender_name, receiver_id, receiver_name, text, booking_id, participants)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(senderId, senderName, receiverId, receiverName, text, bookingId, JSON.stringify(participants));
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
