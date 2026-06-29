import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRoutes'
import { DrawerProvider } from './context/DrawerContext'
import { ThemeProvider } from './context/ThemeContext'
import { ContactModalProvider } from './context/ContactModalContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <DrawerProvider>
        <ContactModalProvider>
          <RouterProvider router={router} />
        </ContactModalProvider>
      </DrawerProvider>
    </ThemeProvider>
  </React.StrictMode>
)
