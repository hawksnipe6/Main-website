import { useState } from 'react'
import styles from './Ledger.module.css'

// Same Web3Forms key as the scheduler; submissions arrive by email
// tagged as Ledger subscriptions.
const WEB3FORMS_KEY = '7eda97bc-6231-4ef7-b944-05ab5ea49351'

export function Ledger() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const valid = /\S+@\S+\.\S+/.test(email)

  const submit = async () => {
    if (!valid || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Ledger subscription — ${email}`,
          from_name: 'Nocturnal Ledger',
          email,
          message: `New Ledger subscriber: ${email}`,
        }),
      })
      const data = await res.json()
      setStatus(data?.success ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="ledger" className={styles.ledger}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className="section-label reveal">The Ledger</div>
          <h2 className={`section-title ${styles.title} reveal reveal-d1`}>
            Build notes from the studio.
          </h2>
          <p className={`${styles.body} reveal reveal-d2`}>
            CAD decisions, casting failures, render breakdowns. One email a month.
            No launches, no fluff.
          </p>
        </div>

        <div className={`${styles.formWrap} reveal reveal-d2`}>
          {status === 'done' ? (
            <p className={styles.success}>Done. First note lands next month.</p>
          ) : (
            <>
              <form
                className={styles.form}
                onSubmit={(e) => { e.preventDefault(); submit() }}
              >
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className={styles.button}
                  disabled={!valid || status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Subscribe'}
                </button>
              </form>
              {status === 'error' && (
                <p className={styles.error}>That did not go through. Try once more.</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
