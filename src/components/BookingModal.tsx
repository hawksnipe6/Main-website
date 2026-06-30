import { useEffect, useState } from 'react'
import { Scheduler } from './Scheduler'
import styles from './BookingModal.module.css'

interface Props {
  onClose: () => void
}

export function BookingModal({ onClose }: Props) {
  const [showCalendar, setShowCalendar] = useState(false)

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
        <button className={styles.close} onClick={onClose} aria-label="Close">x</button>

        {!showCalendar ? (
          <>
            <p className={styles.eyebrow}>Start a Project</p>
            <h2 className={styles.title}>Let's scope the brief.</h2>
            <p className={styles.body}>
              No commitment, no sales deck. One conversation to understand
              the problem - then we tell you exactly what the work costs.
            </p>

            <button type="button" className={styles.cta} onClick={() => setShowCalendar(true)}>
              Book a Call
            </button>

            <p className={styles.note}>First conversation is free. Abeer runs the call directly.</p>
          </>
        ) : (
          <div className={styles.calendarEmbed}>
            <div className={styles.calendarHeader}>
              <div>
                <p className={styles.eyebrow}>Book a call</p>
                <h2 className={styles.title}>Pick a time that works.</h2>
              </div>
              <button type="button" className={styles.backButton} onClick={() => setShowCalendar(false)}>
                Back
              </button>
            </div>
            <Scheduler />
          </div>
        )}
      </div>
    </div>
  )
}
