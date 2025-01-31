'use client'

import { type ReactNode } from 'react'
import { LanguageProvider } from '@/providers/language-provider'

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps): ReactNode {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
} 