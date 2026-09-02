import styles from './MobileCta.module.css'

/**
 * Sticky bottom "Start a Project" bar, mobile only. Hidden on the contact page
 * (where the form already is) and while the privacy notice is up.
 */
export function MobileCta({
  page,
  suppressed,
  onStart,
}: {
  page: string
  suppressed?: boolean
  onStart: () => void
}) {
  if (page === 'contact' || page === 'notFound') return null

  return (
    <div className={`${styles.bar} ${suppressed ? styles.hidden : ''}`} aria-hidden={suppressed}>
      <button type="button" className={styles.button} onClick={onStart}>
        Start a Project
      </button>
    </div>
  )
}
