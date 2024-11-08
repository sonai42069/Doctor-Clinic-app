import React from 'react';
import './navbar.css';  // Import the CSS file for styles


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/denlogo.jpeg" alt="Clinic Logo" className="logo" />
        <span className="clinic-name">Dr. Nithya's Dental & Smile Design Clinic</span>
      </div>
    </nav>
  );
};

export default Navbar;
