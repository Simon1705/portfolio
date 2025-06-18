'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion'
import { useLanguage } from '@/providers/language-provider'
import Image from 'next/image'
import { Github, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const MotionH2 = motion.h2 as React.ComponentType<HTMLMotionProps<"h2">>
const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div">>

type TechIconsType = {
  [key: string]: string;
}

interface ProjectButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isPrivate?: boolean;
  className?: string;
}

const ProjectButton = ({ icon, label, href, isPrivate, className }: ProjectButtonProps) => {
  const { language } = useLanguage()
  
  if (isPrivate) {
    return (
      <div className="relative group">
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-sm text-white rounded-lg
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {language === 'en' ? 'Contact me for access' : 'Hubungi saya untuk akses'}
        </div>
        <button
          disabled
          className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-not-allowed ${className}`}
        >
          {icon}
          <span className="font-medium">{label}</span>
        </button>
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl 
        transition-all duration-300 overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 
        group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 group-hover:rotate-12 transition-transform duration-300">
        {icon}
      </div>
      <span className="relative z-10 font-medium group-hover:translate-x-1 transition-transform duration-300">
        {label}
      </span>
    </a>
  )
}

type ProjectType = 'personal' | 'collaborative' | 'internship';

const techIcons: TechIconsType = {
  "Flutter": "/images/skills/flutter.png",
  "Firebase": "/images/skills/firebase.png",
  "Next.js": "/images/skills/nextjs.png",
  "Supabase": "/images/skills/supabase.png",
  "Java Spring Boot": "/images/skills/spring.png",
  "MySQL": "/images/skills/mysql.png",
  "Tailwind CSS": "/images/skills/tailwind.png",
  "React": "/images/skills/react.png"
}

const getProjectTypeStyles = (type: ProjectType) => {
  switch (type) {
    case 'collaborative':
      return {
        text: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        dot: "bg-blue-400"
      };
    case 'internship':
      return {
        text: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
        dot: "bg-purple-400"
      };
    default: // personal
      return {
        text: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        dot: "bg-green-400"
      };
  }
};

const getProjectTypeLabel = (type: ProjectType, language: string) => {
  switch (type) {
    case 'collaborative':
      return language === 'en' ? "Collaborative Project" : "Proyek Kolaboratif";
    case 'internship':
      return language === 'en' ? "Internship Project" : "Proyek Magang";
    default: // personal
      return language === 'en' ? "Personal Project" : "Proyek Pribadi";
  }
};

interface Project {
  title: string;
  type: ProjectType;
  description: {
    en: string;
    id: string;
  };
  tech: string[];
  github: string;
  tryItLink?: string;
  isPrivate?: boolean;
  images: Array<{
    src: string;
    caption: {
      en: string;
      id: string;
    };
  }>;
}

const projects: Project[] = [
  {
    title: "NutriGuide Mobile",
    type: 'collaborative' as ProjectType,
    description: {
      en: "NutriGuide is a smart meal planner app developed with Flutter and inspired by Samsung Food App, designed to simplify your daily meal planning, plan menus, get recipe recommendations, and track nutrition",
      id: "NutriGuide adalah aplikasi meal planner cerdas yang dikembangkan dengan Flutter dan terinspirasi oleh aplikasi Samsung Food App, dirancang untuk memudahkan perencanaan makanan harian, merencanakan menu, mendapatkan rekomendasi resep, dan melacak nutrisi Anda."
    },
    tech: ["Flutter", "Firebase"],
    github: "https://github.com/Simon1705/NutriGuide-Mobile-App",
    tryItLink: "https://bit.ly/NutriGuideV1",
    isPrivate: false,
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
    type: 'collaborative' as ProjectType,
    description: {
      en: "NutriGuide web version is developed with Java Spring Boot, Flutter, and MySQL, designed to simplify your daily meal planning with additional features for web users.",
      id: "Versi web NutriGuide dikembangkan dengan Java Spring Boot, Flutter, dan MySQL, dirancang untuk memudahkan perencanaan makanan harian Anda dengan fitur tambahan untuk pengguna web."
    },
    tech: ["Java Spring Boot", "Flutter", "MySQL"],
    github: "https://github.com/Simon1705/NutriGuide-Web-App",
    tryItLink: "https://nutri-guide-web-app.vercel.app/",
    isPrivate: true,
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
    type: 'personal' as ProjectType,
    description: {
      en: "Memoire is a web-based application for publishing and storing memories in the form of photos and videos, developed with Next.js, React, Tailwind CSS, and Supabase.",
      id: "Memoire adalah aplikasi berbasis web untuk mempublikasi dan menyimpan kenangan dalam bentuk foto dan video, dikembangkan dengan Next.js, React, Tailwind CSS, dan Supabase."
    },
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    github: "https://github.com/Simon1705/memories-web",
    tryItLink: "https://memories-web-eta.vercel.app",
    isPrivate: false,
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
  },
  {
    title: "Label App",
    type: 'personal' as ProjectType,
    description: {
      en: "Label App is a web-based application for labeling review data as positive, negative, or neutral, developed with Next.js, Tailwind CSS, and Supabase.",
      id: "Label App adalah sebuah website yang dibuat untuk melabeli suatu data ulasan sebagai positif, negatif atau netral, dikembangkan dengan Next.js, Tailwind CSS, dan Supabase."
    },
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    github: "https://github.com/Simon1705/label-app",
    tryItLink: "https://label-sentimen.vercel.app/",
    isPrivate: false,
    images: [
      {
        src: "/images/projects/label-app-1.png",
        caption: { en: "Login Page", id: "Halaman Login" }
      },
      {
        src: "/images/projects/label-app-2.png",
        caption: { en: "Dashboard", id: "Dashboard" }
      },
      {
        src: "/images/projects/label-app-3.png",
        caption: { en: "Labeling Page", id: "Halaman Labeling" }
      }
    ]
  },
  {
    title: "Document Approval System",
    type: 'internship' as ProjectType,
    description: {
      en: "Document Approval System is a web-based application for approving documents with a systematic and effective process, developed with Next.js, Tailwind CSS, and Supabase.",
      id: "Document Approval System adalah sebuah website yang dibuat untuk menyetujui dokumen secara sistematis dan efektif, dikembangkan dengan Next.js, Tailwind CSS, dan Supabase."
    },
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    github: "https://github.com/Simon1705/label-app",
    tryItLink: "https://label-sentimen.vercel.app/",
    isPrivate: true,
    images: [
      {
        src: "/images/projects/approval-1.png",
        caption: { 
          en: "Authentication Page with Multi-Role Access", 
          id: "Halaman Autentikasi dengan Akses Multi-Role" 
        }
      },
      {
        src: "/images/projects/approval-2.png",
        caption: { 
          en: "Dashboard Overview with Document Statistics", 
          id: "Ikhtisar Dashboard dengan Statistik Dokumen" 
        }
      },
      {
        src: "/images/projects/approval-3.png",
        caption: { 
          en: "Document Submission Form", 
          id: "Formulir Pengajuan Dokumen" 
        }
      },
      {
        src: "/images/projects/approval-4.png",
        caption: { 
          en: "Document Review and Approval Interface", 
          id: "Antarmuka Peninjauan dan Persetujuan Dokumen" 
        }
      },
      {
        src: "/images/projects/approval-5.png",
        caption: { 
          en: "Document History and Tracking", 
          id: "Riwayat dan Pelacakan Dokumen" 
        }
      },
      {
        src: "/images/projects/approval-6.png",
        caption: { 
          en: "Document Status Management", 
          id: "Manajemen Status Dokumen" 
        }
      },
      {
        src: "/images/projects/approval-7.png",
        caption: { 
          en: "User Profile and Settings", 
          id: "Profil dan Pengaturan Pengguna" 
        }
      }
    ]
  },
  {
    title: "GrowthView FKS",
    type: 'internship' as ProjectType,
    description: {
      en: "GrowthView FKS is a web-based application for monitoring the performance of the Fakultas Komunikasi dan Ilmu Sosial Telkom University, developed with Next.js, Tailwind CSS, and Supabase.",
      id: "GrowthView FKS adalah website yang dibuat untuk memonitor pencapaian Fakultas Komunikasi dan Ilmu Sosial Telkom University, dikembangkan dengan Next.js, Tailwind CSS, dan Supabase."
    },
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    github: "https://github.com/Simon1705/label-app",
    tryItLink: "https://label-sentimen.vercel.app/",
    isPrivate: true,
    images: [
      {
        src: "/images/projects/growth-1.png",
        caption: { 
          en: "Dashboard Page", 
          id: "Halaman Dashboard" 
        }
      },
      {
        src: "/images/projects/growth-2.png",
        caption: { 
          en: "Lecturer Menu", 
          id: "Menu Dosen" 
        }
      },
      {
        src: "/images/projects/growth-3.png",
        caption: { 
          en: "Login Page", 
          id: "Halaman Login" 
        }
      },
      {
        src: "/images/projects/growth-4.png",
        caption: { 
          en: "Dashboard Admin", 
          id: "Dashboard Admin" 
        }
      },
      {
        src: "/images/projects/growth-5.png",
        caption: { 
          en: "Upload Data", 
          id: "Unggah Data" 
        }
      },
      {
        src: "/images/projects/growth-6.png",
        caption: { 
          en: "Edit Data", 
          id: "Edit Data" 
        }
      },
      {
        src: "/images/projects/growth-7.png",
        caption: { 
          en: "Account Management", 
          id: "Manajemen Akun" 
        }
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
  const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all')
  const [hoveredType, setHoveredType] = useState<ProjectType | 'all' | null>(null)

  const filterButtons = [
    {
      type: 'all' as const,
      icon: '🎯',
      labelEn: 'All Projects',
      labelId: 'Semua Proyek',
      activeClass: 'bg-white text-gray-900',
      hoverClass: 'hover:text-white',
      count: projects.length
    },
    {
      type: 'personal' as const,
      icon: '💡',
      labelEn: 'Personal',
      labelId: 'Pribadi',
      activeClass: 'bg-green-400 text-gray-900',
      hoverClass: 'hover:text-green-400',
      count: projects.filter(p => p.type === 'personal').length
    },
    {
      type: 'collaborative' as const,
      icon: '👥',
      labelEn: 'Collaborative',
      labelId: 'Kolaborasi',
      activeClass: 'bg-blue-400 text-gray-900',
      hoverClass: 'hover:text-blue-400',
      count: projects.filter(p => p.type === 'collaborative').length
    },
    {
      type: 'internship' as const,
      icon: '🚀',
      labelEn: 'Internship',
      labelId: 'Magang',
      activeClass: 'bg-purple-400 text-gray-900',
      hoverClass: 'hover:text-purple-400',
      count: projects.filter(p => p.type === 'internship').length
    }
  ]

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
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-white via-primary-200 to-primary-400 text-transparent bg-clip-text
            [text-shadow:_0_1px_20px_rgb(255_255_255_/_20%)]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === 'en' ? 'Projects' : 'Proyek'}
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filterButtons.map((button, index) => (
            <motion.button
              key={button.type}
              onClick={() => setSelectedType(button.type)}
              onHoverStart={() => setHoveredType(button.type)}
              onHoverEnd={() => setHoveredType(null)}
              className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                backdrop-blur-sm border
                ${selectedType === button.type 
                  ? `${button.activeClass} border-transparent shadow-lg scale-105` 
                  : `bg-gray-800/30 border-gray-700/50 ${button.hoverClass}`
                }
                ${hoveredType === button.type ? 'scale-105' : 'scale-100'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{button.icon}</span>
                <span>{language === 'en' ? button.labelEn : button.labelId}</span>
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full 
                  ${selectedType === button.type 
                    ? 'bg-black/20' 
                    : 'bg-gray-700/50'
                  }`}
                >
                  {button.count}
                </span>
              </div>
              {selectedType === button.type && (
                <motion.div
                  className="absolute inset-0 -z-10 rounded-xl opacity-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `radial-gradient(circle at center, 
                      ${button.type === 'personal' ? '#4ade80' : 
                        button.type === 'collaborative' ? '#60a5fa' :
                        button.type === 'internship' ? '#c084fc' : 
                        '#ffffff'} 0%, transparent 100%)`
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-24">
          {projects
            .filter(project => selectedType === 'all' || project.type === selectedType)
            .map((project, index) => {
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
                                    ) : project.title === "Memoire" ? (
                                      language === 'en' ? (
                                        currentIndex === 0 ? "Home Feed" :
                                        currentIndex === 1 ? "Memory Details" :
                                        "Admin Dashboard"
                                      ) : (
                                        currentIndex === 0 ? "Beranda" :
                                        currentIndex === 1 ? "Detail Kenangan" :
                                        "Panel Admin"
                                      )
                                    ) : project.title === "Label App" ? (
                                      language === 'en' ? (
                                        currentIndex === 0 ? "Login Page" :
                                        currentIndex === 1 ? "Dashboard" :
                                        "Labeling Page"
                                      ) : (
                                        currentIndex === 0 ? "Halaman Login" :
                                        currentIndex === 1 ? "Dashboard" :
                                        "Halaman Labeling"
                                      )
                                    ) : project.title === "Document Approval System" ? (
                                      language === 'en' ? (
                                        currentIndex === 0 ? "Login Page" :
                                        currentIndex === 1 ? "Lecturer Dashboard" :
                                        currentIndex === 2 ? "Secretary Dashboard" :
                                        currentIndex === 3 ? "Document Review by Secretary" :
                                        currentIndex === 4 ? "Dean Dashboard" :
                                        currentIndex === 5 ? "Document Review by Dean" :
                                        currentIndex === 6 ? "Admin Dashboard" :
                                        "Admin Dashboard"
                                      ) : (
                                        currentIndex === 0 ? "Halaman Login" :
                                        currentIndex === 1 ? "Dashboard Dosen" :
                                        currentIndex === 2 ? "Dashboard Sekretaris" :
                                        currentIndex === 3 ? "Review Dokumen oleh Sekretaris" :
                                        currentIndex === 4 ? "Dashboard Dekan" :
                                        currentIndex === 5 ? "Review Dokumen oleh Dekan" :
                                        currentIndex === 6 ? "Dashboard Admin" :
                                        "Dashboard Admin"
                                      )
                                    ) : project.title === "GrowthView FKS" ? (
                                      language === 'en' ? (
                                        currentIndex === 0 ? "Dashboard Page" :
                                        currentIndex === 1 ? "Lecturer Menu" :
                                        currentIndex === 2 ? "Login Page" :
                                        currentIndex === 3 ? "Dashboard Admin" :
                                        currentIndex === 4 ? "Upload Data" :
                                        currentIndex === 5 ? "Edit Data" :
                                        currentIndex === 6 ? "Account Management" :
                                        "Admin Dashboard"
                                      ) : (
                                        currentIndex === 0 ? "Halaman Dashboard" :
                                        currentIndex === 1 ? "Menu Dosen" :
                                        currentIndex === 2 ? "Halaman Login" :
                                        currentIndex === 3 ? "Dashboard Admin" :
                                        currentIndex === 4 ? "Unggah Data" :
                                        currentIndex === 5 ? "Edit Data" :
                                        currentIndex === 6 ? "Manajemen Akun" :
                                        "Dashboard Admin"
                                      )
                                    ) : null
                                  }
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
                      ${getProjectTypeStyles(project.type).text} 
                      ${getProjectTypeStyles(project.type).bg} 
                      ${getProjectTypeStyles(project.type).border}
                      font-medium mb-4`}>
                      <span className={`w-2 h-2 rounded-full mr-2 
                        ${getProjectTypeStyles(project.type).dot}`}
                      />
                      {getProjectTypeLabel(project.type, language)}
                    </p>
                    <p className="text-gray-400 mb-4">
                      {project.description[language]}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm rounded-full bg-primary-400/10 text-primary-300 border border-primary-400/20
                          flex items-center gap-2"
                      >
                        {techIcons[tech] && (
                          <div className="relative w-4 h-4">
                            <Image
                              src={techIcons[tech]}
                              alt={tech}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <ProjectButton
                      icon={<Github className="w-5 h-5" />}
                      label="GitHub"
                      href={project.github}
                      isPrivate={project.isPrivate}
                      className={project.isPrivate 
                        ? "bg-gray-800/50 text-gray-500" 
                        : "bg-gray-800/80 hover:bg-gray-700/90 hover:shadow-gray-700/30"
                      }
                    />
                    {project.tryItLink && (
                      <ProjectButton
                        icon={<ExternalLink className="w-5 h-5" />}
                        label={language === 'en' ? 'Visit' : 'Kunjungi'}
                        href={project.tryItLink}
                        isPrivate={project.isPrivate}
                        className={project.isPrivate 
                          ? "bg-primary-500/50 text-gray-400" 
                          : "bg-primary-500/90 hover:bg-primary-600/90 hover:shadow-primary-500/30"
                        }
                      />
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