import React, { useState, useEffect, useContext, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const DoctorSearch = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [doctor, setDoctor] = useState({});

    const { doctors } = useContext(AppContext);
    const cardRef = useRef(null); // ⬅️ New ref

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const handleSearch = () => {
        if (!name.trim()) {
            toast.error("Please enter doctor's name");
            return;
        }
        if (!speciality.trim()) {
            toast.error("Please enter the speciality");
            return;
        }

        const normalizedName = name.trim().toLowerCase().replace(/^dr\.?\s*/i, '');
        const normalizedSpeciality = speciality.trim().toLowerCase();

        const filteredDoc = doctors.filter(doc =>
            doc.name.toLowerCase().replace(/^dr\.?\s*/i, '').includes(normalizedName) &&
            doc.speciality.toLowerCase().includes(normalizedSpeciality)
        );

        if (filteredDoc.length === 0) {
            toast.error("No Doctor Found");
            return;
        }

        setDoctor(filteredDoc[0]);
        setName('');
        setSpeciality('');

        setTimeout(() => {
            cardRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div>
            <div
                data-aos="zoom-in-up"
                className="bg-white rounded-lg p-6 pb-16 shadow-sm w-full mx-auto flex flex-col lg:flex-row doctors-center gap-4"
            >
                <h2 className="text-lg font-semibold min-w-max">Find A Doctor</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-primary rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary flex-1"
                    required
                />

                <input
                    type="text"
                    placeholder="Speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="border border-primary rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary flex-1"
                    required
                />

                <button
                    onClick={handleSearch}
                    className="bg-primary text-white px-6 py-2 rounded transition-all"
                >
                    Search
                </button>
            </div>

            {Object.keys(doctor).length > 0 &&
                <div className='w-full flex flex-col items-center p-5 relative' ref={cardRef}>
                    <div
                        className="bg-white rounded-2xl shadow-md flex flex-col items-center doctors-center text-center p-6 w-72 md:w-64 transition-all duration-300 cursor-pointer"
                        data-aos="fade-up"
                    >
                        <button
                            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
                            onClick={() => setDoctor({})}
                        >
                            <RxCross2 />
                        </button>

                        <img
                            onClick={() => {
                                navigate(`/appointment/${doctor._id}`);
                                scrollTo(0, 0);
                            }}
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-36 rounded-full object-cover border-4 border-white bg-blue-50 hover:bg-blue-100 shadow-md"
                        />

                        <div className={`flex doctors-center gap-2 mt-4 items-center text-sm text-center ${doctor.available ? 'text-green-500' : 'text-red-500'}`}>
                            <p className={`w-2 h-2 ${doctor.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                            <p>{doctor.available ? 'Available' : 'Not Available'}</p>
                        </div>

                        <h3 className="text-lg font-semibold text-primary mt-1">{doctor.name}</h3>
                        <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                            {doctor.speciality}
                        </p>

                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                            Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.
                        </p>

                        <div className="flex gap-3 mt-4">
                            <a className="bg-blue-50 text-[#3b5998] p-2 rounded-lg text-xl"><FaFacebookSquare /></a>
                            <a className="bg-blue-50 text-[#1da1f2] p-2 rounded-lg text-xl"><FaXTwitter /></a>
                            <a className="bg-blue-50 text-[#e1306c] p-2 rounded-lg text-xl"><MdAttachEmail /></a>
                            <a className="bg-blue-50 text-[#0a66c2] p-2 rounded-lg text-xl"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default DoctorSearch;
