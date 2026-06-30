import { Scheduler } from './Scheduler'
import styles from './Cta.module.css'

export function Cta() {
  return (
    <section id="cta" className={styles.cta}>
      <div className={styles.left}>
        <div className="section-label reveal">Work with us</div>
        <h2 className={`section-title ${styles.title} reveal reveal-d1`}>
          Book a strategy call.
        </h2>
        <p className={`${styles.body} reveal reveal-d2`}>
          Thirty minutes. No pitch decks. We identify the revenue friction in your
          brand and product, and tell you exactly what can be fixed before any commitment.
        </p>
        <div className={`${styles.meta} reveal reveal-d2`}>
          <span className={styles.metaItem}><span className={styles.metaDot} />30 min</span>
          <span className={styles.metaItem}><span className={styles.metaDot} />Google Meet</span>
          <span className={styles.metaItem}><span className={styles.metaDot} />Free</span>
        </div>
      </div>

      <div className={`${styles.calWrap} reveal reveal-d1`}>
        <Scheduler />
      </div>
    </section>
  )
}
