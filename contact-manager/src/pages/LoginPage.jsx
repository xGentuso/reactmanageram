// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formData.identifier && formData.password) {
        const isEmail = formData.identifier.includes('@');
        
        console.log(`Logging in with ${isEmail ? 'email' : 'username'}: ${formData.identifier}`);
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', formData.identifier);
        navigate('/main');
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="identifier">Username or Email:</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter username or email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>
        
        <div className="form-footer">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
