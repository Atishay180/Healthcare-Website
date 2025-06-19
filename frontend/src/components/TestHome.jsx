import React from 'react'
import { assets } from '../assets/assets'
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const TestHome = () => {
    return (
        <section className="w-full bg-[#f5f5f5] py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-6">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-black leading-snug">
                    Providing Quality <span className="text-primary">Healthcare</span> For A <br />
                    <span className="text-lime-500">Brighter</span> And <span className="text-tertiary">Healthy</span> Future
                </h1>

                <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                    At Our Hospital, We Are Dedicated To Providing Exceptional Medical Care To Our Patients And Their Families.
                    Our Experienced Team Of Medical Professionals, Cutting-Edge Technology, And Compassionate Approach Make Us A
                    Leader In The Healthcare Industry.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                    <NavLink
                        to="/doctors"
                        className="bg-primary flex items-center text-secondary gap-2 px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                    >
                        Book Appointment <FaArrowRight />
                    </NavLink>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center">
                {/* Blob Background */}
                <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-gradient-to-b from-primary to-tertiary rounded-[60%_40%_30%_70%/60%_30%_60%_40%] z-0"></div>

                {/* Doctor Image */}
                <img
                    src={assets.header_img}
                    alt="Doctor"
                    className="relative z-10 w-64 sm:w-72 md:w-96 h-auto object-cover rounded-bl-[40%] rounded-br-[20%]"
                />

                {/* 24/7 Badge */}
                <div className="absolute top-4 right-4 bg-white text-sm font-medium px-3 py-1 rounded-full shadow z-20">
                    <span className="text-tertiary">24/7</span> Service
                </div>
            </div>
        </section>
    )
}

export default TestHome
