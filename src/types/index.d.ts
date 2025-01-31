type Language = 'en' | 'id'

interface Project {
  title: string
  description: {
    en: string
    id: string
  }
  tech: string[]
  github: string
  demo: string
  images: string[]
} 