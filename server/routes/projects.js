const express = require('express');
const pool = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM projects WHERE status != 'archived' ORDER BY is_featured DESC, created_at DESC`);
    res.json({ projects: result.rows });
  } catch (error) { next(error); }
});

router.get('/slug/:slug', async (req, res, next) => {
  try {
    const project = await pool.query(`SELECT * FROM projects WHERE slug = $1`, [req.params.slug]);
    if (project.rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    const updates = await pool.query(`SELECT * FROM project_updates WHERE project_id = $1 ORDER BY created_at DESC`, [project.rows[0].id]);
    const milestones = await pool.query(`SELECT * FROM project_milestones WHERE project_id = $1 ORDER BY order_index`, [project.rows[0].id]);
    res.json({ project: project.rows[0], updates: updates.rows, milestones: milestones.rows });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { name, slug, description, detailedDescription, status, startDate, targetCompletionDate, budget, featuredImage, location, isFeatured } = req.body;
    const result = await pool.query(
      `INSERT INTO projects (name, slug, description, detailed_description, status, start_date, target_completion_date, budget, featured_image, location, coordinator_id, is_featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [name, slug, description, detailedDescription, status || 'planning', startDate, targetCompletionDate, budget, featuredImage, location, req.user.id, isFeatured || false]
    );
    res.status(201).json({ project: result.rows[0] });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { name, slug, description, detailedDescription, status, startDate, targetCompletionDate, budget, amountRaised, progressPercentage, featuredImage, location, isFeatured } = req.body;
    const result = await pool.query(
      `UPDATE projects SET name=$1, slug=$2, description=$3, detailed_description=$4, status=$5, start_date=$6, target_completion_date=$7, budget=$8, amount_raised=$9, progress_percentage=$10, featured_image=$11, location=$12, is_featured=$13, updated_at=NOW() WHERE id=$14 RETURNING *`,
      [name, slug, description, detailedDescription, status, startDate, targetCompletionDate, budget, amountRaised, progressPercentage, featuredImage, location, isFeatured, req.params.id]
    );
    res.json({ project: result.rows[0] });
  } catch (error) { next(error); }
});

router.post('/:id/updates', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { title, content, images } = req.body;
    const result = await pool.query(`INSERT INTO project_updates (project_id, author_id, title, content, images) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [req.params.id, req.user.id, title, content, images]);
    res.status(201).json({ update: result.rows[0] });
  } catch (error) { next(error); }
});

router.post('/:id/milestones', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { title, description, targetDate, orderIndex } = req.body;
    const result = await pool.query(`INSERT INTO project_milestones (project_id, title, description, target_date, order_index) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [req.params.id, title, description, targetDate, orderIndex || 0]);
    res.status(201).json({ milestone: result.rows[0] });
  } catch (error) { next(error); }
});

module.exports = router;
