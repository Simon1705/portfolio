'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import Image from 'next/image'
import { Github, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const MotionH2 = motion.h2 as React.ComponentType<HTMLMotionProps<"h2">>
const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div">>

const projects = [
  {
    title: "NutriGuide Mobile",
    description: {
      en: "NutriGuide is a smart meal planner app developed with Flutter and inspired by Samsung Food App, designed to simplify your daily meal planning, plan menus, get recipe recommendations, and track nutrition",
      id: "NutriGuide adalah aplikasi meal planner cerdas yang dikembangkan dengan Flutter dan terinspirasi oleh aplikasi Samsung Food App, dirancang untuk memudahkan perencanaan makanan harian, merencanakan menu, mendapatkan rekomendasi resep, dan melacak nutrisi Anda."
    },
    tech: ["Flutter", "Firebase"],
    github: "https://github.com/Simon1705/NutriGuide-Mobile-App",
    tryItLink: "https://bit.ly/NutriGuideV1",
    images: [
      {
        src: "/images/projects/nutriguide-mobile-1.jpg",
        caption: { en: "Home Screen", id: "Layar Utama" }
      },
      {
        src: "/images/projects/nutriguide-mobile-2.jpg",
        caption: { en: "Recipe Explorer", id: "Eksplorasi Resep" }
      },
      {
        src: "/images/projects/nutriguide-mobile-3.jpg",
        caption: { en: "Meal Planner", id: "Perencanaan Makanan" }
      },
      {
        src: "/images/projects/nutriguide-mobile-4.jpg",
        caption: { en: "Saved Recipes", id: "Resep Tersimpan" }
      },
      {
        src: "/images/projects/nutriguide-mobile-5.jpg",
        caption: { en: "User Profile", id: "Profil Pengguna" }
      }
    ]
  },
  {
    title: "NutriGuide Web",
    description: {
      en: "NutriGuide web version is developed with Java Spring Boot, Flutter, and MySQL, designed to simplify your daily meal planning with additional features for web users.",
      id: "Versi web NutriGuide dikembangkan dengan Java Spring Boot, Flutter, dan MySQL, dirancang untuk memudahkan perencanaan makanan harian Anda dengan fitur tambahan untuk pengguna web."
    },
    tech: ["Java Spring Boot", "Flutter", "MySQL"],
    github: "https://github.com/Simon1705/NutriGuide-Web-App",
    images: [
      {
        src: "/images/projects/nutriguide-web-1.jpg",
        caption: { en: "Landing Page", id: "Halaman Awal" }
      },
      {
        src: "/images/projects/nutriguide-web-2.jpg",
        caption: { en: "Login Page", id: "Halaman Login" }
      },
      {
        src: "/images/projects/nutriguide-web-3.jpg",
        caption: { en: "Home Page", id: "Halaman Utama" }
      },
      {
        src: "/images/projects/nutriguide-web-4.jpg",
        caption: { en: "Explore Recipes", id: "Eksplorasi Resep" }
      },
      {
        src: "/images/projects/nutriguide-web-5.jpg",
        caption: { en: "Plan Meals", id: "Rencana Makanan" }
      },
      {
        src: "/images/projects/nutriguide-web-6.jpg",
        caption: { en: "Saved Recipes", id: "Resep Tersimpan" }
      },
      {
        src: "/images/projects/nutriguide-web-7.jpg",
        caption: { en: "User Profile", id: "Profil Pengguna" }
      },
      {
        src: "/images/projects/nutriguide-web-8.jpg",
        caption: { en: "Admin Panel", id: "Panel Admin" }
      }
    ]
  },
  {
    title: "Memoire",
    description: {
      en: "Memoire is a web-based application for publishing and storing memories in the form of photos and videos, developed with Next.js, React, Tailwind CSS, and Supabase.",
      id: "Memoire adalah aplikasi berbasis web untuk mempublikasi dan menyimpan kenangan dalam bentuk foto dan video, dikembangkan dengan Next.js, React, Tailwind CSS, dan Supabase."
    },
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    github: "https://github.com/Simon1705/memories-web",
    tryItLink: "https://memories-web-eta.vercel.app",
    images: [
      {
        src: "/images/projects/memoire-1.jpg",
        caption: { en: "Home Feed", id: "Beranda" }
      },
      {
        src: "/images/projects/memoire-2.jpg",
        caption: { en: "Memories", id: "Detail Kenangan" }
      },
      {
        src: "/images/projects/memoire-3.jpg",
        caption: { en: "Admin Dashboard", id: "Panel Admin" }
      }
    ]
  }
]

export default function Projects() {
  const { language } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const [imageOrientations, setImageOrientations] = useState<{ [key: string]: boolean }>({})
  const [slideDirection, setSlideDirection] = useState<{ [key: string]: number }>({})
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const preloadImages = async () => {
      for (const project of projects) {
        for (let i = 0; i < project.images.length; i++) {
          const src = project.images[i].src
          const img = new window.Image()
          img.src = src
          await new Promise((resolve) => {
            img.onload = () => {
              const isPortrait = img.height > img.width
              setImageOrientations(prev => ({
                ...prev,
                [`${project.title}-${i}`]: isPortrait
              }))
              resolve(null)
            }
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`)
              resolve(null)
            }
          })
        }
      }
    }
    preloadImages()
  }, [])

  const nextImage = (projectTitle: string, imagesLength: number) => {
    setIsLoading(prev => ({ ...prev, [projectTitle]: true }))
    setSlideDirection(prev => ({ ...prev, [projectTitle]: 1 }))
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] || 0) + 1) % imagesLength
    }))
  }

  const prevImage = (projectTitle: string, imagesLength: number) => {
    setIsLoading(prev => ({ ...prev, [projectTitle]: true }))
    setSlideDirection(prev => ({ ...prev, [projectTitle]: -1 }))
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] || 0) - 1 + imagesLength) % imagesLength
    }))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction * 100,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: (direction: number) => ({
      x: direction * -100,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    })
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionH2 
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white via-primary-200 to-primary-400 text-transparent bg-clip-text
            [text-shadow:_0_1px_20px_rgb(255_255_255_/_20%)]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === 'en' ? 'Projects' : 'Proyek'}
        </MotionH2>

        <div className="space-y-24">
          {projects.map((project, index) => {
            const currentIndex = currentImageIndex[project.title] || 0
            const isPortrait = imageOrientations[`${project.title}-${currentIndex}`]

            return (
              <MotionDiv
                key={index}
                className="flex flex-col lg:flex-row gap-8 items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-full lg:w-3/5 relative group ${isPortrait ? 'lg:w-2/5' : 'lg:w-3/5'}`}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                  <div className={`relative w-full ${isPortrait ? 'aspect-[3/4] md:aspect-[4/5] max-w-sm mx-auto' : 'aspect-[16/9]'}`}>
                    {project.images && project.images.length > 0 && (
                      <>
                        <div className={`relative h-full overflow-hidden ${isPortrait ? 'bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl' : ''}`}>
                          <AnimatePresence initial={false} custom={slideDirection[project.title]}>
                            <motion.div
                              key={currentIndex}
                              custom={slideDirection[project.title]}
                              variants={variants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="absolute inset-0"
                            >
                              <div className="relative h-full">
                                <Image
                                  src={project.images[currentIndex].src}
                                  alt={`${project.title} screenshot ${currentIndex + 1}`}
                                  fill
                                  priority
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  quality={90}
                                  className={`rounded-lg shadow-2xl ${
                                    isPortrait ? 'object-contain p-2' : 'object-contain'
                                  }`}
                                />
                                <motion.div 
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm rounded-b-lg"
                                >
                                  <p className="text-center text-white text-sm font-medium">
                                    {project.title === "NutriGuide Mobile" ? (
                                      language === 'en' ? (
                                        currentIndex === 0 ? "Home Screen" :
                                        currentIndex === 1 ? "Recipe Explorer" :
                                        currentIndex === 2 ? "Meal Planner" :
                                        currentIndex === 3 ? "Saved Recipes" :
                                        "User Profile"
                                      ) : (
                                        currentIndex === 0 ? "Layar Utama" :
                                        currentIndex === 1 ? "Penjelajah Resep" :
                                        currentIndex === 2 ? "Perencana Makanan" :
                                        currentIndex === 3 ? "Resep Tersimpan" :
                                        "Profil Pengguna"
                                      )
                                    ) : project.title === "NutriGuide Web" ? (
                                      language === 'en' ? (
                                        currentIndex === 0 ? "Landing Page" :
                                        currentIndex === 1 ? "Login Page" :
                                        currentIndex === 2 ? "Home Page" :
                                        currentIndex === 3 ? "Explore Recipes" :
                                        currentIndex === 4 ? "Plan Meals" :
                                        currentIndex === 5 ? "Saved Recipes" :
                                        currentIndex === 6 ? "User Profile" :
                                        "Admin Panel"
                                      ) : (
                                        currentIndex === 0 ? "Halaman Awal" :
                                        currentIndex === 1 ? "Halaman Login" :
                                        currentIndex === 2 ? "Halaman Utama" :
                                        currentIndex === 3 ? "Eksplorasi Resep" :
                                        currentIndex === 4 ? "Rencana Makanan" :
                                        currentIndex === 5 ? "Resep Tersimpan" :
                                        currentIndex === 6 ? "Profil Pengguna" :
                                        "Panel Admin"
                                      )
                                    ) : (
                                      language === 'en' ? (
                                        currentIndex === 0 ? "Home Feed" :
                                        currentIndex === 1 ? "Memory Details" :
                                        "Admin Dashboard"
                                      ) : (
                                        currentIndex === 0 ? "Beranda" :
                                        currentIndex === 1 ? "Detail Kenangan" :
                                        "Panel Admin"
                                      )
                                    )}
                                  </p>
                                </motion.div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        {project.images.length > 1 && (
                          <>
                            <button
                              onClick={() => prevImage(project.title, project.images.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-300"
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                              onClick={() => nextImage(project.title, project.images.length)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-300"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </button>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                              {project.images.map((_, imgIndex) => (
                                <button
                                  key={imgIndex}
                                  onClick={() => setCurrentImageIndex(prev => ({
                                    ...prev,
                                    [project.title]: imgIndex
                                  }))}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    currentIndex === imgIndex
                                      ? 'bg-white scale-125'
                                      : 'bg-white/50 hover:bg-white/70'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className={`w-full space-y-4 ${isPortrait ? 'lg:w-3/5' : 'lg:w-2/5'}`}>
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className={`text-sm inline-flex items-center px-3 py-1 rounded-full
                      ${project.title.includes("NutriGuide") 
                        ? "text-blue-400 bg-blue-400/10 border border-blue-400/20" 
                        : "text-green-400 bg-green-400/10 border border-green-400/20"
                      } font-medium mb-4`}>
                      <span className={`w-2 h-2 rounded-full mr-2 
                        ${project.title.includes("NutriGuide")
                          ? "bg-blue-400"
                          : "bg-green-400"
                        }`}
                      />
                      {project.title.includes("NutriGuide") 
                        ? language === 'en' 
                          ? "Collaborative Project" 
                          : "Proyek Kolaboratif"
                        : language === 'en'
                          ? "Personal Project"
                          : "Proyek Pribadi"
                      }
                    </p>
                    <p className="text-gray-400 mb-4">
                      {project.description[language]}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm rounded-full bg-primary-400/10 text-primary-300 border border-primary-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800/80 
                        hover:bg-gray-700/90 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-gray-700/30"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
                      <Github className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="relative z-10 font-medium group-hover:translate-x-1 transition-transform duration-300">
                        GitHub
                      </span>
                    </a>
                    {'tryItLink' in project && (
                      <a
                        href={project.tryItLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500/90 
                          hover:bg-primary-600/90 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-primary-500/30"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300" />
                        <ExternalLink className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="relative z-10 font-medium group-hover:translate-x-1 transition-transform duration-300">
                          {language === 'en' ? 'Try it' : 'Coba'}
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
} 