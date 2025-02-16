import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRoutes'
import './index.css'
import { PopupProvider } from './context/PopupContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupProvider>
      <RouterProvider router={router} />
    </PopupProvider>
  </React.StrictMode>
)
