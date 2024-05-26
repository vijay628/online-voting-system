import React from 'react';
import Rule from './Rule'
import { Link } from 'react-router-dom';


export default function Home({user}) {
  return (
    <>
      <div id="carouselExampleAutoplaying" className="carousel slide mt-2" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://www.eci.gov.in/eci-backend/public/banner/May/mmuQIB9nGUIKMXg1714982815.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.eci.gov.in/eci-backend/public/banner/April/LIZeuPPwfkGttO71712552308.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.eci.gov.in/eci-backend/public/banner/April/cg1wvFMPLChgIFV1712124541.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.eci.gov.in/eci-backend/public/banner/March/M9IQgqQHQAQNg3j1710740535.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/March/15UP2uCGymOTr4O1710523300.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/March/xXi8hACDzZqY7Ys1710754916.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/February/Fl8tV6wDcJHRyPz1709025126.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/January/2rEFXb3Z7BOAx6G1706514283.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/January/yKVoqGJkeqV1UcJ1706198111.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/January/JxuTy9zRXepxo3L1706197898.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/January/vu1SoSLgYzyrA1w1706197686.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/November/AG8Lxg54E40A6no1698902322.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/November/uJtYWj3cz9wlPXO1698829368.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/October/w2BF2GmrMylJmro1697441816.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/October/dLlfkCVYRop23rD1697441800.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/October/7kRVa1rQoKU0L8r1697441759.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/October/6o3MXZzAqSlVmon1697441730.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/October/GrbnpfUXsEhE77L1697441716.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/February/YqRDeYJ5syZPMet1709025023.jpg' className="d-block w-100" alt='...' />
          </div>
          <div className='carousel-item'>
            <img src='https://www.eci.gov.in/eci-backend/public/banner/October/halv5mtH2Wb8jh31697441678.jpg' className="d-block w-100" alt='...' />
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

    {!user && (
      <div className='d-flex justify-content-end mt-3'>
  
  <Link className='btn btn-primary mx-1' to ='/login'>Login</Link>
  <Link className='btn btn-primary mx-1' to ='/signup'>Sign Up</Link>
</div>
    )} 

     

      <Rule />

      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p>© 2024 Election Commission of India. All Rights Reserved.</p>
        <p>Contact us: <a href="mailto:contact@eci.gov.in" className="text-white">contact@eci.gov.in</a></p>
      </footer>
    </>
  )
}
