import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { MdCancel } from 'react-icons/md';

const AllAppointments = () => {
  const { token, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const handleCancelAppointment = (appointmentId) => {
    cancelAppointment(appointmentId);
  };

  useEffect(() => {
    getAllAppointments();
  }, [token, getAllAppointments]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments && appointments.map((item, index) => (
          <div
            key={item._id}
            className='flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 gap-y-2'
          >
            <p className='sm:block hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt={item.userData.name} />
              <p>{item.userData.name}</p>
            </div>

            <p className='sm:block hidden'>{calculateAge(item.userData.dob)}</p>

            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 bg-teal-100 rounded-full' src={item.docData.image} alt={item.docData.name} />
              <p>{item.docData.name}</p>
            </div>

            <p>{currency}{item.amount}</p>

            {item.cancelled ? (
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>
            ) : (
              <button
                onClick={() => handleCancelAppointment(item._id)}
                className='text-center'
              >
                <MdCancel title="Cancel Appointment" className='text-3xl text-red-400 cursor-pointer' />
              </button>
            )}

            {/* Mobile Layout */}
            <div className='sm:hidden flex flex-col gap-1 mt-2 text-xs text-gray-400'>
              <p><span className="font-medium text-black">Age:</span> {calculateAge(item.userData.dob)}</p>
              <p><span className="font-medium text-black">Appointment:</span> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p><span className="font-medium text-black">Doctor:</span> {item.docData.name}</p>
              <p><span className="font-medium text-black">Fees:</span> {currency}{item.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
