import React from 'react'

import { NavLink } from 'react-router-dom';

const DashboardCard = ({ title, count, routePath, Icon }) => {
    return (
        <div
            className="w-full sm:w-[48%] lg:w-[32%] bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex justify-between items-center hover:scale-105 transition-transform duration-300"
        >
            <div className="flex flex-col gap-1 sm:gap-2 w-[70%] break-words">
                <div className="text-xl sm:text-2xl font-semibold text-gray-800">{count}</div>
                <h1 className="text-base sm:text-xl font-bold text-gray-900">{title}</h1>
                <NavLink
                    to={`/${routePath}`}
                    className="text-sm font-semibold text-red-500 hover:underline"
                >
                    View
                </NavLink>
            </div>

            <span className="p-2 sm:p-3 rounded-full text-2xl sm:text-3xl text-white bg-gradient-to-br from-primary to-tertiary shadow-md">
                <Icon />
            </span>
        </div>
    )
}

export default DashboardCard
