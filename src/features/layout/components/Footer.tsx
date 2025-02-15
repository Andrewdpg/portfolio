import React from 'react'
import appIcon from '../../../assets/svg/react-logo.svg'
import Heading from '../../../components/Heading'

const Footer = () => {
  return (
    <footer className="bg-app-main/50 backdrop-blur text-app-white py-4 z-20">
      <div className="px-4 flex justify-between items-center text-sm">
        <img src={appIcon} alt="app Logo" className="h-20 -my-2" />
        <div className="text-right">
          <Heading>Andrewpg</Heading>
        </div>
      </div>
    </footer>
  )
}

export default Footer
