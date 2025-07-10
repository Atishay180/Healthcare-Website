import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { MdCancel } from 'react-icons/md';

const DoctorDashboardAppointments = () => {
  const { docAppointments } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  return (
    <section className='w-full bg-white rounded-xl shadow-md px-4 py-4 max-h-full md:max-h-72'>
      <h2 className='text-lg font-semibold text-black mb-2'>Upcoming Appointments</h2>

      <div className='overflow-auto max-h-80 md:max-h-52'>
        <table className='w-full text-sm text-gray-700 hidden sm:table'>
          <thead className='bg-primary text-white'>
            <tr>
              <th className='px-4 py-3 text-left'>#</th>
              <th className='px-4 py-3 text-left'>Patient</th>
              <th className='px-4 py-3 text-left'>Age</th>
              <th className='px-4 py-3 text-left'>Date & Time</th>
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

        {/* Mobile Version */}
        <div className='sm:hidden flex flex-col gap-4'>
          {docAppointments && docAppointments.map((item, index) => (
            <div
              key={item._id}
              className='border rounded-lg px-4 py-3 shadow-sm bg-gray-50'
            >
              <div className='flex items-center gap-2 mb-2'>
                <img src={item.userData.image} alt={item.userData.name} className='w-10 h-10 rounded-full object-cover' />
                <div>
                  <p className='font-medium'>{item.userData.name}</p>
                  <p className='text-xs text-gray-500'>Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>
              <p className='text-sm'><span className="font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p className='text-sm'><span className="font-medium">Fees:</span> {currency}{item.amount}</p>
              <div className='mt-2'>
                {item.cancelled ? (
                  <span className='text-red-400 font-medium text-xs'>Cancelled</span>
                ) : (
                  <MdCancel
                    onClick={() => handleCancelAppointment(item._id)}
                    title='Cancel Appointment'
                    className='text-red-500 cursor-pointer text-xl hover:scale-105 transition'
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {(!docAppointments || docAppointments.length === 0) && (
          <div className='text-center text-gray-400 text-sm mt-6'>No appointments found.</div>
        )}
      </div>
    </section>
  );
};

export default DoctorDashboardAppointments;
