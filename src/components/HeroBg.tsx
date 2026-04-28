import styles from './HeroBg.module.css'

export function HeroBg() {
  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Dark overlay so text stays readable */}
      <div className={styles.overlay} />
    </div>
  )
}
