import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Overview() {
  const [stats, setStats] = useState(null);
  useEffect(() => { axios.get('/api/admin/dashboard').then(res => setStats(res.data)).catch(console.error); }, []);
  if (!stats) return <div>Loading...</div>;
  return (
    <div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1.5rem' }}>Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Total Users', value: stats.stats.totalUsers, color: '#c9a227' },
          { label: 'Total Raised', value: '$' + stats.stats.totalRaised.toLocaleString(), color: '#7dad7a' },
          { label: 'Pending Volunteers', value: stats.stats.pendingVolunteers, color: '#5a8f7b' },
          { label: 'Pending Residents', value: stats.stats.pendingResidents, color: '#3d6a7a' },
          { label: 'New Messages', value: stats.stats.newMessages, color: '#c9a227' }
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${stat.color}33` }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => { axios.get('/api/admin/users').then(res => setUsers(res.data.users)).catch(console.error); }, []);
  return (
    <div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1.5rem' }}>Users</h2>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: 'rgba(255,255,255,0.05)' }}><th style={{ padding: '1rem', textAlign: 'left' }}>Name</th><th style={{ padding: '1rem', textAlign: 'left' }}>Email</th><th style={{ padding: '1rem', textAlign: 'left' }}>Role</th><th style={{ padding: '1rem', textAlign: 'left' }}>Status</th></tr></thead>
          <tbody>{users.map(user => (<tr key={user.id} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}><td style={{ padding: '1rem' }}>{user.first_name} {user.last_name}</td><td style={{ padding: '1rem', opacity: 0.7 }}>{user.email}</td><td style={{ padding: '1rem' }}><span style={{ background: user.role === 'admin' ? '#c9a22733' : '#5a8f7b33', color: user.role === 'admin' ? '#c9a227' : '#5a8f7b', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>{user.role}</span></td><td style={{ padding: '1rem' }}>{user.is_active ? '✓ Active' : '✗ Inactive'}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function Donations() {
  const [donations, setDonations] = useState([]);
  useEffect(() => { axios.get('/api/donations').then(res => setDonations(res.data.donations || [])).catch(console.error); }, []);
  return (
    <div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1.5rem' }}>Donations</h2>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem' }}>
        {donations.length === 0 ? <p style={{ opacity: 0.7 }}>No donations yet.</p> : donations.map(d => (<div key={d.id} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}><strong style={{ color: '#c9a227' }}>${d.amount}</strong> from {d.donor_name || 'Anonymous'}</div>))}
      </div>
    </div>
  );
}

function Applications() {
  const [volunteers, setVolunteers] = useState([]);
  const [residents, setResidents] = useState([]);
  useEffect(() => {
    axios.get('/api/applications/volunteer').then(res => setVolunteers(res.data.applications || [])).catch(console.error);
    axios.get('/api/applications/resident').then(res => setResidents(res.data.applications || [])).catch(console.error);
  }, []);
  return (
    <div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1.5rem' }}>Applications</h2>
      <h3 style={{ color: '#7dad7a', marginBottom: '1rem' }}>Volunteer Applications ({volunteers.length})</h3>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        {volunteers.length === 0 ? <p style={{ opacity: 0.7 }}>No applications yet.</p> : volunteers.map(v => (<div key={v.id} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}><strong>{v.first_name} {v.last_name}</strong> - {v.email} <span style={{ background: v.status === 'pending' ? '#c9a22733' : '#5a8f7b33', padding: '0.25rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem', marginLeft: '0.5rem' }}>{v.status}</span></div>))}
      </div>
      <h3 style={{ color: '#5a8f7b', marginBottom: '1rem' }}>Resident Applications ({residents.length})</h3>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem' }}>
        {residents.length === 0 ? <p style={{ opacity: 0.7 }}>No applications yet.</p> : residents.map(r => (<div key={r.id} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}><strong>{r.first_name} {r.last_name}</strong> <span style={{ background: r.status === 'pending' ? '#c9a22733' : '#5a8f7b33', padding: '0.25rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem', marginLeft: '0.5rem' }}>{r.status}</span></div>))}
      </div>
    </div>
  );
}

function Messages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => { axios.get('/api/contact').then(res => setMessages(res.data.submissions || [])).catch(console.error); }, []);
  return (
    <div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1.5rem' }}>Messages</h2>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem' }}>
        {messages.length === 0 ? <p style={{ opacity: 0.7 }}>No messages yet.</p> : messages.map(m => (<div key={m.id} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}><strong>{m.name}</strong> ({m.email})<br/><span style={{ opacity: 0.7, fontSize: '0.9rem' }}>{m.message.substring(0, 100)}...</span></div>))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const location = useLocation();
  const navItems = [{ path: '/admin', label: 'Overview' }, { path: '/admin/users', label: 'Users' }, { path: '/admin/donations', label: 'Donations' }, { path: '/admin/applications', label: 'Applications' }, { path: '/admin/messages', label: 'Messages' }];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0d1b2a' }}>
      <aside style={{ width: '250px', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '6rem 1rem 2rem' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '2rem', padding: '0 1rem' }}>Admin Panel</h2>
        <nav>{navItems.map(item => (<Link key={item.path} to={item.path} style={{ display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '0.5rem', background: location.pathname === item.path ? 'rgba(201,162,39,0.2)' : 'transparent', color: location.pathname === item.path ? '#c9a227' : '#f5f1e8' }}>{item.label}</Link>))}</nav>
      </aside>
      <main style={{ flex: 1, padding: '6rem 2rem 2rem' }}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </main>
    </div>
  );
}
