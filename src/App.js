import React, { useState, useEffect } from 'react';
import './App.css';
import Landingpage from './landingpage/landingpage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import SideNavbar from './doctor/sidenav';
import Dashboard from './doctor/dashboard';
import Dailyappointments from './doctor/dailyappointments';
import Consultantlist from './components/ConsultantList';
import Profile from './components/profile';
import Booking from './components/booking';
import Payment from './components/Payment';
import BookingHistory from './components/History';
import DoctorLogin from './landingpage/DoctorLogin';
import PatientDiary from './doctor/diary';
import Globalnavbar from './doctor/globalnavbar';
import Approval from './doctor/approval';
import Patientlabrecords from './doctor/patientlabrecords';
import LabUpload from './doctor/labupload';
import LabHistory from './doctor/labuploadhistory';
import UpdateProfile from './doctor/updateprofile';
import Changepassword from './doctor/changepassword';

function App() {
  // Use localStorage to persist authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Persist login status in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove login status from localStorage
  };

  useEffect(() => {
    // This effect runs when the component mounts to check for persisted auth state
    const savedAuthState = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(savedAuthState);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Globalnavbar onLogout={handleLogout} />}  {/* Always show Globalnavbar when authenticated */}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/authenticate"
          element={
            !isAuthenticated ? (
              <DoctorLogin onLogin={handleLogin} />
            ) : (
              <Navigate to="/doctorlogin/dailyappointments" /> // Redirect immediately to doctor dashboard on successful login
            )
          }
        />
        {isAuthenticated ? (
          <Route path="/doctorlogin" element={<SideNavbar />}>
            
            
            <Route path="dailyappointments" element={<Dailyappointments />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="diary" element={<PatientDiary />} />
            <Route path="consultantlist" element={<Consultantlist />} />
            <Route path="profile" element={<Profile />} />
            <Route path="booking" element={<Booking />} />
            <Route path="payment" element={<Payment />} />
            <Route path="history" element={<BookingHistory />} />
            <Route path="patientlab" element={<Patientlabrecords />} />
            <Route path="labUpload" element={<LabUpload />} />
            <Route path="labUploadHistory" element={<LabHistory />} />
            <Route path="approval" element={<Approval />} />
            <Route path="view&update profile" element={<UpdateProfile />} />
            <Route path="changepassword" element={<Changepassword />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
