import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import DoctorSearch from '../components/DoctorSearch'
import Stats from '../components/Stats'

const Home = () => {
  return (
    <div>
      <Header />
      <DoctorSearch />
      <Stats />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
