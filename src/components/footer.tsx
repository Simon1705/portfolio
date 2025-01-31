'use client'

import { useLanguage } from '@/providers/language-provider'

export default function Footer() {
  const { language } = useLanguage()
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>
          {language === 'en' 
            ? `© ${new Date().getFullYear()} Simon Peter. All rights reserved.`
            : `© ${new Date().getFullYear()} Simon Peter. Hak cipta dilindungi.`
          }
        </p>
      </div>
    </footer>
  )
} 