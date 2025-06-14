import React, { useContext } from 'react'
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import Login from './pages/login'
import Navbar from './components/Navbar';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import AddSpeciality from './pages/Admin/AddSpeciality';

const App = () => {
  const { token } = useContext(AdminContext);

  return token
    ? (
      <div className='bg-[#F8F9FD]'>
        <Toaster />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/add-speciality' element={<AddSpeciality/>} />
            <Route path='/doctor-list' element={<DoctorsList />} />
          </Routes>
        </div>
      </div> 
    )
    : (
      <div>
        <Toaster />
        <Login />
      </div>
    )
}

export default App
