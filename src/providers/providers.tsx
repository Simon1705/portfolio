'use client'

import { type ReactNode } from 'react'
import { LanguageProvider } from './language-provider'

type ProvidersProps = {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
} 