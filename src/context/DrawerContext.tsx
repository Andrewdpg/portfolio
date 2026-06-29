// src/context/DrawerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { DrawerContent } from '../types/drawer'
import Drawer from '../components/Drawer'

interface DrawerContextProps {
  isOpen: boolean
  content: DrawerContent | null
  openDrawer: (content: DrawerContent) => void
  closeDrawer: () => void
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<DrawerContent | null>(null)

  const openDrawer = (content: DrawerContent) => {
    setContent(content)
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
    setContent(null)
  }

  return (
    <DrawerContext.Provider
      value={{ isOpen, content, openDrawer, closeDrawer }}
    >
      {children}
      <Drawer />
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context)
    throw new Error('useDrawer must be used within a DrawerProvider')
  return context
}
