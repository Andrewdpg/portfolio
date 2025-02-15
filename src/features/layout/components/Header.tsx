import React from 'react'
import { Toolbar, Box } from '@mui/material'
import appIcon from '../../../assets/svg/react-logo.svg'
import { logout } from '../../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'
import { Button } from '../../../components/Button'
import RequireAuth from '../../auth/components/RequireAuth'

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await dispatch(logout())
    if (logout.fulfilled.match(result)) {
      navigate('/login?logout=true')
    }
  }

  return (
    <>
      <header className={`p-2 w-full fixed text-app-white z-20`}>
        <Toolbar className="flex justify-between bg-app-gray/20 backdrop-blur rounded-lg p-2">
          <img src={appIcon} alt="app Logo" className="h-14" />

          <Box className={`items-center gap-4 w-full justify-end flex`}>
            <Button variant="text">Home</Button>
            <Button variant="text">About me</Button>
            <RequireAuth>
              <Button onClick={handleLogout} variant="secondary">
                Logout
              </Button>
            </RequireAuth>
          </Box>
        </Toolbar>
      </header>
    </>
  )
}

export default Header
