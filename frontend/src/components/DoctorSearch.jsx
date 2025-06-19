import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DoctorSearch = () => {
    const [name, setName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const handleSearch = () => {
        console.log({ name, speciality, available });
    };

    return (
        <div
            data-aos="zoom-in-up"
            className="bg-white rounded-lg p-6 pb-16 shadow-sm w-full mx-auto flex flex-col lg:flex-row items-center gap-4"
        >
            <h2 className="text-lg font-semibold min-w-max">Find A Doctor</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-primary rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary flex-1"
            />

            <input
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border border-primary rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary flex-1"
            />

            <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Available</label>
                <button
                    onClick={() => setAvailable(!available)}
                    className={`w-10 h-6 rounded-full border border-primary relative transition-all duration-300 ${available ? 'bg-primary' : 'bg-white'}`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 transform ${available ? 'translate-x-4' : ''}`}
                    ></span>
                </button>
            </div>

            <button
                onClick={handleSearch}
                className="bg-primary text-white px-6 py-2 rounded transition-all"
            >
                Search
            </button>
        </div>
    );
};

export default DoctorSearch;
