'use client'

import { LanguageProvider } from '@/providers/language-provider'
import { NavbarProvider } from '@/providers/navbar-provider'
import Navbar from '@/components/navbar'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Projects from '@/components/sections/projects'
import Skills from '@/components/sections/skills'
import Contact from '@/components/sections/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <LanguageProvider>
      <NavbarProvider>
        <main className="min-h-screen bg-gray-900">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      </NavbarProvider>
    </LanguageProvider>
  )
} 