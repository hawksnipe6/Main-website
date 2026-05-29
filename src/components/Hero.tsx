import styles from './Hero.module.css'

export function Hero({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.shell}>
        <div className={styles.panel}>
          <div className={styles.topBar}>
            <div className={`${styles.identity} reveal reveal-d1`}>
              <span className={styles.name}>Nctrnl</span>
              <span className={styles.location}>Design intelligence studio</span>
            </div>

            <div className={`${styles.navPills} reveal reveal-d1`} aria-label="Studio focus">
              <span>Websites</span>
              <span>Product UI</span>
              <span>Launch</span>
            </div>

            <div className={`${styles.social} reveal reveal-d1`} aria-label="Availability">
              <span>Open</span>
              <span>2026</span>
            </div>
          </div>

          <div className={styles.heroGrid}>
            <aside className={`${styles.sideCopy} reveal reveal-d2`}>
              <p>
                We help founders and product teams move from scattered direction to sharp,
                usable, launch-ready design.
              </p>

              <div className={styles.metaBlock}>
                <div className={styles.metaRow}>
                  <span>Focus</span>
                  <strong>Websites and interfaces</strong>
                </div>
                <div className={styles.metaRow}>
                  <span>Built for</span>
                  <strong>Startups that need speed and clarity</strong>
                </div>
              </div>
            </aside>

            <div className={styles.mainCopy}>
              <h1 className={`${styles.headline} reveal reveal-d2`}>
                Great design starts now.
              </h1>
            </div>
          </div>

          <div className={styles.bottomBar}>
            <div className={`${styles.updated} reveal reveal-d3`}>
              <span>Outcome</span>
              <strong>Clearer products, sharper screens, faster launches.</strong>
            </div>

            <button className={`${styles.btnPrimary} reveal reveal-d3`} onClick={onBooking}>
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
