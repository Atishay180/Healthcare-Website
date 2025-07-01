import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { FaArrowRight } from 'react-icons/fa';

const Specialities = () => {

    const { specialities } = useContext(AdminContext);

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <div className="flex flex-wrap justify-center md:justify-normal gap-6 pt-5 w-full">
                {specialities && specialities.map((speciality, index) => (
                    <div
                        key={speciality._id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-95 w-72 md:w-64 px-6 py-4 transition duration-300"
                    >
                        <img
                            src={speciality.image && speciality.image}
                            alt={speciality.name}
                            className="rounded-md w-full h-36 object-cover mb-3 border"
                        />
                        <h3 className="text-primary text-lg font-semibold">{speciality.name}</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel
                            facilisis volutpat est velitolm.
                        </p>
                        <NavLink
                            onClick={() => scrollTo(0, 0)}
                            to="/"
                            className="text-primary text-sm font-medium mt-4 inline-flex items-center gap-1"
                        >
                            Learn more <FaArrowRight className="text-xs" />
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Specialities
