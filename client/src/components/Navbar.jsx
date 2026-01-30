import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/volunteer', label: 'Volunteer' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, padding: '1rem 2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 100, background: scrolled ? 'rgba(13, 27, 42, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none', transition: 'all 0.3s ease'
    }}>
      <Link to="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, color: '#f5f1e8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: '#c9a227' }}>✦</span> Constellation Works
      </Link>
      
      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} style={{ color: '#f5f1e8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, opacity: 0.9 }}>{link.label}</Link>
        ))}
        <Link to="/donate" style={{ background: '#c9a227', color: '#0d1b2a', padding: '0.5rem 1.25rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>Donate</Link>
        {user ? (
          <>
            {isAdmin && <Link to="/admin" style={{ color: '#c9a227', fontSize: '0.85rem' }}>Admin</Link>}
            <Link to="/dashboard" style={{ color: '#f5f1e8', fontSize: '0.85rem' }}>{user.first_name || 'Dashboard'}</Link>
            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#f5f1e8', padding: '0.4rem 0.8rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#f5f1e8', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.3)', padding: '0.4rem 0.8rem', borderRadius: '20px' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}
