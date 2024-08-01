import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from '../components/NavBar'
const MainLayout = () => {
  return (
    <div className='w-full md:max-w-5xl m-auto  '>
        <NavBar/>
      <div className='w-full min-h-full'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout