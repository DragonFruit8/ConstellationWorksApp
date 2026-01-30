import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import Apply from './pages/Apply';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/globals.css';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div style={{padding:'4rem',textAlign:'center'}}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
      <Route path="/donate" element={<><Navbar /><Donate /><Footer /></>} />
      <Route path="/volunteer" element={<><Navbar /><Volunteer /><Footer /></>} />
      <Route path="/apply" element={<><Navbar /><Apply /><Footer /></>} />
      <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
      <Route path="/blog/:slug" element={<><Navbar /><BlogPost /><Footer /></>} />
      <Route path="/projects" element={<><Navbar /><Projects /><Footer /></>} />
      <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
      <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
      <Route path="/dashboard" element={<ProtectedRoute><Navbar /><Dashboard /><Footer /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
