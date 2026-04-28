import { useRef, useEffect, useState, useCallback } from 'react'
import styles from './Hero.module.css'

function DraggableN() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  // Initialise to centre once container mounts
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    setPos({ x: width / 2, y: height / 2 })
  }, [])

  const clamp = useCallback((x: number, y: number) => {
    const container = containerRef.current
    const icon = iconRef.current
    if (!container || !icon) return { x, y }
    const cr = container.getBoundingClientRect()
    const ir = icon.getBoundingClientRect()
    const hw = ir.width / 2
    const hh = ir.height / 2
    return {
      x: Math.max(hw, Math.min(cr.width - hw, x)),
      y: Math.max(hh, Math.min(cr.height - hh, y)),
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    const icon = iconRef.current!
    const rect = icon.getBoundingClientRect()
    offset.current = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    }
    document.body.style.userSelect = 'none'
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true
    const t = e.touches[0]
    const icon = iconRef.current!
    const rect = icon.getBoundingClientRect()
    offset.current = {
      x: t.clientX - (rect.left + rect.width / 2),
      y: t.clientY - (rect.top + rect.height / 2),
    }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return
      const cr = containerRef.current.getBoundingClientRect()
      const rawX = e.clientX - cr.left - offset.current.x
      const rawY = e.clientY - cr.top - offset.current.y
      setPos(clamp(rawX, rawY))
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current || !containerRef.current) return
      e.preventDefault()
      const t = e.touches[0]
      const cr = containerRef.current.getBoundingClientRect()
      const rawX = t.clientX - cr.left - offset.current.x
      const rawY = t.clientY - cr.top - offset.current.y
      setPos(clamp(rawX, rawY))
    }

    const onUp = () => {
      dragging.current = false
      document.body.style.userSelect = ''
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [clamp])

  return (
    <div ref={containerRef} className={styles.bgStage}>
      {pos && (
        <div
          ref={iconRef}
          className={styles.nIcon}
          style={{ left: pos.x, top: pos.y }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          aria-hidden="true"
        >
          <img src="/N.svg" alt="" draggable={false} />
        </div>
      )}
    </div>
  )
}

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Full-bleed background image with draggable N */}
      <DraggableN />

      {/* Content overlay */}
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={`${styles.eyebrow} reveal`}>Design Intelligence Studio</div>
          <h1 className={`${styles.headline} reveal reveal-d1`}>
            Every brief<br />is a problem<br />to frame.
          </h1>
          <p className={`${styles.sub} reveal reveal-d2`}>
            Not a freelance page. Not a trend-chasing visual studio. A problem-framing
            and solution-design system. We design the rules, then build the instances.
          </p>
          <div className={`${styles.actions} reveal reveal-d3`}>
            <a href="#cta" className={styles.btnPrimary}>Start a Project</a>
            <a href="#about" className={styles.btnGhost}>How we work</a>
          </div>
        </div>

        <div className={`${styles.right} reveal reveal-d2`}>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>Operational layers — input, processing, output</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>6</div>
              <div className={styles.statLabel}>Disciplines, one coherent system</div>
            </div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>0</div>
              <div className={styles.statLabel}>Decoration for decoration's sake</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>∞</div>
              <div className={styles.statLabel}>Thinking invested before any execution begins</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
