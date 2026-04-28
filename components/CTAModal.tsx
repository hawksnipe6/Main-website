'use client';
import { useState } from 'react';
import styles from './CTAModal.module.css';

type Props = { source: string; onClose: () => void };
type Step = 'form' | 'loading' | 'success' | 'error';

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function CTAModal({ source, onClose }: Props) {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [step,  setStep]  = useState<Step>('form');

  const submit = async () => {
    if (!email.trim()) return;
    setStep('loading');
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${SUPABASE_ANON}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          email: email.trim(),
          name:  name.trim() || null,
          source,
          page:  typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      });
      if (!res.ok) throw new Error();
      setStep('success');
    } catch {
      setStep('error');
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        {/* ── Loading ── */}
        {step === 'loading' && (
          <div className={styles.centerState}>
            <div className={styles.spinner} />
            <p className={styles.stateText}>Sending…</p>
          </div>
        )}

        {/* ── Success ── */}
        {step === 'success' && (
          <div className={styles.centerState}>
            <span className={styles.successMark}>◎</span>
            <h2 className={styles.successTitle}>You're on the list.</h2>
            <p className={styles.successSub}>
              Abeer will be in touch within 24 hours to scope the brief.
            </p>
            {/* Direct Calendly / booking link */}
            <a
              href="https://calendly.com/abeermahadane44"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 8 }}
            >
              Book a time slot now →
            </a>
            <button className={styles.dismissBtn} onClick={onClose}>Close</button>
          </div>
        )}

        {/* ── Error ── */}
        {step === 'error' && (
          <div className={styles.centerState}>
            <span className={styles.errorMark}>◌</span>
            <p className={styles.stateText}>Something went wrong.</p>
            <button className="btn btn-secondary" onClick={() => setStep('form')}>Try again</button>
          </div>
        )}

        {/* ── Form ── */}
        {step === 'form' && (
          <>
            <p className={styles.eyebrow}>Book a Call</p>
            <h2 className={styles.title}>Leave your details.</h2>
            <p className={styles.sub}>
              Drop an email and Abeer will reach out to scope the brief. No commitment, no sales deck.
            </p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="m-name">Name</label>
              <input
                id="m-name"
                className={styles.input}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="m-email">Email *</label>
              <input
                id="m-email"
                className={styles.input}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                autoComplete="email"
                required
              />
            </div>

            <button
              className={`btn btn-primary ${styles.submit}`}
              onClick={submit}
              disabled={!email.trim()}
            >
              Book a Call
            </button>
            <p className={styles.privacy}>No spam. Just a conversation.</p>
          </>
        )}
      </div>
    </div>
  );
}
