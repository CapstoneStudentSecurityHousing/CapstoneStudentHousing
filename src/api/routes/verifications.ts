import express from 'express';
import db from '../../db/index.js';

const router = express.Router();

// GET /api/verifications (Admin only)
router.get('/', (req, res) => {
  try {
    const verifications = db.prepare('SELECT * FROM verifications ORDER BY created_at DESC').all();
    res.json(verifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/verifications
router.post('/', (req, res) => {
  const { userId, userEmail, userName, role, type, govIdUrl, enrollmentCertUrl, propertyProofUrl } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO verifications (user_id, user_email, user_name, role, type, gov_id_url, enrollment_cert_url, property_proof_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(userId, userEmail, userName, role, type, govIdUrl, enrollmentCertUrl, propertyProofUrl);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/verifications/:id (Admin approve/reject)
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    db.prepare('UPDATE verifications SET status = ? WHERE id = ?').run(status, id);
    
    // If approved, update user verification status
    if (status === 'Approved') {
      const verification = db.prepare('SELECT user_id FROM verifications WHERE id = ?').get(id) as any;
      if (verification) {
        db.prepare('UPDATE users SET verified = 1 WHERE id = ?').run(verification.user_id);
      }
    }
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
