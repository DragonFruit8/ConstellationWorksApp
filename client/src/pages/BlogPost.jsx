import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/blog/${slug}`);
        setPost(res.data);
      } catch (err) {
        setError('Post not found');
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', animation: 'pulse 2s infinite' }}>✦</div>
          <p>Loading...</p>
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1rem' }}>Post Not Found</h2>
          <Link to="/blog" className="btn btn-secondary">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/blog" style={{ color: '#c9a227', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          ← Back to Blog
        </Link>

        {post.category && (
          <span style={{ display: 'block', color: '#c9a227', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            {post.category}
          </span>
        )}

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '1rem' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
          <span>{formatDate(post.published_at || post.created_at)}</span>
          {post.author && <span>by {post.author.first_name} {post.author.last_name}</span>}
          {post.views > 0 && <span>{post.views} views</span>}
        </div>

        {post.featured_image && (
          <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={post.featured_image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}

        <div 
          style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#f5f1e8' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {post.tags.map((tag, i) => (
                <span key={i} style={{ padding: '0.25rem 0.75rem', background: 'rgba(201, 162, 39, 0.15)', border: '1px solid rgba(201, 162, 39, 0.3)', borderRadius: '15px', fontSize: '0.85rem' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', marginBottom: '1rem' }}>Support Our Mission</h3>
          <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>Help us build more pathways from crisis to constellation.</p>
          <Link to="/donate" className="btn btn-primary">Donate Now</Link>
        </div>
      </article>
    </div>
  );
}
