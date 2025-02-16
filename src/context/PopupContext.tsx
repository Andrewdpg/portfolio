import Popup from '../components/Popup'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { PopupContent } from '../types/popup'

interface PopupContextProps {
  isOpen: boolean
  content: PopupContent | null
  openPopup: (content: PopupContent) => void
  closePopup: () => void
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined)

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<PopupContent | null>(null)

  const openPopup = (content: PopupContent) => {
    setContent(content)
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
    setContent(null)
  }

  return (
    <PopupContext.Provider value={{ isOpen, content, openPopup, closePopup }}>
      {children}
      <Popup />
    </PopupContext.Provider>
  )
}

export const usePopup = () => {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}
