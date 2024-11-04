import React, { useState, useRef } from 'react';
// import './PatientDiary.css'; // Make sure to create and style this CSS file
import patientData from './dummyData'; // Correct default import
 // Import your dummy data
/*  import logo from '../assets/Dental.jpg'; */ // Adjust the path as needed
 import logo from '../landingpage/images/d.jpg';
//  import './index.css';
import './diary.css';

const PatientDiary = () => {
    const [patientId, setPatientId] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editableFees, setEditableFees] = useState({
        consultantFee: 0,
        labFee: 0,
        medicineFee: 0,
    });
    const receiptRef = useRef();

    const handleSearch = () => {
        const patient = patientData.find(p => p.id === Number(patientId));
        setSelectedPatient(patient || null);
        if (patient) {
            setEditableFees({
                consultantFee: patient.visits[0].consultantFee,
                labFee: patient.visits[0].labFee,
                medicineFee: patient.visits[0].medicineFee,
            });
        }
    };

    const handleEdit = (feeType, value) => {
        setEditableFees(prev => ({
            ...prev,
            [feeType]: value,
        }));
    };

    const handleGenerateReceipt = () => {
        window.print();
    };

    return (
        <div className="patient-diary">
            <header className="diary-header">
                <div className="header-left">
                   <img src={logo} alt="Clinic Logo" className="logo" />

                    <h1>Dr. Nithya's <br></br>Dental and Smile Design Clinic </h1>
                    
                </div>
                <div className="header-right">
                    <h2>Nithya Selvaraj, MDS</h2>
                    <p>Prosthodontist & Implantologist</p>
                    <p><strong>Reg.No:</strong>49867-A</p>
                    <p>+91 974-121-7007</p>
                    <p>dr.nit.sel@gmail.com</p>
                </div>
            </header>

            <div className="search-container">
                <input
                    className="input"
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter Patient ID"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {selectedPatient ? (
                <div className="receipt-container" ref={receiptRef}>
                    <h2>Patient Information</h2>
                    <p><strong>Name:</strong> {selectedPatient.name}</p>
                    <p><strong>Age:</strong> {selectedPatient.age}</p>
                    <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                    <p><strong>Chief Complaint:</strong> {selectedPatient.visits[0].description}</p>

                    <h3>Medicines Prescribed</h3>
                    <ul>
                        {selectedPatient.visits[0].medicines.map((medicine, index) => (
                            <li key={index}>{medicine}</li>
                        ))}
                    </ul>

                    <h3>Laboratory Tests</h3>
                    <ul>
                        {selectedPatient.visits[0].laboratory.map((test, index) => (
                            <li key={index}>{test}</li>
                        ))}
                    </ul>

                    <h3>Fees</h3>
                    <p>
                        <strong>Consultant Fee:</strong>
                        <input
                            type="number"
                            value={editableFees.consultantFee}
                            onChange={(e) => handleEdit('consultantFee', Number(e.target.value))}
                        />
                    </p>
                    <p>
                        <strong>Lab Fee:</strong>
                        <input
                            type="number"
                            value={editableFees.labFee}
                            onChange={(e) => handleEdit('labFee', Number(e.target.value))}
                        />
                    </p>
                    <p>
                        <strong>Medicine Fee:</strong>
                        <input
                            type="number"
                            value={editableFees.medicineFee}
                            onChange={(e) => handleEdit('medicineFee', Number(e.target.value))}
                        />
                    </p>
                    <h3>Total Fee:</h3>
                    <p>
                        <strong>
                            {editableFees.consultantFee + editableFees.labFee + editableFees.medicineFee}
                        </strong>
                    </p>

                    <button onClick={handleGenerateReceipt}>Print Receipt</button>
                </div>
            ) : (
                <p>No patient found. Please search for a valid Patient ID.</p>
            )}
        </div>
    );
};

export default PatientDiary;
