import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const AdminProjects = () => (
  <div className="admin-page">
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <span className="star">✦</span>
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin" className="nav-item">Dashboard</Link>
        <Link to="/admin/users" className="nav-item">Users</Link>
        <Link to="/admin/donations" className="nav-item">Donations</Link>
        <Link to="/admin/applications" className="nav-item">Applications</Link>
        <Link to="/admin/projects" className="nav-item">Projects</Link>
        <Link to="/admin/blog" className="nav-item">Blog Posts</Link>
        <Link to="/admin/contacts" className="nav-item">Messages</Link>
        <Link to="/admin/settings" className="nav-item">Settings</Link>
      </nav>
    </div>
    <div className="admin-content">
      <h1>AdminProjects</h1>
      <p>This section is under construction.</p>
    </div>
  </div>
);

export default AdminProjects;
