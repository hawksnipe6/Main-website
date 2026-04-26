import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gridLine} aria-hidden="true" />

      <div className={styles.left}>
        <div className={`${styles.eyebrow} reveal`}>Design Intelligence Studio</div>
        <h1 className={`${styles.headline} reveal reveal-d1`}>
          Every brief<br />is a problem<br /><em>to frame.</em>
        </h1>
        <p className={`${styles.sub} reveal reveal-d2`}>
          Not a freelance page. Not a trend-chasing visual studio. A problem-framing
          and solution-design system. We design the rules, then build the instances.
        </p>
        <div className={`${styles.actions} reveal reveal-d3`}>
          <a href="#cta" className={styles.btnPrimary}>Start a Project</a>
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
    </section>
  )
}
