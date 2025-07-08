import React from 'react'
import DoctorDashboardAppointments from '../../components/doctorDashboard/DoctorDashboardAppointments'
import DoctorDashboardNotification from '../../components/doctorDashboard/DoctorDashboardNotification'
import DoctorDashboardProfile from '../../components/doctorDashboard/DoctorDashboardProfile'

const DoctorDashboard = () => {
    return (
        <div className='p-2'>
            {/* top */}
            {/* profile */}
            <div>
                <DoctorDashboardProfile />
            </div>

            {/* bottom */}
            <div className='flex justify-between'>
                {/* appointments */}
                <div>
                    <DoctorDashboardAppointments />
                </div>

                {/* notifications */}
                <div>
                    <DoctorDashboardNotification />
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
