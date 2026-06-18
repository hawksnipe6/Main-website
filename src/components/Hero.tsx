import styles from './Hero.module.css'
import { GridBackground } from './GridBackground'
import { GridCanvas } from './GridCanvas'

export function Hero({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="hero" className={styles.hero}>
      <GridBackground />
      <GridCanvas />

      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={`${styles.headline} reveal reveal-d1`}>
            Great design starts now
          </h1>
          <p className={`${styles.sub} reveal reveal-d2`}>
            Nocturnal helps founders and product teams turn unclear ideas into sharper websites, usable interfaces, and launch-ready product experiences.
          </p>
          <div className={`${styles.actions} reveal reveal-d3`}>
            <button className={styles.btnPrimary} onClick={onBooking}>Start a Project</button>
          </div>
        </div>
      </div>
    </section>
  )
}
