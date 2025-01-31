'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import { useNavbar } from '@/providers/navbar-provider'
import Link from 'next/link'

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const { showNavbar } = useNavbar()
  const [activeSection, setActiveSection] = React.useState('home')

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const navItems = {
    en: [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#contact", label: "Contact" }
    ],
    id: [
      { href: "#home", label: "Beranda" },
      { href: "#about", label: "Tentang" },
      { href: "#projects", label: "Proyek" },
      { href: "#contact", label: "Kontak" }
    ]
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en')
  }

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-16">
              <div className="flex items-center space-x-8">
                {navItems[language].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-3 py-2"
                  >
                    <motion.span
                      className={`text-sm font-medium transition-colors relative z-10
                        ${activeSection === item.href.slice(1) 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                      {item.label}
                    </motion.span>
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary-500/10 rounded-md -z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transform origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: activeSection === item.href.slice(1) ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ))}

                <div className="h-8 w-px bg-gray-800" /> {/* Divider */}

                <motion.button
                  onClick={toggleLanguage}
                  className="relative px-2 py-1 rounded-lg bg-gray-800/50 text-sm font-medium
                    hover:bg-gray-700/50 transition-all duration-200
                    border border-gray-700/50 hover:border-primary-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative flex items-center">
                    <span className={`px-2 ${language === 'en' ? 'text-primary-400 font-semibold' : 'text-gray-400'}`}>
                      EN
                    </span>
                    <motion.div
                      className="absolute h-full w-[2px] bg-gray-700"
                      style={{ left: '50%', transform: 'translateX(-50%)' }}
                    />
                    <span className={`px-2 ${language === 'id' ? 'text-primary-400 font-semibold' : 'text-gray-400'}`}>
                      ID
                    </span>
                    <motion.div
                      className="absolute inset-y-0 w-1/2 bg-primary-500/10 rounded-md"
                      animate={{ 
                        x: language === 'en' ? 0 : '100%'
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  )
} 