import React from 'react'
import { Toolbar, Box } from '@mui/material'
import appIcon from '../../../assets/svg/react-logo.svg'
import { Button } from '../../../components/Button'

const Header: React.FC = () => {
  return (
    <>
      <header className={`p-2 w-full fixed text-app-white z-20`}>
        <Toolbar className="flex justify-between bg-app-gray/20 backdrop-blur rounded-lg p-2">
          <img src={appIcon} alt="app Logo" className="h-14" />

          <Box className={`items-center gap-4 w-full justify-end flex`}>
            <Button variant="text">Home</Button>
            <Button variant="text">About me</Button>
          </Box>
        </Toolbar>
      </header>
    </>
  )
}

export default Header
