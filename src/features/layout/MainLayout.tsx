import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { Background } from './components/Background'

const MainLayout = () => {
  return (
    <Background>
      <main className={`flex flex-col flex-1 transition-all duration-300 mt-6`}>
        <Outlet />
        <div className="h-16" />
      </main>
      <Footer />
    </Background>
  )
}

export default MainLayout
