import styles from './Hero.module.css'

export function Hero({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={`${styles.eyebrow} reveal`}>Design Intelligence Studio</div>
          <h1 className={`${styles.headline} reveal reveal-d1`}>
            A Step into <br />Design Intelligence
          </h1>
          <p className={`${styles.sub} reveal reveal-d2`}>
            We help organizations design and implement systems that are not only beautiful but also intelligent, efficient, and sustainable.
          </p>
          <div className={`${styles.actions} reveal reveal-d3`}>
            <button className={styles.btnPrimary} onClick={onBooking}>Start a Project</button>
            <a href="#about" className={styles.btnGhost}>How we work</a>
          </div>
        </div>

        <div className={`${styles.right} reveal reveal-d2`}>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>Operational layers — input, processing, output</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>6</div>
              <div className={styles.statLabel}>Disciplines, one coherent system</div>
            </div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>0</div>
              <div className={styles.statLabel}>Decoration for decoration's sake</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>∞</div>
              <div className={styles.statLabel}>Thinking invested before any execution begins</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
