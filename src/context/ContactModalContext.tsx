import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ContactModal } from '../components/ContactModal'

interface ContactModalContextProps {
  openContactModal: () => void
  closeContactModal: () => void
}

const ContactModalContext = createContext<ContactModalContextProps | undefined>(
  undefined
)

export const ContactModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ContactModalContext.Provider
      value={{
        openContactModal: () => setIsOpen(true),
        closeContactModal: () => setIsOpen(false),
      }}
    >
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactModalContext.Provider>
  )
}

export const useContactModal = () => {
  const ctx = useContext(ContactModalContext)
  if (!ctx)
    throw new Error(
      'useContactModal must be used within a ContactModalProvider'
    )
  return ctx
}
