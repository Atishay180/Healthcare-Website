import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { token } = useContext(AdminContext);

  return token
    ? (
      <div>
        <ToastContainer />
      </div>
    )
    : (
      <div>
        <ToastContainer />
        <Login />
      </div>
    )
}

export default App
