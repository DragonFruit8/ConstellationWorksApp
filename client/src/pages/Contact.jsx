import React, { useState } from 'react';
import { api } from '../utils/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      setStatus({ type: 'success', message: 'Thank you! We\'ll be in touch soon.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Get In Touch</span>
          <h1 className="section-title">Contact Us</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '1rem auto' }}>
            Have questions about our programs, want to volunteer, or interested in partnering? We'd love to hear from you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '1.5rem', color: '#c9a227' }}>
              Reach Out Directly
            </h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>📧 Email</p>
              <a href="mailto:terranovare42@gmail.com" style={{ color: '#c9a227' }}>terranovare42@gmail.com</a>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>📱 Phone</p>
              <a href="tel:7343518601" style={{ color: '#f5f1e8' }}>(734) 351-8601</a>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>📍 Location</p>
              <p style={{ opacity: 0.8 }}>Rural Michigan</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '12px', border: '1px solid rgba(201, 162, 39, 0.2)', marginTop: '2rem' }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', opacity: 0.9 }}>
                "Together, we're building second chances that last."
              </p>
              <p style={{ marginTop: '0.5rem', fontWeight: 600, color: '#c9a227' }}>— Constellation Works</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
            {status.message && (
              <div style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px', background: status.type === 'success' ? 'rgba(125, 173, 122, 0.2)' : 'rgba(220, 53, 69, 0.2)', border: `1px solid ${status.type === 'success' ? '#7dad7a' : '#dc3545'}` }}>
                {status.message}
              </div>
            )}
            <div className="form-group">
              <label>Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                <option value="">Select a topic...</option>
                <option value="general">General Inquiry</option>
                <option value="volunteer">Volunteering</option>
                <option value="donate">Donations</option>
                <option value="partnership">Partnership</option>
                <option value="media">Media/Press</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required placeholder="How can we help you?" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
