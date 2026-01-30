const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../config/db');
const { auth } = require('../middleware/auth');

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { email, password, firstName, lastName, phone } = req.body;
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) return res.status(400).json({ message: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, first_name, last_name, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role',
      [email, hashedPassword, firstName, lastName, phone]
    );
    
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, role: user.role } });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    
    const user = result.rows[0];
    if (!user.is_active) return res.status(401).json({ message: 'Account deactivated' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, role: user.role } });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

router.get('/me', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, role, phone, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    const user = result.rows[0];
    res.json({ id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, role: user.role, phone: user.phone, createdAt: user.created_at });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
