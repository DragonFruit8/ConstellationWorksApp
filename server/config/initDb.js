const pool = require('./db');

const initializeDatabase = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        phone VARCHAR(20),
        role VARCHAR(50) DEFAULT 'user',
        avatar_url TEXT,
        is_active BOOLEAN DEFAULT true,
        email_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Donations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        payment_method VARCHAR(50),
        payment_status VARCHAR(50) DEFAULT 'pending',
        transaction_id VARCHAR(255),
        donor_name VARCHAR(255),
        donor_email VARCHAR(255),
        donor_phone VARCHAR(20),
        is_anonymous BOOLEAN DEFAULT false,
        is_recurring BOOLEAN DEFAULT false,
        recurring_frequency VARCHAR(20),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact submissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
        response TEXT,
        responded_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Volunteer applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS volunteer_applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(50),
        zip_code VARCHAR(20),
        availability TEXT,
        skills TEXT,
        interests TEXT[],
        experience TEXT,
        why_volunteer TEXT,
        background_check_consent BOOLEAN DEFAULT false,
        status VARCHAR(50) DEFAULT 'pending',
        reviewed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        reviewed_at TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Resident applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS resident_applications (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        date_of_birth DATE,
        current_situation TEXT,
        housing_history TEXT,
        employment_status VARCHAR(100),
        income_source VARCHAR(255),
        health_considerations TEXT,
        emergency_contact_name VARCHAR(255),
        emergency_contact_phone VARCHAR(20),
        emergency_contact_relation VARCHAR(100),
        references_info TEXT,
        additional_info TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        reviewed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        reviewed_at TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Blog posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        featured_image TEXT,
        category VARCHAR(100),
        tags TEXT[],
        status VARCHAR(50) DEFAULT 'draft',
        published_at TIMESTAMP,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Projects table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        detailed_description TEXT,
        status VARCHAR(50) DEFAULT 'planning',
        start_date DATE,
        target_completion_date DATE,
        actual_completion_date DATE,
        budget DECIMAL(12, 2),
        amount_raised DECIMAL(12, 2) DEFAULT 0,
        progress_percentage INTEGER DEFAULT 0,
        featured_image TEXT,
        gallery_images TEXT[],
        location VARCHAR(255),
        coordinator_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Project updates table
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_updates (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        images TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Project milestones table
    await client.query(`
      CREATE TABLE IF NOT EXISTS project_milestones (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        target_date DATE,
        completed_date DATE,
        is_completed BOOLEAN DEFAULT false,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Site settings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        type VARCHAR(50) DEFAULT 'string',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Activity log table
    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(255) NOT NULL,
        entity_type VARCHAR(100),
        entity_id INTEGER,
        details JSONB,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Newsletter subscribers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at TIMESTAMP
      )
    `);

    // Create indexes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)`);

    await client.query('COMMIT');
    console.log('✦ Database initialized successfully');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = initializeDatabase;
