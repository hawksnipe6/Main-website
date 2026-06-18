import { FEATURED_WORK_SAMPLES } from '../data/workSamples'
import styles from './WorkPreview.module.css'

export function WorkPreview({ onOpenWork }: { onOpenWork: () => void }) {
  const items = FEATURED_WORK_SAMPLES.slice(0, 6)

  return (
    <section id="work-preview" className={styles.section} aria-label="Featured work samples">
      <div className={styles.shell}>
        <div className={styles.copy}>
          <h2 className="section-title reveal reveal-d1">Work</h2>
          <p className="section-body reveal reveal-d2">
            Portfolio work across medical product design, EV charging ecosystems, mobility interfaces, brand visuals, product rendering, packaging, and interface systems.
          </p>
        </div>

        <div className={`${styles.grid} reveal reveal-d3`}>
          {items.map((work) => (
            <a
              key={work.slug}
              href={work.href}
              target="_blank"
              rel="noreferrer"
              className={styles.card}
              aria-label={`Open ${work.title}`}
            >
              <div className={styles.cardImg}>
                <img src={work.image} alt={work.title} loading="lazy" />
                <div className={styles.overlay} aria-hidden="true" />
              </div>
              <div className={styles.cardMeta}>
                <strong className={styles.cardTitle}>{work.title}</strong>
                <span className={styles.cardCategory}>{work.category}</span>
              </div>
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
