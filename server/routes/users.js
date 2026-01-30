const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { auth } = require('../middleware/auth');

router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, city, state, zip } = req.body;
    const result = await pool.query(
      `UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), phone = COALESCE($3, phone), address = COALESCE($4, address), city = COALESCE($5, city), state = COALESCE($6, state), zip = COALESCE($7, zip), updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *`,
      [firstName, lastName, phone, address, city, state, zip, req.user.id]
    );
    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/donations', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donations WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
