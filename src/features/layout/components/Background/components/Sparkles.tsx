import React, { useEffect, useRef } from 'react'

interface SparklesProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
}

export const Sparkles = ({
  id = 'tsparticles',
  background = 'transparent',
  minSize = 0.5,
  maxSize = 1.4,
  particleDensity = 100,
  className = 'h-full w-full',
  particleColor = '#FFFFFF',
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameIdRef = useRef<number>(0)
  const scrollTimeoutRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const dpr = window.devicePixelRatio || 1
    const canvas = canvasRef.current as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d', {
      alpha: true,
    }) as CanvasRenderingContext2D
    if (!ctx) return

    const gradientCache: Record<string, HTMLCanvasElement> = {}

    let particles: Particle[] = []
    let isScrolling = false
    let lastScroll = window.scrollY
    let scrollDirection = 1

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * (canvas.width / dpr)
        this.y = Math.random() * (canvas.height / dpr)
        this.size = Math.random() * (maxSize - minSize) + minSize
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY - (isScrolling ? 10 * scrollDirection : 0)

        const width = canvas.width / dpr
        const height = canvas.height / dpr
        if (this.x > width) this.x = 0
        if (this.x < 0) this.x = width
        if (this.y > height) this.y = 0
        if (this.y < 0) this.y = height
      }

      draw() {
        const key = Math.round(this.size * 10) / 10
        if (!gradientCache[key]) {
          const offCanvas = document.createElement('canvas')
          const sizePx = key * 2
          offCanvas.width = sizePx
          offCanvas.height = sizePx
          const offCtx = offCanvas.getContext('2d')
          if (offCtx) {
            const gradient = offCtx.createRadialGradient(
              key,
              key,
              0,
              key,
              key,
              key
            )
            gradient.addColorStop(0, particleColor)
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
            offCtx.fillStyle = gradient
            offCtx.beginPath()
            offCtx.arc(key, key, key, 0, Math.PI * 2)
            offCtx.fill()
          }
          gradientCache[key] = offCanvas
        }
        ctx.drawImage(
          gradientCache[key],
          this.x - key,
          this.y - key,
          key * 2,
          key * 2
        )
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleDensity; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      ctx.clearRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY
      scrollDirection = currentScroll - lastScroll > 0 ? 1 : -1
      lastScroll = currentScroll

      isScrolling = true
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrolling = false
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameIdRef.current)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [maxSize, minSize, particleColor, particleDensity])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
