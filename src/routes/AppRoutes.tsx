import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import MainLayout from '../features/layout/MainLayout'
import Dashboard from '../features/dashboard/views/Dashboard'

const routes = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route path="/" element={<Dashboard />} />
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
