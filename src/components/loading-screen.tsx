"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import dynamic from "next/dynamic"

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => ({ default: m.Player })),
  { ssr: false }
)

export default function LoadingScreen() {
  const [hide, setHide] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => setHide(true)
        })
      } else {
        setHide(true)
      }
    }, 2600) // wait for lottie to play a bit

    return () => clearTimeout(id)
  }, [])

  if (hide) return null

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <LottiePlayer
        autoplay
        loop
        src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
        style={{ width: 200, height: 200 }}
      />
      <p className="mt-4 text-sm tracking-widest text-gray-300">Loading...</p>
    </div>
  )
} 