import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const DoctorDashboardProfile = () => {
    const { doctoken, docData, changeAvailability } = useContext(DoctorContext);
    const { currency } = useContext(AppContext);

    const handleAvailabilityChange = async () => {
        changeAvailability();
    };

    return (
        <>
            {doctoken && (
                <section className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-start gap-10">
                    {/* Profile Image */}
                    <div className="w-full sm:w-64">
                        <img
                            src={docData.image}
                            alt="Doctor"
                            className="w-full object-cover bg-primary rounded-xl shadow-sm"
                        />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 space-y-4">
                        {/* Name and Verified */}
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-semibold text-gray-800">{docData.name}</h2>
                            <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
                        </div>

                        <p className="text-sm text-gray-500">{docData.doctorId}</p>

                        {/* Degree & Speciality */}
                        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                            <p>{docData.degree} - {docData.speciality}</p>
                            <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-full text-xs">
                                {docData.experience}
                            </span>
                        </div>

                        {/* About Section */}
                        <div className="mt-2">
                            <div className="flex items-center gap-1 font-medium text-gray-800">
                                About
                                <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
                            </div>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{docData.about}</p>
                        </div>

                        {/* Fee Info */}
                        <div className='flex gap-4'>
                            <p className="text-sm font-medium text-gray-700 mt-2">
                                Fees: <span className="text-gray-500">{currency}{docData.fees}</span>
                            </p>

                            <div className="flex items-center gap-4 mt-2">
                                <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                    {docData.available ? 'Available' : 'Not Available'}
                                    <input
                                        type="checkbox"
                                        checked={docData.available}
                                        onChange={handleAvailabilityChange}
                                        className="w-4 h-4 accent-green-600"
                                    />
                                </label>
                            </div>
                        </div>

                    </div>
                </section>
            )}
        </>
    );
};

export default DoctorDashboardProfile;
