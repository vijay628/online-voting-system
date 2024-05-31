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
      state: '',
      country: '',
      pincode: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');

  // Separate state for each specific error
  const [aadhaarNumberError, setAadhaarNumberError] = useState('');
  const [dobError, setDobError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [otpError, setOtpError] = useState('');

  const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'aadhaar_number') {
      const isValid = /^[1-9][0-9]{0,11}$/.test(value);
      if (isValid || value === '') {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === 'mobile') {
      const isValidMobile = /^[1-9][0-9]{0,9}$/.test(value);
      if (isValidMobile || value === '') {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name.includes('address')) {
      const addressField = name.split('.')[1];
      if (addressField === 'pincode') {
        const isValidPincode = /^[0-9]{0,6}$/.test(value);
        if (isValidPincode || value === '') {
          setFormData({ ...formData, address: { ...formData.address, [addressField]: value } });
        }
      } else {
        setFormData({ ...formData, address: { ...formData.address, [addressField]: value } });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const age = calculateAge(formData.aadhaar_dob);
    if (age < 18) {
      setDobError('You must be at least 18 years old to register.');
      setLoading(false);
      return;
    }

    if (!/^[1-9][0-9]{0,11}$/.test(formData.aadhaar_number)) {
      setAadhaarNumberError('Invalid Aadhaar number');
      setLoading(false);
      return;
    }

    if (formData.aadhaar_number.length < 12) {
      setAadhaarNumberError('Aadhaar number must be 12 digits');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (formData.address.pincode.length !== 6) {
      setPincodeError('Pincode must be 6 digits');
      setLoading(false);
      return;
    }

    if (!/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
      setPasswordError('Password must contain at least one letter, one number, and one special character');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user/signup', formData);
      console.log(response.data.response._id);
      console.log(response.data);
      if (response.status === 200) {
        alert('User created successfully!');
        setUserId(response.data.response._id);
        console.log(response.data.response._id);
        console.log(response.data);

        setTimeout(async() => {
          const responseOtp = await axios.post('http://localhost:8080/user/send-otp', { id: response.data.response._id, email: formData.email });
          alert('OTP sent to the email.');
          if (responseOtp.status === 200) {
            setVerified(true);
          }

        }, 3000);

      }
      // window.location.href = '/login';
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/verify-otp', { id: userId, otp: otp });
      if (response.status === 200) {
        alert('OTP verified successfully');
        // Redirect to login page or other action
        window.location.href = '/login';
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setOtpError('Failed to verify OTP. Please try again later.');
    }
  };


  return (
    <div className='container'>
      {!verified && (
        <div className={`card container mt-3 ${window.innerWidth < 600 ? 'w-70' : 'w-50'}`}>
          <div className='text-center'><h2>Register/SignUp Form</h2></div>
          <p>Already have Account? <Link to='/login'>click to login</Link></p>
          <hr />
          <form className='mt-2' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputAadhaarName1" className="form-label">Aadhaar Name</label>
              <input type="text" name="aadhaar_name" value={formData.aadhaar_name} onChange={handleChange} placeholder="Enter Your Name" className="form-control" id="exampleInputAadhaarName1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAadhaarNumber1" className="form-label">Aadhaar Number</label>
              <input type="number" name="aadhaar_number" value={formData.aadhaar_number} onChange={handleChange} placeholder="Enter Your Aadhaar Number" className="form-control" id="exampleInputAadhaarNumber1" required />
              {aadhaarNumberError && <p style={{ color: 'red' }}>{aadhaarNumberError}</p>}

            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAadhaarDob1" className="form-label">Date of Birth</label>
              <input type="date" name="aadhaar_dob" value={formData.aadhaar_dob} onChange={handleChange} placeholder="Date of Birth" className="form-control" id="exampleInputAadhaarDob1" required />
              {calculateAge(formData.aadhaar_dob) < 18 && dobError && <p style={{ color: 'red', marginTop: '1rem' }}>{dobError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAadhaarEmail1" className="form-label">Email ID</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email ID" className="form-control" id="exampleInputAadhaarEmail1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAadhaarMobile1" className="form-label">Mobile Number</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter Your Mobile Number" className="form-control" id="exampleInputAadhaarMobile1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputVillage1" className="form-label">Village Name</label>
              <input type="text" name="address.village" value={formData.address.village} onChange={handleChange} placeholder="Enter Your Village Name" className="form-control" id="exampleInputVillage1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPost1" className="form-label">Post Office</label>
              <input type="text" name="address.post" value={formData.address.post} onChange={handleChange} placeholder="Enter Your Post Office Name" className="form-control" id="exampleInputPost1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputDist1" className="form-label">District</label>
              <input type="text" name="address.dist" value={formData.address.dist} onChange={handleChange} placeholder="Enter Your District Name" className="form-control" id="exampleInputDist1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputVillageState1" className="form-label">State</label>
              <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} placeholder="Enter Your State Name" className="form-control" id="exampleInputVillageState1" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputVillageCountry" className="form-label">Country</label>
              <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Enter Your Country Name" className="form-control" id="exampleInputVillageCountry" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputVillagePincode1" className="form-label">Pinocde</label>
              <input type="number" name="address.pincode" value={formData.address.pincode} onChange={handleChange} placeholder="Enter Your Pincode Number" className="form-control" id="exampleInputVillagePincode1" required />
              {pincodeError && <p className='text-danger'>{pincodeError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password" className="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp" required />
              <div id="passwordHelp" className="form-text">
                <ul>
                  <li>Password must be 8 character or more.</li>
                  <li>Password must contain at least one letter, one number, and one special character</li>
                </ul>
              </div>
              {passwordError && <p className='text-danger'>{passwordError}</p>}
            </div>
            <div className='text-center mt-3 mb-3'>
              <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Signing up...' : 'Sign up'}</button>
              {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </div>
          </form>
        </div>
      )}

      <div className='container card w-50 text-center mt-5'>
        {verified && (
          <div className='card'>
            <h3>Click below to verify your Email id</h3>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Verify OTP
            </button>
          </div>
        )}
      </div>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-dark fs-5" id="exampleModalLabel">Enter Your OTP To Verify</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleOtpVerification}>
                <div className="mb-3">
                  <label htmlFor="otpInput" className="form-label">OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="otpInput"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                  />
                  {otpError && <p style={{ color: 'red', marginTop: '1rem' }}>{otpError}</p>}
                </div>
                <button type="submit" className="btn btn-success">Verify OTP</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;