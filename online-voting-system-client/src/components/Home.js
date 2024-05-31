import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';
import img10 from '../assets/img10.jpg';
import img11 from '../assets/img11.jpg';
import img12 from '../assets/img12.jpg';
import img13 from '../assets/img13.jpg';

export default function Home({ user }) {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const handleHomePageChange = () => {
      if (user) {
        var count = 0;
        if (count===0) {
          count++;
          window.location.reload();
        }else{
          count--;
        }
      }
    };
   handleHomePageChange();
  }, []);

  // Function to format date and time in UTC with AM/PM
function formatDateTimeUTC(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getUTCDate().toString().padStart(2, '0');
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hoursStr = hours.toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hoursStr}:${minutes} ${ampm} UTC`;
}
  
  useEffect(() => {
    const getVoterWindow = async () => {
      try {
        const response = await axios.get('http://localhost:8080/candidate/voting-window', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        if (response.status === 200) {
          
          setMessage(`Voting Started, Please vote betwwen - ${formatDateTimeUTC(response.data.startDate)} to ${formatDateTimeUTC(response.data.endDate)}. *Click on Profile to Vote...`);
        } else if (response.status === 404) {
        
          setMessage('Voting not started yet.');
        }
         
      } catch (error) {
        if (error.request.status === 403) {}
          
          setMessage('Voting Not Started Yet or Ended, Thank you!');
        }
      };
    

    getVoterWindow();
  }, [])

  return (
    <>
      <div id="carouselExampleAutoplaying" className="carousel slide mt-2" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img4} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img5} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img6} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img7} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img8} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img9} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img10} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img11} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img12} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img13} className="d-block w-100" alt="..." />
          </div>
          
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    

      {!user && (window.innerWidth < 600) && (
        <div className='d-flex justify-content-end mt-3'>

          <Link className='btn btn-primary mx-1' to='/login'>Login</Link>
          <Link className='btn btn-primary mx-1' to='/signup'>Sign Up</Link>
        </div>
      )}


      <div className='container card text-center my-3'>
        <div className='row'>
          <div className="col-5">
          <h3>News/Updates:-</h3>
            <div style={{ height: '250px', overflowY: 'auto', marginTop: '20px' }}>
              <div class="list-group">
                <a href="https://voting-app-8ch1.onrender.com/result" class="list-group-item border-dark list-group-item-action" aria-current="true">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Result coming soon..</h5>
                    <small>1 days ago</small>
                  </div>
                  <p class="mb-1">Result will declare on website.</p>
                  <small class="text-body-secondary">go and click result to check.</small>
                </a>
                <a href="https://voting-app-8ch1.onrender.com/member" class="list-group-item border-dark list-group-item-action">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Registration Ended</h5>
                    <small>2 days ago</small>
                  </div>
                  <p class="mb-1">Thank you for registration.</p>
                  <small class="text-body-secondary">check member list on website.</small>
                </a>
                <a href="#register" class="list-group-item border-dark list-group-item-action">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Registration Started..</h5>
                    <small>3 days ago</small>
                  </div>
                  <p class="mb-1">Visit nearest office for registration.</p>
                  <small class="text-body-secondary">knapur,up</small>
                </a>
              </div>
            </div>
          </div>

          <div className='col-7'>
          <div className='container  card mt-3'>
            <h1 style={{ textAlign: 'center', color: 'black' }}>Voting Updates</h1>
            <div className="card text-center mt-5">
              <div className="card-header">
                <h4 style={{ color:'green'  }}>{message}</h4>
              </div>
              <div className="card-footer text-body-secondary">
                <h4>Visit regularly for the latest voting updates..</h4>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>



      <div className='container card mt-3'>
        <h1>How To Use Online Voting System ?</h1>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              <i class="bi bi-1-circle-fill"></i>&nbsp;Registration Instructions
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <p>
                  1. Navigate to the sign-up page: To sign up for the voting system, navigate to the sign-up page by clicking on the "Sign Up" button on the home page.
                </p>
                <p>
                  2. Enter your information: On the sign-up page,enter your aadhaar number, enter your name, email address, and password etc. Make sure to use a strong and unique password to protect your account.
                </p>
                <br />
                <p>Already have account- <Link to='/login'>click to login</Link></p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              <i class="bi bi-2-circle-fill"></i>&nbsp; Login Instructions
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <p>
                  1. Navigate to the login page: To log in to the voting system, navigate to the login page by clicking on the "Login" button on the home page.
                </p>
                <p>
                  2. Enter your aadhaar number and password: On the login page, enter your aadhaar number and password. Make sure to use the same aadhaar number and password that you used when you signed up for the voting system.
                </p>
                <p>
                  3. Click the "Log In" button: After entering your aadhaar number and password, click the "Log In" button to log in to your account.
                </p>

                <p>
                  4. Access your account: Once you are logged in, you can access your account and view your profile, upcoming votes, and voting results.
                </p>

                <p>
                  5. Log out when finished: When you are finished using the voting system, make sure to log out of your account to protect your personal information.
                </p>
                <br />
                <p>Don't have account- <Link to='/register'>click to register</Link></p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              <i class="bi bi-3-circle-fill"></i>&nbsp; Voting Instructions
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <p>1. Make sure to have an account on online voting system.<Link to='/login'>click to Login</Link></p>
                <p>2. If you don't have an account on online voting system. <Link to='/register'>Click to register</Link></p>
                <p>Once you login with your credentials, you will redirect to proofile page and there you will see the voting pannel
                  if you didn't voted.
                </p>
                <p>If you have already voted you will see your voting status at the same place of voting pannel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p>© 2024 Online Voting System. All Rights Reserved.</p>
        <p>Contact us: <a href="mailto:contact@ovs.com" className="text-white">contact@ovs.com</a></p>
      </footer>
    </>
  )
}
