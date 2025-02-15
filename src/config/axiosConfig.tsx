import axios, { AxiosInstance } from 'axios'
import config from './envConfig'
import { EnhancedStore } from '@reduxjs/toolkit'

let store: EnhancedStore

/**
 * Set the Redux store to be used in the Axios instance
 * @param {EnhancedStore} reduxStore - Redux store
 */
export const setAxiosStore = (reduxStore: EnhancedStore) => {
  store = reduxStore
}

/**
 * Axios instance with base URL and headers
 * @type {AxiosInstance}
 * @name AxiosInstance
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

/**
 * Axios request interceptor
 * @param {Object} config - Axios request config
 * @returns {Object} Axios request config
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (store) {
      const state = store.getState()
      const token = state.auth.token
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Axios response interceptor
 * @param {Object} response - Axios response
 * @returns {Object} Axios response
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && store) {
      store.dispatch({ type: 'auth/logout' })
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
