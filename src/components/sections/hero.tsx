'use client'

import React from 'react'
import { motion, type HTMLMotionProps, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import { Github, Linkedin, Mail, ArrowDown, Download, Code2, Sparkles, ChevronDown, Palette, Coffee, Cpu, Layers, Mouse, Code, Facebook, Twitter } from 'lucide-react'
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
    level: 50, 
    color: "#60A5FA", 
    icon: "🎨",
    description: {
      en: "React, Next.js, Tailwind CSS",
      id: "React, Next.js, Tailwind CSS"
    }
  },
  { 
    name: "Backend", 
    level: 50, 
    color: "#34D399", 
    icon: "⚙️",
    description: {
      en: "Firebase, Java Springboot",
      id: "Firebase, Java Springboot"
    }
  },
  { 
    name: "Mobile", 
    level: 60, 
    color: "#F472B6", 
    icon: "📱",
    description: {
      en: "Flutter",
      id: "Flutter"
    }
  },
  { 
    name: "UI/UX", 
    level: 45, 
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

// Define animation variants for smooth appearance
const socialAndCTAVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Hero() {
  const { language } = useLanguage()
  const { setShowNavbar } = useNavbar()
  const [text, setText] = React.useState("")
  const [isTypingComplete, setIsTypingComplete] = React.useState(false)
  const [currentSnippetIndex, setCurrentSnippetIndex] = React.useState(0)
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState("")
  const [isWaiting, setIsWaiting] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [showSocialAndCTA, setShowSocialAndCTA] = React.useState(false)

  const content = {
    en: {
      greeting: "Hello",
      name: "I'm Simon",
      cta: "View My Work",
      download: "Download CV"
    },
    id: {
      greeting: "Hai",
      name: "Nama Saya Simon",
      cta: "Lihat Project Saya",
      download: "Unduh CV"
    }
  }

  React.useEffect(() => {
    setText("")
    setIsTypingComplete(false)
    setShowNavbar(false)
    let currentText = ""
    const greeting = content[language].name
    const typingSpeed = 200; // Adjust this value for typing speed (in milliseconds)
    
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
    }, typingSpeed); // Use typingSpeed here
    
    return () => clearInterval(typingInterval);
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

  React.useEffect(() => {
    if (isTypingComplete) {
      // Show social media icons and CTA after greeting and name are displayed
      setShowSocialAndCTA(true)
    }
  }, [isTypingComplete])

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

      {/* Content centered with typing animation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
        <div className="relative z-10 text-center space-y-4">
          {/* Interactive greeting */}
          <motion.div
            onClick={() => setText(content[language].greeting === "Hello" ? "Hai" : "Hello")}
            className="cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold text-white"
            >
              {content[language].greeting}
            </motion.div>
          </motion.div>

          {/* Name with typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-semibold text-white"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {content[language].name}
            </motion.span>
          </motion.div>

          {/* Personalized quote with animated effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-lg font-medium text-gray-300"
          >
            "Kode yang sempurna itu ilusi, yang nyata adalah deadline."
          </motion.div>

          {/* Flex container for CTA and social media icons */}
          {showSocialAndCTA && (
            <motion.div
              variants={socialAndCTAVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4 mt-4"
            >
              {/* Social media icons with hover effects */}
              <div className="flex space-x-4">
                {socialLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500 transition duration-300 shadow-lg">
                    <link.icon className="w-6 h-6 text-white hover:scale-110 transition duration-300" />
                  </a>
                ))}
              </div>

              {/* Card layout for CTA buttons */}
              <motion.div className="flex flex-col gap-4">
                <Link href="#projects">
                  <motion.div className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ArrowDown className="w-5 h-5" />
                      {content[language].cta}
                    </span>
                  </motion.div>
                </Link>

                <motion.a href="/cv.pdf" download className="px-8 py-4 rounded-xl font-medium border border-blue-500/20 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/5 transform hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                    <Download className="w-5 h-5" />
                    {content[language].download}
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
} 