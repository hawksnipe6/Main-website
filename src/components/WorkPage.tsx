import { useEffect, useRef, useState } from 'react'
import { WORK_SAMPLES } from '../data/workSamples'
import styles from './WorkPage.module.css'

export function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const snapTimerRef = useRef<number>()
  const snappingRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = WORK_SAMPLES[activeIndex]

  useEffect(() => {
    const isMobileWorkView = () => window.matchMedia('(max-width: 1000px)').matches

    const getWorkScrollMetrics = () => {
      const section = sectionRef.current
      if (!section) return null

      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return null

      return {
        rect,
        scrollable,
        sectionTop: window.scrollY + rect.top,
        step: scrollable / Math.max(1, WORK_SAMPLES.length - 1),
      }
    }

    const updateActiveWork = () => {
      const metrics = getWorkScrollMetrics()
      if (!metrics) return

      const progress = Math.min(1, Math.max(0, -metrics.rect.top / metrics.scrollable))
      const nextIndex = Math.min(
        WORK_SAMPLES.length - 1,
        Math.round(progress * (WORK_SAMPLES.length - 1))
      )
      setActiveIndex(nextIndex)
    }

    const settleToNearestWork = () => {
      if (!isMobileWorkView()) return
      if (snappingRef.current) return

      const metrics = getWorkScrollMetrics()
      if (!metrics) return
      if (metrics.rect.bottom <= window.innerHeight || metrics.rect.top >= 0) return

      const rawIndex = Math.round((window.scrollY - metrics.sectionTop) / metrics.step)
      const nextIndex = Math.min(WORK_SAMPLES.length - 1, Math.max(0, rawIndex))
      const nextTop = metrics.sectionTop + nextIndex * metrics.step

      if (Math.abs(window.scrollY - nextTop) < 2) return

      snappingRef.current = true
      window.scrollTo({
        top: nextTop,
        behavior: 'smooth',
      })

      window.setTimeout(() => {
        snappingRef.current = false
      }, 420)
    }

    const scheduleMobileSettle = () => {
      if (!isMobileWorkView() || snappingRef.current) return
      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = window.setTimeout(settleToNearestWork, 120)
    }

    updateActiveWork()
    window.addEventListener('scroll', updateActiveWork, { passive: true })
    window.addEventListener('scroll', scheduleMobileSettle, { passive: true })
    window.addEventListener('resize', updateActiveWork)

    return () => {
      window.clearTimeout(snapTimerRef.current)
      window.removeEventListener('scroll', updateActiveWork)
      window.removeEventListener('scroll', scheduleMobileSettle)
      window.removeEventListener('resize', updateActiveWork)
    }
  }, [])

  return (
    <main className={styles.page}>
      <section
        ref={sectionRef}
        className={styles.scrollSection}
        style={{ ['--work-count' as string]: WORK_SAMPLES.length }}
        aria-label="Work sample portfolio"
      >
        <div className={styles.stickyFrame}>
          <div className={styles.layout}>
            <h1 className={styles.heading}>Work Sampe</h1>

            <div className={styles.visualRail} aria-hidden="true">
              {WORK_SAMPLES.map((work, index) => {
                const offset = index - activeIndex
                return (
                  <a
                    key={work.slug}
                    href={work.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.visualCard} ${index === activeIndex ? styles.activeCard : ''}`}
                    style={{ ['--offset' as string]: offset }}
                    aria-label={`Open ${work.title}`}
                  >
                    <img src={work.image} alt={`${work.title} — ${work.category}`} loading="lazy" />
                  </a>
                )
              })}
            </div>

            <article key={active.slug} className={styles.details}>
              <p className={styles.category}>{active.category}</p>
              <h2>{active.title}</h2>
              <p>{active.description}</p>
              <a href={active.href} target="_blank" rel="noreferrer">
                View project
              </a>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
