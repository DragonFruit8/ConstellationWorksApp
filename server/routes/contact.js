const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { auth, staffOnly } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const result = await pool.query('INSERT INTO contact_submissions (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, email, phone, subject, message]);
    res.status(201).json({ message: 'Message sent successfully', id: result.rows[0].id });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/', auth, staffOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
    res.json({ submissions: result.rows });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id', auth, staffOnly, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const result = await pool.query('UPDATE contact_submissions SET status = COALESCE($1, status), notes = COALESCE($2, notes), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *', [status, notes, req.params.id]);
    res.json({ submission: result.rows[0] });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
