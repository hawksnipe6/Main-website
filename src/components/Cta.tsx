import { useState, useRef, useEffect } from 'react'
import styles from './Cta.module.css'

const CAL_URL = 'https://calendar.app.google/uaXpuZ2dCKAUhnzj7'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_LABELS = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM']

type Flow = 'calendar' | 'pending' | 'returning' | 'confirmed'

function useCalendar() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const available = new Set<number>()
  for (let d = today + 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay()
    if (dow !== 0 && dow !== 6) available.add(d)
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return { year, month, today, cells, available }
}

export function Cta() {
  const { year, month, today, cells, available } = useCalendar()
  const [selected, setSelected]     = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [flow, setFlow]             = useState<Flow>('calendar')
  const focusRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    return () => {
      if (focusRef.current) window.removeEventListener('focus', focusRef.current)
    }
  }, [])

  const attachFocusListener = () => {
    if (focusRef.current) window.removeEventListener('focus', focusRef.current)
    focusRef.current = () => {
      // User is back — ask whether they completed the booking
      setFlow('returning')
      if (focusRef.current) {
        window.removeEventListener('focus', focusRef.current)
        focusRef.current = null
      }
    }
    window.addEventListener('focus', focusRef.current)
  }

  const openCal = () => {
    window.open(CAL_URL, '_blank', 'noopener,noreferrer')
  }

  const handleSlot = (slot: string) => {
    setSelectedSlot(slot)
    setFlow('pending')
    openCal()
    attachFocusListener()
  }

  const handleOpenWithoutSlot = () => {
    setFlow('pending')
    openCal()
    attachFocusListener()
  }

  const reopenCal = () => {
    openCal()
    attachFocusListener()
    setFlow('pending')
  }

  const reset = () => {
    setFlow('calendar')
    setSelected(null)
    setSelectedSlot(null)
    if (focusRef.current) {
      window.removeEventListener('focus', focusRef.current)
      focusRef.current = null
    }
  }

  return (
    <section id="cta" className={styles.cta}>

      {/* ── Left copy ── */}
      <div className={styles.left}>
        <div className="section-label reveal">Work with us</div>
        <h2 className={`section-title ${styles.title} reveal reveal-d1`}>
          Book a strategy call.
        </h2>
        <p className={`${styles.body} reveal reveal-d2`}>
          Thirty minutes. No pitch decks. We identify the revenue friction in your
          brand and product, and tell you exactly what can be fixed before any commitment.
        </p>
        <div className={`${styles.meta} reveal reveal-d2`}>
          <span className={styles.metaItem}><span className={styles.metaDot} />30 min</span>
          <span className={styles.metaItem}><span className={styles.metaDot} />Google Meet</span>
          <span className={styles.metaItem}><span className={styles.metaDot} />Free</span>
        </div>
      </div>

      {/* ── Calendar card ── */}
      <div className={`${styles.calWrap} reveal reveal-d1`}>
        <div className={styles.calCard}>

          {/* ── FLOW: calendar ── */}
          {flow === 'calendar' && (
            <>
              <div className={styles.calHeader}>
                <span className={styles.calMonth}>{MONTHS[month]}</span>
                <span className={styles.calYear}>{year}</span>
              </div>

              <div className={styles.calGrid}>
                {DAY_LABELS.map((d) => (
                  <div key={d} className={styles.dayLabel}>{d}</div>
                ))}
                {cells.map((day, i) => {
                  const isToday = day === today
                  const isAvail = day !== null && available.has(day)
                  const isSel   = day === selected
                  const isPast  = day !== null && day <= today
                  return (
                    <div
                      key={i}
                      className={[
                        styles.cell,
                        isPast && !isToday ? styles.cellPast    : '',
                        isToday            ? styles.cellToday   : '',
                        isAvail            ? styles.cellAvail   : '',
                        isSel              ? styles.cellSelected: '',
                      ].join(' ')}
                      onClick={() => isAvail && setSelected(isSel ? null : day)}
                    >
                      {day ?? ''}
                    </div>
                  )
                })}
              </div>

              {selected ? (
                <div className={styles.slots}>
                  <div className={styles.slotsLabel}>
                    {MONTHS[month]} {selected} · pick a time
                  </div>
                  <div className={styles.slotsGrid}>
                    {SLOTS.map((s) => (
                      <button key={s} className={styles.slot} onClick={() => handleSlot(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.calFooter}>
                  <span className={styles.calHint}>Select a day to see availability</span>
                  <button className={styles.btn} onClick={handleOpenWithoutSlot}>
                    Open booking
                  </button>
                </div>
              )}
            </>
          )}

          {/* ── FLOW: pending ── */}
          {flow === 'pending' && (
            <div className={styles.flowState}>
              <div className={styles.spinnerWrap}>
                <div className={styles.spinner} />
              </div>
              <div className={styles.flowTitle}>Booking page open</div>
              <div className={styles.flowBody}>
                Complete your details in the Google Calendar tab and return here once done.
              </div>
              {selectedSlot && (
                <div className={styles.slotBadge}>
                  {MONTHS[month]} {selected} · {selectedSlot}
                </div>
              )}
              <button className={styles.flowLink} onClick={reset}>
                Choose a different time
              </button>
            </div>
          )}

          {/* ── FLOW: returning — did they actually book? ── */}
          {flow === 'returning' && (
            <div className={styles.flowState}>
              <div className={styles.questionMark}>?</div>
              <div className={styles.flowTitle}>Did you complete the booking?</div>
              <div className={styles.flowBody}>
                Let us know so we can confirm your slot — or go back if you need more time.
              </div>
              {selectedSlot && (
                <div className={styles.slotBadge}>
                  {MONTHS[month]} {selected} · {selectedSlot}
                </div>
              )}
              <div className={styles.returningActions}>
                <button className={styles.btnConfirm} onClick={() => setFlow('confirmed')}>
                  Yes, I'm booked
                </button>
                <button className={styles.btnReopen} onClick={reopenCal}>
                  Reopen booking page
                </button>
              </div>
              <button className={styles.flowLink} onClick={reset}>
                Choose a different time
              </button>
            </div>
          )}

          {/* ── FLOW: confirmed ── */}
          {flow === 'confirmed' && (
            <div className={styles.flowState}>
              <div className={styles.checkWrap}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M8 13.5L11.5 17L18 9.5" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.flowTitle}>Booking confirmed.</div>
              <div className={styles.flowBody}>
                A calendar invite and confirmation email are on their way. We'll be ready.
              </div>
              {selectedSlot && (
                <div className={styles.slotBadge}>
                  {MONTHS[month]} {selected} · {selectedSlot} · Google Meet
                </div>
              )}
              <button className={styles.flowLink} onClick={reset}>
                Book another call
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
