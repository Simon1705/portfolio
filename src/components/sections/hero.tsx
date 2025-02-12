'use client'

import React from 'react'
import { motion, type HTMLMotionProps, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import { Github, Linkedin, Mail, ArrowDown, Download, Code2, Sparkles, ChevronDown, Palette, Coffee, Cpu, Layers, Mouse, Code } from 'lucide-react'
import Link from 'next/link'
import { useNavbar } from '@/providers/navbar-provider'
import Image from 'next/image'

const MotionH1 = motion.h1 as React.ComponentType<HTMLMotionProps<"h1">>
const MotionSpan = motion.span as React.ComponentType<HTMLMotionProps<"span">>

const socialLinks = [
  { icon: Github, href: "https://github.com/Simon1705", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/simon-peter-59161326b/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:simonpeter1705@gmail.com", label: "Email" }
]

const skills = [
  { 
    name: "Frontend", 
    level: 60, 
    color: "#60A5FA", 
    icon: "🎨",
    description: {
      en: "React, Next.js, Tailwind CSS",
      id: "React, Next.js, Tailwind CSS"
    }
  },
  { 
    name: "Backend", 
    level: 60, 
    color: "#34D399", 
    icon: "⚙️",
    description: {
      en: "Firebase, Java Springboot",
      id: "Firebase, Java Springboot"
    }
  },
  { 
    name: "Mobile", 
    level: 70, 
    color: "#F472B6", 
    icon: "📱",
    description: {
      en: "Flutter",
      id: "Flutter"
    }
  },
  { 
    name: "UI/UX", 
    level: 55, 
    color: "#A78BFA", 
    icon: "✨",
    description: {
      en: "Figma",
      id: "Figma"
    }
  }
]

const techBadges = [
  { icon: Code, label: "Full Stack Developer" },
  { icon: Sparkles, label: "UI/UX Enthusiast" }
]

const codeSnippets = [
  {
    language: "CSS",
    icon: "/icons/css.png",
    code: [
      "/* How to center a div (attempt #42) */",
      ".div-to-center {",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  position: absolute;",
      "  margin: auto;",
      "  /* Trust me it works 🙏 */",
      "}"
    ]
  },
  {
    language: "Dart",
    icon: "/icons/dart.png",
    code: [
      "// Flutter developer's daily mantra",
      "if (widget.rebuild > 9000) {",
      "  setState(() => sanity--);",
      "  print('Hot reload and pray 🙏');",
      "}"
    ]
  },
  {
    language: "Java",
    icon: "/icons/java.png",
    code: [
      "// Enterprise level solution",
      "public class AbstractSingletonProxyFactoryBean",
      "    extends AbstractFactoryBean<Object> {",
      "    // TODO: Add 500 more lines",
      "    // Because why make it simple? 🏢",
      "}"
    ]
  },
  {
    language: "C++",
    icon: "/icons/cpp.png",
    code: [
      "// Memory management fun",
      "int* ptr = new int[42];",
      "delete[] ptr; // Maybe?",
      "// ptr = nullptr; // We'll do it later",
      "// TODO: Fix memory leak in prod 💭"
    ]
  }
]

export default function Hero() {
  const { language } = useLanguage()
  const { setShowNavbar } = useNavbar()
  const [text, setText] = React.useState("")
  const [isTypingComplete, setIsTypingComplete] = React.useState(false)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [currentSnippetIndex, setCurrentSnippetIndex] = React.useState(0)
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState("")
  const [isWaiting, setIsWaiting] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  const content = {
    en: {
      greeting: "Hello, I'm Simon Peter",
      cta: "View My Work",
      download: "Download CV"
    },
    id: {
      greeting: "Hai, Nama Saya Simon Peter",
      cta: "Lihat Project Saya",
      download: "Unduh CV"
    }
  }

  React.useEffect(() => {
    setText("")
    setIsTypingComplete(false)
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
          setShowNavbar(true)
        }, 500)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [language, setShowNavbar])

  // Modify the typing animation useEffect
  React.useEffect(() => {
    // Reset animation when snippet changes
    setCurrentLineIndex(0)
    setCurrentText("")
    setIsWaiting(false)
  }, [currentSnippetIndex])

  React.useEffect(() => {
    if (isWaiting) return

    const snippet = codeSnippets[currentSnippetIndex]
    const currentLine = snippet.code[currentLineIndex]
    
    if (!currentLine) return

    if (currentText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.slice(0, currentText.length + 1))
      }, 30)
      return () => clearTimeout(timeout)
    }
    
    if (currentLineIndex < snippet.code.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentText("")
      }, 300)
      return () => clearTimeout(timeout)
    }
    
    setIsWaiting(true)
  }, [currentText, currentLineIndex, currentSnippetIndex, isWaiting])

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth - 0.5) * 2
    const y = (clientY / innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }

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
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced 3D gradient background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-primary-900/20"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-full h-full bg-[linear-gradient(to_right,#1c191720_1px,transparent_1px),linear-gradient(to_bottom,#1c191720_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{
            transform: `perspective(1000px) translateZ(0px) rotateX(${mousePosition.y * 1}deg) rotateY(${mousePosition.x * 1}deg)`,
            transformOrigin: 'center'
          }}
        />
      </div>

      {/* Interactive Mouse Follow Effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[40rem] h-[40rem] bg-primary-500/5 rounded-full filter blur-[100px] mix-blend-screen"
          style={{
            left: `calc(${mousePosition.x * 100 + 50}% - 20rem)`,
            top: `calc(${mousePosition.y * 100 + 50}% - 20rem)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left space-y-8">
            {/* Main heading with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <MotionH1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-white
                  [text-shadow:_0_2px_20px_rgb(255_255_255_/_10%)]"
              >
                {text}
                <AnimatePresence>
                  {!isTypingComplete && text.length === content[language].greeting.length && (
                    <MotionSpan
                      variants={cursorVariants}
                      animate="blinking"
                      className="absolute -right-[4px] top-0 h-full w-[2px] bg-primary-400"
                    />
                  )}
                </AnimatePresence>
              </MotionH1>
            </motion.div>

            {/* Interactive Skill Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm
                      border border-gray-700/50 overflow-hidden cursor-pointer"
                  >
                    {/* Background Glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="font-medium text-white">{skill.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      
                      <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.4 * index }}
                          style={{ background: skill.color }}
                          className="h-full rounded-full relative"
                        >
                          <motion.div
                            className="absolute inset-0 opacity-50"
                            animate={{
                              background: [
                                `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                                `linear-gradient(90deg, transparent, transparent, transparent)`
                              ]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />
                        </motion.div>
                      </div>
                      <p className="text-xs text-gray-400">{skill.description[language]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skill Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3 text-sm text-gray-400"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 rounded-full border-2 border-dashed border-primary-500/50"
              />
              <span>
                {language === 'en' 
                  ? 'Continuously improving and learning new technologies'
                  : 'Terus berkembang dan mempelajari teknologi baru'}
              </span>
            </motion.div>

            {/* CTA Buttons with glass morphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#projects" className="group">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-4 bg-primary-500 text-white rounded-xl font-medium
                    overflow-hidden shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40
                    backdrop-blur-sm bg-opacity-90
                    transition-all duration-300"
                >
                  <motion.div 
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(79, 70, 229, 0.8) 0%, rgba(99, 102, 241, 0.8) 100%)",
                        "linear-gradient(45deg, rgba(99, 102, 241, 0.8) 0%, rgba(79, 70, 229, 0.8) 100%)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {content[language].cta}
                    <motion.div
                      animate={{
                        y: [0, 4, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.div>
              </Link>

              <motion.a
                href="/cv.pdf"
                download
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-xl font-medium
                  border border-primary-500/20 hover:border-primary-500/50
                  bg-white/5
                  backdrop-blur-sm
                  shadow-lg shadow-black/5
                  transition-all duration-300
                  relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                  {content[language].download}
                  <motion.div
                    animate={{
                      y: [0, 4, 0],
                      rotate: [0, -10, 0, 10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.a>
            </motion.div>

            {/* Enhanced Social Links with glass morphism */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-xl 
                    bg-white/5 hover:bg-white/10
                    backdrop-blur-sm
                    border border-white/10 hover:border-primary-500/30
                    transition-all duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-6 h-6 text-gray-400 group-hover:text-white 
                    transform transition-all duration-300 group-hover:scale-110" />
                  <span className="sr-only">{social.label}</span>
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: 'blur(8px)' }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative hidden md:block">
            {/* 3D Floating Elements */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary-500/30 rounded-full mix-blend-screen filter blur-xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transform: `perspective(1000px) translateZ(${mousePosition.y * 50}px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
                }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl"
                animate={{
                  y: [0, 20, 0],
                  scale: [1.1, 1, 1.1],
                  rotate: [45, 0, 45],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transform: `perspective(1000px) translateZ(${-mousePosition.y * 50}px) rotateX(${-mousePosition.y * 10}deg) rotateY(${-mousePosition.x * 10}deg)`
                }}
              />
            </div>

            {/* Animated Code Editor */}
            <div className="relative bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-2xl" />
              
              {/* Editor Header */}
              <div className="relative px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  
                  {/* Language Selector Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-white
                        bg-gray-800/50 rounded-md border border-gray-700/50 hover:border-primary-500/50
                        transition-all duration-200"
                    >
                      <Image 
                        src={codeSnippets[currentSnippetIndex].icon}
                        alt={codeSnippets[currentSnippetIndex].language}
                        width={16}
                        height={16}
                      />
                      {codeSnippets[currentSnippetIndex].language}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-1 py-1 w-36 bg-gray-800 rounded-md border border-gray-700/50
                            shadow-lg backdrop-blur-sm z-50"
                        >
                          {codeSnippets.map((snippet, index) => (
                            <button
                              key={snippet.language}
                              onClick={() => {
                                setCurrentSnippetIndex(index);
                                setIsDropdownOpen(false);
                                setCurrentLineIndex(0);
                                setCurrentText("");
                                setIsWaiting(false);
                              }}
                              className={`w-full px-3 py-1.5 text-left text-sm transition-colors cursor-pointer flex items-center gap-2
                                ${currentSnippetIndex === index 
                                  ? 'text-primary-400 bg-primary-500/10' 
                                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                            >
                              <Image 
                                src={snippet.icon}
                                alt={snippet.language}
                                width={16}
                                height={16}
                              />
                              {snippet.language}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <div className="relative p-6 font-mono text-sm">
                <div className="mb-4 text-primary-400 font-medium">
                  {/* Title based on language */}
                  {currentSnippetIndex === 0 && "The eternal quest of every developer..."}
                  {currentSnippetIndex === 1 && "Life of a Flutter developer..."}
                  {currentSnippetIndex === 2 && "Enterprise Java in a nutshell..."}
                  {currentSnippetIndex === 3 && "C++ developer's daily struggle..."}
                </div>
                <div className="space-y-1">
                  {codeSnippets[currentSnippetIndex].code.slice(0, currentLineIndex).map((line, index) => (
                    <div key={index} className="text-gray-300">
                      {line}
                    </div>
                  ))}
                  <div className="text-gray-300">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-[1px] h-4 bg-primary-400 ml-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 