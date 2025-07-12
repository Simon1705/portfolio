'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { useLanguage } from '@/providers/language-provider'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'
import Link from 'next/link'
import { useNavbar } from '@/providers/navbar-provider'
import gsap from 'gsap'

const socialLinks = [
  { icon: Github, href: "https://github.com/Simon1705", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/simon-peter-59161326b/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:simonpeter1705@gmail.com", label: "Email" }
]

export default function Hero() {
  const { language } = useLanguage()
  const { setShowNavbar } = useNavbar()
  const heroRef = useRef<HTMLElement>(null)
  const greetingRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const content = {
    en: {
      greeting: "Hello",
      name: "I'm Simon",
      quote: "Good code is code that works, not code that looks good😉.",
      cta: "View My Work",
      download: "Download CV"
    },
    id: {
      greeting: "Hai",
      name: "Nama Saya Simon",
      quote: "Kode yang baik adalah kode yang selesai, bukan yang bagus😉.",
      cta: "Lihat Project Saya",
      download: "Unduh CV"
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 2.8, // Delay to sync with loading screen
        onComplete: () => {
          setShowNavbar(true)
        }
      })

      // Hide elements initially
      const refs = [greetingRef, nameRef, quoteRef, socialRef, ctaRef];
      refs.forEach(ref => gsap.set(ref.current, { opacity: 0, y: 20 }));

      tl.to(greetingRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, "-=0.3")
        .to(quoteRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, "-=0.3")
        .to([socialRef.current, ctaRef.current], { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power3.out',
          stagger: 0.2
        }, "-=0.2")

    }, heroRef)

    return () => ctx.revert()
  }, [setShowNavbar])


  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background with matching color */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950 animate-gradient" />

      {/* Adding animated SVG shapes in the background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 320">
          <path fill="#1E3A8A" fillOpacity="0.5" d="M0,128L30,144C60,160,120,192,180,186.7C240,181,300,139,360,128C420,117,480,139,540,160C600,181,660,203,720,202.7C780,203,840,181,900,160C960,139,1020,117,1080,128C1140,139,1200,181,1260,186.7C1320,192,1380,160,1410,144L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"></path>
        </svg>
      </div>

      {/* Adding a gradient overlay with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950 opacity-80" />

      {/* Content centered */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
        <div className="relative z-10 text-center space-y-4">
          
          <div ref={greetingRef} className="text-6xl font-bold text-white">
            {content[language].greeting}
          </div>

          <div ref={nameRef} className="text-5xl font-semibold text-white">
            <span>
              {content[language].name}
            </span>
          </div>

          <div ref={quoteRef} className="text-lg font-medium text-gray-300">
            {content[language].quote}
          </div>

          {/* Flex container for CTA and social media icons */}
          <div className="flex flex-col items-center gap-4 mt-4">
              {/* Social media icons with hover effects */}
              <div ref={socialRef} className="flex space-x-4">
                {socialLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500 transition duration-300 shadow-lg">
                    <link.icon className="w-6 h-6 text-white hover:scale-110 transition duration-300" />
                  </a>
                ))}
              </div>

              {/* Card layout for CTA buttons */}
              <div ref={ctaRef} className="flex flex-col gap-4">
                <Link href="#projects">
                  <div className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ArrowDown className="w-5 h-5" />
                      {content[language].cta}
                    </span>
                  </div>
                </Link>

                <a href="/cv.pdf" download className="px-8 py-4 rounded-xl font-medium border border-blue-500/20 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/5 transform hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                    <Download className="w-5 h-5" />
                    {content[language].download}
                  </span>
                </a>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
} 