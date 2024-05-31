import React,{useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          {/* <p>{windowSize}</p> */}
          <NavLink className="nav-link" to="/" style={{ color: 'white',fontWeight:'bold', margin:'1rem' }}>Online Voting System</NavLink>
          {(user && windowSize <=700) ? (
            <>
              <div className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/profile">
                  <button type="button" className="btn btn-success mt-2"><i class="bi bi-person-circle" /> Profile</button>
                </Link>
              </div>
            </>
          ) : (<>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </>)}

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mt-3 me-auto mx-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link link-btn" activeclassname="active" exact='true' to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link link-btn" activeclassname="active" to="/member">Member List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link link-btn" activeclassname="active" to="/rule">Rules</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link link-btn" activeclassname="active" to="/result">Results</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link link-btn" activeclassname="active" to="/about">About Us</NavLink>
              </li>
            </ul>
            {user ? (
              <>
                <div className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/profile">
                    <button type="button" className="btn btn-success"><i class="bi bi-person-circle" /> Profile</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="nav-item">
                  <Link className="nav-link mx-2 mt-2 link-btn" to="/login">
                    <button type="button" className="btn btn-success">Login</button>
                  </Link>
                </div>
                <div className="nav-item">
                  <Link className="nav-link mx-2 mt-2 link-btn" to="/signup">
                    <button type="button" className="btn btn-success">Sign up</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;