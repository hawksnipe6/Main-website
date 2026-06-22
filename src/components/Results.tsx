import { useEffect, useRef, useState, type MouseEvent } from 'react'
import styles from './Results.module.css'

/* ⚠️ Illustrative placeholders — replace with your real figures before deploy. */

const CAL_LEAD = 2 // empty leading cells so the month starts mid-week
const CAL_DAYS = 31
const CAL_MILESTONES = [4, 12, 19, 27]
const CAL_TODAY = 15

// radial dotted ticks for the circular gauge
const RADIAL = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * Math.PI * 2 - Math.PI / 2
  const len = 12 + (Math.sin(i * 2.4) * 0.5 + 0.5) * 26
  const r1 = 58
  return {
    x1: 100 + Math.cos(a) * r1,
    y1: 100 + Math.sin(a) * r1,
    x2: 100 + Math.cos(a) * (r1 + len),
    y2: 100 + Math.sin(a) * (r1 + len),
  }
})

const HRV_LINE = '4,66 40,66 40,54 78,54 78,60 116,60 116,42 154,42 154,50 192,50 192,30 230,30 230,40 268,40 268,16 296,16'

const DURATION = 1400

function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function CountUp({ value, decimals = 0, suffix }: { value: number; decimals?: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf = 0
    const begin = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - begin) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix && <span className={styles.unit}>{suffix}</span>}
    </span>
  )
}

export function Results({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goContact = (e: MouseEvent) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate('/contact')
    }
  }

  return (
    <section id="results" className={styles.results}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">
            <span className={styles.dot} aria-hidden="true" />How does it work?
          </div>
          <h2 className="section-title reveal reveal-d1">
            What changes<br />after we ship.
          </h2>
        </div>
        <div className={`${styles.headerRight} reveal reveal-d2`}>
          <p className="section-body">
            From strategy to execution, you get one connected design system — sharper output, faster delivery, and work that compounds quarter after quarter.
          </p>
          <a href="/contact" className={styles.cta} onClick={goContact}>
            Start a Project
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* ── Dashboard (single row of 4) ───────── */}
      <div className={styles.dashboard}>
        {/* Radial gauge — 98% */}
        <article className={`${styles.card} reveal`}>
          <h3 className={styles.tileTitle}>Delivery accuracy</h3>
          <div className={styles.radialWrap}>
            <svg viewBox="0 0 200 200" className={styles.radialSvg} aria-hidden="true">
              {RADIAL.map((t, i) => (
                <g key={i}>
                  <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--noc-accent)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx={t.x2} cy={t.y2} r="1.8" fill="var(--noc-accent)" />
                </g>
              ))}
            </svg>
            <div className={styles.radialCenter}>
              <div className={styles.radialValue}><CountUp value={98} suffix="%" /></div>
              <div className={styles.radialSub}>On-spec, on-time</div>
            </div>
          </div>
        </article>

        {/* Vertical gauge — 2.3× */}
        <article className={`${styles.card} reveal`}>
          <h3 className={styles.tileTitle}>Revenue lift</h3>
          <div className={styles.tempRow}>
            <div className={styles.tempLeft}>
              <div className={styles.tempValue}><CountUp value={2.3} decimals={1} suffix="×" /></div>
              <div className={styles.tempState}>per redesign</div>
            </div>
            <div className={styles.gauge}>
              <div className={styles.gaugeFill} />
              <div className={styles.gaugeTicks} />
            </div>
          </div>
        </article>

        {/* Stepped line — 40% */}
        <article className={`${styles.card} reveal`}>
          <h3 className={styles.tileTitle}>Speed to launch</h3>
          <div className={styles.metricValue}>
            <CountUp value={40} suffix="%" /><span className={styles.metricUnit}>faster</span>
          </div>
          <div className={styles.lineWrap}>
            <svg viewBox="0 0 300 80" className={styles.lineSvg} aria-hidden="true">
              <polyline points={HRV_LINE} fill="none" stroke="var(--noc-white)" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="296" cy="16" r="5.5" fill="var(--noc-accent)" />
            </svg>
          </div>
        </article>

        {/* Plan your growth — monthly milestone calendar */}
        <article className={`${styles.card} reveal`}>
          <div className={styles.tileHead}>
            <h3 className={styles.tileTitle}>Plan your growth</h3>
            <p className={styles.tileSub}>Milestones mapped, week by week</p>
          </div>
          <div className={styles.cal}>
            <div className={styles.calWeek}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className={styles.calGrid}>
              {Array.from({ length: CAL_LEAD }).map((_, i) => (
                <span key={`pad-${i}`} className={styles.calPad} aria-hidden="true" />
              ))}
              {Array.from({ length: CAL_DAYS }, (_, i) => i + 1).map((d) => (
                <span
                  key={d}
                  className={`${styles.calDay} ${CAL_MILESTONES.includes(d) ? styles.calOn : ''} ${d === CAL_TODAY ? styles.calToday : ''}`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
