import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
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
      {/* <SpecialityMenu /> */}
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
