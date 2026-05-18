import styles from './Hero.module.css'

export function Hero({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={`${styles.headline} reveal reveal-d1`}>
            A Step into <br />Design Intelligence
          </h1>
          <p className={`${styles.sub} reveal reveal-d2`}>
            We help organizations design and implement systems that are not only beautiful but also intelligent, efficient, and sustainable.
          </p>
          <div className={`${styles.actions} reveal reveal-d3`}>
            <button className={styles.btnPrimary} onClick={onBooking}>Start a Project</button>
          </div>
        </div>
      </div>
    </section>
  )
}
