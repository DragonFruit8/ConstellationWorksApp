import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../utils/api';

export default function Donate() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    donor_name: user?.first_name ? `${user.first_name} ${user.last_name}` : '',
    donor_email: user?.email || '',
    donor_phone: '',
    is_anonymous: false,
    is_recurring: false,
    recurring_frequency: 'monthly',
    notes: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500, 1000];
  const finalAmount = customAmount || amount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setStatus({ type: 'error', message: 'Please select or enter a donation amount.' });
      return;
    }
    setLoading(true);
    try {
      await api.post('/donations', { ...formData, amount: parseFloat(finalAmount) });
      setStatus({ type: 'success', message: 'Thank you for your generous donation! 🌟' });
      setAmount(''); setCustomAmount('');
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  const paymentMethods = [
    { method: 'Cash App', handle: '$POWRDesign', icon: '💵' },
    { method: 'Venmo', handle: '@JTBPhoenix', icon: '💳' },
    { method: 'PayPal', handle: 'paypal.me/JTBPhoenix', icon: '🅿️' },
    { method: 'Apple Pay', handle: '(734) 351-8601', icon: '🍎' }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Support Our Mission</span>
          <h1 className="section-title">Make a Donation</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '1rem auto' }}>
            Your generosity helps build pathways out of homelessness and restore land for future generations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Quick Donate Methods */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', marginBottom: '1.5rem', color: '#c9a227' }}>
              Quick Donate
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {paymentMethods.map((pm, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{pm.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{pm.method}</p>
                    <p style={{ fontSize: '0.9rem', color: '#c9a227' }}>{pm.handle}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.7, textAlign: 'center' }}>
              Checks payable to:<br/><strong>The Constellation Project - Terra'Novare, LLC</strong>
            </p>
          </div>

          {/* Donation Form */}
          <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', marginBottom: '1.5rem', color: '#c9a227' }}>
              Record Your Donation
            </h3>
            
            {status.message && (
              <div style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px', background: status.type === 'success' ? 'rgba(125, 173, 122, 0.2)' : 'rgba(220, 53, 69, 0.2)', border: `1px solid ${status.type === 'success' ? '#7dad7a' : '#dc3545'}` }}>
                {status.message}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Select Amount</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {presetAmounts.map(a => (
                  <button type="button" key={a} onClick={() => { setAmount(a); setCustomAmount(''); }}
                    style={{ padding: '0.75rem', borderRadius: '8px', border: amount === a ? '2px solid #c9a227' : '1px solid rgba(255,255,255,0.2)', background: amount === a ? 'rgba(201, 162, 39, 0.2)' : 'transparent', color: '#f5f1e8', cursor: 'pointer', fontWeight: 600 }}>
                    ${a}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Custom Amount ($)</label>
              <input type="number" min="1" step="0.01" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setAmount(''); }} placeholder="Enter amount" />
            </div>

            <div className="form-group">
              <label>Your Name</label>
              <input type="text" value={formData.donor_name} onChange={e => setFormData({...formData, donor_name: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.donor_email} onChange={e => setFormData({...formData, donor_email: e.target.value})} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.is_anonymous} onChange={e => setFormData({...formData, is_anonymous: e.target.checked})} />
                Donate anonymously
              </label>
            </div>

            <div className="form-group">
              <label>Note (optional)</label>
              <textarea rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Add a message..." />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Recording...' : `Record ${finalAmount ? `$${finalAmount}` : ''} Donation`}
            </button>
          </form>
        </div>

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', marginBottom: '0.5rem' }}>Your Impact</h3>
          <p style={{ opacity: 0.9 }}>
            Every dollar funds emergency stabilization, permanent housing, land restoration, digital access, and workforce development.
          </p>
        </div>
      </div>
    </div>
  );
}
