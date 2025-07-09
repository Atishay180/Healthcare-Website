import React, { useContext } from 'react'
import DoctorDashboardAppointments from '../../components/doctorDashboard/DoctorDashboardAppointments'
import DoctorDashboardNotification from '../../components/doctorDashboard/DoctorDashboardNotification'
import DoctorDashboardProfile from '../../components/doctorDashboard/DoctorDashboardProfile'
import DoctorDashboardSkeleton from '../../components/skeleton/DoctorDashboardSkeleton '
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {

    const { docData, docAppointments } = useContext(DoctorContext);

    if (!docData || !docAppointments) {
        return <DoctorDashboardSkeleton />
    }

    return (
        <div className='py-4 px-1 flex flex-col gap-4 h-screen overflow-y-scroll'>
            {/* top */}
            {/* profile */}
            <div>
                <DoctorDashboardProfile />
            </div>


            {/* bottom */}
            <div className='flex justify-between flex-col md:flex-row gap-4'>
                {/* appointments */}
                <div className='w-full md:w-3/5'>
                    <DoctorDashboardAppointments />
                </div>

                {/* notifications */}
                <div className='w-full md:w-2/5'>
                    <DoctorDashboardNotification />
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
