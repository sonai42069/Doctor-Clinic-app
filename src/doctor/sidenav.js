import React, { useState} from 'react';
import './sidenav.css';
import { Link, Outlet } from 'react-router-dom';

const SideNavbar = () => {
    const [isConsultantVisible, setIsConsultantVisible] = useState(false);  // Control consultant dropdown visibility
    const [isManageAppointment, setIsManageAppointment] = useState(false);
    const [isPatientVisit, setIsPatientVisit] = useState(false);
    const [isLabVisible, setIsLabVisible] = useState(false);  // Control lab dropdown visibility
    const [isProfileSettings, setIsProfileSettings] = useState(false);  // Control lab dropdown visibility
  // Toggle Consultant div visibility
  const toggleConsultantVisibility = () => {
    setIsConsultantVisible(prevState => !prevState);  // Toggle visibility state
  };
  const toggleManageAppointment = () => {
    setIsManageAppointment(prevState => !prevState);  // Toggle visibility state
  };
  const togglePatientVisit = () => {
    setIsPatientVisit(prevState => !prevState);  // Toggle visibility state
  };
  const toggleLabVisibility = () => {
    setIsLabVisible(prevState => !prevState);  // Toggle visibility state
  };
  const toggleProfileSettings = () => {
    setIsProfileSettings(prevState => !prevState);  // Toggle visibility state
  };

  return (
    <div className="side-navbar-container">
      <div className="side-navbar">
      <a onClick={toggleManageAppointment}>
          Manage Appointment
        </a>

        {/* Show the consultant options based on isConsultantVisible state */}
        {isManageAppointment && (
          <div className="options">
            <Link to="/doctorlogin/dailyappointments">VIEW</Link>
            <Link to="/doctorlogin/dashboard">Reschedule</Link>
            <Link to="/doctorlogin/dashboard">Cancel</Link>
            <Link to="/doctorlogin/dashboard">Book</Link>
            
          </div>
        )}
              <a onClick={togglePatientVisit}>
          Patient Visit
        </a>

        {/* Show the consultant options based on isConsultantVisible state */}
        {isPatientVisit && (
          <div className="options">
            <Link to="/doctorlogin/dashboard">View Patient</Link>
            <Link to="/doctorlogin/dashboard">Edit Patient History</Link>
            <Link to="/doctorlogin/dashboard">Add Prescription</Link>
            <Link to="/doctorlogin/dashboard">Payment</Link>
            <Link to="/doctorlogin/dashboard">Print Fees & Prescription</Link>
          </div>
        )}
        
        <Link to="/doctorlogin/diary">Daily Diary</Link>

        {/* Toggle Consultant dropdown */}
        <a onClick={toggleConsultantVisibility}>
          Consultant
        </a>

        {/* Show the consultant options based on isConsultantVisible state */}
        {isConsultantVisible && (
          <div className="options">
            <Link to="/doctorlogin/consultantlist">VIEW</Link>
            <Link to="/doctorlogin/profile">PROFILE</Link>
            <Link to="/doctorlogin/booking">BOOK</Link>
            <Link to="/doctorlogin/payment">PAYMENT</Link>
            <Link to="/doctorlogin/history">HISTORY</Link>
          </div>
        )}
        <a onClick={toggleLabVisibility}>
          Lab Management
        </a>
        {isLabVisible && (
          <div className="options">
              <Link to="/doctorlogin/dashboard">View Reports</Link>
              <Link to="/doctorlogin/patientlab">Patient Lab Records</Link>
              <Link to="/doctorlogin/labUpload">Invoice Upload</Link>
              <Link to="/doctorlogin/labUploadHistory">Payment History</Link>
          </div>
        )}
        <Link to="/doctorlogin/diary">Diary</Link>
        <Link to="/doctorlogin/approval">Approval</Link>
        <a onClick={toggleProfileSettings}>
          Settings
        </a>
        {isProfileSettings && (
          <div className="options">
              {/* <Link to="/doctorlogin/view&update profile">View / Update Profile</Link> */}
              <Link to="/doctorlogin/changepassword">Change Password</Link>
              
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default SideNavbar;
