import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      {/* Heading Section */}
      <div className="text-center py-6 bg-slate-900 shadow-md">
        <h1 className="text-white text-3xl md:text-4xl font-bold">Home</h1>
      </div>

      {/* Alert Message (Shown if user is not logged in) */}
      {showAlert && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md text-lg">
          You must log in to access this page. Redirecting...
        </div>
      )}

      {/* Intro Section */}
      <div className="text-center px-6 py-6 md:py-8">
        <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">ABC Appointments</h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cupiditate illum, dolore ducimus obcaecati nam adipisci, 
          ratione animi laborum doloremque saepe. Voluptatum quidem suscipit quas libero accusantium nulla delectus veniam.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* View Appointment Button */}
          <button
            onClick={() => handleNavigation('/view-appointment')}
            className="bg-white text-slate-800 font-bold py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-xl shadow-lg hover:bg-blue-500 hover:text-white transition w-full md:w-auto text-center"
          >
            View Appointment
          </button>

          {/* Book Appointment Button */}
          <button
            onClick={() => handleNavigation('/appointment')}
            className="bg-white text-slate-800 font-bold py-4 md:py-6 px-8 md:px-12 text-base md:text-lg rounded-xl shadow-lg hover:bg-blue-500 hover:text-white transition w-full md:w-auto text-center"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
