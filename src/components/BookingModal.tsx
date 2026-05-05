import { useEffect } from 'react'
import styles from './BookingModal.module.css'

interface Props {
  onClose: () => void
}

export function BookingModal({ onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        <p className={styles.eyebrow}>Start a Project</p>
        <h2 className={styles.title}>Let's scope the brief.</h2>
        <p className={styles.body}>
          No commitment, no sales deck. One conversation to understand
          the problem — then we tell you exactly what the work costs.
        </p>

        <a
          href="https://calendar.app.google/YNzisrhbjEXVuWXW7"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          onClick={onClose}
        >
          Book a Call →
        </a>

        <p className={styles.note}>First conversation is free. Abeer runs the call directly.</p>
      </div>
    </div>
  )
}
