import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { MdCancel } from 'react-icons/md';

const DoctorDashboardAppointments = () => {

  const { docAppointments } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  return (
    <section className='w-full bg-white rounded-xl shadow-md px-6 py-4'>
      <h2 className='text-xl font-semibold text-primary mb-2'>Patient Appointments</h2>

      <div className='overflow-x-auto max-h-[60vh] scrollbar-thin'>
        <table className='min-w-full text-sm text-gray-700'>
          <thead className='bg-primary text-white'>
            <tr>
              <th className='px-4 py-3 text-left'>#</th>
              <th className='px-4 py-3 text-left'>Patient</th>
              <th className='px-4 py-3 text-left'>Age</th>
              <th className='px-4 py-3 text-left'>Date & Time</th>
              <th className='px-4 py-3 text-left'>Doctor</th>
              <th className='px-4 py-3 text-left'>Fees</th>
              <th className='px-4 py-3 text-left'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {docAppointments && docAppointments.map((item, index) => (
              <tr
                key={item._id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}
              >
                <td className='px-4 py-3'>{index + 1}</td>

                <td className='px-4 py-3 flex items-center gap-2'>
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className='w-8 h-8 rounded-full object-cover shadow'
                  />
                  {item.userData.name}
                </td>

                <td className='px-4 py-3'>{calculateAge(item.userData.dob)}</td>

                <td className='px-4 py-3'>{slotDateFormat(item.slotDate)}, {item.slotTime}</td>

                <td className='px-4 py-3 flex items-center gap-2'>
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className='w-8 h-8 rounded-full object-cover shadow bg-gray-200'
                  />
                  {item.docData.name}
                </td>

                <td className='px-4 py-3'>{currency}{item.amount}</td>

                <td className='px-4 py-3'>
                  {item.cancelled ? (
                    <span className='text-red-400 font-medium text-xs'>Cancelled</span>
                  ) : (
                    <MdCancel
                      onClick={() => handleCancelAppointment(item._id)}
                      title='Cancel Appointment'
                      className='text-red-500 cursor-pointer text-xl hover:scale-105 transition'
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!docAppointments || docAppointments.length === 0) && (
          <div className='text-center text-gray-400 text-sm mt-6'>No appointments found.</div>
        )}
      </div>
    </section>
  )
}

export default DoctorDashboardAppointments
