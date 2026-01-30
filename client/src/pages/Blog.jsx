import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/blog');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = ['all', 'news', 'updates', 'stories', 'education'];
  const filteredPosts = category === 'all' ? posts : posts.filter(p => p.category === category);

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">News & Stories</span>
          <h1 className="section-title">Our Blog</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '1rem auto' }}>
            Updates on our projects, stories from our community, and insights on housing & land restoration.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '20px', border: category === cat ? '2px solid #c9a227' : '1px solid rgba(255,255,255,0.2)', background: category === cat ? 'rgba(201, 162, 39, 0.2)' : 'transparent', color: '#f5f1e8', cursor: 'pointer', textTransform: 'capitalize' }}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '2rem', animation: 'pulse 2s infinite' }}>✦</div>
            <p>Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Posts Yet</h3>
            <p style={{ opacity: 0.7 }}>Check back soon for updates on our projects and community.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredPosts.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="card" style={{ textDecoration: 'none', color: 'inherit', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {post.featured_image && (
                  <div style={{ height: '180px', background: `url(${post.featured_image}) center/cover`, marginBottom: '1rem', borderRadius: '8px' }} />
                )}
                <div style={{ padding: post.featured_image ? '0' : '0.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {post.category && (
                    <span style={{ color: '#c9a227', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      {post.category}
                    </span>
                  )}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1rem', flex: 1 }}>
                    {post.excerpt || post.content?.substring(0, 120) + '...'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', opacity: 0.6 }}>
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                    <span style={{ color: '#c9a227' }}>Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }`}</style>
    </div>
  );
}
