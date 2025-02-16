import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { Background } from './components/Background'

const MainLayout = () => {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <main className={`flex flex-col flex-1 transition-all duration-300 mt-6`}>
        <Background />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
