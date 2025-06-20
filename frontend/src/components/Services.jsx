import React, { useContext, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {

    const { specialities } = useContext(AppContext);

    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true,
        });
    }, []);

    return (
        <div className='flex flex-col py-12 items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-2xl font-semibold text-primary'>Our Specialities</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>

            <div className="flex flex-wrap justify-center gap-6 pt-5 w-full">
                {specialities && specialities.map((speciality, index) => (
                    <div
                        data-aos="fade-up"
                        key={speciality._id}
                        className="bg-white rounded-xl shadow-sm w-72 md:w-64 px-6 py-4 transition hover:shadow-md"
                    >
                        <img
                            src={assets.Ophthalmologist}
                            alt={speciality.name}
                            className="rounded-md w-full h-36 object-cover mb-3 border"
                        />
                        <h3 className="text-primary text-lg font-semibold">{speciality.name}</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel
                            facilisis volutpat est velitolm.
                        </p>
                        <NavLink
                            onClick={() => scrollTo(0, 0)}
                            to="/about"
                            className="text-primary text-sm font-medium mt-4 inline-flex items-center gap-1"
                        >
                            Learn more <FaArrowRight className="text-xs" />
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
