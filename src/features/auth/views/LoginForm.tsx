import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { login, selectAuth } from '../../../store/slices/authSlice'
import React from 'react'
import { LoginCredentials } from '../../../types/auth'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { LinkedText } from '../../../components/LinkedText'
import { LoadingBar } from '../../../components/LoadingBar'

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector(selectAuth)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const loginData: LoginCredentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }
    const resultAction = await dispatch(login(loginData))

    if (login.fulfilled.match(resultAction)) {
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
      })
      navigate('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: resultAction.payload || 'Unknown error occurred',
      })
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {loading && <LoadingBar />}
      <Input
        required
        id="username"
        name="username"
        placeholder="User"
        autoFocus
      />

      <div className="relative">
        <Input
          required
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-app-gray hover:text-app-main"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      <Button type="submit" variant="primary" fullWidth>
        LOGIN
      </Button>

      <div className="text-center">
        <LinkedText
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ¿Forgot your password?
        </LinkedText>
      </div>
    </form>
  )
}
