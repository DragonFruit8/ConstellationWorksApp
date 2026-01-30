import React, { useState } from 'react';
import { api } from '../utils/api';

export default function Apply() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', date_of_birth: '',
    current_situation: '', housing_history: '', employment_status: '', income_source: '',
    health_considerations: '', emergency_contact_name: '', emergency_contact_phone: '',
    emergency_contact_relation: '', additional_info: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/applications/resident', formData);
      setStatus({ type: 'success', message: 'Application submitted successfully! We will contact you soon.' });
      setStep(4);
    } catch (err) {
      setStatus({ type: 'error', message: 'Error submitting application. Please try again.' });
    }
    setLoading(false);
  };

  const updateField = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-label">Housing Program</span>
          <h1 className="section-title">Resident Application</h1>
          <p style={{ opacity: 0.9 }}>Apply for our dignity-first community housing program.</p>
        </div>

        {/* Progress Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ width: '60px', height: '4px', borderRadius: '2px', background: step >= s ? '#c9a227' : 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>

        {step === 4 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#c9a227', marginBottom: '1rem' }}>Application Received</h2>
            <p style={{ opacity: 0.9 }}>Thank you for applying. Our team will review your application and contact you within 5-7 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
            {status.type === 'error' && (
              <div style={{ padding: '1rem', marginBottom: '1rem', background: 'rgba(220, 53, 69, 0.2)', border: '1px solid #dc3545', borderRadius: '8px' }}>{status.message}</div>
            )}

            {step === 1 && (
              <>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', marginBottom: '1.5rem', color: '#c9a227' }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" value={formData.first_name} onChange={e => updateField('first_name', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" value={formData.last_name} onChange={e => updateField('last_name', e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" value={formData.date_of_birth} onChange={e => updateField('date_of_birth', e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', marginBottom: '1.5rem', color: '#c9a227' }}>Current Situation</h3>
                <div className="form-group">
                  <label>Describe your current housing situation *</label>
                  <textarea rows={4} value={formData.current_situation} onChange={e => updateField('current_situation', e.target.value)} required placeholder="Where are you currently staying? How long have you been there?" />
                </div>
                <div className="form-group">
                  <label>Housing History</label>
                  <textarea rows={3} value={formData.housing_history} onChange={e => updateField('housing_history', e.target.value)} placeholder="Brief history of your housing over the past few years" />
                </div>
                <div className="form-group">
                  <label>Employment Status</label>
                  <select value={formData.employment_status} onChange={e => updateField('employment_status', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="employed">Employed</option>
                    <option value="part-time">Part-time</option>
                    <option value="unemployed">Unemployed - Seeking</option>
                    <option value="disabled">Disabled</option>
                    <option value="retired">Retired</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Income Source (if any)</label>
                  <input type="text" value={formData.income_source} onChange={e => updateField('income_source', e.target.value)} placeholder="SSI, employment, etc." />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', marginBottom: '1.5rem', color: '#c9a227' }}>Additional Information</h3>
                <div className="form-group">
                  <label>Health Considerations</label>
                  <textarea rows={3} value={formData.health_considerations} onChange={e => updateField('health_considerations', e.target.value)} placeholder="Any health conditions we should be aware of to better support you" />
                </div>
                <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Emergency Contact</h4>
                <div className="form-group">
                  <label>Contact Name</label>
                  <input type="text" value={formData.emergency_contact_name} onChange={e => updateField('emergency_contact_name', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input type="tel" value={formData.emergency_contact_phone} onChange={e => updateField('emergency_contact_phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Relationship</label>
                    <input type="text" value={formData.emergency_contact_relation} onChange={e => updateField('emergency_contact_relation', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Anything else you'd like us to know?</label>
                  <textarea rows={3} value={formData.additional_info} onChange={e => updateField('additional_info', e.target.value)} />
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {step > 1 && <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>← Back</button>}
              {step < 3 ? (
                <button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setStep(step + 1)}>Next →</button>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ marginLeft: 'auto' }} disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</button>
              )}
            </div>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
          All information is kept confidential. Need help? <a href="tel:7343518601" style={{ color: '#c9a227' }}>Call (734) 351-8601</a>
        </p>
      </div>
    </div>
  );
}
