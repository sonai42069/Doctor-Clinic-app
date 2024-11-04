import React, { useState } from 'react';
import styled from 'styled-components';

// Sample list of consultants (this can come from an API or database)
const consultants = [
  { id: 1, name: 'Dr. John Doe' },
  { id: 2, name: 'Dr. Jane Smith' },
  { id: 3, name: 'Dr. Emily Davis' },
];

// Styled components for form layout
const PaymentContainer = styled.div`
  max-width: 800px;
  min-width: 400px;
  margin:  auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Make it relative for fixed elements */
  overflow: hidden; /* Prevent overflow of child elements */
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 22px; /* Adjusted font size */
  font-family: Arial, sans-serif; /* Adjusted font family */
  font-weight: bold; /* Adjusted font weight */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Subtopic = styled.label`
  font-size: 18px; /* Subtopic font size */
  color: #333;
  margin-top: 20px; /* Add margin for spacing */
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #03C0C1;
  border: none;
  border-radius: 19px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #028b8b;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.success ? 'green' : 'red')};
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #03C0C1;
  color: white;
  border: 1px solid #ddd;
`;

// Payment component
const Payment = () => {
  const [selectedConsultant, setSelectedConsultant] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a payment process (replace with real payment logic)
    if (selectedConsultant && amount && paymentDate) {
      const newPayment = {
        consultant: selectedConsultant,
        amount,
        paymentDate,
      };
      setPaymentHistory([...paymentHistory, newPayment]);
      setPaymentSuccess(true);

      // Clear the form fields after successful submission
      setSelectedConsultant('');
      setAmount('');
      setPaymentDate('');
    } else {
      setPaymentSuccess(false);
    }
  };

  return (
    <PaymentContainer>
      <Title>Doctor Payment to Consultant</Title>
      <Form onSubmit={handleSubmit}>
        {/* Consultant Selection */}
        <Subtopic>Select Consultant</Subtopic>
        <Select
          id="consultant"
          value={selectedConsultant}
          onChange={(e) => setSelectedConsultant(e.target.value)}
          required
        >
          <option value="">-- Choose Consultant --</option>
          {consultants.map((consultant) => (
            <option key={consultant.id} value={consultant.name}>
              {consultant.name}
            </option>
          ))}
        </Select>

        {/* Payment Amount */}
        <Subtopic>Payment Amount</Subtopic>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter payment amount"
          required
        />

        {/* Payment Date */}
        <Subtopic>Payment Date</Subtopic>
        <Input
          type="date"
          id="paymentDate"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          required
        />

        {/* Submit Payment */}
        <Button type="submit">Submit Payment</Button>
      </Form>

      {/* Payment Success or Failure Message */}
      {paymentSuccess !== null && (
        <Message success={paymentSuccess}>
          {paymentSuccess ? 'Payment successful!' : 'Payment failed. Please check your details.'}
        </Message>
      )}

      {/* Payment History Table Headings */}
      <Table>
        <thead>
          <tr>
            <TableHeader>Consultant</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index}>
              <td>{payment.consultant}</td>
              <td>{payment.amount}</td>
              <td>{payment.paymentDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PaymentContainer>
  );
};

export default Payment;
