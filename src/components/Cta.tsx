import styles from './Cta.module.css'

export function Cta() {
  return (
    <section id="cta" className={styles.cta}>
      <div>
        <div className={`section-label ${styles.label}`}>Work with us</div>
        <h2 className={`section-title ${styles.title}`}>Step into clarity.</h2>
      </div>
      <div className={styles.right}>
        <p className={styles.body}>
          Send us a brief. We will ask the right questions and tell you whether we are
          the right fit. No pitch decks. No pressure. The first conversation costs nothing.
        </p>
        <a href="mailto:hello@nocturnal.studio" className={styles.btn}>
          Start a Conversation
        </a>
      </div>
    </section>
  )
}
