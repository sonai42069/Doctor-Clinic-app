import React, { useState } from 'react';
import './sidenav.css';
import { Link, Outlet } from 'react-router-dom';

const SideNavbar = () => {
    const [isConsultantVisible, setIsConsultantVisible] = useState(false);  // Control consultants dropdown visibility
    const [isAppointmentVisible, setIsAppointmentVisible] = useState(false);  // Control appointments dropdown visibility
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);  // Control payments dropdown visibility

    // Toggle visibility functions for each section
    const toggleConsultantVisibility = () => {
        setIsConsultantVisible(prevState => !prevState);
    };
    const toggleAppointmentVisibility = () => {
        setIsAppointmentVisible(prevState => !prevState);
    };
    const togglePaymentVisibility = () => {
        setIsPaymentVisible(prevState => !prevState);
    };

    return (
        <div className="side-navbar-container">
            <div className="side-navbar">
                {/* Manage Consultants Section */}
                <a onClick={toggleConsultantVisibility}>
                    Manage Consultants
                </a>
                {isConsultantVisible && (
                    <div className="options">
                        <Link to="/consultantlist">View</Link>
                        <Link to="/AddConsultant">Add</Link>
                    </div>
                )}

                {/* Consultant Appointments Section */}
                <a onClick={toggleAppointmentVisibility}>
                    Consultant Appointments
                </a>
                {isAppointmentVisible && (
                    <div className="options">
                        <Link to="/booking">Book Appointment</Link>
                        <Link to="/RescheduleConsultant">Reschedule</Link>
                        <Link to="/CancelAppointment">Cancel</Link>
                    </div>
                )}

                {/* Manage Payments Section */}
                <a onClick={togglePaymentVisibility}>
                    Manage Payments
                </a>
                {isPaymentVisible && (
                    <div className="options">
                        <Link to="/payments">Payments</Link>
                        <Link to="/payment-history">Payment History</Link>
                    </div>
                )}
            </div>
            
            <Outlet />
        </div>
    );
};

export default SideNavbar;
