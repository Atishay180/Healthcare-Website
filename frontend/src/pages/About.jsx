import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import AOS from 'aos'
import 'aos/dist/aos.css'

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <div>
      {/* About Us Title */}
      <div className='text-center text-2xl pt-10 text-gray-500' data-aos="zoom-in">
        <p className='text-primary'>ABOUT <span className='text-tertiary font-medium'>US</span></p>
      </div>

      {/* Image + Description Section */}
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img
          className='w-full md:max-w-[360px]'
          src={assets.about_image}
          alt=""
          data-aos="fade-right"
        />
        <div
          className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'
          data-aos="fade-left"
        >
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className='text-xl my-4' data-aos="zoom-in">
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      {/* Feature Boxes */}
      <div className='flex flex-col md:flex-row mb-20'>
        <div
          className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div
          className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div
          className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
