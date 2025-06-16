import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import AlertBox from './AlertBox'

const Navbar = () => {
    const { token, setToken } = useContext(AdminContext);

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);

    const logout = () => {
        navigate('/');
        token && setToken('');
        token && localStorage.removeItem('token');
        setShowAlert(false);
    }

    return (
        <>
            <div className='flex justify-between items-center w-full px-4 sm:px-10 py-3 border-b bg-white'>
                <div className='flex items-center gap-2 text-xs'>
                    <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                    <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{token ? 'Admin' : 'Doctor'}</p>
                </div>
                <button onClick={() => setShowAlert(true)} className='bg-primary text-white text-xs md:text-sm px-5 py-1 md:px-10 md:py-2 rounded-full cursor-pointer'>Logout</button>
            </div>

            {/* alert box component */}
            {showAlert && (
                <AlertBox
                    question="Are you sure you want to logout?"
                    onYes={logout}
                    onNo={() => setShowAlert(false)}
                />
            )}
        </>
    )
}

export default Navbar
