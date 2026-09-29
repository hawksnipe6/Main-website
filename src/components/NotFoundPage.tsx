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
          <a href="/" className={styles.btnPrimary} onClick={(e) => { e.preventDefault(); onNavigate('/') }}>
            Back to home
          </a>
          <a href="/work" className={styles.btnGhost} onClick={(e) => { e.preventDefault(); onNavigate('/work') }}>
            See the work
          </a>
        </div>
        <nav className={styles.links} aria-label="Quick links">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/') }}>Home</a>
          <a href="/work" onClick={(e) => { e.preventDefault(); onNavigate('/work') }}>Projects</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact') }}>Contact</a>
        </nav>
      </div>
    </main>
  )
}
