import React from 'react';
import NAV from '../components/navbar';
import Register from '../components/register';
import Login from '../components/login';


const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 custom-bg">
        <div className="d-flex flex-column">
          <NAV />
          <div className="my-4"></div> {/* Add some vertical space */}
          <Register />
          <div className="my-4"></div> {/* Add some vertical space */}
          <Login />
        </div>
      </div>
    </>
  );
};

export default Home;
