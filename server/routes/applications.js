const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { auth, optionalAuth, staffOnly } = require('../middleware/auth');

router.post('/volunteer', optionalAuth, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, availability, skills, experience, whyVolunteer } = req.body;
    const result = await pool.query(
      'INSERT INTO volunteer_applications (user_id, first_name, last_name, email, phone, availability, skills, experience, why_volunteer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [req.user?.id, firstName, lastName, email, phone, availability, skills || [], experience, whyVolunteer]
    );
    res.status(201).json({ message: 'Application submitted', id: result.rows[0].id });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.post('/resident', optionalAuth, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, currentSituation, goals, skillsInterests } = req.body;
    const result = await pool.query(
      'INSERT INTO resident_applications (user_id, first_name, last_name, email, phone, current_situation, goals, skills_interests) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [req.user?.id, firstName, lastName, email, phone, currentSituation, goals, skillsInterests]
    );
    res.status(201).json({ message: 'Application submitted', id: result.rows[0].id });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/volunteer', auth, staffOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM volunteer_applications ORDER BY created_at DESC');
    res.json({ applications: result.rows });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/resident', auth, staffOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM resident_applications ORDER BY created_at DESC');
    res.json({ applications: result.rows });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.put('/volunteer/:id', auth, staffOnly, async (req, res) => {
  try {
    const { status, reviewerNotes } = req.body;
    const result = await pool.query('UPDATE volunteer_applications SET status = COALESCE($1, status), reviewer_id = $2, reviewer_notes = COALESCE($3, reviewer_notes), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *', [status, req.user.id, reviewerNotes, req.params.id]);
    res.json({ application: result.rows[0] });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.put('/resident/:id', auth, staffOnly, async (req, res) => {
  try {
    const { status, reviewerNotes } = req.body;
    const result = await pool.query('UPDATE resident_applications SET status = COALESCE($1, status), reviewer_id = $2, reviewer_notes = COALESCE($3, reviewer_notes), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *', [status, req.user.id, reviewerNotes, req.params.id]);
    res.json({ application: result.rows[0] });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
