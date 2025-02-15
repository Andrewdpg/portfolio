import axios from '../config/axiosConfig'
import {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from '../types/auth'

const API_URL = '/auth'

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  //const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials)
  //return response.data
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    user: {
      names: 'John',
      surnames: 'Doe',
      id: credentials.username,
      roles: ['admin'],
      photoUrl: 'https://randomuser.me',
    },
    token: '1234',
  }
}

const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await axios.post<RefreshTokenResponse>(
    `${API_URL}/refresh-token`
  )
  return response.data
}

const logout = async (): Promise<void> => {
  
}

const authService = {
  login,
  refreshToken,
  logout,
}

export default authService
