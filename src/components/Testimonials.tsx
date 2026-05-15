import { useMemo, useState } from 'react'
import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  'A true extension of the team. Thoughtful, fast, and reliable.',
  'They cut through complexity and delivered exactly what was needed.',
  'Strategic partners who care deeply about craft and outcomes.',
  'Clear process. Sharp thinking. Strong execution from first call to handoff.',
  'Every decision felt intentional. Nothing was added for decoration.',
]

export function Testimonials() {
  const [start, setStart] = useState(0)
  const visible = useMemo(
    () => Array.from({ length: 3 }, (_, i) => TESTIMONIALS[(start + i) % TESTIMONIALS.length]),
    [start]
  )

  const move = (step: number) => {
    setStart((current) => (current + step + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.header}>
        <div className="section-label reveal">Testimonials</div>
        <h2 className="section-title reveal reveal-d1">
          Voices from<br />our partners.
        </h2>
      </div>

      <div className={`${styles.carousel} reveal reveal-d2`} aria-label="Testimonials carousel">
        <button className={styles.arrow} onClick={() => move(-1)} aria-label="Previous testimonial">
          ←
        </button>

        <div className={styles.row}>
          {visible.map((quote, i) => (
            <article key={`${quote}-${i}`} className={styles.card}>
              <span className={styles.quoteIcon} aria-hidden="true">“</span>
              <p className={styles.quote}>{quote}</p>
              <span className={styles.line} />
            </article>
          ))}
        </div>

        <button className={styles.arrow} onClick={() => move(1)} aria-label="Next testimonial">
          →
        </button>
      </div>
    </section>
  )
}
