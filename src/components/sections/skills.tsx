'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { useLanguage } from '@/providers/language-provider'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<(HTMLDivElement | null)[]>([])
  const otherTechsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      skillsRef.current.forEach((el, index) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        })
      })

      gsap.from(otherTechsRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        scrollTrigger: {
          trigger: otherTechsRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          ref={titleRef}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white via-primary-200 to-primary-400 text-transparent bg-clip-text
            [text-shadow:_0_1px_20px_rgb(255_255_255_/_20%)]"
        >
          {language === 'en' ? 'Skills & Technologies' : 'Keahlian & Teknologi'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mainSkills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => { skillsRef.current[index] = el }}
              className="relative group"
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
                      sizes="96px"
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
            </div>
          ))}
        </div>

        <div
          ref={otherTechsRef}
          className="relative mt-12 text-center"
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
        </div>
      </div>
    </section>
  )
} 