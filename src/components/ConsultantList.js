import React, { useEffect, useState } from 'react';
import ConsultantCard from './ConsultantCard';
import styled from 'styled-components';
import { db } from '../config/FirebaseConfig'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore';

// Define styled components for the list
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  max-width: 1000px; /* Limit the width of the list */
  margin: auto; /* Center the list */
`;

const ConsultantCardContainer = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px; /* Space between cards */
  width: 250px; /* Set a fixed width for cards */
  overflow: hidden; /* Ensure content doesn't overflow */
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05); /* Scale effect on hover */
  }
`;

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      const consultantsCollection = collection(db, 'consultants'); // Change 'consultants' to your collection name
      const consultantSnapshot = await getDocs(consultantsCollection);
      const consultantList = consultantSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setConsultants(consultantList);
      setLoading(false);
    };

    fetchConsultants();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can add a loading spinner here
  }

  return (
    <ListContainer>
      {consultants.map((consultant) => (
        <ConsultantCardContainer key={consultant.id}>
          <ConsultantCard
            photo={consultant.photo} // Ensure photo URL is stored in Firestore
            name={consultant.name}
            specialty={consultant.specialty}
            availability={consultant.availability}
          />
        </ConsultantCardContainer>
      ))}
    </ListContainer>
  );
};

export default ConsultantList;
