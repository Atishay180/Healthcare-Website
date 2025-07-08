import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'

const DoctorDashboardProfile = () => {
    return (
        <div className='flex flex-col sm:flex-row gap-4'>
            <div>
                <img className='bg-primary w-full sm:max-w-72 rounded-lg' src="https://res.cloudinary.com/dg8lfsyon/image/upload/v1749924924/cv3yfwuo0oxavhk95rmj.png" alt="" />
            </div>

            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                {/* -------Doc Info : name, degree, experience, etc------- */}
                <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>Sarah patel
                    <img className='w-5' src={assets.verified_icon} alt="" />
                </p>
                <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                    <p>MBBS - Pedraiticians</p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>10 yrs</button>
                </div>

                {/* ------------------Doctor About------------------ */}
                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                        About
                        <img src={assets.info_icon} alt="" />
                    </p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum expedita possimus qui non mollitia officia fugit facere laudantium aliquid ipsum dolor, culpa, rerum harum tenetur distinctio, omnis et accusamus consequuntur tempore laborum modi vitae. Nam quidem labore maxime. Soluta ducimus quaerat molestiae velit culpa veritatis dolores, voluptas illo minima dolorem.</p>
                </div>

                <p className='text-gray-500 font-medium mt-4'>
                    Appointment fee: <span className='text-gray-600'>₹ 100000</span>
                </p>
            </div>
        </div>
    )
}

export default DoctorDashboardProfile
