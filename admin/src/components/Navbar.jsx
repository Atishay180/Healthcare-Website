import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import AlertBox from './AlertBox'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const { token, setToken } = useContext(AdminContext);
    const { doctoken, setDoctoken } = useContext(DoctorContext);

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);

    const logout = () => {
        navigate('/');
        token && setToken('');
        token && localStorage.removeItem('token');

        doctoken && setDoctoken('');
        doctoken && localStorage.removeItem('doctoken');
        setShowAlert(false);
    }

    return (
        <>
            <div className='flex justify-between font-bold shadow-sm items-center w-full px-4 sm:px-10 py-3'>
                <div className='flex justify-center text-lg font-semibold'>
                    <img className='w-11 cursor-pointer' src={assets.admin_logo} alt="" />
                    <div className='flex justify-center items-center mr-1'>
                        <p className='text-primary font-outfit'>Health</p>
                        <p className='text-tertiary font-outfit'>Care</p>
                    </div>
                    <p className='border flex items-center justify-center font-outfit text-xs h-6 px-2.5 py-0.5 rounded-full border-primary text-primary'>{token ? 'Admin' : 'Doctor'}</p>
                </div>


                <button onClick={() => setShowAlert(true)} className='bg-primary border text-white text-xs md:text-sm px-5 py-1 md:px-10 md:py-2 rounded-lg cursor-pointer hover:text-primary hover:border-primary hover:bg-transparent'>Logout</button>
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
