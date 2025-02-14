import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleTimeChange = (e) => setSelectedTime(e.target.value);

  const checkAvailability = () => {
    if (selectedDate && selectedTime) {
      alert(`Checking availability for ${selectedDate} at ${selectedTime}`);
    } else {
      alert('Please select both date and time.');
    }
  };

  const bookAppointment = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment booked on ${selectedDate} at ${selectedTime}`);
    } else {
      alert('Please select both date and time to book an appointment.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-8">
      <div className="bg-slate-800 border border-slate-400 rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl text-white font-bold text-center mb-4">Booking id: 2</h1>
       

        <div className="mb-4">
          <label className="block text-gray-400 mb-1 text-sm sm:text-base" htmlFor="date">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full border border-slate-600 bg-slate-700 text-white rounded-md p-2 sm:p-3 focus:outline-none focus:ring focus:ring-blue-500 text-xs sm:text-sm"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-1 text-sm sm:text-base" htmlFor="time">
            Select Time
          </label>
            <input
              type="time"
              id="time"
              className="w-full border border-slate-600 bg-slate-700 text-white rounded-md p-2 sm:p-3 focus:outline-none focus:ring focus:ring-blue-500 text-xs sm:text-sm"
              value={selectedTime}
              onChange={handleTimeChange}
            />
        </div>

        <button
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300 text-sm sm:text-base"
          onClick={bookAppointment}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
