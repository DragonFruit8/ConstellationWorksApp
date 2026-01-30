import { useState } from 'react';
import axios from 'axios';

export default function Volunteer() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', availability: '', skills: '', experience: '', whyVolunteer: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...formData, skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean) };
      await axios.post('/api/applications/volunteer', data);
      setStatus({ type: 'success', message: 'Application submitted! We will review it and contact you soon.' });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', availability: '', skills: '', experience: '', whyVolunteer: '' });
    } catch (err) { setStatus({ type: 'error', message: 'Failed to submit. Please try again.' }); }
    finally { setLoading(false); }
  };

  const inputStyle = { width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f5f1e8', fontSize: '1rem', marginBottom: '1rem' };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem', background: 'linear-gradient(180deg, #0d1b2a 0%, #1b3a4b 50%, #2d4a3e 100%)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#7dad7a', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Join Our Team</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', marginTop: '0.5rem' }}>Volunteer With Us</h1>
          <p style={{ opacity: 0.8, marginTop: '1rem' }}>Help us build pathways from crisis to stability through land stewardship and community support.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(125,173,122,0.2)' }}>
          {status.message && <div style={{ background: status.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(220,38,38,0.2)', color: status.type === 'success' ? '#86efac' : '#fca5a5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{status.message}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
          </div>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
          <input type="text" name="availability" placeholder="Availability (e.g., Weekends, Evenings)" value={formData.availability} onChange={handleChange} style={inputStyle} />
          <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} style={inputStyle} />
          <textarea name="experience" placeholder="Relevant Experience" value={formData.experience} onChange={handleChange} rows="3" style={{ ...inputStyle, resize: 'vertical' }} />
          <textarea name="whyVolunteer" placeholder="Why do you want to volunteer with us?" value={formData.whyVolunteer} onChange={handleChange} rows="3" style={{ ...inputStyle, resize: 'vertical' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', background: '#7dad7a', color: '#0d1b2a', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Submitting...' : 'Submit Application'}</button>
        </form>
      </div>
    </div>
  );
}
