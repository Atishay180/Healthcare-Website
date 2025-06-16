import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from "react-router-dom";

// React Icons
import { MdDashboard, MdAddBox } from 'react-icons/md';
import { FaRegCalendarAlt, FaUserMd } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';

const Sidebar = () => {
  const { token } = useContext(AdminContext);

  return (
    <div className='min-h-screen bg-white border-r'>
      {token && (
        <ul className='text-[#515151] mt-5'>

          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 min-w-16 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }
          >
            <MdDashboard className='text-2xl' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 min-w-16 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }
          >
            <FaRegCalendarAlt className='text-2xl' />
            <p className='hidden md:block'>Appointment</p>
          </NavLink>

          <NavLink
            to={'/add-speciality'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 min-w-16 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }
          >
            <MdAddBox className='text-2xl' />
            <p className='hidden md:block'>Add Speciality</p>
          </NavLink>

          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 min-w-16 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }
          >
            <FaUserMd className='text-2xl' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>

          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 min-w-16 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }
          >
            <HiUsers className='text-2xl' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>

        </ul>
      )}
    </div>
  );
};

export default Sidebar;
