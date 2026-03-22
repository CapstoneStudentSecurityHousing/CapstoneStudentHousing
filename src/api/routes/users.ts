import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/users
router.post('/', (req, res) => {
  const { id, email, fullName, role } = req.body;
  try {
    db.prepare('INSERT INTO users (id, email, full_name, role) VALUES (?, ?, ?, ?)').run(id, email, fullName, role);
    res.status(201).json({ id, email, fullName, role });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
