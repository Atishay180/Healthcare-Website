import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'
import ErrorPage from './pages/Error'
import Prompt from './components/Prompt'

const App = () => {
  const { token } = useContext(AppContext);

  return (
    <div className='bg-gray-100'>
      <div className='px-4 sm:px-[10%]'>
      <div>
        <Prompt />
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={token ? <MyProfile /> : <Login />} />
          <Route path='/my-appointments' element={token ? <MyAppointments /> : <Login />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
