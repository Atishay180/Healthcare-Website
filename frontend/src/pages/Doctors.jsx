import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AppContext } from '../context/AppContext';

import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

import AOS from 'aos';
import 'aos/dist/aos.css';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const { specialities, doctors } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 700, // Animation duration in milliseconds
      once: true,
    });
  }, [location.pathname]);

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
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : 'bg-transparent text-primary border-primary'}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities && specialities.map((item, index) => (
            <p
              data-aos="fade-right"
              data-aos-delay={index * 100}
              key={item._id}
              onClick={() => speciality === item.name ? navigate('/doctors') : navigate(`/doctors/${item.name}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${speciality === item.name ? "border-primary text-primary" : "border-gray-300"}`}
            >
              {item.name}
            </p>
          ))}
        </div>

        <div className='w-full flex flex-wrap justify-center gap-6'>
          {
            // check if speciality is selected and its status is 'Coming Soon'
            specialities?.find(item => item.name === speciality)?.status === 'Coming Soon' ? (
              <div className="border w-full text-center bg-yellow-50 rounded px-6 py-10">
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
                    <div
                      key={index}
                      onClick={() => {
                        navigate(`/appointment/${item._id}`);
                        scrollTo(0, 0);
                      }}
                      className="bg-white rounded-2xl shadow-md flex flex-col items-center text-center p-6 w-72 md:w-64 transition-all duration-300 hover:shadow-xl cursor-pointer"
                      data-aos="fade-up"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-36 rounded-full object-cover border-4 border-white bg-blue-50 shadow-md"
                      />

                      <div className={`flex items-center gap-2 mt-4 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                        <p>{item.available ? 'Available' : 'Not Available'}</p>
                      </div>

                      <h3 className="text-lg font-semibold text-primary mt-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                        {item.speciality}
                      </p>

                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.
                      </p>

                      <div className="flex gap-3 mt-4">
                        <a className="bg-blue-50 text-[#3b5998] p-2 rounded-lg text-xl">
                          <FaFacebookSquare />
                        </a>
                        <a className="bg-blue-50 text-[#1da1f2] p-2 rounded-lg text-xl">
                          <FaXTwitter />
                        </a>
                        <a className="bg-blue-50 text-[#e1306c] p-2 rounded-lg text-xl">
                          <MdAttachEmail />
                        </a>
                        <a className="bg-blue-50 text-[#0a66c2] p-2 rounded-lg text-xl">
                          <FaLinkedin />
                        </a>
                      </div>
                    </div>
                  ))))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
