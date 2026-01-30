// Admin routes for Constellation Works
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/dashboard', auth, adminOnly, async (req, res) => {
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const donations = await pool.query("SELECT COUNT(*) as count, COALESCE(SUM(amount), 0) as total FROM donations WHERE status = 'completed'");
    const volunteers = await pool.query("SELECT COUNT(*) FROM volunteer_applications WHERE status = 'pending'");
    const residents = await pool.query("SELECT COUNT(*) FROM resident_applications WHERE status = 'pending'");
    const contacts = await pool.query("SELECT COUNT(*) FROM contact_submissions WHERE status = 'new'");
    
    const recentDonations = await pool.query("SELECT amount, donor_name, created_at FROM donations WHERE status = 'completed' ORDER BY created_at DESC LIMIT 5");
    const recentActivity = await pool.query('SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 10');
    
    res.json({
      stats: {
        totalUsers: parseInt(users.rows[0].count),
        totalDonations: parseInt(donations.rows[0].count),
        totalRaised: parseFloat(donations.rows[0].total),
        pendingVolunteers: parseInt(volunteers.rows[0].count),
        pendingResidents: parseInt(residents.rows[0].count),
        newMessages: parseInt(contacts.rows[0].count)
      },
      recentDonations: recentDonations.rows,
      recentActivity: recentActivity.rows
    });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, role, is_active, created_at FROM users ORDER BY created_at DESC');
    res.json({ users: result.rows });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.put('/users/:id', auth, adminOnly, async (req, res) => {
  try {
    const { role, isActive } = req.body;
    const result = await pool.query(
      'UPDATE users SET role = COALESCE($1, role), is_active = COALESCE($2, is_active), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, email, first_name, last_name, role, is_active',
      [role, isActive, req.params.id]
    );
    res.json({ user: result.rows[0] });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
