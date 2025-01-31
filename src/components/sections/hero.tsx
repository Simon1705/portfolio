'use client'

import React from 'react'
import { motion, type HTMLMotionProps, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useNavbar } from '@/providers/navbar-provider'

const MotionH1 = motion.h1 as React.ComponentType<HTMLMotionProps<"h1">>
const MotionP = motion.p as React.ComponentType<HTMLMotionProps<"p">>
const MotionSpan = motion.span as React.ComponentType<HTMLMotionProps<"span">>
const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div">>

const socialLinks = [
  { icon: Github, href: "https://github.com/Simon1705", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/simon-peter-59161326b/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:simonpeter1705@gmail.com", label: "Email" }
]

export default function Hero() {
  const { language } = useLanguage()
  const { setShowNavbar } = useNavbar()
  const [text, setText] = React.useState("")
  const [isTypingComplete, setIsTypingComplete] = React.useState(false)
  const [showDescription, setShowDescription] = React.useState(false)

  const content = {
    en: {
      greeting: "Hello, I'm Simon Peter",
      description: [
        "A Computer Science student who is passionate about learning web and mobile development",
        "which is currently exploring various modern technologies that are interesting to try out"
      ],
      cta: "View My Work",
      download: "Download CV"
    },
    id: {
      greeting: "Hai, Nama Saya Simon Peter",
      description: [
        "Seorang mahasiswa Informatika yang senang dalam mempelajari Web dan Mobile Development",
        "dan saat ini sedang mengeksplorasi berbagai teknologi modern yang menarik untuk dicoba"
      ],
      cta: "Lihat Project Saya",
      download: "Unduh CV"
    }
  }

  React.useEffect(() => {
    setText("")
    setIsTypingComplete(false)
    setShowDescription(false)
    setShowNavbar(false)
    let currentText = ""
    const greeting = content[language].greeting
    
    const typingInterval = setInterval(() => {
      if (currentText.length < greeting.length) {
        currentText = greeting.slice(0, currentText.length + 1)
        setText(currentText)
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
        setTimeout(() => {
          setShowDescription(true)
          setTimeout(() => {
            setShowNavbar(true)
          }, 500)
        }, 300)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [language, setShowNavbar])

  const cursorVariants = {
    blinking: {
      opacity: [0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden perspective-1000 bg-gray-900"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-[20%] w-16 h-16 bg-primary-500/20 rounded-lg animate-float animation-delay-2000 transform-gpu"
        />
        <motion.div 
          className="absolute bottom-32 left-[15%] w-12 h-12 bg-purple-500/20 rounded-full animate-float animation-delay-4000 transform-gpu"
        />
        <motion.div 
          className="absolute top-[40%] left-[10%] w-20 h-20 border-2 border-primary-500/30 rounded-lg animate-rotate3d transform-gpu"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center space-y-8">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="mx-auto transform-gpu"
          >
            <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-primary-500 ring-offset-4 ring-offset-gray-900 shadow-2xl glow">
              <Image
                src="/images/profile/your-photo.jpg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-4">
            <MotionH1 className="text-4xl md:text-6xl font-bold text-white relative inline-block text-glow">
              {text}
              <AnimatePresence>
                {!isTypingComplete && text.length === content[language].greeting.length && (
                  <MotionSpan
                    variants={cursorVariants}
                    animate="blinking"
                    className="absolute -right-[4px] top-0 h-full w-[2px] bg-current"
                  />
                )}
              </AnimatePresence>
            </MotionH1>
            <div className="flex flex-col items-center space-y-2">
              <AnimatePresence mode="wait">
                {showDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                  >
                    {content[language].description.map((line, index) => (
                      <p
                        key={index}
                        className="text-xl md:text-2xl text-gray-300"
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900
                  hover:from-primary-600 hover:to-primary-800
                  transition-all duration-300 transform-gpu
                  hover:scale-110 hover:-translate-y-1
                  hover:shadow-lg hover:shadow-primary-500/20"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <social.icon 
                  size={24} 
                  className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300" 
                />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center items-center gap-4"
          >
            <Link href="#projects" className="flex">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: {
                    scale: 1.05,
                    rotate: [0, -1, 1, -1, 0],
                    transition: {
                      rotate: {
                        repeat: Infinity,
                        duration: 0.5
                      }
                    }
                  },
                  tap: { scale: 0.95 }
                }}
                className="group relative px-10 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 
                  text-white rounded-full font-bold text-lg
                  overflow-hidden transition-all duration-300
                  border border-primary-400/30
                  hover:shadow-[0_0_30px_-5px] hover:shadow-primary-500/50
                  transform-gpu"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{ backgroundSize: '200% 100%' }}
                />
                
                {/* Shine effect */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />

                {/* Glowing particles */}
                <motion.div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      animate={{
                        x: ['0%', '100%'],
                        y: ['-50%', '150%'],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: 'easeInOut'
                      }}
                      style={{
                        left: `${i * 30}%`,
                        filter: 'blur(2px)'
                      }}
                    />
                  ))}
                </motion.div>

                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:gap-5 transition-all duration-300">
                  <span className="tracking-wider">{content[language].cta}</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform-gpu transition-transform duration-300"
                    variants={{
                      hover: {
                        y: [0, 5, 0],
                        transition: {
                          repeat: Infinity,
                          duration: 1
                        }
                      }
                    }}
                  >
                    <path d="M12 5v14"/>
                    <path d="m5 12 7 7 7-7"/>
                  </motion.svg>
                </span>
              </motion.button>
            </Link>

            <motion.a
              href="/cv.pdf"
              download
              className="flex group relative px-10 py-4 bg-transparent
                text-white rounded-full font-bold text-lg
                overflow-hidden transition-all duration-300
                border-2 border-primary-500/50
                hover:border-primary-400
                hover:shadow-[0_0_30px_-5px] hover:shadow-primary-500/20
                transform-gpu"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="tracking-wider">{content[language].download}</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform-gpu transition-transform duration-300 group-hover:translate-y-1"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </motion.svg>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 