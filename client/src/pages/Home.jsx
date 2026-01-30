import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { name: "Emergency Stabilization", icon: "🏕️", description: "Immediate access to food, shelter, and safety.", color: "#c9a227" },
    { name: "Transitional Support", icon: "🌱", description: "Building skills through land stewardship and community.", color: "#7dad7a" },
    { name: "Permanent Housing", icon: "🏡", description: "Low-impact housing integrated into restored landscapes.", color: "#5a8f7b" },
    { name: "Sustained Purpose", icon: "⭐", description: "Long-term stability through meaningful work and bonds.", color: "#3d6a7a" }
  ];

  const stars = Array.from({ length: 60 }, (_, i) => ({ id: i, w: Math.random() * 3 + 1, t: Math.random() * 100, l: Math.random() * 100, g: i % 5 === 0, d: 2 + Math.random() * 4, dl: Math.random() * 3 }));

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.6 }}>
        {stars.map(s => <div key={s.id} style={{ position: 'absolute', width: s.w+'px', height: s.w+'px', background: s.g ? '#c9a227' : '#f5f1e8', borderRadius: '50%', top: s.t+'%', left: s.l+'%', animation: `twinkle ${s.d}s ease-in-out infinite`, animationDelay: s.dl+'s', boxShadow: s.g ? '0 0 6px #c9a227' : '0 0 4px rgba(255,255,255,0.5)' }} />)}
      </div>
      <style>{`@keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '6rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'float 6s ease-in-out infinite' }}>✦</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, lineHeight: 1.15, maxWidth: '900px', marginBottom: '1.5rem', animation: 'fadeInUp 1s ease forwards' }}>
          Building Pathways from<br/><span style={{ color: '#c9a227' }}>Crisis to Constellation</span>
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '650px', lineHeight: 1.7, opacity: 0.9, marginBottom: '2.5rem' }}>
          Dignity-first housing solutions with ecological land restoration, where both people and the earth heal together.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/donate" className="btn btn-primary">Support Our Mission</Link>
          <Link to="/volunteer" className="btn btn-secondary">Get Involved</Link>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, transparent, rgba(45, 74, 62, 0.3))', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.5 }}>
            "Homelessness is not inevitable. With the right support, people… <span style={{ color: '#c9a227' }}>come back.</span>"
          </blockquote>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Our Approach</span>
            <h2 className="section-title">A Phased Journey to Stability</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {phases.map((p, i) => (
              <div key={i} className="card" onMouseEnter={() => setActivePhase(i)} style={{ background: activePhase === i ? `linear-gradient(135deg, ${p.color}22, ${p.color}11)` : undefined, borderColor: activePhase === i ? p.color : undefined, cursor: 'pointer' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>{p.name}</h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.85, margin: 0 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, rgba(201, 162, 39, 0.08), rgba(201, 162, 39, 0.15))', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">Ready to Make a Difference?</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '1.5rem 0 2rem' }}>Every contribution helps build pathways out of homelessness.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/donate" className="btn btn-primary">Donate Now</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
