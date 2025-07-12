'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps): ReactNode {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      }
    )
  }, [])

  return (
    <main ref={mainRef} className="opacity-0">
      {children}
    </main>
  )
} 