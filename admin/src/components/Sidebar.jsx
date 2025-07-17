import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from "react-router-dom";

// React Icons
import { MdDashboard, MdAddBox } from 'react-icons/md';
import { FaRegCalendarAlt, FaUserMd } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { GiMedicalPack } from "react-icons/gi";
import { DoctorContext } from '../context/DoctorContext';

import { MdFreeCancellation } from "react-icons/md";

const Sidebar = () => {
  const { token } = useContext(AdminContext);
  const { doctoken } = useContext(DoctorContext);

  return (
    <div className='min-h-screen'>

      {token && (
        <ul className='text-[#515151] mt-5'>

          <NavLink
            to={'/'}
            id='home'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 min-w-16 md:min-w-60 my-4 mx-1 md:mx-4 rounded-lg cursor-pointer ${isActive ? 'bg-white border-r-4 border-primary shadow-lg' : ''}`
            }
          >
            <span className='border p-1 rounded-lg bg-gradient-to-br from-primary to-tertiary text-white'>
              <MdDashboard className='text-xl md:text-2xl' />
            </span>
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to={'/all-appointments'}
            id='all-appointments'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 min-w-16 md:min-w-60 my-4 mx-1 md:mx-4 rounded-lg cursor-pointer ${isActive ? 'bg-white border-r-4 border-primary shadow-lg' : ''}`
            }
          >
            <span className='border p-1 rounded-lg bg-gradient-to-br from-primary to-tertiary text-white'>
              <FaRegCalendarAlt className='text-xl md:text-2xl' />
            </span>
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink
            to={'/add-speciality'}
            id='add-speciality'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 min-w-16 md:min-w-60 my-4 mx-1 md:mx-4 rounded-lg cursor-pointer ${isActive ? 'bg-white border-r-4 border-primary shadow-lg' : ''}`
            }
          >
            <span className='border p-1 rounded-lg bg-gradient-to-br from-primary to-tertiary text-white'>
              <MdAddBox className='text-xl md:text-2xl' />
            </span>
            <p className='hidden md:block'>Add Speciality</p>
          </NavLink>

          <NavLink
            to={'/all-specialities'}
            id='all-specialities'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 min-w-16 md:min-w-60 my-4 mx-1 md:mx-4 rounded-lg cursor-pointer ${isActive ? 'bg-white border-r-4 border-primary shadow-lg' : ''}`
            }
          >
            <span className='border p-1 rounded-lg bg-gradient-to-br from-primary to-tertiary text-white'>
              <GiMedicalPack className='text-xl md:text-2xl' />
            </span>
            <p className='hidden md:block'>Specialities</p>
          </NavLink>

          <NavLink
            to={'/add-doctor'}
            id='add-doctor'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 min-w-16 md:min-w-60 my-4 mx-1 md:mx-4 rounded-lg cursor-pointer ${isActive ? 'bg-white border-r-4 border-primary shadow-lg' : ''}`
            }
          >
            <span className='border p-1 rounded-lg bg-gradient-to-br from-primary to-tertiary text-white'>
              <FaUserMd className='text-xl md:text-2xl' />
            </span>
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>

          <NavLink
            to={'/doctor-list'}
            id='doctor-list'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 min-w-16 md:min-w-60 my-4 mx-1 md:mx-4 rounded-lg cursor-pointer ${isActive ? 'bg-white border-r-4 border-primary shadow-lg' : ''}`
            }
          >
            <span className='border p-1 rounded-lg bg-gradient-to-br from-primary to-tertiary text-white'>
              <HiUsers className='text-xl md:text-2xl' />
            </span>
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>

        </ul>
      )}
    </div>
  );
};

export default Sidebar;
