import { useState } from 'react'
import styles from './Cta.module.css'

const CAL_EMBED_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2xISzflS6opp0w6KlVdoltYpVkVYOawSSL9SklQQ-oN-bUU2GVMLXIElRo_JH0Iu9uQiCHKb7u?gv=true'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_LABELS = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM']

type Flow = 'calendar' | 'embed'

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
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [flow, setFlow] = useState<Flow>('calendar')

  const handleSlot = (slot: string) => {
    setSelectedSlot(slot)
    setFlow('embed')
  }

  const handleOpenWithoutSlot = () => {
    setFlow('embed')
  }

  const reset = () => {
    setFlow('calendar')
    setSelected(null)
    setSelectedSlot(null)
  }

  return (
    <section id="cta" className={styles.cta}>
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

      <div className={`${styles.calWrap} reveal reveal-d1`}>
        <div className={`${styles.calCard} ${flow === 'embed' ? styles.calCardEmbed : ''}`}>
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
                  const isSel = day !== null && day === selected
                  const isPast = day !== null && day <= today
                  return (
                    <div
                      key={i}
                      className={[
                        styles.cell,
                        day === null ? styles.cellEmpty : '',
                        isPast && !isToday ? styles.cellPast : '',
                        isToday ? styles.cellToday : '',
                        isAvail ? styles.cellAvail : '',
                        isSel ? styles.cellSelected : '',
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
                    {MONTHS[month]} {selected} - pick a time
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

          {flow === 'embed' && (
            <div className={styles.embedState}>
              <div className={styles.embedTop}>
                <div>
                  <div className={styles.flowTitle}>Book in Google Calendar</div>
                  <div className={styles.flowBody}>
                    Complete your strategy call booking below. You will stay on this page.
                  </div>
                </div>
                <button className={styles.flowLink} onClick={reset}>
                  Back
                </button>
              </div>
              {selectedSlot && (
                <div className={styles.slotBadge}>
                  {MONTHS[month]} {selected} - {selectedSlot}
                </div>
              )}
              <iframe
                className={styles.calendarFrame}
                src={CAL_EMBED_URL}
                title="Book a strategy call with Nocturnal"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
