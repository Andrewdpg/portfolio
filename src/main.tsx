import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRoutes'
import { DrawerProvider } from './context/DrawerContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DrawerProvider>
      <RouterProvider router={router} />
    </DrawerProvider>
  </React.StrictMode>
)
