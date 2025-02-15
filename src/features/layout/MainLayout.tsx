import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import background from '../../assets/img/background.jpg'
import RequireAuth from '../auth/components/RequireAuth'

const MainLayout = () => {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <img
        src={background}
        alt="background"
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      />

      <RequireAuth>
        <Header />
        <div className="h-20" />
      </RequireAuth>

      <main className={`flex flex-col flex-1 transition-all duration-300`}>
        <Outlet />
      </main>
      <RequireAuth>
        <Footer />
      </RequireAuth>
    </div>
  )
}

export default MainLayout
