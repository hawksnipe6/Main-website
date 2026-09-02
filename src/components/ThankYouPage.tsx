import styles from './ThankYouPage.module.css'

export function ThankYouPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <main className={`${styles.page} routeEnter`}>
      <div className={styles.inner}>
        <div className="section-label">Thank you</div>
        <h1 className={styles.title}>Your brief is in.</h1>
        <p className={styles.body}>
          We read every inquiry ourselves. Expect a reply from{' '}
          <a href="mailto:getnctrnl@gmail.com">getnctrnl@gmail.com</a> within two working days — usually
          with a first question or two about scope.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={() => onNavigate('/')}>
            Back to home
          </button>
          <button type="button" className={styles.ghost} onClick={() => onNavigate('/work')}>
            See the work
          </button>
        </div>
      </div>
    </main>
  )
}
