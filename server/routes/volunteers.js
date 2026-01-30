const express = require('express');
const pool = require('../config/db');
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Submit volunteer application
router.post('/', optionalAuth, async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, address, city, state, zipCode, availability, skills, interests, experience, whyVolunteer, backgroundCheckConsent } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }

    const result = await pool.query(
      `INSERT INTO volunteer_applications (user_id, first_name, last_name, email, phone, address, city, state, zip_code, availability, skills, interests, experience, why_volunteer, background_check_consent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [req.user?.id || null, firstName, lastName, email, phone, address, city, state, zipCode, availability, skills, interests, experience, whyVolunteer, backgroundCheckConsent || false]
    );

    res.status(201).json({ message: 'Thank you for your application! We will review it and get back to you.', application: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Submit resident application
router.post('/resident', async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, dateOfBirth, currentSituation, housingHistory, employmentStatus, incomeSource, healthConsiderations, emergencyContactName, emergencyContactPhone, emergencyContactRelation, referencesInfo, additionalInfo } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    const result = await pool.query(
      `INSERT INTO resident_applications (first_name, last_name, email, phone, date_of_birth, current_situation, housing_history, employment_status, income_source, health_considerations, emergency_contact_name, emergency_contact_phone, emergency_contact_relation, references_info, additional_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [firstName, lastName, email, phone, dateOfBirth, currentSituation, housingHistory, employmentStatus, incomeSource, healthConsiderations, emergencyContactName, emergencyContactPhone, emergencyContactRelation, referencesInfo, additionalInfo]
    );

    res.status(201).json({ message: 'Thank you for your application. We will review it carefully and contact you.', application: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Get all volunteer applications (admin)
router.get('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `SELECT * FROM volunteer_applications`;
    const params = [];
    if (status) { query += ` WHERE status = $1`; params.push(status); }
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    res.json({ applications: result.rows });
  } catch (error) {
    next(error);
  }
});

// Get all resident applications (admin)
router.get('/residents', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM resident_applications ORDER BY created_at DESC`);
    res.json({ applications: result.rows });
  } catch (error) {
    next(error);
  }
});

// Update application status (admin)
router.put('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const result = await pool.query(
      `UPDATE volunteer_applications SET status = $1, notes = $2, reviewed_by = $3, reviewed_at = NOW() WHERE id = $4 RETURNING *`,
      [status, notes, req.user.id, req.params.id]
    );
    res.json({ application: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
