import React from 'react';
import { Link } from 'react-router-dom';
import ChangePassword from './ChangePassword';
export default function UserNavbar() {

  const handleLogOut = () => {
    sessionStorage.clear();
    // Redirect to profile page or dashboard after successfull login
    window.location.href = '/login';
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#" style={{ color: 'white',fontWeight:'bold', margin:'1rem' }}>Online Voting System</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`offcanvas ${window.innerWidth<=200?'w-50':''} offcanvas-end text-bg-dark`} tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Profile Setting</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to='/' >
                    <button type='button' className='btn btn-primary'>Home</button></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to='/result' >
                    <button type='button' className='btn btn-primary'>Result</button></Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Important Links
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><Link className="dropdown-item" to='/rule'>Rule</Link></li>
                    <li><Link className="dropdown-item" to='/member'>Member List</Link></li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item" rel='noreferrer' target='_blank' href="https://www.eci.gov.in/">Go to the Official Website of ECI.</a></li>
                  </ul>
                </li>

                {/* Modal Password Update */}
                <li className="nav-item mt-2">
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Change Password
                  </button>
                </li>

                <li className="nav-item">
                  <div className="nav-link active" aria-current="page">
                    <button type='button' onClick={handleLogOut} className='btn btn-danger'>Log Out</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title text-dark fs-5" id="exampleModalLabel">Change Password</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
