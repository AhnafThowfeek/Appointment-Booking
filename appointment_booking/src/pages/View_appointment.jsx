import React, { useState } from 'react';

function ViewAppointment() {
  const [appointments, setAppointments] = useState([
    { id: '63c16a0ac572797092bf2868', date: '13-01-2023', time: '00:00', status: 'Pending' },
    { id: '63c254cd3079c3b61716228', date: '14-01-2023', time: '08:00', status: 'Pending' },
  ]);

  const handleApprove = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: 'Approved' } : appointment
      )
    );
  };

  const handleReject = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: 'Rejected' } : appointment
      )
    );
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 px-2 sm:px-4">
      <div className="bg-slate-800 border border-slate-400 rounded-lg p-4 sm:p-8 shadow-lg w-full max-w-4xl">
        <h1 className="text-xl sm:text-3xl text-white font-bold text-center mb-4 sm:mb-6">Appointments List</h1>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm md:text-base text-left text-gray-400 min-w-[500px]">
            <thead className="text-[10px] sm:text-xs md:text-sm uppercase bg-slate-700 text-gray-400">
              <tr>
                <th className="px-2 sm:px-4 py-1 sm:py-3 hidden sm:table-cell">ID</th> {/* Hide ID on mobile */}
                <th className="px-2 sm:px-4 py-1 sm:py-3">Date & Time</th>
                <th className="px-2 sm:px-4 py-1 sm:py-3">Status</th>
                <th className="px-2 sm:px-4 py-1 sm:py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="bg-slate-800 border-b border-slate-600 hover:bg-slate-700">
                  <td className="px-2 sm:px-4 py-1 sm:py-3 hidden sm:table-cell">{appointment.id}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{appointment.date} at {appointment.time}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{appointment.status}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 flex flex-col sm:flex-row gap-1 sm:gap-2">
                   
                    <button
                      onClick={() => handleReject(appointment.id)}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 w-full sm:w-auto"
                    >
                      Cancel
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
}

export default ViewAppointment;
