import { useMemo, useState } from 'react'
import styles from './Scheduler.module.css'

const EMAIL = 'getnctrnl@gmail.com'
const WHATSAPP = '917045421516'

// Web3Forms delivers the booking request to EMAIL server-side (no draft).
// Get a free key at https://web3forms.com (enter getnctrnl@gmail.com) and paste it here.
const WEB3FORMS_KEY = '7eda97bc-6231-4ef7-b944-05ab5ea49351'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM']
const MAX_MONTH_OFFSET = 2

const midnight = (d: Date) => {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}

function monthHasAvailability(today: Date, offset: number) {
  const v = new Date(today.getFullYear(), today.getMonth() + offset, 1)
  const y = v.getFullYear()
  const m = v.getMonth()
  const count = new Date(y, m + 1, 0).getDate()
  for (let d = 1; d <= count; d++) {
    if (midnight(new Date(y, m, d)) > today) return true
  }
  return false
}

type View = 'pick' | 'details' | 'done'

export function Scheduler() {
  // Start on the first upcoming month that actually has open weekdays.
  const [offset, setOffset] = useState(() => {
    const t = midnight(new Date())
    for (let o = 0; o <= MAX_MONTH_OFFSET; o++) if (monthHasAvailability(t, o)) return o
    return 0
  })
  const [date, setDate] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [view, setView] = useState<View>('pick')
  const [form, setForm] = useState({ name: '', email: '', note: '' })

  const today = useMemo(() => midnight(new Date()), [])

  const { year, month, cells } = useMemo(() => {
    const v = new Date(today.getFullYear(), today.getMonth() + offset, 1)
    const y = v.getFullYear()
    const m = v.getMonth()
    // Monday-first weekday index for the 1st of the month
    const lead = (new Date(y, m, 1).getDay() + 6) % 7
    const count = new Date(y, m + 1, 0).getDate()
    const list: (number | null)[] = [
      ...Array(lead).fill(null),
      ...Array.from({ length: count }, (_, i) => i + 1),
    ]
    return { year: y, month: m, cells: list }
  }, [today, offset])

  const isAvailable = (day: number) => midnight(new Date(year, month, day)) > today

  const pickDay = (day: number) => {
    const d = new Date(year, month, day)
    setDate(d)
    setSlot(null)
  }

  const pickSlot = (s: string) => {
    setSlot(s)
    setView('details')
  }

  const reset = () => {
    setView('pick')
    setSlot(null)
  }

  const dateLabel = date
    ? `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    : ''

  const summary = `${dateLabel}${slot ? ` at ${slot}` : ''} (IST)`

  const whatsappHref = useMemo(() => {
    const text = `Hi Nocturnal — I'd like to book a discovery call.\n\nName: ${form.name || ''}\nPreferred: ${summary}\nDiscuss: ${form.note || ''}`
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
  }, [summary, form])

  const canSubmit = form.name.trim() !== '' && /\S+@\S+\.\S+/.test(form.email)

  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  const submitForm = async () => {
    if (!canSubmit || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Discovery call request — ${summary}`,
          from_name: 'Nocturnal Booking',
          name: form.name,
          email: form.email,
          message: [
            'New discovery call request.',
            '',
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Preferred slot: ${summary}`,
            `What to cover: ${form.note || '—'}`,
          ].join('\n'),
        }),
      })
      const data = await res.json()
      if (data?.success) {
        setStatus('idle')
        setView('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={styles.eventMeta}>
          <span className={styles.eventTitle}>Discovery Call</span>
          <span className={styles.eventSub}>30 min · Google Meet · Free</span>
        </div>
        <span className={styles.tz}>IST · GMT+5:30</span>
      </div>

      {view === 'pick' && (
        <>
          <div className={styles.monthNav}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={offset === 0}
              aria-label="Previous month"
            >
              ‹
            </button>
            <span className={styles.monthLabel}>{MONTHS[month]} {year}</span>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setOffset((o) => Math.min(MAX_MONTH_OFFSET, o + 1))}
              disabled={offset >= MAX_MONTH_OFFSET}
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className={styles.weekRow}>
            {DAY_LABELS.map((d, i) => (
              <span key={i} className={styles.weekday}>{d}</span>
            ))}
          </div>
          <div className={styles.grid}>
            {cells.map((day, i) => {
              if (day === null) return <span key={i} className={styles.pad} />
              const avail = isAvailable(day)
              const selected = date != null && date.getDate() === day && date.getMonth() === month
              return (
                <button
                  key={i}
                  type="button"
                  className={`${styles.day} ${avail ? styles.dayAvail : ''} ${selected ? styles.daySelected : ''}`}
                  disabled={!avail}
                  onClick={() => pickDay(day)}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {date ? (
            <div className={styles.slots}>
              <div className={styles.slotsLabel}>{dateLabel} — pick a time</div>
              <div className={styles.slotsGrid}>
                {SLOTS.map((s) => (
                  <button key={s} type="button" className={styles.slot} onClick={() => pickSlot(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className={styles.hint}>Select a day to see available times.</p>
          )}
        </>
      )}

      {view === 'details' && (
        <div className={styles.details}>
          <button type="button" className={styles.back} onClick={reset}>‹ Back</button>
          <div className={styles.chosen}>{summary}</div>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Your name</span>
            <input
              className={styles.input}
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Jane Doe"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <input
              className={styles.input}
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="jane@company.com"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>What should we cover? <span className={styles.optional}>(optional)</span></span>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              rows={3}
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              placeholder="A line on your product, brand, or the friction you're feeling."
            />
          </label>

          <button
            type="button"
            className={styles.confirm}
            onClick={submitForm}
            disabled={!canSubmit || status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Request this slot'}
            {status !== 'sending' && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          {status === 'error' && (
            <p className={styles.error}>
              Couldn't send just now — please use WhatsApp below or email {EMAIL}.
            </p>
          )}
          <a className={styles.altLink} href={whatsappHref} target="_blank" rel="noreferrer">
            or send it on WhatsApp
          </a>
        </div>
      )}

      {view === 'done' && (
        <div className={styles.done}>
          <div className={styles.tick} aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h3 className={styles.doneTitle}>Request sent.</h3>
          <p className={styles.doneText}>
            We received your preferred slot — <strong>{summary}</strong>. We'll confirm by email shortly and send a meeting link. Prefer to chat now?
          </p>
          <a className={styles.confirm} href={whatsappHref} target="_blank" rel="noreferrer">
            Message us on WhatsApp
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}
