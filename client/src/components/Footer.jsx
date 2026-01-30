import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ padding: '4rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#c9a227' }}>✦</span> Constellation Works
          </div>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, margin: 0 }}>A program of Terra'Novare LLC</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ color: '#f5f1e8', opacity: 0.8 }}>Contact</Link>
          <Link to="/volunteer" style={{ color: '#f5f1e8', opacity: 0.8 }}>Volunteer</Link>
          <Link to="/donate" style={{ color: '#c9a227' }}>Donate</Link>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '0.5rem' }}><a href="tel:7343518601" style={{ color: '#f5f1e8', textDecoration: 'none', opacity: 0.9 }}>(734) 351-8601</a></div>
          <div><a href="mailto:terranovare42@gmail.com" style={{ color: '#c9a227', textDecoration: 'none' }}>terranovare42@gmail.com</a></div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '0.85rem', opacity: 0.5 }}>
        © {new Date().getFullYear()} Constellation Works. All rights reserved.
      </div>
    </footer>
  );
}
