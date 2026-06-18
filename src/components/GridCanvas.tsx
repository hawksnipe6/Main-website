import { useEffect, useRef } from 'react'
import styles from './GridCanvas.module.css'

const CELL = 52          // must match the removed grid background-size
const HOVER_R = 140      // px — radius of cells lit by mouse proximity
const WAVE_SPEED = 280   // px / second — how fast click ripple expands
const WAVE_HW = 56       // px — half-width of the ripple ring band
const DECAY_PS = 0.85    // brightness lost per second

interface Wave {
  x: number
  y: number
  t0: number   // performance.now() at click
  maxR: number // diagonal of canvas — wave travels until off-screen
}

export function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let mx = -9999
    let my = -9999
    let lastT = 0
    const waves: Wave[] = []
    // sparse map of per-cell brightness: key = `${col},${row}`
    const bright = new Map<string, number>()

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const tick = (now: number) => {
      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0
      lastT = now

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // origin offset centers the grid within the canvas
      const ox = -((W % CELL) / 2) - CELL
      const oy = -((H % CELL) / 2) - CELL
      const cols = Math.ceil(W / CELL) + 2
      const rows = Math.ceil(H / CELL) + 2

      // prune finished waves
      for (let i = waves.length - 1; i >= 0; i--) {
        if ((now - waves[i].t0) / 1000 * WAVE_SPEED > waves[i].maxR + WAVE_HW * 2) {
          waves.splice(i, 1)
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = ox + c * CELL + CELL / 2
          const cy = oy + r * CELL + CELL / 2
          const key = `${c},${r}`

          let b = bright.get(key) ?? 0

          // ── mouse proximity ──────────────────
          const dx = cx - mx
          const dy = cy - my
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < HOVER_R) {
            const t = 1 - d / HOVER_R
            b = Math.max(b, t * t * 0.5)
          }

          // ── click waves ──────────────────────
          for (const w of waves) {
            const wx = cx - w.x
            const wy = cy - w.y
            const wd = Math.sqrt(wx * wx + wy * wy)
            const elapsed = (now - w.t0) / 1000
            const wR = elapsed * WAVE_SPEED
            const diff = wd - wR
            if (diff > -WAVE_HW && diff < WAVE_HW) {
              const ring = 1 - Math.abs(diff) / WAVE_HW
              const life = Math.max(0, 1 - wR / w.maxR)
              b = Math.max(b, ring * ring * life * 0.9)
            }
          }

          // ── time-based decay ─────────────────
          b = Math.max(0, b - dt * DECAY_PS)

          if (b > 0.005) {
            bright.set(key, b)
            // brand orange highlight on light cream background
            ctx.fillStyle = `rgba(232,97,42,${b.toFixed(3)})`
            ctx.fillRect(ox + c * CELL + 2, oy + r * CELL + 2, CELL - 4, CELL - 4)
          } else {
            bright.delete(key)
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      mx = (x >= 0 && y >= 0 && x <= r.width && y <= r.height) ? x : -9999
      my = (x >= 0 && y >= 0 && x <= r.width && y <= r.height) ? y : -9999
    }

    const onDown = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (x < 0 || y < 0 || x > r.width || y > r.height) return
      waves.push({ x, y, t0: performance.now(), maxR: Math.hypot(r.width, r.height) })
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    const onTouchEnd = () => { mx = -9999; my = -9999 }

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const r = canvas.getBoundingClientRect()
      const x = t.clientX - r.left
      const y = t.clientY - r.top
      mx = (x >= 0 && y >= 0 && x <= r.width && y <= r.height) ? x : -9999
      my = (x >= 0 && y >= 0 && x <= r.width && y <= r.height) ? y : -9999
    }

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const r = canvas.getBoundingClientRect()
      const x = t.clientX - r.left
      const y = t.clientY - r.top
      if (x < 0 || y < 0 || x > r.width || y > r.height) return
      waves.push({ x, y, t0: performance.now(), maxR: Math.hypot(r.width, r.height) })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchStart)
    }
  }, [])

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />
}
