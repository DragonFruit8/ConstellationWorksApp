import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    setError(''); setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) { setError(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const inputStyle = { width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f5f1e8', fontSize: '1rem', marginBottom: '1rem' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'linear-gradient(180deg, #0d1b2a 0%, #1b3a4b 100%)' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600 }}><span style={{ color: '#c9a227' }}>✦</span> Constellation Works</Link>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', marginTop: '1rem' }}>Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          {error && <div style={{ background: 'rgba(220,38,38,0.2)', color: '#fca5a5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
          </div>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', background: '#c9a227', color: '#0d1b2a', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Creating account...' : 'Sign Up'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.7 }}>Already have an account? <Link to="/login" style={{ color: '#c9a227' }}>Sign in</Link></p>
      </div>
    </div>
  );
}
