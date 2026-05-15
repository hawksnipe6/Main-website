import { useMemo, useState } from 'react'
import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  'Clear thinking. Fast execution. No wasted motion.',
  'They simplified the brief and made the outcome sharper.',
  'Strong craft, tight process, and clean handoff.',
  'Every decision felt intentional from first call to final file.',
  'The work felt precise, useful, and built to scale.',
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
          What the work<br />feels like.
        </h2>
      </div>

      <div className={`${styles.carousel} reveal reveal-d2`} aria-label="Testimonials carousel">
        <button className={styles.arrow} onClick={() => move(-1)} aria-label="Previous testimonial">
          ←
        </button>

        <div className={styles.row}>
          {visible.map((quote, i) => (
            <article key={`${quote}-${i}`} className={styles.card}>
              <p className={styles.quote}>{quote}</p>
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
