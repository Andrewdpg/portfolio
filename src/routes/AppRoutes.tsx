import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { Login } from '../features/auth/views/Login'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import MainLayout from '../features/layout/MainLayout'
import RequireAuth from '../features/auth/components/RequireAuth'
import Dashboard from '../features/dashboard/views/Dashboard'

const routes = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route
      path="/login"
      element={
        <RequireAuth fallback={<Login />}>
          <Navigate to="/" />
        </RequireAuth>
      }
    />
    <Route path="/" element={<ProtectedRoute />}>
      <Route path="/" element={<Dashboard />} />
    </Route>
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
