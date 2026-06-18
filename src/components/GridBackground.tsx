import styles from './GridBackground.module.css'

export function GridBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.vignette} />
      <div className={styles.fade} />
    </div>
  )
}
