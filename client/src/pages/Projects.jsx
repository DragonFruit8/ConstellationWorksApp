import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    const colors = { planning: '#3d6a7a', active: '#7dad7a', completed: '#c9a227', 'on-hold': '#8b7355' };
    return colors[status] || '#666';
  };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Our Work</span>
          <h1 className="section-title">Current Projects</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '1rem auto' }}>
            Follow our journey as we build housing, restore land, and create community.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '2rem', animation: 'pulse 2s infinite' }}>✦</div>
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏗️</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '1rem' }}>Projects Coming Soon</h3>
            <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>We're currently developing our first rural land restoration and housing project in Michigan.</p>
            <Link to="/contact" className="btn btn-secondary">Get Notified</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {projects.map(project => (
              <Link to={`/projects/${project.slug}`} key={project.id} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gridTemplateColumns: project.featured_image ? '300px 1fr' : '1fr', gap: '2rem', alignItems: 'center' }}>
                {project.featured_image && (
                  <div style={{ height: '200px', background: `url(${project.featured_image}) center/cover`, borderRadius: '8px' }} />
                )}
                <div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', background: getStatusColor(project.status), borderRadius: '12px', fontSize: '0.8rem', textTransform: 'capitalize' }}>
                      {project.status}
                    </span>
                    {project.location && <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>📍 {project.location}</span>}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {project.name}
                  </h3>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1rem' }}>
                    {project.description}
                  </p>
                  {project.budget > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Progress: {project.progress_percentage || 0}%</span>
                        <span>${(project.amount_raised || 0).toLocaleString()} / ${project.budget.toLocaleString()}</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${project.progress_percentage || 0}%`, background: 'linear-gradient(90deg, #c9a227, #7dad7a)', borderRadius: '4px', transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  )}
                  <span style={{ color: '#c9a227', fontSize: '0.9rem' }}>View details →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={{ marginTop: '4rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(45, 74, 62, 0.4), rgba(27, 58, 75, 0.4))', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', marginBottom: '1rem' }}>Want to Help?</h3>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>Your support makes these projects possible.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/donate" className="btn btn-primary">Donate</Link>
            <Link to="/volunteer" className="btn btn-secondary">Volunteer</Link>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
    </div>
  );
}
