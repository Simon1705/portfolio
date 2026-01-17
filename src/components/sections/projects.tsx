'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLanguage } from '@/providers/language-provider'
import Image from 'next/image'
import { Github, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bebas_Neue } from 'next/font/google'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' })

gsap.registerPlugin(ScrollTrigger)

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
type PlatformType = 'mobile' | 'web';
type RoleType = 'fullstack' | 'backend' | 'frontend' | 'mobile';

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

const getPlatformStyles = (platform: PlatformType) => {
  switch (platform) {
    case 'mobile':
      return {
        text: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
        icon: "📱"
      };
    case 'web':
      return {
        text: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20",
        icon: "🌐"
      };
  }
};

const getPlatformLabel = (platform: PlatformType, language: string) => {
  switch (platform) {
    case 'mobile':
      return language === 'en' ? "Mobile App" : "Aplikasi Mobile";
    case 'web':
      return language === 'en' ? "Web App" : "Aplikasi Web";
  }
};

const getRoleStyles = (role: RoleType) => {
  switch (role) {
    case 'fullstack':
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        icon: "💻"
      };
    case 'backend':
      return {
        text: "text-violet-400",
        bg: "bg-violet-400/10",
        border: "border-violet-400/20",
        icon: "⚙️"
      };
    case 'frontend':
      return {
        text: "text-sky-400",
        bg: "bg-sky-400/10",
        border: "border-sky-400/20",
        icon: "🎨"
      };
    case 'mobile':
      return {
        text: "text-pink-400",
        bg: "bg-pink-400/10",
        border: "border-pink-400/20",
        icon: "📱"
      };
  }
};

const getRoleLabel = (role: RoleType, language: string) => {
  switch (role) {
    case 'fullstack':
      return language === 'en' ? "Full Stack Developer" : "Full Stack Developer";
    case 'backend':
      return language === 'en' ? "Backend Developer" : "Backend Developer";
    case 'frontend':
      return language === 'en' ? "Frontend Developer" : "Frontend Developer";
    case 'mobile':
      return language === 'en' ? "Mobile Developer" : "Mobile Developer";
  }
};

interface Project {
  title: string;
  type: ProjectType;
  platform: PlatformType;
  role: RoleType;
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
    title: "SmartLele",
    type: 'collaborative' as ProjectType,
    platform: 'mobile' as PlatformType,
    role: 'fullstack' as RoleType,
    description: {
      en: "SmartLele is a mobile application integrated with IoT devices for automated catfish farming by monitoring pond water quality (pH, temperature, turbidity) and controlling feed and pumps automatically via ESP32, with real-time notifications and monitoring dashboard.",
      id: "SmartLele adalah aplikasi mobile yang terintegrasi dengan alat IoT untuk otomatisasi budidaya lele dengan memantau kualitas air kolam (pH, suhu, kekeruhan) dan mengontrol pakan serta pompa secara otomatis lewat ESP32, dengan notifikasi real-time dan dashboard monitoring."
    },
    tech: ["Flutter", "Supabase"],
    github: "https://github.com/private/smartlele",
    tryItLink: "https://smartlele.app",
    isPrivate: true,
    images: [
      {
        src: "/images/projects/smartlele-1.jpeg",
        caption: { 
          en: "Loading Screen", 
          id: "Layar Memuat" 
        }
      },
      {
        src: "/images/projects/smartlele-2.jpeg",
        caption: { 
          en: "Login Screen", 
          id: "Layar Login" 
        }
      },
      {
        src: "/images/projects/smartlele-3.png",
        caption: { 
          en: "Dashboard Screen", 
          id: "Layar Dashboard" 
        }
      },
      {
        src: "/images/projects/smartlele-4.jpeg",
        caption: { 
          en: "Device Detail", 
          id: "Detail Perangkat" 
        }
      },
      {
        src: "/images/projects/smartlele-5.jpeg",
        caption: { 
          en: "Threshold Configuration", 
          id: "Konfigurasi Ambang Batas" 
        }
      },
      {
        src: "/images/projects/smartlele-6.jpeg",
        caption: { 
          en: "Feeding Configuration", 
          id: "Konfigurasi Pemberian Pakan" 
        }
      },
      {
        src: "/images/projects/smartlele-7.jpeg",
        caption: { 
          en: "IoT Control", 
          id: "Kontrol IoT" 
        }
      },
      {
        src: "/images/projects/smartlele-8.jpeg",
        caption: { 
          en: "Smart Alert", 
          id: "Notifikasi Pintar" 
        }
      }
    ]
  },
  {
    title: "Document Approval System",
    type: 'internship' as ProjectType,
    platform: 'web' as PlatformType,
    role: 'fullstack' as RoleType,
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
    platform: 'web' as PlatformType,
    role: 'fullstack' as RoleType,
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
  },
  {
    title: "NutriGuide Mobile",
    type: 'collaborative' as ProjectType,
    platform: 'mobile' as PlatformType,
    role: 'fullstack' as RoleType,
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
    platform: 'web' as PlatformType,
    role: 'backend' as RoleType,
    description: {
      en: "NutriGuide web version is developed with Java Spring Boot, Flutter, and MySQL, designed to simplify your daily meal planning with additional features for web users.",
      id: "Versi web NutriGuide dikembangkan dengan Java Spring Boot, Flutter, dan MySQL, dirancang untuk memudahkan perencanaan makanan harian Anda dengan fitur tambahan untuk pengguna web."
    },
    tech: ["Java Spring Boot", "Flutter", "MySQL"],
    github: "https://github.com/Simon1705/NutriGuide-Web-App",
    tryItLink: "https://nutriguide-firebase-web1.vercel.app",
    isPrivate: false,
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
    platform: 'web' as PlatformType,
    role: 'fullstack' as RoleType,
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
    platform: 'web' as PlatformType,
    role: 'fullstack' as RoleType,
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
  }
]

