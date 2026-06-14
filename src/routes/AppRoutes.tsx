import React, { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import MainLayout from '../features/layout/MainLayout'

const Dashboard = lazy(() => import('../features/dashboard/views/Dashboard'))

const routes = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route
      path="/"
      element={
        <Suspense fallback={<div />}>
          <Dashboard />
        </Suspense>
      }
    />
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
