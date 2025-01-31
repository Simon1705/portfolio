'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import { Github, Linkedin, Instagram } from 'lucide-react'

const MotionH2 = motion.h2 as React.ComponentType<HTMLMotionProps<"h2">>
const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div">>

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Simon1705'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/simon-peter-59161326b/'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/simoone17_/'
  }
]

export default function Contact() {
  const { language } = useLanguage()

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionH2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {language === 'en' ? 'Get In Touch' : 'Hubungi Saya'}
        </MotionH2>
        <motion.div 
          className="flex justify-center space-x-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <link.icon size={24} />
              <span>{link.name}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 