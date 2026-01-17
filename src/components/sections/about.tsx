'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { useLanguage } from '@/providers/language-provider'
import Image from 'next/image'
import { Code2, Smartphone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const highlightsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.5,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

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

      gsap.from(descRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.5,
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      highlightsRef.current.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const content = {
    en: {
      title: "About Me",
      description: "I am a Computer Science student who is enthusiastically learning web and mobile development. Currently focusing on mastering Flutter for mobile apps and exploring web technologies like Next.js and React.",
      highlights: [
        { icon: Code2, title: "Web Development", desc: "Learning modern web technologies" },
        { icon: Smartphone, title: "Mobile Development", desc: "Exploring mobile app development" }
      ]
    },
    id: {
      title: "Tentang Saya",
      description: "Saya adalah mahasiswa Informatika yang sedang mempelajari pengembangan web dan mobile. Saat ini fokus mendalami Flutter untuk aplikasi mobile dan mengeksplorasi teknologi web seperti Next.js dan React.",
      highlights: [
        { icon: Code2, title: "Pengembangan Web", desc: "Mempelajari teknologi web modern dan mencoba membuat aplikasi web" },
        { icon: Smartphone, title: "Pengembangan Mobile", desc: "Mengeksplorasi pengembangan aplikasi mobile" }
      ]
    }
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div
            ref={imageRef}
            className="relative group w-full md:w-1/3"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative aspect-square">
              <Image
                src="/images/projects/aboutme.jpg"
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded-lg shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent rounded-lg"></div>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <h2 
              ref={titleRef}
              className="text-4xl font-bold bg-gradient-to-r from-white via-primary-200 to-primary-400 text-transparent bg-clip-text
                [text-shadow:_0_1px_20px_rgb(255_255_255_/_20%)]"
            >
              {content[language].title}
            </h2>

            <div>
              <p ref={descRef} className="text-lg leading-relaxed text-gray-100">
                {content[language].description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {content[language].highlights.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => { highlightsRef.current[index] = el }}
                  className="p-4 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-800
                    hover:border-primary-400/50 hover:bg-gray-950/90 transition-all duration-300
                    transform hover:shadow-lg hover:shadow-primary-400/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-400/10">
                      <item.icon className="w-6 h-6 text-primary-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 