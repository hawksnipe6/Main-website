import { useMemo, useState } from 'react'
import styles from './Testimonials.module.css'

type Testimonial = {
  quote: string
  company: string
  logo?: string
  person: string
  invertLogo?: boolean
}

const TESTIMONIALS: Testimonial[] = [
  { quote: 'Clear thinking. Fast execution. No wasted motion.', company: 'Armor', logo: '/logos/armor-new.png', person: 'Sidhdhi Subhedar' },
  { quote: 'They simplified the brief and made the outcome sharper.', company: 'Pixelpaw Labs', logo: '/logos/pixelpaw-new.png', person: 'Sharath Naik' },
  { quote: 'Strong craft, tight process, and clean handoff.', company: "D'MOS", logo: '/logos/dmos-new.png', person: 'Rithvick' },
  { quote: 'Every decision felt intentional from first call to final file.', company: 'WEHEAR', logo: '/logos/wehear-new.png', person: 'Devansu Khorasia' },
  { quote: 'The work felt precise, useful, and built to scale.', company: 'Khamir', logo: '/logos/khamir-new.png', person: 'Design Lead' },
  { quote: 'A studio that understands brand thinking as deeply as visual craft.', company: 'Aerpace', logo: '/logos/aerpace-new.png', person: 'Ksihtij Srivastava' },
  { quote: 'They understood the brief before we even finished explaining it.', company: 'Pen Lounge', logo: '/logos/penlounge-new.png', person: 'Vikrant Mahadane' },
  { quote: 'Sharp output, clean handoff, and a team that actually listens.', company: 'Mirch Masala Media', logo: '/logos/MIRCHMASALAMEDA_LOGO.png', person: 'Kevin Kanani', invertLogo: true },
]

export function Testimonials() {
  const [start, setStart] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [motionKey, setMotionKey] = useState(0)
  const visible = useMemo(
    () => Array.from({ length: 3 }, (_, i) => TESTIMONIALS[(start + i) % TESTIMONIALS.length]),
    [start]
  )

  const move = (step: 1 | -1) => {
    setDirection(step)
    setMotionKey((current) => current + 1)
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
        <div
          key={motionKey}
          className={`${styles.row} ${direction === 1 ? styles.fromRight : styles.fromLeft}`}
        >
          {visible.map((testimonial, i) => (
            <article key={`${testimonial.company}-${i}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.logoWrap}>
                  {testimonial.logo ? (
                    <img
                      src={testimonial.logo}
                      alt={testimonial.company}
                      className={testimonial.invertLogo ? styles.logoInverted : styles.logo}
                      draggable={false}
                    />
                  ) : (
                    <span className={styles.logoMark}>
                      {testimonial.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className={styles.byline}>
                  <span className={styles.person}>{testimonial.person}</span>
                  <span className={styles.company}>{testimonial.company}</span>
                </div>
              </div>
              <p className={styles.quote}>{testimonial.quote}</p>
            </article>
          ))}
        </div>

        <div className={styles.controls}>
          <button className={styles.arrow} onClick={() => move(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <button className={styles.arrow} onClick={() => move(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
