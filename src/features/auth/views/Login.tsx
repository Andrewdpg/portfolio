import React, { useEffect } from 'react'
import { LoginForm } from './LoginForm'
import { Toast } from '../../../config/toastConfig'
import Heading from '../../../components/Heading'

export function Login() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('expired')) {
      Toast.fire({
        icon: 'warning',
        title: 'Your session has expired',
      })
      updateUrl('expired')
    }

    if (params.get('logout')) {
      Toast.fire({
        icon: 'success',
        title: 'Logout successful',
      })
      updateUrl('logout')
    }
  }, [])

  const updateUrl = (param: string): void => {
    const newUrl = window.location.pathname.replace(`?${param}=true`, '')
    window.history.pushState({}, '', newUrl)
  }

  return (
    <div className="flex flex-col flex-1 sm:flex items-center justify-center">
      <div className="w-2/3 sm:w-2/4 bg-app-main/20 backdrop-blur justify-center items-center p-8 rounded-lg shadow-lg">
        <Heading>Let&apos;s get started! Please login.</Heading>
        <p className="text-app-black w-full text-center">Just write anything here 👋</p>
        <div className="mt-4">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
