import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Header from './pages/Header';
import Home from './pages/Home';
import View_appointment from './pages/View_appointment';
import AppointmentDetails from './pages/Appointment';
import BookingPage from './pages/BookingPage';

function App(){
  return(
    <div className='w-full h-full flex flex-col'>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='booking' element={<BookingPage/>}/>
          <Route path='appointment' element={<AppointmentDetails/>}/>
          <Route path='view-appointment' element={<View_appointment/>}/>
        </Routes>
    </div>
       
  )
}

export default App;