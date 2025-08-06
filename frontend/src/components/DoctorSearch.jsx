import React, { useState, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";

const DoctorSearch = () => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const filteredDoctors = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAppointmentClick = (id) => {
        navigate(`/appointment/${id}`);
    };
    return (
        <div className="w-full mx-auto py-6">
            {/* Search Bar */}
            <div
                data-aos="zoom-in-up"
                className="bg-white rounded-lg p-6 shadow-md flex flex-col lg:flex-row items-center gap-4"
            >
                <h2 className="text-xl font-semibold text-black">
                    Find a Doctor
                </h2>
                <input
                    type="text"
                    placeholder="Search doctor by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-primary rounded-md px-4 py-2 w-full lg:w-4/5 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Doctors Display */}
            {searchTerm.trim() !== '' && (
                filteredDoctors.length > 0 ? (
                    <div className="mt-8 flex flex-wrap justify-center gap-6">
                        {filteredDoctors.map((doc) => (
                            <div
                                key={doc._id}
                                className="bg-white rounded-xl shadow-lg p-5 w-64 text-center transition-transform hover:scale-105"
                                data-aos="fade-up"
                            >
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-24 h-24 rounded-full mx-auto border-4 border-blue-100 shadow"
                                />
                                <div className={`mt-3 text-sm font-medium ${doc.available ? 'text-green-600' : 'text-red-500'}`}>
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${doc.available ? 'bg-green-600' : 'bg-red-500'}`}></span>
                                    {doc.available ? 'Available' : 'Not Available'}
                                </div>
                                <h3 className="mt-2 text-lg font-semibold text-primary">{doc.name}</h3>
                                <button
                                    onClick={() => handleAppointmentClick(doc._id)}
                                    className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
                                >
                                    Book Appointment <FaArrowRight />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-8 text-red-500 text-base font-medium">
                        No doctor found with that name.
                    </p>
                )
            )}
        </div>
    );
}

export default DoctorSearch
