import { useEffect, useRef, useState } from 'react'
import styles from './LoadingScreen.module.css'

const LOAD_DURATION = 1100
const CELL = 52
const WAVE_SPEED = 1100  // px / second — fast enough to cross screen during fade
const WAVE_HW = 68       // half-width of ripple ring in px
const DECAY_PS = 1.0     // brightness lost per second

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const getMarkSrc = () =>
  (typeof document !== 'undefined' &&
  document.documentElement.getAttribute('data-theme') === 'light')
    ? '/N-dark.png'
    : '/N-light.png'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const markSrc = getMarkSrc()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireRef = useRef<(() => void) | null>(null)

  // ── Canvas ripple setup ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (prefersReducedMotion()) return

    let raf = 0
    let lastT = 0
    const waves: { x: number; y: number; t0: number; maxR: number }[] = []
    const bright = new Map<string, number>()

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    fireRef.current = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      waves.push({ x: W / 2, y: H / 2, t0: performance.now(), maxR: Math.hypot(W, H) })
    }

    const tick = (now: number) => {
      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0
      lastT = now

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      for (let i = waves.length - 1; i >= 0; i--) {
        if ((now - waves[i].t0) / 1000 * WAVE_SPEED > waves[i].maxR + WAVE_HW * 2) {
          waves.splice(i, 1)
        }
      }

      if (waves.length === 0 && bright.size === 0) {
        raf = requestAnimationFrame(tick)
        return
      }

      const ox = -((W % CELL) / 2) - CELL
      const oy = -((H % CELL) / 2) - CELL
      const cols = Math.ceil(W / CELL) + 2
      const rows = Math.ceil(H / CELL) + 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = ox + c * CELL + CELL / 2
          const cy = oy + r * CELL + CELL / 2
          const key = `${c},${r}`

          let b = bright.get(key) ?? 0

          for (const w of waves) {
            const wd = Math.hypot(cx - w.x, cy - w.y)
            const elapsed = (now - w.t0) / 1000
            const wR = elapsed * WAVE_SPEED
            const diff = wd - wR
            if (diff > -WAVE_HW && diff < WAVE_HW) {
              const ring = 1 - Math.abs(diff) / WAVE_HW
              const life = Math.max(0, 1 - wR / w.maxR)
              b = Math.max(b, ring * ring * life * 0.92)
            }
          }

          b = Math.max(0, b - dt * DECAY_PS)

          if (b > 0.005) {
            bright.set(key, b)
            ctx.fillStyle = `rgba(232,97,42,${b.toFixed(3)})`
            ctx.fillRect(ox + c * CELL + 2, oy + r * CELL + 2, CELL - 4, CELL - 4)
          } else {
            bright.delete(key)
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      fireRef.current = null
    }
  }, [])

  // ── Fire ripple the moment exiting starts ────────────────
  useEffect(() => {
    if (exiting) fireRef.current?.()
  }, [exiting])

  // ── Progress + exit timer ────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(100)
      const hold = window.setTimeout(() => setExiting(true), 360)
      const done = window.setTimeout(onComplete, 700)
      return () => {
        window.clearTimeout(hold)
        window.clearTimeout(done)
      }
    }

    let animationFrame = 0
    let exitTimer = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const nextProgress = Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100))
      setProgress(nextProgress)

      if (elapsed < LOAD_DURATION) {
        animationFrame = window.requestAnimationFrame(tick)
        return
      }

      setExiting(true)
      exitTimer = window.setTimeout(onComplete, 700)
    }

    animationFrame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <div className={`${styles.loader} ${exiting ? styles.exiting : ''}`} role="status" aria-live="polite">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>
        <img src={markSrc} alt="Nocturnal" className={styles.mark} />
        <div className={styles.track} aria-hidden="true">
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.percent}>{progress}%</div>
      </div>
    </div>
  )
}
