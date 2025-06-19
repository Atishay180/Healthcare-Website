import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  return (
    <div>
      {/* Heading */}
      <div className='text-center text-2xl pt-10 text-gray-500' data-aos="zoom-in">
        <p className='text-primary'>CONTACT <span className='text-tertiary font-semibold'>US</span></p>
      </div>

      {/* Content Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

        {/* Left Image */}
        <img
          className='w-full md:max-w-[360px]'
          src={assets.contact_image}
          alt=""
          data-aos="fade-right"
        />

        {/* Right Text Info */}
        <div
          className='flex flex-col justify-center items-start gap-6'
          data-aos="fade-left"
        >
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>8384 Sector 30 <br /> XYX Road, Mumbai, India</p>
          <p className='text-gray-500'>Tel: 4913-123442 <br /> Email: prescriptoNew@gmail.com</p>

          <p className='font-semibold text-lg text-gray-600'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>

          <button
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
