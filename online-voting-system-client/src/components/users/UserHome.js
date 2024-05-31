import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import usenavigate hook
import axios from 'axios';
import VotingPannel from '../votingPannel/VotingPannel';
import CandidateForm from '../admin_access/CandidateForm';
import CandidateUpdate from '../admin_access/CandidateUpdate';
import CandidateDelete from '../admin_access/CandidateDelete';
import UserNavbar from './UserNavbar';
import VotingWindowDelete from '../admin_access/VotingWindowDelete';
import SetVotingWindow from '../admin_access/SetVotingWindow';

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize usenavigate hook
  const [registration, setRegistration] = useState(false);
  const [updation, setUpdation] = useState(false);
  const [deletion, setDeletion] = useState(false);
  const [voteStarted, setVoteStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [pannel, setPannel] = useState(false);
  const [votePannel, setVotePannel] = useState(false);
  const [deletionWindow, setDeletionWindow] = useState(false);
  const [fixWindowTime, setFixWindowTime] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage
        if (!token) {
          navigate('/login'); // Redirect to login page if token is not present
          return;
        }

        const response = await axios.get('http://localhost:8080/user/profile', {
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

  useEffect(() => {
    const getVoterWindow = async () => {
      try {
        const response = await axios.get('http://localhost:8080/candidate/voting-window', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        if (response.status === 200) {
          setVoteStarted(true);
          setPannel(true);
          setMessage(`Voting Started, Please vote betwwen - ${formatDate(response.data.startDate)} to ${formatDate(response.data.endDate)}`);
        } else if (response.status === 404) {
          setVoteStarted(true);
          setPannel(false);
          setMessage('Voting not started yet.');
        }
      } catch (error) {
        if (error.request.status === 403) {
          setVoteStarted(true);
          setPannel(false);
          setMessage('Voting Not Started Yet or Ended, Thank you!');
        }
        console.log(error);
      }
    };

    getVoterWindow();
  }, [])


  if (loading) {
    return (
      <div className='d-flex justify-content-center mt-3'>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
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
    setDeletionWindow(false);
    setFixWindowTime(false);
  };

  const handleUpdationClick = () => {
    setRegistration(false);
    setUpdation(true);
    setDeletion(false);
    setDeletionWindow(false);
    setFixWindowTime(false);
  };

  const handleDeletionClick = () => {
    setRegistration(false);
    setUpdation(false);
    setDeletion(true);
    setDeletionWindow(false);
    setFixWindowTime(false);
  };
  const handleDeletionClickWindow = () => {
    setRegistration(false);
    setUpdation(false);
    setDeletion(false);
    setDeletionWindow(true);
    setFixWindowTime(false);
  };
  const handleSetClickWindow = () => {
    setRegistration(false);
    setUpdation(false);
    setDeletion(false);
    setDeletionWindow(false);
    setFixWindowTime(true);
  };

  const handleClickVerify = async() => {
    try {
      const response = await axios.post('http://localhost:8080/user/send-otp', {id: user._id, email: user.email});
      if(response.status === 200){
        alert('Otp set to registered email id');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/verify-otp', { id: user._id, otp: otp });
      if (response.status === 200) {
        alert('OTP verified successfully');
        // Redirect to login page or other action
        window.location.reload();
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setOtpError('Failed to verify OTP. Please try again later.');
    }
  };
  return (
    <>
      <div className='Container'>
        <UserNavbar />
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
                      <p>Address: {address.village},{address.post},{address.dist},
                      {address.state},{address.country} - {address.pincode}</p>
                    </p>
                  ))}
                </p>
                <p>Verified: {user.isVerified? 'Yes' : 'No'}</p>

                  {false ?(<img src="" class="rounded" alt="..."/>):
                  (<h1 class="bi bi-person-square">photo</h1>)}
                

              </div>
            </div>
          </div>
        )}

        {voteStarted && user.role === 'voter' && !user.isVoted && (
          <div className='container  card mt-3'>
            <h1 style={{ textAlign: 'center', color: 'black' }}>Voting Updates</h1>
            <div className="card text-center">
              <div className="card-header">
                <h4 style={{ color: pannel ? 'green' : 'red' }}>{message}</h4>
              </div>
              <div className="card-footer text-body-secondary">
              {pannel && !user.isVerified && <a className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#verifyOtp" href='#verify' onClick={handleClickVerify}>Click to Verify</a>}
                {pannel && user.isVerified && <a className='btn btn-primary' href='#pannel' onClick={() => { setVotePannel(true) }}>Click to Vote</a>}
              </div>
            </div>
          </div>
        )}

        {!user.isVoted && user.role === 'voter' && pannel && votePannel && user.isVerified && (
          <div className='container card mt-3'>
            <h1 style={{ textAlign: 'center', color: 'black' }} id='pannel'>Voting Board</h1>
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
              <a type="button" href='#fixWindowTime' onClick={handleSetClickWindow} class="btn btn-primary">Set Voting Time</a>
              <a type="button" href='#deleteWindow' onClick={handleDeletionClickWindow} class="btn btn-danger">End Voting</a>
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

            {fixWindowTime && (
              <div id='fixWindowTime' className='card container mt-4'>
                <h1 style={{ textAlign: 'center', color: 'blue' }}>Set Voting Window Time</h1>
                <SetVotingWindow />
              </div>
            )}
            {deletionWindow && (
              <div id='deleteWindow' className='card container mt-4'>
                <h1 style={{ textAlign: 'center', color: 'red' }}>End Voting Window</h1>
                <VotingWindowDelete />
              </div>
            )}

          </div>

        </>
        )}
      </div>

      <div className="modal fade" id="verifyOtp" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    </>
  )
};

export default UserHome;
