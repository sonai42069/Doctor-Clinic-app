import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

// Define styled components for the card
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 20px;
  max-width: 300px;
  text-align: center;
`;

const Photo = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 15px;
`;

const Specialty = styled.p`
  font-weight: bold;
  margin: 10px 0;
`;

const Availability = styled.p`
  margin: 10px 0;
  color: #555;
`;

// Use Link styled like a button
const Button = styled(Link)`
  display: inline-block;
  background-color: #03c1c0;
  color: white;
  text-decoration: none;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007F80;
  }
`;

// ConsultantCard component
const ConsultantCard = ({ photo, name, specialty, availability }) => {
  return (
    <Card>
      <Photo src={photo} alt={`${name}'s photo`} />
      <Content>
        <h3>{name}</h3>
        <Specialty>Specialty: {specialty}</Specialty>
        <Availability>Availability: {availability}</Availability>
        {/* Use Link to redirect to the profile page */}
        <Button to="/profile">View Profile</Button>
      </Content>
    </Card>
  );
};

export default ConsultantCard;
