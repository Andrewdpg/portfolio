import React from 'react'
import { LinearProgress } from '@mui/material'

export const LoadingBar = () => {
  return (
    <LinearProgress
      className="w-full"
      sx={{
        bgcolor: '#ffffff',
        '& .MuiLinearProgress-bar': {
          backgroundColor: '#c0936c',
        },
      }}
    />
  )
}
