import styles from './Hero.module.css'
import { GridBackground } from './GridBackground'
import { GridCanvas } from './GridCanvas'

export function Hero({ onBooking, onSeeWork }: { onBooking: () => void; onSeeWork?: () => void }) {
  return (
    <section id="hero" className={styles.hero}>
      <GridBackground />
      <GridCanvas />

      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={`${styles.headline} reveal`}>
            <span className={styles.line}>A strategic design team</span>
            <br />
            <span className={styles.line}>you can trust.</span>
          </h1>
          <p className={`${styles.sub} reveal reveal-d1`}>
            Nocturnal designs across object and screen: physical products from sterling
            silver instruments to consumer hardware, UI/UX systems, brand and graphic
            identities, and the motion and CGI that launch them.
          </p>
          <div className={`${styles.actions} reveal reveal-d2`}>
            <button className={styles.btnPrimary} onClick={onBooking}>Start a Project</button>
            {onSeeWork && (
              <button className={styles.btnGhost} onClick={onSeeWork}>See the work</button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
