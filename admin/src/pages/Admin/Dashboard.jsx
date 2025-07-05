import React, { useEffect, useContext } from 'react';

import { FaRegCalendarAlt, FaUserMd } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { GiMedicalPack } from "react-icons/gi";

// import { NavLink } from 'react-router-dom';

import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

import DashboardTable from '../../components/dashboard/DashboardTable';
import DashboardNotification from '../../components/dashboard/DashboardNotification';
import DashboardCard from '../../components/dashboard/DashboardCard';

const Dashboard = () => {
  const { appointments, doctors, specialities } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  return (
    <div className="w-full px-2 md:px-6 py-6 max-h-screen overflow-y-scroll">
      {/* Cards */}
      <div className="flex flex-wrap justify-start md:justify-between gap-4">
        <DashboardCard title="Appointments" count={appointments && appointments.length} routePath='all-appointments' Icon={FaRegCalendarAlt} />
        <DashboardCard title="Doctors" count={doctors && doctors.length} routePath='doctor-list' Icon={FaUserMd} />
        <DashboardCard title="Specialities" count={specialities && specialities.length} routePath='all-specialities' Icon={GiMedicalPack} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-7 w-full">
        {/* Patient Table Section*/}
        <DashboardTable slotDateFormat={slotDateFormat} appointments={appointments} />

        {/* Notification Section */}
        <DashboardNotification Icon={FaTimes}/>

      </div>
    </div>
  );
};

export default Dashboard;
