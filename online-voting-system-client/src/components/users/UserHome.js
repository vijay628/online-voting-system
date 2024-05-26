import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import usenavigate hook
import axios from 'axios';
import VotingPannel from '../votingPannel/VotingPannel';
import CandidateForm from '../admin_access/CandidateForm';
import CandidateUpdate from '../admin_access/CandidateUpdate';
import CandidateDelete from '../admin_access/CandidateDelete';
import UserNavbar from './UserNavbar';

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize usenavigate hook
  const [registration, setRegistration] = useState(false);
  const [updation, setUpdation] = useState(false);
  const [deletion, setDeletion] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        if (!token) {
          navigate('/login'); // Redirect to login page if token is not present
          return;
        }

        const response = await axios.get('https://voting-app-server-8cny.onrender.com/user/profile', {
          headers: {
            Authorization: `Bearer ${token}` // Add Authorization header with token
          }
        });
        setUser(response.data.user);

      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]); // Add navigate to dependency array

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
  }

  const handleRegistrationClick = () => {
    setRegistration(true);
    setUpdation(false);
    setDeletion(false);
  };

  const handleUpdationClick = () => {
    setRegistration(false);
    setUpdation(true);
    setDeletion(false);
  };

  const handleDeletionClick = () => {
    setRegistration(false);
    setUpdation(false);
    setDeletion(true);
  };
  return (
    <>
      <div className='Container'>
       <UserNavbar/>
      </div>

      <div className='container mt-3'>
        {user && (
          <div className='card container'>
            <div className="row">
              <div className='col-12'>
                <h2 className="text-center bg-info">{(user.role).toUpperCase()} Profile</h2>
                <h4 className="">Welcome, <strong style={{ color: 'blue' }}>{user.aadhaar_name}</strong> to your profile</h4>
              </div>
              <div className="col">
                <p className="">Aadhaar Number: {user.aadhaar_number}</p>
                <p className="">Date of Birth: {formatDate(user.aadhaar_dob)}</p>
                <p className="">Mobile: {user.mobile}</p>
                <p className="">Email: {user.email}</p>
                <p className="">Voted: {user.isVoted ? 'Yes' : 'No'}</p>

              </div>
              <div className='col'>
                <p className="">
                  {[user.address].map((address, index) => (
                    <p key={index}>
                      <p>Village: {address.village}</p>
                      <p>Post: {address.post}</p>
                      <p>District/city: {address.dist}</p>
                      <p>Country: {address.country}</p>
                      <p>Pincode: {address.pincode}</p>
                    </p>
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}

        {!user.isVoted && user.role === 'voter' && (
          <div className='container card mt-3'>
            <h1 style={{ textAlign: 'center', color: 'black' }}>Voting Board</h1>
            <VotingPannel />
          </div>
        )}
        {user.isVoted && user.role === 'voter' && (
          <div className='container  card mt-3'>
            <h1 style={{ textAlign: 'center', color: 'black' }}>Voter Status</h1>
            <div className="card text-center">
              <div className="card-header">
                <h2>Thank you for voting</h2>
              </div>
              <div className="card-body">
                <h5 className="card-title text-success">You Have Already Voted</h5>
              </div>
              <div className="card-footer text-body-secondary">
                <Link to='/result'>Go to result</Link>
              </div>
            </div>
          </div>
        )}

        {user.role === 'admin' && user.isVoted === false && (<>

          <div className="container text-center mt-3">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <a href='#register' type="button" onClick={handleRegistrationClick} class="btn btn-primary">Register Candidate</a>
              <a href='#update' type="button" onClick={handleUpdationClick} class="btn btn-warning">Update Candidate</a>
              <a type="button" href='#delete' onClick={handleDeletionClick} class="btn btn-danger">Delete Candidate</a>
            </div>
          </div>

          <div className="container">
          {registration && (
            <div id='register' className='card container mt-4'>
              <h1 style={{ textAlign: 'center', color: 'blue' }}>Candidate Registration Form</h1>
              <CandidateForm />
            </div>
          )}

          {updation && (
            <div id='update' className='card container mt-4'>
              <h1 style={{ textAlign: 'center', color: '#ffc107' }}>Candidate Updation Form</h1>
              <CandidateUpdate />
            </div>
          )}
          {deletion && (
            <div id='delete' className='card container mt-4'>
              <h1 style={{ textAlign: 'center', color: 'red' }}>Candidate Deletion Form</h1>
              <CandidateDelete />
            </div>
          )}
        </div>

        </>
        )}
      </div>

    </>
  )
};

export default UserHome;
