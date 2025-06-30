import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const DashboardCard = () => {
    return (
        <div className="flex flex-wrap justify-start md:justify-between gap-4">
            {[1, 2, 3].map((item, index) => (
                <div
                    key={index}
                    className="w-full sm:w-[48%] lg:w-[32%] bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex justify-between items-center hover:scale-105 transition-transform duration-300"
                >
                    <div className="flex flex-col gap-1 sm:gap-2 w-[70%] break-words">
                        <div className="text-xl sm:text-2xl font-semibold text-gray-800">2</div>
                        <h1 className="text-base sm:text-xl font-bold text-gray-900">Appointments</h1>
                        <NavLink
                            to="/all-appointments"
                            className="text-sm font-semibold text-red-500 hover:underline"
                        >
                            View
                        </NavLink>
                    </div>

                    <span className="p-2 sm:p-3 rounded-full text-2xl sm:text-3xl text-white bg-gradient-to-br from-primary to-tertiary shadow-md">
                        <FaRegCalendarAlt />
                    </span>
                </div>
            ))}
        </div>
    )
}

export default DashboardCard
