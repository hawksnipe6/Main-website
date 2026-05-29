import { FEATURED_WORK_SAMPLES } from '../data/workSamples'
import styles from './WorkPreview.module.css'

export function WorkPreview({ onOpenWork }: { onOpenWork: () => void }) {
  return (
    <section id="work-preview" className={styles.section} aria-label="Featured work samples">
      <div className={styles.shell}>
        <div className={styles.copy}>
          <h2 className="section-title reveal reveal-d1">Work Sampe</h2>
          <p className="section-body reveal reveal-d2">
            Portfolio work across medical product design, EV charging ecosystems, mobility interfaces, brand visuals, product rendering, packaging, and interface systems.
          </p>
        </div>

        <div className={`${styles.cards} reveal reveal-d3`}>
          {FEATURED_WORK_SAMPLES.map((work, index) => (
            <a
              key={work.slug}
              href={work.href}
              target="_blank"
              rel="noreferrer"
              className={`${styles.card} ${styles[`card${index + 1}`]}`}
              aria-label={`Open ${work.title}`}
            >
              <img src={work.image} alt={work.title} className={styles.image} loading="lazy" />
            </a>
          ))}
        </div>

        <button type="button" className={styles.cta} onClick={onOpenWork}>
          Explore work
        </button>
      </div>
    </section>
  )
}
