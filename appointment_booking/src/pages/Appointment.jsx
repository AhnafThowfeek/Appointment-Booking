import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const AppointmentDetails = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setShowAlert(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login after 2 seconds
      return;
    }

    navigate(path);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowAlert(true);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    fetchSlots();
    fetchUserAppointments();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/slots');
      if (!response.ok) throw new Error('Failed to fetch slots');
      const data = await response.json();
      setAvailableSlots(data); // Store the slot data including the slot ID
    } catch (err) {
      setError('Failed to load available slots');
      console.error(err);
    }
  };

  const fetchUserAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setUserAppointments(data);
    } catch (err) {
      setError('Failed to load your appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelection = (slotId) => {
    console.log('Selected Slot ID:', slotId);
    navigate(`/booking/${slotId}`); // Navigate to booking page with slot ID
  };

  if (showAlert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="bg-red-500 text-white p-6 rounded-lg text-lg font-bold">
          You must log in to view this page. Redirecting...
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center py-6 sm:py-8 px-2 sm:px-4">
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8">Appointment Details</h1>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4 w-full max-w-4xl text-sm sm:text-base">
          {error}
        </div>
      )}

    

      {/* Available Slots Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">Available Slots</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm md:text-base bg-slate-900 rounded-lg shadow-lg min-w-[600px]">
            <thead>
              <tr className="bg-slate-700 text-white text-[10px] sm:text-xs">
                <th className="px-2 sm:px-4 py-2 sm:py-3">ID</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">Date</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">Start Time</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">End Time</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {availableSlots.map((slot, index) => (
                <tr
                  key={slot.id}
                  className={`${index % 2 === 0 ? "bg-slate-800" : "bg-slate-700"} hover:bg-slate-600 transition`}
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    {format(new Date(slot.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    {format(new Date(slot.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    {format(new Date(`2000-01-01T${slot.start_time}`), 'hh:mm a')}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    {format(new Date(`2000-01-01T${slot.end_time}`), 'hh:mm a')}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <button
                      onClick={() => handleSlotSelection(slot.id)} // Pass the slot ID
                      className="bg-blue-500 text-white text-[10px] sm:text-sm font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
