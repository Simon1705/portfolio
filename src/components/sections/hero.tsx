'use client'

import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/providers/language-provider'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'
import Link from 'next/link'
import { useNavbar } from '@/providers/navbar-provider'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  const smallTextRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  // Cool download animation function with enhanced effects
  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDownloading(true)
    
    // Create download animation
    const button = e.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    
    // Create flying document animation
    const createFlyingDocument = () => {
      const doc = document.createElement('div')
      doc.innerHTML = `
        <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      `
      doc.className = 'fixed pointer-events-none z-50'
      doc.style.left = `${rect.left + rect.width / 2 - 16}px`
      doc.style.top = `${rect.top + rect.height / 2 - 16}px`
      document.body.appendChild(doc)
      
      // Animate document flying to top-right corner
      gsap.to(doc, {
        x: window.innerWidth - rect.left - 100,
        y: -rect.top - 100,
        scale: 0.3,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => {
          document.body.removeChild(doc)
        }
      })
    }
    
    // Create ripple effect
    const createRipple = () => {
      const ripple = document.createElement('div')
      ripple.className = 'fixed w-4 h-4 border-2 border-blue-400/50 rounded-full pointer-events-none z-40'
      ripple.style.left = `${rect.left + rect.width / 2 - 8}px`
      ripple.style.top = `${rect.top + rect.height / 2 - 8}px`
      document.body.appendChild(ripple)
      
      gsap.to(ripple, {
        width: '200px',
        height: '200px',
        left: rect.left + rect.width / 2 - 100,
        top: rect.top + rect.height / 2 - 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => {
          document.body.removeChild(ripple)
        }
      })
    }
    
    // Button morph animation sequence
    const tl = gsap.timeline()
    
    // Initial click feedback
    tl.to(button, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out'
    })
    // Expand with elastic effect
    .to(button, {
      scale: 1.1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.3)'
    })
    // Return to normal with slight overshoot
    .to(button, {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    })
    
    // Create visual effects
    setTimeout(() => {
      createRipple()
      createFlyingDocument()
    }, 200)
    
    // Simulate download delay
    setTimeout(() => {
      // Actually trigger the download
      const link = document.createElement('a')
      link.href = '/cv.pdf'
      link.download = 'Simon_Peter_CV.pdf'
      link.click()
      
      // Reset state after animation
      setTimeout(() => {
        setIsDownloading(false)
      }, 500)
    }, 800)
  }

  // Smooth scroll function for CTA button
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      // Calculate the offset to account for navbar height
      const navbarHeight = 80 // Approximate navbar height
      const elementPosition = projectsSection.offsetTop - navbarHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      
      // Refresh ScrollTrigger after scroll animation completes
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 1000) // Wait for smooth scroll to complete
    }
  }

  const content = {
    en: {
      greeting: "Hello, I'm",
      name: "Simon Peter",
      quote: "Good code is code that works, not code that looks good.",
      cta: "View My Work",
      download: "Download CV"
    },
    id: {
      greeting: "Hai, Nama Saya",
      name: "Simon Peter",
      quote: "Kode yang baik adalah kode yang selesai, bukan yang bagus.",
      cta: "Lihat Project Saya",
      download: "Unduh CV"
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 2.8,
        onComplete: () => {
          setShowNavbar(true)
        }
      })

      // Hide elements initially
      const refs = [greetingRef, nameRef, quoteRef, socialRef, ctaRef];
      refs.forEach(ref => gsap.set(ref.current, { opacity: 0, y: 30 }));
      
      // Hide small text initially
      gsap.set(smallTextRef.current, { opacity: 0, height: 0, y: -10 });

      tl.to(greetingRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      })
        .to(nameRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out'
        }, "-=0.4")
        .to(quoteRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out' 
        }, "-=0.4")
        .to([socialRef.current, ctaRef.current], { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          stagger: 0.2
        }, "-=0.4")
        // Add small text animation with delay and push buttons down
        .to(smallTextRef.current, {
          opacity: 1,
          height: 'auto',
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, "+=2.5") // 2.5 second delay after quote appears
        .to([socialRef.current, ctaRef.current], {
          y: 20, // Move buttons down by 20px
          duration: 0.6,
          ease: 'power3.out'
        }, "-=0.6") // Animate simultaneously with small text

    }, heroRef)

    return () => ctx.revert()
  }, [setShowNavbar])


  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Smooth gradient background that blends with other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-925 to-gray-950" />

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-blob animation-delay-4000" />
      </div>

      {/* Content centered */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-8">
        <div className="relative z-10 text-center space-y-6">
          
          {/* Greeting with subtle animation */}
          <div ref={greetingRef} className="text-xl md:text-2xl font-light text-blue-200 tracking-wide">
            {content[language].greeting}
          </div>

          {/* Name with enhanced styling */}
          <div ref={nameRef} className="relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
              {content[language].name}
            </h1>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-bold text-white/5 blur-sm -z-10">
              {content[language].name}
            </div>
          </div>

          {/* Quote with improved styling */}
          <div ref={quoteRef} className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed">
            <span className="relative">
              <span className="text-blue-400 text-2xl leading-none">"</span>
              {content[language].quote}
              <span className="text-blue-400 text-2xl leading-none">"</span>
            </span>
            {/* Small additional text with ref */}
            <div ref={smallTextRef} className="text-right mt-2 overflow-hidden">
              <span className="text-sm text-gray-400 italic font-light">
                but the code should be clean tho..
              </span>
            </div>
          </div>

          {/* Enhanced CTA and social media section */}
          <div className="flex flex-col items-center gap-8 mt-12">
              {/* Social media icons with enhanced hover effects */}
              <div ref={socialRef} className="flex space-x-6">
                {socialLinks.map((link, index) => (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 hover:rotate-6"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <link.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                  </a>
                ))}
              </div>

              {/* Enhanced CTA buttons with glass-morphism */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={scrollToProjects}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 overflow-hidden cursor-pointer"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center justify-center gap-3 font-semibold">
                    <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
                    {content[language].cta}
                  </span>
                </button>

                <button 
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className={`group relative px-8 py-4 rounded-2xl font-semibold border transition-all duration-300 hover:scale-105 overflow-hidden ${
                    isDownloading 
                      ? 'border-green-400/50 bg-green-500/20 text-green-300 cursor-not-allowed' 
                      : 'border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Animated background for download state */}
                  {isDownloading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 animate-pulse" />
                  )}
                  
                  {/* Glass shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isDownloading ? (
                      <>
                        {/* Loading spinner */}
                        <div className="w-5 h-5 border-2 border-green-300/30 border-t-green-300 rounded-full animate-spin" />
                        <span>{language === 'en' ? 'Downloading...' : 'Mengunduh...'}</span>
                      </>
                    ) : (
                      <>
                        <Download className={`w-5 h-5 transition-transform duration-300 ${
                          isDownloading ? 'animate-bounce' : 'group-hover:animate-pulse'
                        }`} />
                        {content[language].download}
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
} 