import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';

const Dashboard = () => {

  const { fetchDashboard, dashboardData } = useContext(AdminContext);

  const handleOnClick = () => {
    fetchDashboard();
  }

  useEffect(() => {
    console.log(dashboardData);

  }, [dashboardData, fetchDashboard]);

  return (
    <div>
      <button onClick={handleOnClick}>Click Test</button>
    </div>
  )
}

export default Dashboard
