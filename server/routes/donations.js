const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { auth, optionalAuth, adminOnly } = require('../middleware/auth');

router.post('/', optionalAuth, async (req, res) => {
  try {
    const { amount, paymentMethod, donorName, donorEmail, donorPhone, isAnonymous, message, projectAllocation } = req.body;
    const result = await pool.query(
      'INSERT INTO donations (user_id, amount, payment_method, donor_name, donor_email, donor_phone, is_anonymous, message, project_allocation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [req.user?.id, amount, paymentMethod, donorName, donorEmail, donorPhone, isAnonymous, message, projectAllocation]
    );
    res.status(201).json({ message: 'Donation recorded', donation: result.rows[0] });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await pool.query("SELECT COUNT(*) as total, COALESCE(SUM(amount), 0) as raised FROM donations WHERE status = 'completed'");
    res.json({ totalDonations: parseInt(stats.rows[0].total), totalRaised: parseFloat(stats.rows[0].raised) });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donations ORDER BY created_at DESC');
    res.json({ donations: result.rows });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
