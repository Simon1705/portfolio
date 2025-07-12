'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from '@/lib/gsap/ScrollSmoother.js'

export default function GsapSmoother() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true
    })

    return () => {
      smoother.kill()
    }
  }, [])

  return null
} 