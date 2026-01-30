const express = require('express');
const pool = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all published posts
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let query = `SELECT bp.*, u.first_name as author_first_name, u.last_name as author_last_name FROM blog_posts bp LEFT JOIN users u ON bp.author_id = u.id WHERE bp.status = 'published'`;
    const params = [];
    if (category) { query += ` AND bp.category = $1`; params.push(category); }
    query += ` ORDER BY bp.published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    const result = await pool.query(query, params);
    res.json({ posts: result.rows });
  } catch (error) { next(error); }
});

// Get single post by slug
router.get('/slug/:slug', async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT bp.*, u.first_name as author_first_name, u.last_name as author_last_name FROM blog_posts bp LEFT JOIN users u ON bp.author_id = u.id WHERE bp.slug = $1`, [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    await pool.query(`UPDATE blog_posts SET views = views + 1 WHERE slug = $1`, [req.params.slug]);
    res.json({ post: result.rows[0] });
  } catch (error) { next(error); }
});

// Create post (admin)
router.post('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, featuredImage, category, tags, status } = req.body;
    const publishedAt = status === 'published' ? new Date() : null;
    const result = await pool.query(
      `INSERT INTO blog_posts (author_id, title, slug, excerpt, content, featured_image, category, tags, status, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [req.user.id, title, slug, excerpt, content, featuredImage, category, tags, status || 'draft', publishedAt]
    );
    res.status(201).json({ post: result.rows[0] });
  } catch (error) { next(error); }
});

// Update post (admin)
router.put('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, featuredImage, category, tags, status } = req.body;
    const result = await pool.query(
      `UPDATE blog_posts SET title = $1, slug = $2, excerpt = $3, content = $4, featured_image = $5, category = $6, tags = $7, status = $8, updated_at = NOW() WHERE id = $9 RETURNING *`,
      [title, slug, excerpt, content, featuredImage, category, tags, status, req.params.id]
    );
    res.json({ post: result.rows[0] });
  } catch (error) { next(error); }
});

// Delete post (admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    await pool.query(`DELETE FROM blog_posts WHERE id = $1`, [req.params.id]);
    res.json({ message: 'Post deleted' });
  } catch (error) { next(error); }
});

// Get all posts (admin)
router.get('/admin/all', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM blog_posts ORDER BY created_at DESC`);
    res.json({ posts: result.rows });
  } catch (error) { next(error); }
});

module.exports = router;
