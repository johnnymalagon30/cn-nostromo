"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface BacktoTopContextType {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  hideBacktoTop: () => void
}

const BacktoTopContext = createContext<BacktoTopContextType | undefined>(undefined)

export function BacktoTopProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  const hideBacktoTop = () => {
    setIsVisible(false)
  }

  return (
    <BacktoTopContext.Provider value={{ isVisible, setIsVisible, hideBacktoTop }}>
      {children}
    </BacktoTopContext.Provider>
  )
}

export function useBacktoTop() {
  const context = useContext(BacktoTopContext)
  if (context === undefined) {
    throw new Error('useBacktoTop must be used within a BacktoTopProvider')
  }
  return context
}

