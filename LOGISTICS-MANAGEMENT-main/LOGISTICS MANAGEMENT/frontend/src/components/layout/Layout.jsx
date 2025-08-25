import React from 'react';
import { Outlet } from 'react-router-dom';
//import Navbar from './Navbar'; // Import your Navbar component
//import Footer from './Footer'// Import the Footer component

const Layout = () => {
  return (
    <div className="page-container">
      {/* <Navbar /> */}
      <main>
        <Outlet /> {/* This will render the routed content */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;