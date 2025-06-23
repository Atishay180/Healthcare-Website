import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast'
import AlertBox from '../components/AlertBox';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(() => { });

  const showConfirmation = (message, action, appointmentId) => {
    setAlertMessage(message);
    setAlertAction(() => () => action(appointmentId));
    setShowAlert(true);
  }

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }

  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });

      setAppointments(data.appointments.reverse())

    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    setLoading(true);
    setShowAlert(false);
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });

      toast.success(data.message || "Appointment Cancelled Successfully");
      getUserAppointments();
      getDoctorsData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])


  return (
    <>
      <div>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
        <div>
          {appointments && appointments.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item?.docData?.image} alt="Doctor" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>


              <div></div>

              {!item.cancelled
                ? <div className='flex flex-col gap-2 justify-end'>
                  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>

                  <button
                    onClick={() => showConfirmation("Are you sure want to cancel the appointment?", cancelAppointment, item._id)}
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'
                  >
                    Cancel appointment
                  </button>

                </div>
                :
                <div className='flex flex-col gap-2 justify-end'>
                  <button disabled className='sm:min-w-48 py-2 border border-red-500 text-red-500'>Appointment Cancelled</button>
                </div>
              }

            </div>
          ))}
        </div>
      </div>

      {showAlert && (
        <AlertBox
          question={alertMessage}
          onYes={() => alertAction()}
          onNo={() => setShowAlert(false)}
        />
      )}
    </>
  )
}

export default MyAppointments