export default function Projects() {
  const { language } = useLanguage()
  const [currentImage, setCurrentImage] = useState<{ [key: string]: number }>({})

  const mainRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const stickyTitleRef = useRef<HTMLDivElement>(null)
  const mobileTitleRef = useRef<HTMLHeadingElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Common animation for project cards on all screen sizes
      projectCardsRef.current.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // GSAP MatchMedia for responsive animations
      ScrollTrigger.matchMedia({
        // Desktop-only animations
        "(min-width: 768px)": function() {
          ScrollTrigger.create({
            trigger: rightColumnRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stickyTitleRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true
          });

          gsap.from(stickyTitleRef.current, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            }
          });
        },
        // Mobile-only animations
        "(max-width: 767px)": function() {
          gsap.from(mobileTitleRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mobileTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          })
        }
      });

    }, mainRef)

    return () => ctx.revert()
  }, [])
  
  const nextImage = (projectTitle: string, imagesLength: number) => {
    setCurrentImage(prev => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] || 0) + 1) % imagesLength
    }))
  }

  const prevImage = (projectTitle: string, imagesLength: number) => {
    setCurrentImage(prev => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] || 0) - 1 + imagesLength) % imagesLength
    }))
  }

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden" ref={mainRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Title */}
        <h2 
          ref={mobileTitleRef}
          className={`${bebas.className} md:hidden text-5xl font-black text-center mb-12 bg-gradient-to-r from-white via-primary-200 to-primary-400 text-transparent bg-clip-text [text-shadow:_0_1px_30px_rgb(255_255_255_/_30%)]`}
        >
          {language === 'en' ? "My Projects" : 'Projek Saya'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24" ref={gridRef}>
          
          {/* Sticky Left Column (Desktop Only) */}
          <div ref={stickyTitleRef} className="hidden md:flex md:col-span-1 h-screen items-center justify-start">
             <h2 className={`${bebas.className} text-6xl lg:text-8xl bg-gradient-to-r from-white via-primary-200 to-primary-400 text-transparent bg-clip-text
                 [text-shadow:_0_1px_30px_rgb(255_255_255_/_30%)] transform -rotate-90 md:rotate-0`}>
               {language === 'en' ? "Projects that I've Done" : 'Projek yang Sudah Saya Kerjakan'}
             </h2>
          </div>

          {/* Scrollable Right Column */}
          <div className="md:col-span-2 space-y-16 md:space-y-24 max-w-3xl mx-auto" ref={rightColumnRef}>
            {projects.map((project, index) => {
              const typeStyles = getProjectTypeStyles(project.type);
              const imageIndex = currentImage[project.title] || 0;
              const isPortraitProject = project.title === 'NutriGuide Mobile' || project.title === 'SmartLele';

              return (
                <div 
                  key={project.title} 
                  ref={el => { projectCardsRef.current[index] = el }}
                  className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-black/20"
                >
                  {/* Image Carousel */}
                  <div className="relative mb-6">
                    {isPortraitProject ? (
                      // Mobile App Layout - Multiple Screenshots Side by Side
                      <div className="relative">
                        <div className="flex gap-4 overflow-hidden rounded-lg p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700">
                          {/* Show 3 screenshots at a time */}
                          {[0, 1, 2].map((offset) => {
                            const imgIdx = (imageIndex + offset) % project.images.length;
                            const img = project.images[imgIdx];
                            return (
                              <div key={imgIdx} className="flex-1 min-w-0">
                                <div className="relative aspect-[9/16] rounded-lg overflow-hidden border border-gray-600 bg-gray-900">
                                  <Image
                                    src={img.src}
                                    alt={img.caption[language]}
                                    fill
                                    className="object-contain"
                                    priority={index === 0 && imgIdx === 0}
                                  />
                                </div>
                                <p className="text-xs text-gray-400 text-center mt-2 truncate">
                                  {img.caption[language]}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        {project.images.length > 3 && (
                          <>
                            <button 
                              onClick={() => prevImage(project.title, project.images.length)}
                              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors z-10"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button 
                              onClick={() => nextImage(project.title, project.images.length)}
                              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors z-10"
                            >
                              <ChevronRight size={24} />
                            </button>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                              {imageIndex + 1} - {Math.min(imageIndex + 3, project.images.length)} of {project.images.length}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      // Web App Layout - Single Image Carousel
                      <>
                        <div className="relative overflow-hidden rounded-lg border border-gray-700 aspect-video">
                          {project.images.map((img, idx) => (
                            <Image
                              key={img.src}
                              src={img.src}
                              alt={img.caption[language]}
                              fill
                              className={`transition-opacity duration-500 ease-in-out ${idx === imageIndex ? 'opacity-100' : 'opacity-0'} object-cover`}
                              priority={index === 0 && idx === 0}
                            />
                          ))}
                        </div>
                        {project.images.length > 1 && (
                          <>
                            <button 
                              onClick={() => prevImage(project.title, project.images.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              onClick={() => nextImage(project.title, project.images.length)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <ChevronRight size={20} />
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
                              {imageIndex + 1} / {project.images.length} - {project.images[imageIndex].caption[language]}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${typeStyles.text} ${typeStyles.bg} px-3 py-1.5 rounded-full border ${typeStyles.border}`}>
                        <span className={`w-2 h-2 rounded-full ${typeStyles.dot}`} />
                        {getProjectTypeLabel(project.type, language)}
                      </div>
                      <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${getPlatformStyles(project.platform).text} ${getPlatformStyles(project.platform).bg} px-3 py-1.5 rounded-full border ${getPlatformStyles(project.platform).border}`}>
                        <span>{getPlatformStyles(project.platform).icon}</span>
                        {getPlatformLabel(project.platform, language)}
                      </div>
                      <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${getRoleStyles(project.role).text} ${getRoleStyles(project.role).bg} px-3 py-1.5 rounded-full border ${getRoleStyles(project.role).border}`}>
                        <span>{getRoleStyles(project.role).icon}</span>
                        {getRoleLabel(project.role, language)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description[language]}</p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                     <h4 className="text-sm font-semibold text-gray-400 mb-3">TECHNOLOGIES USED</h4>
                     <div className="flex flex-wrap items-center gap-3">
                        {project.tech.map(techName => (
                           <div key={techName} className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-lg">
                              <Image src={techIcons[techName]} alt={techName} width={16} height={16} className="object-contain" />
                              <span className="text-sm text-gray-200">{techName}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex items-center justify-end gap-4">
                     <ProjectButton 
                       icon={<Github size={20}/>}
                       label="Source Code"
                       href={project.github}
                       isPrivate={project.isPrivate}
                       className="bg-gray-700/80 text-white hover:bg-gray-600/80 from-gray-600 to-gray-500"
                     />
                     {project.tryItLink && (
                       <ProjectButton 
                         icon={<ExternalLink size={20}/>}
                         label="Visit"
                         href={project.tryItLink}
                         isPrivate={project.isPrivate}
                         className="bg-primary-500/80 text-white hover:bg-primary-600/80 from-primary-500 to-primary-400"
                       />
                     )}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
} 