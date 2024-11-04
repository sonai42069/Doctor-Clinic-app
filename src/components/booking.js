import React, { useState } from 'react'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  consultantName: Yup.string().required('Consultant name is required'),
  consultantEmail: Yup.string().email('Invalid email').required('Email is required'),
  appointmentDate: Yup.date()
    .required('Appointment date and time are required')
    .min(new Date(), 'Date cannot be in the past'),
  reference: Yup.string()
});

const Booking = () => {
  // State to track booking confirmation
  const [isBooked, setIsBooked] = useState(false);
  const [consultantName, setConsultantName] = useState('');

  // List of consultants
  const consultants = [
    { id: 'consultant1', name: 'Consultant 1' },
    { id: 'consultant2', name: 'Consultant 2' },
    { id: 'consultant3', name: 'Consultant 3' }
  ];

  // Initial values for the form
  const initialValues = {
    consultantName: '',
    consultantEmail: '',
    appointmentDate: '',
    reference: ''
  };

  // Handle form submission
  const handleSubmit = (values) => {
    console.log('Form values:', values);
    setConsultantName(values.consultantName); // Save consultant name for confirmation
    setIsBooked(true); // Set booking status to true
  };

  return (
    <div className="booking-container" id="booking">
      <h1 id="title-section">Book an Appointment</h1>
      {isBooked ? (
        <div className="confirmation-message" id="confirmation-section">
          <h2>Booking Confirmed!</h2>
          <p>Thank you, {consultantName}. Your appointment has been successfully booked.</p>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="booking-form" id="form-section">
              <div className="form-group" id="consultant-name-section">
                <label htmlFor="consultantName" className="subtopic">Consultant Name</label>
                <Field
                  as="select"
                  id="consultantName"
                  name="consultantName"
                  className="form-field"
                >
                  <option value="" label="Select a consultant" />
                  {consultants.map((consultant) => (
                    <option key={consultant.id} value={consultant.name}>
                      {consultant.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="consultantName" component="div" className="error-message" />
              </div>

              <div className="form-group" id="consultant-email-section">
                <label htmlFor="consultantEmail" className="subtopic">Consultant Email</label>
                <Field
                  type="email"
                  id="consultantEmail"
                  name="consultantEmail"
                  className="form-field"
                />
                <ErrorMessage name="consultantEmail" component="div" className="error-message" />
              </div>

              <div className="form-group" id="appointment-date-section">
                <label htmlFor="appointmentDate" className="subtopic">Appointment Date & Time</label>
                <Field
                  type="datetime-local"
                  id="appointmentDate"
                  name="appointmentDate"
                  className="form-field"
                />
                <ErrorMessage name="appointmentDate" component="div" className="error-message" />
              </div>

              <div className="form-group" id="reference-section">
                <label htmlFor="reference" className="subtopic">References</label>
                <Field
                  as="textarea"
                  id="reference"
                  name="reference"
                  className="form-field"
                />
                <ErrorMessage name="reference" component="div" className="error-message" />
              </div>

              <button type="submit" className="submit-button" id="submit-button">Submit</button>
            </Form>
          )}
        </Formik>
      )}

<style>
        {`
          .booking-container {
         
             padding: 20px; 
            max-width: 500px;
            margin:auto; /* Add margin for space above and below */
            background-color: #f4f4f4;
            border-radius: 19px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .booking-form {
            display: flex;
            flex-direction: column;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .subtopic {
            font-size: 18px; /* Subtopic font size */
          }

          .form-field {
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            box-sizing: border-box;
          }

          .error-message {
            color: red;
            font-size: 0.875em;
          }

          .submit-button {
            background-color: #03c1c0;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 19px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .submit-button:hover {
            background-color: #007F80;
          }

          .confirmation-message {
            text-align: center;
            color: #333;
            margin-top: 20px;
          }

          #title-section {
            font-size: 24px; /* Set the font size to 24px */
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Booking;
