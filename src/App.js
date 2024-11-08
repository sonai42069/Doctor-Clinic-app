import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; // Import the Navbar component
import SideNavbar from './components/sidenav'; // Import the SideNavbar component
import Booking from './components/booking'; // Your Booking component
import BookingHistory from './components/History'; // New BookingHistory component
import Payments from './components/Payment'; // Component for Payments
import ConsultantList from './components/ConsultantList'; // Import the ConsultantList component
import PaymentHistory from './components/PaymentHistory'; // Import PaymentHistory component
import AddConsultant from './components/AddConsultant'; // Import PaymentHistory component
import RescheduleConsultant from './components/RescheduleConsultant'; // Import PaymentHistory component
import CancelAppointment from './components/CancelAppointment'; // Import PaymentHistory component


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <SideNavbar />
          <div className="content">
            <Routes>
              <Route path="/booking" element={<Booking />} />
              <Route path="/history" element={<BookingHistory />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/payment-history" element={<PaymentHistory />} />
              <Route path="/consultantList" element={<ConsultantList />} />
              <Route path="/AddConsultant" element={<AddConsultant />} />
              <Route path="/RescheduleConsultant" element={<RescheduleConsultant />} />
              <Route path="/CancelAppointment" element={<CancelAppointment />} />
           
            </Routes>
          </div>
        </div>
      </div>
     
    </Router>
  );
};

export default App;
