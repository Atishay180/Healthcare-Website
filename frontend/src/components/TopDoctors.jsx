import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

import AOS from 'aos';
import 'aos/dist/aos.css';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true,
        });
    }, []);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-2xl font-semibold text-primary'>Top doctors to book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className="w-full flex flex-wrap justify-center gap-6 pt-5">
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        className="bg-white rounded-2xl shadow-md flex flex-col items-center text-center p-6 w-72 md:w-64 transition-all duration-300 hover:shadow-xl cursor-pointer"
                        data-aos="fade-up"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-36 rounded-full object-cover border-4 border-white bg-blue-50 shadow-md"
                        />

                        <div className={`flex items-center gap-2 mt-4 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                            <p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>

                        <h3 className="text-lg font-semibold text-primary mt-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                            {item.speciality}
                        </p>

                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                            Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.
                        </p>

                        <div className="flex gap-3 mt-4">
                            <a className="bg-blue-50 text-[#3b5998] p-2 rounded-lg text-xl">
                                <FaFacebookSquare />
                            </a>
                            <a className="bg-blue-50 text-[#1da1f2] p-2 rounded-lg text-xl">
                                <FaXTwitter />
                            </a>
                            <a className="bg-blue-50 text-[#e1306c] p-2 rounded-lg text-xl">
                                <MdAttachEmail />
                            </a>
                            <a className="bg-blue-50 text-[#0a66c2] p-2 rounded-lg text-xl">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                ))}
            </div>


            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-secondary shadow-md hover:shadow-xl  text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
        </div>
    )
}

export default TopDoctors
