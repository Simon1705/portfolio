'use client'

import React, { createContext, useContext, useState, type PropsWithChildren } from 'react'

type NavbarContextType = {
  showNavbar: boolean
  setShowNavbar: (show: boolean) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({ children }: PropsWithChildren) {
  const [showNavbar, setShowNavbar] = useState(false)

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }
  return context
} 