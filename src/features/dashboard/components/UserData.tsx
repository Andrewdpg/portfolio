import React from 'react'
import { selectAuth } from '../../../store/slices/authSlice'
import { useAppSelector } from '../../../hooks/useAppSelector'

export const UserData = () => {
  const { user } = useAppSelector(selectAuth)

  return (
    <h1 className='text-white text-2xl'>
      Welcome here, <strong>{user?.id}</strong> 😊
    </h1>
  )
}
