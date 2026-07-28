import { useState } from 'react'
import styles from './ProjectIntake.module.css'

// Same Web3Forms key as the scheduler. Submissions arrive by email the
// moment the form is sent.
const WEB3FORMS_KEY = '7eda97bc-6231-4ef7-b944-05ab5ea49351'
const BRIEF_CAP = 280

const ENGAGEMENTS = [
  { id: 'product', label: 'Product', desc: 'Industrial design, concept to production CAD' },
  { id: 'interface', label: 'Interface', desc: 'UI/UX systems for apps and dashboards' },
  { id: 'brand', label: 'Brand', desc: 'Identity, graphic systems, and launch assets' },
  { id: 'film', label: 'Film', desc: 'CGI and motion for an existing product' },
]

export function ProjectIntake() {
  const [engagement, setEngagement] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', brief: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const canSubmit =
    engagement !== null &&
    form.name.trim() !== '' &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.brief.trim() !== ''

  const submit = async () => {
    if (!canSubmit || status === 'sending') return
    setStatus('sending')
    const picked = ENGAGEMENTS.find((e) => e.id === engagement)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Project inquiry — ${picked?.label} — ${form.name}`,
          from_name: 'Nocturnal Intake',
          name: form.name,
          email: form.email,
          message: [
            'New project inquiry.',
            '',
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Engagement: ${picked?.label} (${picked?.desc})`,
            `About the product: ${form.brief}`,
          ].join('\n'),
        }),
      })
      const data = await res.json()
      setStatus(data?.success ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="intake" className={styles.intake}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={`${styles.label} reveal`}>Start a project</p>
          <h2 className={`${styles.title} reveal reveal-d1`}>
            Tell us what you are making.
          </h2>
          <p className={`${styles.sub} reveal reveal-d2`}>
            Pick the engagement that fits and write two lines about the product.
            Reply lands within 48 hours.
          </p>
        </div>

        {status === 'done' ? (
          <div className={styles.done}>
            <p className={styles.doneTitle}>Received.</p>
            <p className={styles.doneText}>Check your inbox within 48 hours.</p>
          </div>
        ) : (
          <div className={`${styles.form} reveal reveal-d2`}>
            <div className={styles.rows} role="radiogroup" aria-label="Engagement type">
              {ENGAGEMENTS.map((e, i) => (
                <button
                  key={e.id}
                  type="button"
                  role="radio"
                  aria-checked={engagement === e.id}
                  className={`${styles.row} ${engagement === e.id ? styles.rowActive : ''}`}
                  onClick={() => setEngagement(e.id)}
                >
                  <span className={styles.rowIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.rowLabel}>{e.label}</span>
                  <span className={styles.rowDesc}>{e.desc}</span>
                  <span className={styles.rowMark} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className={styles.fields}>
              <div className={styles.fieldPair}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Name</span>
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
              </div>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>
                  Two lines about the product
                  <span className={styles.counter}>{form.brief.length}/{BRIEF_CAP}</span>
                </span>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  rows={3}
                  maxLength={BRIEF_CAP}
                  value={form.brief}
                  onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
                  placeholder="What it is, who it is for, and where it stands today."
                />
              </label>

              <button
                type="button"
                className={styles.send}
                onClick={submit}
                disabled={!canSubmit || status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
              {status === 'error' && (
                <p className={styles.error}>
                  That did not go through. Try once more, or email getnctrnl@gmail.com.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
