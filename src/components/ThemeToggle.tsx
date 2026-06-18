import { useState, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

const STORAGE_KEY = 'noc-theme'

// Read the theme already applied by the pre-paint script in index.html so the
// toggle's initial UI state matches what's on screen (no flash, no mismatch).
function getInitialDark(): boolean {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'dark') return true
    if (current === 'light') return false
  }
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light') return false
  }
  return true // dark is the default experience
}

export function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      /* localStorage unavailable (private mode) — theme still applies for the session */
    }
  }, [dark])

  return (
    <button
      className={`${styles.toggle} ${dark ? styles.dark : styles.light}`}
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      aria-pressed={dark}
    >
      <span className={styles.knob} />
    </button>
  )
}
