import React from 'react'
import Header from '../components/Header'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import DoctorSearch from '../components/DoctorSearch'
import Stats from '../components/Stats'
import Services from '../components/Services'

const Home = () => {
  return (
    <div>
      <Header />
      <DoctorSearch />
      <Stats />
      <Services />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
