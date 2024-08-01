import React from 'react'
import {Outlet} from 'react-router-dom'
const MainLayout = () => {
  return (
    <div className='w-full md:max-w-5xl m-auto'>
        <Outlet/>
    </div>
  )
}

export default MainLayout