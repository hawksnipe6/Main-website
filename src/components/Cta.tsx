import { useState } from 'react'
import styles from './Cta.module.css'

const CAL_URL = 'https://calendar.app.google/uaXpuZ2dCKAUhnzj7'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_LABELS = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM']

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

  const openCal = () => window.open(CAL_URL, '_blank', 'noopener')

  return (
    <section id="cta" className={styles.cta}>
      <div className={styles.left}>
        <div className="section-label reveal">Work with us</div>
        <h2 className={`section-title ${styles.title} reveal reveal-d1`}>
          Book a strategy call.
        </h2>
        <p className={`${styles.body} reveal reveal-d2`}>
          Thirty minutes. No pitch decks. We identify the revenue friction in your brand and product,
          and tell you exactly what can be fixed — before any commitment.
        </p>
        <div className={`${styles.meta} reveal reveal-d2`}>
          <span className={styles.metaItem}>
            <span className={styles.metaDot} />
            30 min
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaDot} />
            Google Meet
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaDot} />
            Free
          </span>
        </div>
      </div>

      <div className={`${styles.calWrap} reveal reveal-d1`}>
        <div className={styles.calCard}>
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
              const isSel = day === selected
              const isPast = day !== null && day <= today
              return (
                <div
                  key={i}
                  className={[
                    styles.cell,
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
                {MONTHS[month]} {selected} — pick a time
              </div>
              <div className={styles.slotsGrid}>
                {SLOTS.map((s) => (
                  <button key={s} className={styles.slot} onClick={openCal}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.calFooter}>
              <span className={styles.calHint}>Select a day to see availability</span>
              <button className={styles.btn} onClick={openCal}>
                Open booking
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
