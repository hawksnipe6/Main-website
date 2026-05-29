import styles from './Hero.module.css'

export function Hero({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={`${styles.headline} reveal reveal-d1`}>
            Turn messy ideas into market-ready products and interfaces.
          </h1>
          <p className={`${styles.sub} reveal reveal-d2`}>
            Nocturnal helps product teams, founders, and emerging brands turn complex ideas into clear physical products, digital interfaces, launch visuals, and scalable design systems.
          </p>
          <div className={`${styles.actions} reveal reveal-d3`}>
            <button className={styles.btnPrimary} onClick={onBooking}>Start a Project</button>
          </div>
        </div>
      </div>
    </section>
  )
}
