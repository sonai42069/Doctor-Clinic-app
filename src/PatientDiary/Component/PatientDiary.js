import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this is your Firebase configuration file

const PatientDiary = () => {
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const patientsCollection = collection(db, 'Patient Appointments');
        const patientsSnapshot = await getDocs(patientsCollection);
        const patientList = patientsSnapshot.docs.map(doc => doc.data());
        
        setPatients(patientList);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchBasicInfo();
  }, []);

  // const formatDateOfBirth = (dob) => {
  //   const dateParts = dob.split('_');
  //   const year = dateParts[0];
  //   const month = dateParts[1] - 1;
  //   const day = dateParts[2];

  //   return new Date(year, month, day).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   });
  // };

  const filteredPatients = patients.filter((patient) => {
    const appointmentDate = patient.appointment_date.replace(/_/g, '-'); // Replace underscores with hyphens for comparison
    return appointmentDate === selectedDate; // Filter by selected date
  });

  return (
    <div>
      <h2 className="patient-diaries-header">Today's Diary</h2>

      {/* Calendar Input */}
      <input
        type="date"
        className="date-picker"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {filteredPatients.length > 0 ? (
        <table className="patient-diaries-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Gender</th>
              <th>Advice</th>
              <th>Payment</th>
              <th>Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className="patient-basic-info-row">
                <td>{patient.patient_name}</td>
                <td>{patient.patient_id}</td>
                <td>{patient.gender}</td>
                <td>{patient.Advice_patient || "Not available" }</td>
                <td>{patient.payment ||"pendding"}</td>
                <td>{patient.slot_start_time || "Not available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className='foot'>No Patient Diaries Available</h2>
      )}
    </div>
  );
};

export default PatientDiary;
