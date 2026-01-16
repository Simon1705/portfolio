"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function LoadingScreen() {
  const [hide, setHide] = useState(false)
  const [progress, setProgress] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const progressContainerRef = useRef<HTMLDivElement>(null)
  const segmentsRef = useRef<(HTMLDivElement | null)[]>([])
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Initial state
      gsap.set(progressContainerRef.current, {
        opacity: 0,
        scale: 0.8
      })

      gsap.set(segmentsRef.current, {
        scaleX: 0,
        opacity: 0
      })

      // Container appears
      tl.to(progressContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      })

      // Segments fill up one by one
      const totalSegments = 20
      const progressDuration = 2

      gsap.to({ value: 0 }, {
        value: 100,
        duration: progressDuration,
        ease: "power1.inOut",
        onUpdate: function() {
          const currentProgress = Math.round(this.targets()[0].value)
          setProgress(currentProgress)
          
          // Calculate how many segments should be filled
          const filledSegments = Math.floor((currentProgress / 100) * totalSegments)
          
          // Animate segments
          segmentsRef.current.forEach((segment, i) => {
            if (segment) {
              if (i < filledSegments) {
                gsap.to(segment, {
                  scaleX: 1,
                  opacity: 1,
                  duration: 0.3,
                  ease: "back.out(2)"
                })
              }
            }
          })

          // Animate glow position
          if (glowRef.current) {
            gsap.to(glowRef.current, {
              left: `${currentProgress}%`,
              duration: 0.1
            })
          }
        },
        onComplete: () => {
          // All segments pulse
          gsap.to(segmentsRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          })

          // Segments explode upward
          setTimeout(() => {
            gsap.to(segmentsRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.6,
              stagger: 0.02,
              ease: "power2.in"
            })

            // Fade out
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.5,
              delay: 0.3,
              ease: "power2.inOut",
              onComplete: () => setHide(true)
            })
          }, 300)
        }
      })
    })

    return () => ctx.revert()
  }, [])

  if (hide) return null

  const totalSegments = 20

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] bg-gradient-to-b from-gray-900 via-gray-925 to-gray-950 overflow-hidden"
    >
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          ref={progressContainerRef}
          className="w-full max-w-2xl px-8"
        >
          {/* Progress percentage */}
          <div className="text-center mb-8">
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent tabular-nums">
              {progress}%
            </div>
          </div>

          {/* Segmented progress bar */}
          <div className="relative">
            {/* Glow effect that follows progress */}
            <div 
              ref={glowRef}
              className="absolute -top-8 w-20 h-20 bg-cyan-500/30 rounded-full blur-2xl -translate-x-1/2 pointer-events-none"
              style={{ left: '0%' }}
            />

            {/* Segments container */}
            <div className="flex gap-2 items-end">
              {[...Array(totalSegments)].map((_, i) => (
                <div
                  key={i}
                  ref={el => { segmentsRef.current[i] = el }}
                  className="flex-1 rounded-t-lg origin-bottom"
                  style={{
                    height: `${40 + Math.sin(i * 0.5) * 20}px`, // Wave pattern height
                    background: `linear-gradient(to top, 
                      ${i % 3 === 0 ? '#0891b2' : i % 3 === 1 ? '#3b82f6' : '#6366f1'}, 
                      ${i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#60a5fa' : '#818cf8'})`,
                    boxShadow: `0 0 20px ${i % 3 === 0 ? 'rgba(6, 182, 212, 0.4)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`
                  }}
                />
              ))}
            </div>

            {/* Base line */}
            <div className="h-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-full mt-1" />
          </div>

          {/* Loading text */}
          <div className="text-center mt-8">
            <div className="text-sm text-blue-200/60 tracking-[0.3em] font-light">
              LOADING PORTFOLIO
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 