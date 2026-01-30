import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    { icon: '🏠', title: 'Dignity First', desc: 'Every person deserves safe, stable housing and the respect that comes with it.' },
    { icon: '🌿', title: 'Land Stewardship', desc: 'We restore the earth as we restore lives, creating sustainable ecosystems.' },
    { icon: '🤝', title: 'Community', desc: 'We build connections that support long-term stability and belonging.' },
    { icon: '⭐', title: 'Purpose', desc: 'Meaningful work and contribution are essential to human flourishing.' }
  ];

  const team = [
    { name: 'Joshua Tramel Byers', role: 'Co-Founder', bio: 'Passionate advocate for housing justice and ecological restoration.' }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Who We Are</span>
          <h1 className="section-title">About Constellation Works</h1>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, maxWidth: '700px', margin: '1.5rem auto', lineHeight: 1.8 }}>
            Constellation Works is a nonprofit initiative of <strong style={{ color: '#c9a227' }}>Terra'Novare LLC</strong>, 
            dedicated to creating dignity-first pathways out of homelessness through integrated community housing 
            and ecological land restoration.
          </p>
        </div>

        {/* Mission */}
        <section style={{ marginBottom: '4rem', padding: '3rem', background: 'linear-gradient(135deg, rgba(45, 74, 62, 0.3), rgba(27, 58, 75, 0.3))', borderRadius: '16px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', textAlign: 'center', marginBottom: '1.5rem' }}>Our Mission</h2>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.5 }}>
            "Homelessness is not inevitable. With the right support, people… <span style={{ color: '#c9a227' }}>come back.</span>"
          </blockquote>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.9 }}>
            We combine housing stability with environmental stewardship, creating rural communities 
            where both people and the earth can heal and thrive together.
          </p>
        </section>

        {/* Our Approach */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>Our Approach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {['Emergency Stabilization', 'Transitional Support', 'Permanent Housing', 'Sustained Purpose'].map((phase, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#c9a227', color: '#0d1b2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, margin: '0 auto 1rem' }}>{i + 1}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600 }}>{phase}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>Our Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>Leadership</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {team.map((member, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', maxWidth: '300px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a227, #7dad7a)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                  👤
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600 }}>{member.name}</h3>
                <p style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{member.role}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '3rem', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '16px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', marginBottom: '1rem' }}>Join Our Mission</h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>Together, we can build pathways from crisis to constellation.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/donate" className="btn btn-primary">Donate</Link>
            <Link to="/volunteer" className="btn btn-secondary">Volunteer</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
