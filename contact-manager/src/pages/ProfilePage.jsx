import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('user');
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: '',
    avatar: '',
    phone: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
    const currentUserData = allUsers.find(u => u.username === currentUser);
    if (currentUserData) {
      setUserProfile({
        username: currentUserData.username,
        email: currentUserData.email,
        fullName: currentUserData.fullName || '',
        bio: currentUserData.bio || '',
        avatar: currentUserData.avatar || '',
        phone: currentUserData.phone || '',
        location: currentUserData.location || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const updatedUsers = users.map(user => {
        if (user.username === currentUser) {
          return { ...user, ...userProfile };
        }
        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label htmlFor="avatar">Profile Picture URL:</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={userProfile.avatar}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          {userProfile.avatar && (
            <div className="avatar-preview">
              <img src={userProfile.avatar} alt="Profile preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userProfile.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userProfile.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={userProfile.location}
            onChange={handleChange}
            placeholder="Enter your location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={userProfile.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="4"
          />
        </div>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage; 