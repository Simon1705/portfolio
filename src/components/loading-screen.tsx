"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function LoadingScreen() {
  const [hide, setHide] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Text fade in
      tl.from(textRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out"
      })

      // Dot pulse animation
      tl.to(dotRef.current, {
        scale: 1.3,
        opacity: 0.5,
        duration: 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 2
      }, "-=0.3")

      // Fade out everything
      tl.to([dotRef.current, textRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "+=0.1")

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => setHide(true)
      }, "-=0.2")
    })

    return () => ctx.revert()
  }, [])

  if (hide) return null

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] bg-gray-950 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Dot with subtle glow */}
        <div className="relative">
          <div 
            ref={dotRef}
            className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          />
        </div>
        
        {/* Minimal text */}
        <div 
          ref={textRef}
          className="text-gray-400 text-sm tracking-[0.2em] font-light"
        >
          LOADING
        </div>
      </div>
    </div>
  )
} 