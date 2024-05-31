import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    aadhaar_number: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/user/login', formData);

      console.log('Redirecting to profile');
      // Save token to localStorage or sessionStorage
      sessionStorage.setItem('token', response.data.token); 
      // or localStorage.setItem('token', response.data.token);

      // Redirect to profile page or dashboard after successfull login
      window.location.href = '/profile'; 

    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid Aadhaar number or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className={`card border-danger container-sm ${window.innerWidth < 600 ? 'w-70' : 'w-50'} mt-5`}>
        <div className='card text-center bg-info'>
        <h2>Welcome to Online Voting System</h2>
        <h3>Login/SignIn</h3>
        </div>
        <hr/>
        <form className='mt-3' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputAadhaarNumber1" className="form-label">Aadhaar Number</label>
            <input type="number" name="aadhaar_number"
              value={formData.aadhaar_number}
              onChange={handleChange}
              placeholder="Aadhaar Number"
              className="form-control"
              id="exampleInputAadhaarNumber1"
              aria-describedby="AadhaarNumberHelp"
              required
            />
            <div id="AadhaarNumberHelp" className="form-text">We'll never share your Aadhaar Number with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className='text-center mt-3 mb-3'>
          <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Logging in...' : 'Login'}</button>
          {error && <p style={{ color: 'red', marginTop:'1rem' }}>{error}</p>}
          </div>
          <p>Don't have account <Link to='/signup'>click to register/signup</Link></p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
