import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='p-12 h-screen'>
        <Outlet />
    </div>
  )
}

export default RootLayout