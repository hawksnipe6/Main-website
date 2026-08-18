import { GridCanvas } from './GridCanvas'
import styles from './NotFoundPage.module.css'

export function NotFoundPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <main className={`${styles.page} routeEnter`}>
      <div className={styles.canvasWrap}>
        <GridCanvas />
      </div>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page doesn&apos;t exist.</h1>
        <p className={styles.body}>
          The link may be broken, or the page has moved. Here are a few places
          that do exist.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.btnPrimary} onClick={() => onNavigate('/')}>
            Back to home
          </button>
          <button type="button" className={styles.btnGhost} onClick={() => onNavigate('/work')}>
            See the work
          </button>
        </div>
        <nav className={styles.links} aria-label="Quick links">
          <button type="button" onClick={() => onNavigate('/')}>Home</button>
          <button type="button" onClick={() => onNavigate('/work')}>Projects</button>
          <button type="button" onClick={() => onNavigate('/pricing')}>Pricing</button>
          <button type="button" onClick={() => onNavigate('/contact')}>Contact</button>
        </nav>
      </div>
    </main>
  )
}
