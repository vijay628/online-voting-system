import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!formData.newPassword) {
      setError('Please enter a new password');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!/[a-zA-Z]/.test(formData.newPassword) ||!/[0-9]/.test(formData.newPassword) ||!/[!@#$%^&*]/.test(formData.newPassword)) {
      setError('Password must contain at least one letter, one number, and one special character');
      setLoading(false);
      return;
    }


    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.put('https://voting-app-server-8cny.onrender.com/user/profile/password', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setMessage('Password updated successfully');
        setFormData({
          currentPassword: '',
          newPassword: '',
        });
      } else {
        setError(response.data.message);
      }
    
      // Optionally redirect or show a success message
      setTimeout(() => {
        window.location.href = '/profile'; // Change '/profile' to the appropriate route
      }, 1500);
      
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label text-dark">Current Password</label>
          <input
            type="password"
            className="form-control border-dark"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label text-dark">New Password</label>
          <input
            type="password"
            className="form-control border-dark"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
          />
        </div>
          <div className='text-center'>
            <button type="submit" className='btn btn-success' disabled={loading}>
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
