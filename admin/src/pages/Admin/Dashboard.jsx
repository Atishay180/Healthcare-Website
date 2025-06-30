import React, { useEffect, useContext } from 'react';

import { FaRegCalendarAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

import DashboardTable from '../../components/dashboard/DashboardTable';
import DashboardNotification from '../../components/dashboard/DashboardNotification';
import DashboardCard from '../../components/dashboard/DashboardCard';

const Dashboard = () => {
  const { fetchDashboard, dashboardData, appointments } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="w-full px-2 md:px-6 py-6 max-h-screen overflow-y-scroll">
      {/* Cards */}
      <DashboardCard />

      <div className="flex flex-col lg:flex-row gap-6 mt-7 w-full">
        {/* Patient Table Section*/}
        <DashboardTable slotDateFormat={slotDateFormat} appointments={appointments} />

        {/* Notification Section */}
        <DashboardNotification />
      </div>
    </div>
  );
};

export default Dashboard;
