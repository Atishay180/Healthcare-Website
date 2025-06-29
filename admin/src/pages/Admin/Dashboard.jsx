import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';

import { FaUserDoctor } from "react-icons/fa6";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {

  const { fetchDashboard, dashboardData } = useContext(AdminContext);

  useEffect(() => {
    fetchDashboard();  
  }, []);

  console.log(dashboardData);
  

  return (
    <div className="w-full px-6 py-6">
      {/* Cards Container */}
      <div className="flex flex-wrap gap-6 justify-evenly">

        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className="max-w-sm w-full sm:w-[300px] bg-white rounded-2xl shadow-xl p-6 flex justify-between items-center hover:scale-105 transition-transform duration-300"
          >

            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold text-gray-800">2</div>
              <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
              <NavLink to="/all-appointments" className="text-sm font-semibold text-red-500 cursor-pointer hover:underline">View</NavLink>
            </div>

            <div className="flex items-center justify-center">
              <span className="p-3 rounded-full text-3xl text-white bg-gradient-to-br from-primary to-tertiary shadow-md">
                <FaRegCalendarAlt />
              </span>
            </div>
          </div>
        ))}

      </div>

      {/* Additional Section Placeholder */}
      <div className="mt-8"></div>
    </div>

  )
}

export default Dashboard
