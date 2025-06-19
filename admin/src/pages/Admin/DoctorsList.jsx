import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, token, changeAvailability } = useContext(AdminContext);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />

            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>

              <div className='mt-2 flex items-center gap-1 text-sm'>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all ${item.available ? 'bg-tertiary border-tertiary' : 'bg-white border-gray-400'
                      }`}
                  >
                    {item.available && (
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    )}
                  </div>
                  <p className="text-sm">{item.available ? 'Available' : 'Unavailable'}</p>
                </label>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
