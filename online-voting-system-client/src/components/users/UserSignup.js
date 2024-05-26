import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    aadhaar_name: '',
    aadhaar_dob: '',
    aadhaar_number: '',
    password: '',
    mobile: '',
    email: '',
    address: {
      village: '',
      post: '',
      dist: '',
      country: '',
      pincode: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
  
    // If the birthday has not occurred yet this year, subtract one year from the age
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    return age;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const age = calculateAge(formData.aadhaar_dob);
    if (age < 18) {
      setError('You must be at least 18 years old to register.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!/[a-zA-Z]/.test(formData.password) ||!/[0-9]/.test(formData.password) ||!/[!@#$%^&*]/.test(formData.password)) {
      setError('Password must contain at least one letter, one number, and one special character');
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post('https://voting-app-server-8cny.onrender.com/user/signup', formData);
      console.log('User signed up:', response.data);
      // Redirect to profile page or login page after successful signup
      window.location.href = '/login'
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='container '>
      <div className={`card container mt-3 ${window.innerWidth < 600 ? 'w-70' : 'w-50'}`}>
        {/* <h1>Current window size is{window.innerWidth}</h1> */}
        <div className='text-center'><h2>Register/SignUp Form</h2>
        </div>
        <p>Already have Account? <Link to='/login'>click to login</Link></p>
        <hr/>

        <form className='mt-2' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputAadhaarName1" className="form-label">Aadhaar Name</label>
            <input type="text" name="aadhaar_name"
              value={formData.aadhaar_name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="form-control"
              id="exampleInputAadhaarName1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputAadhaarNumber1" className="form-label">Aadhaar Number</label>
            <input type="number" name="aadhaar_number"
              value={formData.aadhaar_number}
              onChange={handleChange}
              placeholder="Enter Your Aadhaar Number"
              className="form-control"
              id="exampleInputAadhaarNumber1"
              required
            />
          </div>

          <div className="mb-3">
          {calculateAge(formData.aadhaar_dob) < 18 && error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            <label for="exampleInputAadhaarDob1" className="form-label">Date of Birth</label>
            <input type="date" name="aadhaar_dob"
              value={formData.aadhaar_dob}
              onChange={handleChange}
              placeholder="Date of Birth"
              className="form-control"
              id="exampleInputAadhaarDob1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputAadhaarEmail1" className="form-label">Email ID</label>
            <input type="email" name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email ID"
              className="form-control"
              id="exampleInputAadhaarEmail1"
              required
            />
          </div>


          <div className="mb-3">
            <label for="exampleInputAadhaarMobile1" className="form-label">Mobile Number</label>
            <input type="text" name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Your Mobile Number"
              className="form-control"
              id="exampleInputAadhaarMobile1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputVillage1" className="form-label">Village Name</label>
            <input type="text" name="address.village"
              value={formData.address.village}
              onChange={handleChange}
              placeholder="Enter Your Village Name"
              className="form-control"
              id="exampleInputVillage1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPost1" className="form-label">Post Office</label>
            <input type="text" name="address.post"
              value={formData.address.post}
              onChange={handleChange}
              placeholder="Enter Your Post Office Name"
              className="form-control"
              id="exampleInputPost1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputDist1" className="form-label">District</label>
            <input type="text" name="address.dist"
              value={formData.address.dist}
              onChange={handleChange}
              placeholder="Enter Your District Name"
              className="form-control"
              id="exampleInputDist1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputVillageState1" className="form-label">State</label>
            <input type="text" name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="Enter Your State Name"
              className="form-control"
              id="exampleInputVillageState1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputVillageCountry" className="form-label">Country</label>
            <input type="text" name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              placeholder="Enter Your Country Name"
              className="form-control"
              id="exampleInputVillageCountry"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputVillagePincode1" className="form-label">Pinocde</label>
            <input type="number" name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              placeholder="Enter Your Pincode Number"
              className="form-control"
              id="exampleInputVillagePincode1"
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="form-control"
              id="exampleInputPassword1"
              aria-describedby="passwordHelp"
              required
            />
             <div id="passwordHelp" class="form-text">
              <ul>
                <li>Password must be 8 character or more.</li>
                <li>Password must contain at least one letter, one number, and one special character</li>
              </ul>
              </div>
          </div>

          <div className='text-center mt-3 mb-3'>
            <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Signing up...' : 'Sign up'}</button>
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          </div>


        </form>
      </div>
    </div>
  );
};

export default UserSignup;
