import { useState, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      className={`${styles.toggle} ${dark ? styles.dark : styles.light}`}
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
    >
      <span className={styles.knob} />
    </button>
  )
}
