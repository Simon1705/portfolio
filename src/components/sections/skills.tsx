'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import Image from 'next/image'

const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div">>

const mainSkills = [
  {
    name: "Flutter",
    image: "/images/skills/flutter.png",
    description: {
      en: "Cross-platform app development",
      id: "Pengembangan aplikasi lintas platform"
    }
  },
  {
    name: "Firebase",
    image: "/images/skills/firebase.png",
    description: {
      en: "Backend & Authentication",
      id: "Backend & Autentikasi"
    }
  },
  {
    name: "Next.js",
    image: "/images/skills/nextjs.png",
    description: {
      en: "React framework for production",
      id: "Framework React untuk produksi"
    }
  },
  {
    name: "Supabase",
    image: "/images/skills/supabase.png",
    description: {
      en: "Open source Firebase alternative",
      id: "Alternatif Firebase open source"
    }
  }
]

const otherTechs = [
  "TypeScript", "Tailwind CSS", "Java Spring Boot", 
  "MySQL", "Dart", "GitHub", "VS Code", "Android Studio"
]

export default function Skills() {
  const { language } = useLanguage()

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white via-primary-200 to-primary-400 text-transparent bg-clip-text
            [text-shadow:_0_1px_20px_rgb(255_255_255_/_20%)]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === 'en' ? 'Skills & Technologies' : 'Keahlian & Teknologi'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mainSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl blur opacity-30 
                group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative h-full p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700
                hover:border-primary-500/30 hover:bg-gray-800/80 transition-all duration-300 
                group-hover:shadow-lg group-hover:shadow-primary-500/10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 relative mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-300 
                    transition-colors duration-300 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {skill.description[language]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-400 mb-4">
            {language === 'en' ? 'Other technologies I work with:' : 'Teknologi lain yang saya gunakan:'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {otherTechs.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-gray-800/50 text-gray-300 border border-gray-700
                  hover:border-primary-500/30 hover:bg-gray-800/80 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 