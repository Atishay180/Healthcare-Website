import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const { specialities, doctors } = useContext(AppContext);

  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities && specialities.map((item) => (
            <p
              key={item._id}
              onClick={() => speciality === item.name ? navigate('/doctors') : navigate(`/doctors/${item.name}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === item.name ? "bg-indigo-100 text-black" : ""}`}
            >
              {item.name}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            // check if speciality is selected and its status is 'Coming Soon'
            specialities?.find(item => item.name === speciality)?.status === 'Coming Soon' ? (
              <div className="col-span-full text-center bg-yellow-50 rounded px-6 py-10">
                <p className="text-4xl font-semibold text-yellow-700">Coming Soon</p>
                <p className="text-lg text-yellow-600 mt-3">Doctors for this speciality will be available soon.</p>
                <p className="text-sm text-yellow-600 mt-3 italic">
                  {
                    specialities.find(item => item.name === speciality)?.description || "No description available."
                  }
                </p>
              </div>
            ) : (
              // Then check if doctor list is empty
              filterDoc.length === 0 ? (
                <div className="col-span-full text-center rounded-xl p-6">
                  <p className="text-xl font-semibold text-gray-700">No Doctors Found</p>
                  <p className="text-sm text-gray-500 mt-1">Try changing the speciality or check back later.</p>
                </div>
              )
                // If there are doctors, display them
                : (
                  filterDoc.map((item, index) => (
                    <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                      <img className='bg-blue-50' src={item.image} alt={item.name} />
                      <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                          <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                      </div>
                    </div>
                  ))))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
