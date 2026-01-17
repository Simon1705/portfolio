'use client'

import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/providers/language-provider'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'
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
  const [showCVOptions, setShowCVOptions] = useState(false)

  // Cool download animation function with enhanced effects
  const handleDownloadCV = async (e: React.MouseEvent, cvType?: 'id' | 'en') => {
    e.preventDefault()
    
    // If no CV type specified, show options
    if (!cvType) {
      setShowCVOptions(true)
      return
    }
    
    setIsDownloading(true)
    
    // Get the clicked button for animation reference
    const clickedButton = e.currentTarget as HTMLElement
    const buttonRect = clickedButton.getBoundingClientRect()
    
    // Create success feedback animation sequence
    const createSuccessAnimation = () => {
      // 1. Button transform animation
      const buttonTl = gsap.timeline()
      buttonTl
        .to(clickedButton, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out'
        })
        .to(clickedButton, {
          scale: 1.05,
          backgroundColor: 'rgba(34, 197, 94, 0.3)',
          borderColor: 'rgba(34, 197, 94, 0.6)',
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        .to(clickedButton, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        })

      // 2. Create multiple flying documents
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createFlyingDocument(buttonRect, i)
        }, i * 200)
      }

      // 3. Create success checkmark
      setTimeout(() => {
        createSuccessCheckmark(buttonRect)
      }, 400)

      // 4. Create confetti burst
      setTimeout(() => {
        createConfettiBurst(buttonRect)
      }, 600)

      // 5. Create ripple waves
      createRippleWaves(buttonRect)
    }

    // Enhanced flying document animation
    const createFlyingDocument = (rect: DOMRect, index: number) => {
      const doc = document.createElement('div')
      doc.innerHTML = `
        <svg class="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      `
      doc.className = 'fixed pointer-events-none z-50'
      doc.style.left = `${rect.left + rect.width / 2 - 16}px`
      doc.style.top = `${rect.top + rect.height / 2 - 16}px`
      document.body.appendChild(doc)
      
      // Random trajectory for each document
      const randomX = (Math.random() - 0.5) * 400
      const randomY = -200 - (Math.random() * 200)
      
      gsap.to(doc, {
        x: randomX,
        y: randomY,
        rotation: 360 + (Math.random() * 360),
        scale: 0.2,
        opacity: 0,
        duration: 2 + (index * 0.3),
        ease: 'power2.out',
        onComplete: () => {
          document.body.removeChild(doc)
        }
      })
    }

    // Success checkmark animation
    const createSuccessCheckmark = (rect: DOMRect) => {
      const checkmark = document.createElement('div')
      checkmark.innerHTML = `
        <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      `
      checkmark.className = 'fixed pointer-events-none z-50'
      checkmark.style.left = `${rect.left + rect.width / 2 - 32}px`
      checkmark.style.top = `${rect.top + rect.height / 2 - 32}px`
      document.body.appendChild(checkmark)
      
      const checkTl = gsap.timeline()
      checkTl
        .fromTo(checkmark, 
          { scale: 0, rotation: -180, opacity: 0 },
          { scale: 1.2, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        )
        .to(checkmark, {
          scale: 0.8,
          duration: 0.2,
          ease: 'power2.out'
        })
        .to(checkmark, {
          y: -100,
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            document.body.removeChild(checkmark)
          }
        })
    }

    // Confetti burst animation
    const createConfettiBurst = (rect: DOMRect) => {
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
      
      for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div')
        confetti.className = 'fixed pointer-events-none z-50 w-3 h-3 rounded-full'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = `${rect.left + rect.width / 2}px`
        confetti.style.top = `${rect.top + rect.height / 2}px`
        document.body.appendChild(confetti)
        
        const angle = (i / 15) * Math.PI * 2
        const velocity = 100 + Math.random() * 100
        const x = Math.cos(angle) * velocity
        const y = Math.sin(angle) * velocity
        
        gsap.to(confetti, {
          x: x,
          y: y,
          rotation: Math.random() * 720,
          opacity: 0,
          duration: 1.5 + Math.random(),
          ease: 'power2.out',
          onComplete: () => {
            document.body.removeChild(confetti)
          }
        })
      }
    }

    // Ripple waves animation
    const createRippleWaves = (rect: DOMRect) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const ripple = document.createElement('div')
          ripple.className = 'fixed w-4 h-4 border-2 border-green-400/60 rounded-full pointer-events-none z-40'
          ripple.style.left = `${rect.left + rect.width / 2 - 8}px`
          ripple.style.top = `${rect.top + rect.height / 2 - 8}px`
          document.body.appendChild(ripple)
          
          gsap.to(ripple, {
            width: '300px',
            height: '300px',
            left: rect.left + rect.width / 2 - 150,
            top: rect.top + rect.height / 2 - 150,
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            onComplete: () => {
              document.body.removeChild(ripple)
            }
          })
        }, i * 300)
      }
    }

    // Start the success animation
    createSuccessAnimation()
    
    // Close modal with fade out animation
    setTimeout(() => {
      const modal = document.querySelector('.animate-modal-zoom-in') as HTMLElement
      if (modal) {
        gsap.to(modal, {
          scale: 0.8,
          opacity: 0,
          y: 50,
          duration: 0.4,
          ease: 'power2.in'
        })
      }
      
      const backdrop = document.querySelector('.animate-modal-fade-in') as HTMLElement
      if (backdrop) {
        gsap.to(backdrop, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in'
        })
      }
      
      setTimeout(() => {
        setShowCVOptions(false)
      }, 400)
    }, 800)
    
    // Simulate download delay and trigger actual download
    setTimeout(() => {
      // Actually trigger the download based on CV type
      const link = document.createElement('a')
      if (cvType === 'en') {
        link.href = '/CV Eng Simon Peter.pdf'
        link.download = 'Simon_Peter_CV_English.pdf'
      } else {
        link.href = '/CV Simon Peter.pdf'
        link.download = 'Simon_Peter_CV_Indonesia.pdf'
      }
      link.click()
      
      // Reset state after animation
      setTimeout(() => {
        setIsDownloading(false)
      }, 500)
    }, 1200)
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
        delay: 2.0,
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

  // Handle click outside to close CV options
  useEffect(() => {
    let scrollY = 0

    const handleClickOutside = (event: MouseEvent) => {
      if (showCVOptions) {
        const target = event.target as HTMLElement
        if (!target.closest('.cv-options-container')) {
          setShowCVOptions(false)
        }
      }
    }

    // Prevent scrolling with keyboard
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showCVOptions) {
        const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
        if (scrollKeys.includes(event.key)) {
          event.preventDefault()
        }
        // Close modal on Escape
        if (event.key === 'Escape') {
          setShowCVOptions(false)
        }
      }
    }

    // Prevent wheel scrolling
    const handleWheel = (event: WheelEvent) => {
      if (showCVOptions) {
        event.preventDefault()
      }
    }

    // Prevent touch scrolling on mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (showCVOptions) {
        event.preventDefault()
      }
    }

    if (showCVOptions) {
      // Store current scroll position
      scrollY = window.scrollY
      
      // Lock body scroll without changing scroll position
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      
      // Add event listeners
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
    } else {
      // Restore body scroll and position
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollY)
    }

    return () => {
      // Cleanup
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [showCVOptions])


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
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 relative">
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

                <div className="relative cv-options-container">
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

                  {/* CV Options Modal - Ultra Compact Mobile */}
                  {showCVOptions && (
                    <>
                      {/* Enhanced Backdrop with stronger blur */}
                      <div className="fixed inset-0 bg-black/70 backdrop-blur-xl modal-backdrop z-40 animate-modal-fade-in" />
                      
                      {/* Modal Container - Ultra Compact Mobile */}
                      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
                        <div className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-2xl border-t border-white/40 sm:border border-white/40 rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl w-full sm:w-full sm:max-w-md animate-modal-slide-up sm:animate-modal-zoom-in pointer-events-auto">
                          {/* Mobile Handle Bar */}
                          <div className="flex justify-center mb-3 sm:hidden">
                            <div className="w-10 h-1 bg-gray-500 rounded-full"></div>
                          </div>

                          {/* Compact Header */}
                          <div className="text-center mb-4 sm:mb-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                              <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                              {language === 'en' ? 'Choose CV Language' : 'Pilih Bahasa CV'}
                            </h3>
                            <p className="text-gray-300 text-xs sm:text-sm hidden sm:block">
                              {language === 'en' 
                                ? 'Select your preferred version' 
                                : 'Pilih versi yang diinginkan'
                              }
                            </p>
                          </div>

                          {/* CV Options - Ultra Compact */}
                          <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                            <button
                              onClick={(e) => handleDownloadCV(e, 'id')}
                              className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500/25 to-white/15 hover:from-red-500/35 hover:to-white/25 active:from-red-500/40 active:to-white/30 border border-white/30 hover:border-red-400/60 active:border-red-400/80 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-xl sm:text-2xl">🇮🇩</div>
                                <div className="text-left flex-1">
                                  <h4 className="text-white font-semibold text-sm sm:text-base">CV Indonesia</h4>
                                  <p className="text-gray-400 text-xs hidden sm:block">Bahasa Indonesia</p>
                                </div>
                                <ArrowDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors rotate-[-90deg]" />
                              </div>
                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>

                            <button
                              onClick={(e) => handleDownloadCV(e, 'en')}
                              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500/25 to-white/15 hover:from-blue-500/35 hover:to-white/25 active:from-blue-500/40 active:to-white/30 border border-white/30 hover:border-blue-400/60 active:border-blue-400/80 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-xl sm:text-2xl">🇺🇸</div>
                                <div className="text-left flex-1">
                                  <h4 className="text-white font-semibold text-sm sm:text-base">CV English</h4>
                                  <p className="text-gray-400 text-xs hidden sm:block">English Language</p>
                                </div>
                                <ArrowDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors rotate-[-90deg]" />
                              </div>
                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>
                          </div>

                          {/* Compact Cancel Button */}
                          <button
                            onClick={() => setShowCVOptions(false)}
                            className="w-full px-4 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 active:border-gray-400 rounded-lg transition-all duration-200 hover:bg-white/10 active:bg-white/15 text-sm touch-manipulation"
                          >
                            {language === 'en' ? 'Cancel' : 'Batal'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
} 