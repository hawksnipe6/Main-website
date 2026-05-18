import { useEffect, useState } from 'react'
import styles from './BookingModal.module.css'

const CAL_EMBED_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2xISzflS6opp0w6KlVdoltYpVkVYOawSSL9SklQQ-oN-bUU2GVMLXIElRo_JH0Iu9uQiCHKb7u?gv=true'

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
      <div className={`${styles.modal} ${showCalendar ? styles.modalWide : ''}`} onClick={e => e.stopPropagation()}>
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
                <p className={styles.eyebrow}>Google Calendar</p>
                <h2 className={styles.title}>Book your discovery call.</h2>
              </div>
              <button type="button" className={styles.backButton} onClick={() => setShowCalendar(false)}>
                Back
              </button>
            </div>
            <iframe
              className={styles.calendarFrame}
              src={CAL_EMBED_URL}
              title="Book a discovery call with Nocturnal"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}
