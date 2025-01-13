import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Contact Manager
        </Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <span className="welcome-text">Welcome, {user}!</span>
            <Link to="/main" className="nav-link">Contacts</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 