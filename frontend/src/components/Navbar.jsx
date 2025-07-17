import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import AlertBox from './AlertBox';

import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    // Function to handle alert component
    const showConfirmation = (message, action) => {
        setAlertMessage(message);
        setAlertAction(() => action);
        setShowAlert(true);
    };


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertAction, setAlertAction] = useState(() => { });


    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout({ token, setToken });
        setShowAlert(false);
    }

    const adminURL = import.meta.env.VITE_ADMIN_URL;

    const handleAdminLogin = () => {
        window.location.href = adminURL;
        setShowAlert(false);
    }

    return (
        <>
            <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
                <div className='flex justify-center items-center text-lg font-semibold'>
                    <img onClick={() => navigate('/')} className='w-11 cursor-pointer' src={assets.logo} alt="" />
                    <p className='text-primary'>Health</p>
                    <p className='text-tertiary'>Care</p>
                </div>

                <ul className='hidden md:flex items-start gap-5 font-medium'>
                    <NavLink to="/">
                        <li className='py-1'>HOME</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto transform scale-x-0 transition-transform duration-300" />
                    </NavLink>

                    <NavLink to="/doctors">
                        <li className='py-1'>ALL DOCTORS</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto transform scale-x-0 transition-transform duration-300" />
                    </NavLink>

                    <NavLink to="/about">
                        <li className='py-1'>ABOUT</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto transform scale-x-0 transition-transform duration-300" />
                    </NavLink>

                    <NavLink to="/contact">
                        <li className='py-1'>CONTACT</li>
                        <hr className="border-none outline-none h-0.5 bg-primary w-4/5 m-auto transform scale-x-0 transition-transform duration-300" />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-4'>
                    {
                        token && userData
                            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                                <img className='w-8 rounded-full' src={userData.image} alt="" />
                                <img className='w-2.5' src={assets.dropdown_icon} alt="" />

                                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                        <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                        <p onClick={() => showConfirmation("Are you sure you want to logout?", handleLogout)} className='hover:text-black cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='flex items-center gap-3'>
                                <button
                                    onClick={() => navigate('/login')}
                                    className='bg-primary text-white hover:scale-95 transition-all duration-75 px-4 py-2 rounded-lg hidden md:block'
                                >
                                    Create Account
                                </button>
                                <button
                                    onClick={() => showConfirmation("You will be redirected to the admin login page. Are you sure you want to continue?", handleAdminLogin)}
                                    className='text-primary border border-primary hover:scale-95 transition-all duration-75 px-4 py-2 rounded-lg hidden md:block'
                                >
                                    Admin Login
                                </button>
                            </div>
                    }

                    <button className='text-2xl text-gray-800 md:hidden' onClick={() => setShowMenu(true)}><FaBars /></button>
                    {/* -------------Mobile Menu------------- */}
                    <div className={`${showMenu ? 'fixed w-40 sm:w-48' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-y-auto scroll-smooth flex flex-col justify-between rounded-l-lg shadow-xl shadow-gray-700 bg-white transition-all duration-300`}>
                        <div className='flex items-center justify-between px-5 py-6'>

                            {/* logo  */}
                            <div>
                                <img className='w-12' src={assets.logo} alt="" />
                                <p className='text-sm text-primary font-semibold'>Health<span className='text-tertiary'>Care</span></p>
                            </div>

                            {/* closing icon */}
                            <button className='text-4xl text-gray-800' onClick={() => setShowMenu(false)}><RxCross2 /></button>
                        </div>


                        <ul className='flex flex-col items-start gap-6 mt-5 px-5 mb-16 text-sm font-medium'>
                            <NavLink onClick={() => setShowMenu(false)} to="/">
                                <p className="px-2 py-1 rounded inline-block">HOME</p>
                            </NavLink>

                            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                                <p className="px-2 py-1 rounded inline-block">ALL DOCTORS</p>
                            </NavLink>

                            <NavLink onClick={() => setShowMenu(false)} to="/about">
                                <p className="px-2 py-1 rounded inline-block">ABOUT</p>
                            </NavLink>

                            <NavLink onClick={() => setShowMenu(false)} to="/contact">
                                <p className="px-2 py-1 rounded inline-block">CONTACT</p>
                            </NavLink>
                        </ul>


                        {!token
                            ? <div className='flex flex-col py-5 text-sm gap-2'>
                                <button
                                    onClick={() => { navigate('/login'), setShowMenu(false) }}
                                    className='bg-primary text-white hover:scale-95 mx-4 transition-all duration-75 px-1 py-2 rounded-lg'
                                >
                                    Create Account
                                </button>
                                <button
                                    onClick={() => (showConfirmation("You will be redirected to the admin login page. Are you sure you want to continue?", handleAdminLogin), setShowMenu(false))}
                                    className='text-primary border border-primary hover:scale-95 mx-4 transition-all duration-75 px-1 py-2 rounded-lg'
                                >
                                    Admin Login
                                </button>
                            </div>
                            :
                            <div className='flex flex-col py-5 text-sm gap-2'>
                                <button
                                    onClick={() => { showConfirmation("Are you sure you want to logout?", handleLogout), setShowMenu(false) }}
                                    className='bg-primary text-white hover:scale-95 mx-4 transition-all duration-75 px-1 py-2 rounded-lg'
                                >
                                    Logout
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {showAlert && (
                <AlertBox
                    question={alertMessage}
                    onYes={alertAction}
                    onNo={() => setShowAlert(false)}
                />
            )}
        </>
    )
}

export default Navbar
