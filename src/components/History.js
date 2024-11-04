import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for layout
const BookingHistoryContainer = styled.div`
  max-width: 500px;
  margin:  auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
  margin-bottom: 5px;
  display: inline-block;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 90%;
  font-family: Arial, sans-serif;
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #03c1c0;
    outline: none;  /* Remove default browser outline on focus */
  }
`;

const BookingList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const BookingItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: #03c1c0;
  }
`;

const NoBookingsMessage = styled.p`
  text-align: center;
  color: #666;
`;

const BookingHistory = () => {
  const [filter, setFilter] = useState('lastWeek');

  // Dummy filtered booking data
  const filteredBookings = [];

  return (
    <BookingHistoryContainer>
      <Title>Booking History</Title>
      <FilterSection>
        <FilterLabel htmlFor="filter">Filter by:</FilterLabel>
        <FilterSelect
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </FilterSelect>
      </FilterSection>

      <BookingList>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <BookingItem key={index}>
              <p>{booking.consultantName} - {booking.date} at {booking.time}</p>
            </BookingItem>
          ))
        ) : (
          <NoBookingsMessage>No bookings found for the selected time frame.</NoBookingsMessage>
        )}
      </BookingList>
    </BookingHistoryContainer>
  );
};

export default BookingHistory;
