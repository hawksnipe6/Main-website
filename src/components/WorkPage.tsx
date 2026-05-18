import { useEffect, useRef, useState } from 'react'
import { WORK_SAMPLES } from '../data/workSamples'
import styles from './WorkPage.module.css'

export function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = WORK_SAMPLES[activeIndex]

  useEffect(() => {
    const updateActiveWork = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const nextIndex = Math.min(
        WORK_SAMPLES.length - 1,
        Math.round(progress * (WORK_SAMPLES.length - 1))
      )
      setActiveIndex(nextIndex)
    }

    updateActiveWork()
    window.addEventListener('scroll', updateActiveWork, { passive: true })
    window.addEventListener('resize', updateActiveWork)
    return () => {
      window.removeEventListener('scroll', updateActiveWork)
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
            <h1 className={styles.heading}>work sample</h1>

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
                    <img src={work.image} alt="" loading="lazy" />
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
