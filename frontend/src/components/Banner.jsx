import React, { useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const handleOnClick = () => {
        if (!token) {
            navigate('/login');
            scrollTo(0, 0);
        } else {
            navigate('/doctors');
            scrollTo(0, 0);
            toast.success("Choose a doctor to book an appointment");
        }
    };

    return (
        <div
            className='flex bg-gradient-to-b from-primary via-primary to-tertiary shadow-lg rounded-xl px-6 sm:px-10 md:px-12 my-20 md:mx-10'
            data-aos="zoom-in-up"
        >
            {/*-------------------- left-side --------------------*/}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5' data-aos="fade-right">
                <div className='text-xl text-white sm:text-2xl md:text-3xl lg:text-5xl font-semibold'>
                    <p>Book Appointment</p>
                    <p className='mt-4'>With 100+ Trusted Doctors</p>
                </div>

                <button
                    onClick={handleOnClick}
                    className='bg-white text-sm sm:text-base text-gray-600 px-5 md:px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
                    data-aos="zoom-in"
                    data-aos-delay="300"
                >
                    {token
                        ? 'Book Appointment Now'
                        : 'Create Account'
                    }
                </button>
            </div>

            {/*-------------------- right-side --------------------*/}
            <div
                className='hidden sm:block md:w-1/2 lg:w-[370px] relative'
                data-aos="fade-left"
                data-aos-delay="400"
            >
                <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
            </div>
        </div>
    );
};

export default Banner;
