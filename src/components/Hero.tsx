import styles from './Hero.module.css'

export function Hero({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.orbit} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.brandMark}>Nocturnal</div>
        <h1 className={`${styles.headline} reveal`}>
          Design that makes your product unforgettable.
        </h1>
        <p className={`${styles.sub} reveal reveal-d1`}>Most brands fade, yours won’t.</p>
        <div className={`${styles.actions} reveal reveal-d2`}>
          <button className={styles.btnPrimary} onClick={onBooking}>Book a Call</button>
          <a href="#services" className={styles.scroll}>Scroll to explore</a>
        </div>
      </div>
      <div className={`${styles.visual} reveal reveal-d2`} aria-hidden="true">
        <div className={styles.device}>
          <div className={styles.glow} />
          <div className={styles.symbol}>N</div>
        </div>
      </div>
    </section>
  )
}
