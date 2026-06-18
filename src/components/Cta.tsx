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
        <div className={`${styles.calCard} ${flow === 'embed' ? styles.calCardNative : ''}`}>
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
            <div className={styles.gcal}>
              <div className={styles.gcalHead}>
                <div className={styles.gcalOrg}>
                  <span className={styles.gcalAvatar}>
                    <img src="/N-light.png" alt="" />
                  </span>
                  <span className={styles.gcalOrgName}>Nocturnal</span>
                </div>
                <span className={styles.gcalProvider}>Google Calendar</span>
              </div>

              <div className={styles.gcalGrid}>
                <div className={styles.gcalEvent}>
                  <h3 className={styles.gcalEventTitle}>Discovery Call</h3>
                  <div className={styles.gcalEventRow}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    60 min appointments
                  </div>
                  <div className={styles.gcalEventRow}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="13" height="12" rx="2" />
                      <path d="M15 10l6-3v10l-6-3" />
                    </svg>
                    Google Meet video conference info added after booking
                  </div>
                  <p className={styles.gcalDesc}>
                    So glad you are here. This is the first step toward sharper brand and
                    product decisions. We use the call to find what is working, what is not,
                    and what to fix first.
                  </p>
                </div>

                <div className={styles.gcalPicker}>
                  <div className={styles.gcalPickerTop}>
                    <span className={styles.gcalPickerLabel}>Select an appointment time</span>
                    <span className={styles.gcalTz}>(GMT+05:30) India Standard Time, Kolkata</span>
                  </div>
                  <div className={styles.gcalChosen}>
                    {MONTHS[month]} {selected ?? today}{selectedSlot ? ` · ${selectedSlot}` : ''}
                  </div>
                  <div className={styles.gcalSlots}>
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`${styles.gcalSlot} ${selectedSlot === s ? styles.gcalSlotActive : ''}`}
                        onClick={() => setSelectedSlot(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.gcalFoot}>
                <button className={styles.flowLink} onClick={reset}>
                  Back
                </button>
                <a
                  className={styles.gcalConfirm}
                  href={CAL_EMBED_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Confirm in Google Calendar
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
