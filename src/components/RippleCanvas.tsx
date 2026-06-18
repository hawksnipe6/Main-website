import { useEffect, useRef } from 'react'
import styles from './RippleCanvas.module.css'

type Ripple = {
  x: number
  y: number
  start: number
  maxR: number
  life: number
  strength: number
}

const RIPPLE_LIFE = 2200 // ms a ripple lives — longer for graceful Framer-style fade
const SPAWN_GAP = 60 // ms min between pointer-driven ripples — tighter for responsiveness
const AMBIENT_GAP = 4000 // ms between idle ambient ripples — less intrusive
const RING_RADII = [0.55, 0.78, 1.0] // three concentric rings at these maxR multipliers
const RING_ALPHAS = [0.8, 0.55, 0.3] // inner→outer opacity scaling
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

// Foreground rgb for ripple strokes, read from the active theme token.
function readForeground(): string {
  if (typeof document === 'undefined') return '245, 244, 240'
  const theme = document.documentElement.getAttribute('data-theme')
  return theme === 'light' ? '13, 13, 13' : '245, 244, 240'
}

export function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return // static gradient only — no animation

    let width = 0
    let height = 0
    let dpr = 1
    const ripples: Ripple[] = []
    let fg = readForeground()
    let running = true
    let rafId = 0
    let lastSpawn = 0
    let lastAmbient = performance.now()
    let lastX = 0
    let lastY = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const spawn = (x: number, y: number, strength: number) => {
      const maxR = Math.max(width, height) * (0.18 + strength * 0.22)
      ripples.push({ x, y, start: performance.now(), maxR, life: RIPPLE_LIFE, strength })
      // Cap the pool so a frantic pointer can't grow it unbounded.
      if (ripples.length > 28) ripples.splice(0, ripples.length - 28)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > width || y > height) return
      const now = performance.now()
      const moved = Math.hypot(x - lastX, y - lastY)
      if (now - lastSpawn < SPAWN_GAP || moved < 6) return
      lastSpawn = now
      lastX = x
      lastY = y
      lastAmbient = now
      spawn(x, y, 0.5)
    }

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > width || y > height) return
      spawn(x, y, 1)
      lastAmbient = performance.now()
    }

    const draw = (now: number) => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      // Occasional ambient ripple keeps the hero alive when idle.
      if (now - lastAmbient > AMBIENT_GAP) {
        lastAmbient = now
        spawn(width * (0.2 + Math.random() * 0.6), height * (0.25 + Math.random() * 0.5), 0.3)
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        const t = (now - r.start) / r.life
        if (t >= 1) {
          ripples.splice(i, 1)
          continue
        }
        const progress = easeOut(t)

        // Three concentric rings — Framer BackgroundRippleEffect style
        ctx.lineWidth = 1
        for (let ri = 0; ri < RING_RADII.length; ri++) {
          const radius = progress * r.maxR * RING_RADII[ri]
          const alpha = (1 - t) * RING_ALPHAS[ri] * (0.5 + r.strength * 0.5)
          ctx.beginPath()
          ctx.arc(r.x, r.y, Math.max(radius, 0), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${fg}, ${alpha})`
          ctx.stroke()
        }
      }

      rafId = window.requestAnimationFrame(draw)
    }
    rafId = window.requestAnimationFrame(draw)

    const stop = () => {
      if (!running) return
      running = false
      window.cancelAnimationFrame(rafId)
    }
    const resume = () => {
      if (running) return
      running = true
      lastAmbient = performance.now()
      rafId = window.requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else resume()
    }

    // Pause when the hero scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) resume()
        else stop()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    const themeObserver = new MutationObserver(() => {
      fg = readForeground()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className={styles.wrap} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.fade} />
    </div>
  )
}
