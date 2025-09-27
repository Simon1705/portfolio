// Alternative animation ideas for CV download button

// Option 1: Magnetic Pull Effect
const magneticPullAnimation = (button: HTMLElement, e: React.MouseEvent) => {
  const rect = button.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  // Create magnetic field visualization
  const magnetField = document.createElement('div')
  magnetField.className = 'fixed w-32 h-32 border border-blue-400/30 rounded-full pointer-events-none z-40'
  magnetField.style.left = `${centerX - 64}px`
  magnetField.style.top = `${centerY - 64}px`
  document.body.appendChild(magnetField)
  
  gsap.to(magnetField, {
    scale: 2,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    onComplete: () => {
      document.body.removeChild(magnetField)
    }
  })
  
  // Pull icon towards cursor
  const icon = button.querySelector('.download-icon')
  if (icon) {
    gsap.to(icon, {
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    })
  }
}

// Option 2: Holographic Glitch Effect
const holographicGlitchAnimation = (button: HTMLElement) => {
  // Create glitch layers
  const createGlitchLayer = (color: string, offset: number) => {
    const layer = button.cloneNode(true) as HTMLElement
    layer.style.position = 'absolute'
    layer.style.top = '0'
    layer.style.left = '0'
    layer.style.pointerEvents = 'none'
    layer.style.filter = `hue-rotate(${offset}deg) opacity(0.7)`
    layer.style.mixBlendMode = 'screen'
    button.parentElement?.appendChild(layer)
    
    // Glitch animation
    gsap.to(layer, {
      x: Math.random() * 4 - 2,
      y: Math.random() * 4 - 2,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: 'power2.inOut',
      onComplete: () => {
        button.parentElement?.removeChild(layer)
      }
    })
  }
  
  createGlitchLayer('cyan', 180)
  createGlitchLayer('magenta', 300)
  createGlitchLayer('yellow', 60)
}

// Option 3: Liquid Morphing Animation
const liquidMorphAnimation = (button: HTMLElement) => {
  const tl = gsap.timeline()
  
  tl.to(button, {
    borderRadius: '50%',
    scaleY: 0.8,
    duration: 0.3,
    ease: 'elastic.out(1, 0.3)'
  })
  .to(button, {
    scaleX: 1.3,
    scaleY: 0.6,
    duration: 0.2,
    ease: 'power2.inOut'
  })
  .to(button, {
    borderRadius: '12px',
    scaleX: 1,
    scaleY: 1,
    duration: 0.4,
    ease: 'elastic.out(1, 0.5)'
  })
}

// Option 4: Neon Cyberpunk Effect
const neonCyberpunkAnimation = (button: HTMLElement) => {
  // Create neon glow container
  const neonContainer = document.createElement('div')
  neonContainer.className = 'absolute inset-0 pointer-events-none'
  button.style.position = 'relative'
  button.appendChild(neonContainer)
  
  // Multiple neon layers
  for (let i = 0; i < 3; i++) {
    const neonLayer = document.createElement('div')
    neonLayer.className = `absolute inset-0 border-2 border-cyan-400 rounded-2xl`
    neonLayer.style.boxShadow = `0 0 ${10 + i * 5}px cyan, inset 0 0 ${10 + i * 5}px cyan`
    neonContainer.appendChild(neonLayer)
    
    gsap.fromTo(neonLayer, 
      { opacity: 0, scale: 1 },
      { 
        opacity: 0.8 - i * 0.2,
        scale: 1 + i * 0.1,
        duration: 0.5,
        delay: i * 0.1,
        repeat: 2,
        yoyo: true,
        onComplete: () => {
          if (i === 2) {
            setTimeout(() => {
              button.removeChild(neonContainer)
            }, 500)
          }
        }
      }
    )
  }
}

export {
  magneticPullAnimation,
  holographicGlitchAnimation,
  liquidMorphAnimation,
  neonCyberpunkAnimation
}