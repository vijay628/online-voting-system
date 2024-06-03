import React, { useState ,useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserLogin from './components/users/UserLogin';
import Rules from './components/Rule';
import MemberList from './components/VerifiedMemberList';
import AboutUs from './components/About';
import Results from './components/result/VoteCounter';
import Home from './components/Home';
import UserSignup from './components/users/UserSignup';
import UserHome from './components/users/UserHome';
import ChangePassword from './components/users/ChangePassword';
import axios from 'axios';


function App() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => { 
    const hideNavbarIfProfile = () => {
      try {
        const location = window.location.pathname; 
        if (location === '/profile') { 
          setHideNavbar(true); 
        } else {
          setHideNavbar(false);
        }
        hideNavbarIfProfile();
      } catch (error) {
        console.log(error);
      }
    };
  
  }, []);
  

    useEffect(() => {
      // Logic to check user authentication status and set user state
      const checkLogin = async()=>{
        try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/user/profile',{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status===200){
          setUser(true);
        }
      } catch (error) {
        console.log(error);
        console.log("No user found. Please Login again...");
        setUser(false); 
      }};
      // Example: Fetch user data from server, check localStorage, etc.
      checkLogin();
    }, []);

  return (
    <BrowserRouter>
      <div>
        {!hideNavbar &&
          <Navbar user={user} />}
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/member" element={<MemberList />} />
          <Route path="/rule" element={<Rules />} />
          <Route path="/result" element={<Results />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/profile" element={<UserHome />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path='/changepassword' element={<ChangePassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
