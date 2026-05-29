import { useState, useEffect } from 'react'
import styles from './ConceptsPage.module.css'

/* ─── Data ──────────────────────────────────────────────── */

const CONCEPTS = [
  {
    id: 'firstweeks',
    title: 'Firstweeks',
    tagline: 'A postpartum recovery operating system for first-time mothers.',
    category: 'Health Tech',
    subcategory: 'Mobile App',
    year: '2025',
    status: 'Concept',
    coverGradient: 'linear-gradient(135deg, #DCD8FF 0%, #FFD5E8 50%, #B7CCFF 100%)',
    problem:
      'After birth, care drops sharply while risk remains high. A mother is discharged with pamphlets, a phone number, and a six-week appointment. In those weeks, she is expected to identify warning signs, manage pain, feed a newborn, and recover — with no structured daily support layer.',
    discovery: [
      { stat: '4–6 weeks', label: 'Average gap between discharge and first postpartum visit' },
      { stat: '50%+', label: 'Of maternal deaths occur after the first 24 hours postpartum' },
      { stat: '1 in 5', label: 'Mothers experience postpartum depression or anxiety' },
      { stat: '80%', label: 'Of postpartum complications are preventable with timely triage' },
    ],
    insight:
      'Most pregnancy apps stop being useful at birth. Most baby apps track the baby. No product acts as the missing layer between hospital discharge and the next real clinical appointment.',
    solution: [
      { icon: '🩺', label: 'Adaptive daily check-ins', desc: 'Questions change based on delivery type, postpartum day, and prior answers.' },
      { icon: '⚡', label: 'Risk triage', desc: 'Green / yellow / red classification with specific escalation paths — never a vague "see a doctor".' },
      { icon: '💬', label: 'Doctor message builder', desc: 'Auto-generates a structured symptom summary from check-in data, ready to copy or SMS.' },
      { icon: '🤍', label: 'Mental health layer', desc: 'EPDS-style mood screening, harm-thought escalation, and mood pattern tracking built into every check-in.' },
      { icon: '🌸', label: 'Clinician-reviewed community', desc: 'Moderated insights from mothers with similar recovery profiles — not an open forum.' },
    ],
    quote: 'The baby has a thousand trackers. The mother needs one recovery system.',
  },
]

/* ─── iPhone frame ──────────────────────────────────────── */

function IPhoneFrame({
  src,
  resetKey,
  isLoading,
  onLoad,
  variant = 'inline',
}: {
  src: string
  resetKey: number
  isLoading: boolean
  onLoad: () => void
  variant?: 'inline' | 'fullscreen'
}) {
  return (
    <div className={`${styles.phoneOuter} ${variant === 'fullscreen' ? styles.phoneOuterFullscreen : ''}`} aria-label="Firstweeks mobile prototype">
      <div className={styles.phoneScreen}>
        {isLoading && (
          <div className={styles.phoneLoader}>
            <div className={styles.loaderDot} />
            <div className={styles.loaderDot} />
            <div className={styles.loaderDot} />
          </div>
        )}

        <iframe
          key={resetKey}
          src={src}
          className={styles.iframe}
          title="Firstweeks app prototype"
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={onLoad}
        />
      </div>

      <img
        className={styles.phoneFrameImage}
        src="/iphone-frame.png"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </div>
  )
}

/* ─── Concept detail page ───────────────────────────────── */

function ConceptDetail({ concept, onBack }: { concept: typeof CONCEPTS[0]; onBack: () => void }) {
  const [resetKey, setResetKey] = useState(0)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [prototypeOpen, setPrototypeOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = prototypeOpen ? 'hidden' : ''
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPrototypeOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [prototypeOpen])

  // Reset the embedded app — passes ?reset=true then bounces back
  function handleRestart() {
    setIframeLoaded(false)
    setResetKey(k => k + 1)
  }

  const iframeSrc = resetKey === 0
    ? '/firstweeks/index.html'
    : `/firstweeks/index.html?reset=true&restart=${resetKey}`

  return (
    <div className={styles.detail}>
      {/* ── Back ── */}
      <button className={styles.backBtn} onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All concepts
      </button>

      {/* ── Hero ── */}
      <header className={styles.detailHero}>
        <div className={styles.detailMeta}>
          <span className={styles.tag}>{concept.category}</span>
          <span className={styles.tagOutline}>{concept.subcategory}</span>
          <span className={styles.tagOutline}>{concept.year}</span>
          <span className={styles.tagStatus}>{concept.status}</span>
        </div>
        <h1 className={styles.detailTitle}>{concept.title}</h1>
        <p className={styles.detailTagline}>{concept.tagline}</p>
      </header>

      {/* ── Problem ── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>The problem</span>
        <p className={styles.bodyLarge}>{concept.problem}</p>
      </section>

      {/* ── Discovery ── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>What the data shows</span>
        <div className={styles.statsGrid}>
          {concept.discovery.map(d => (
            <div key={d.stat} className={styles.statCard}>
              <span className={styles.statNum}>{d.stat}</span>
              <span className={styles.statLabel}>{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Insight ── */}
      <section className={styles.insightBlock}>
        <p className={styles.insightText}>"{concept.insight}"</p>
      </section>

      {/* ── Solution ── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>What was built</span>
        <div className={styles.solutionGrid}>
          {concept.solution.map(s => (
            <div key={s.label} className={styles.solutionCard}>
              <span className={styles.solutionIcon}>{s.icon}</span>
              <div>
                <p className={styles.solutionTitle}>{s.label}</p>
                <p className={styles.solutionDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quote ── */}
      <section className={styles.quoteBlock}>
        <p className={styles.quote}>{concept.quote}</p>
      </section>

      {/* ── Demo ── */}
      <section className={styles.demoSection}>
        <div className={styles.demoText}>
          <span className={styles.sectionLabel}>Interactive prototype</span>
          <h2 className={styles.demoHeading}>Try the full flow</h2>
          <p className={styles.demoBody}>
            Complete the onboarding, run a daily check-in, write a journal entry, and explore the care hub.
            The full prototype is embedded below — it runs exactly as it would on a real device.
          </p>

          <div className={styles.demoActions}>
            <button className={styles.restartBtn} onClick={handleRestart}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7A5 5 0 1 1 7 2M7 2V0M7 2L10 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Restart flow
            </button>
            <button className={styles.prototypeBtn} onClick={() => setPrototypeOpen(true)}>
              Open phone view
            </button>
            <p className={styles.demoNote}>
              All data is stored locally in your browser. Nothing is sent anywhere.
            </p>
          </div>
        </div>

        <div className={styles.demoPhoneWrap}>
          <IPhoneFrame
            src={iframeSrc}
            resetKey={resetKey}
            isLoading={!iframeLoaded}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </section>

      {prototypeOpen && (
        <div className={styles.prototypeOverlay} role="dialog" aria-modal="true" aria-label="Firstweeks full phone view">
          <div className={styles.prototypeToolbar}>
            <button className={styles.prototypeBackBtn} onClick={() => setPrototypeOpen(false)}>
              Back to case study
            </button>
            <button className={styles.restartBtn} onClick={handleRestart}>
              Restart flow
            </button>
          </div>
          <div className={styles.prototypeStage}>
            <IPhoneFrame
              src={iframeSrc}
              resetKey={resetKey}
              isLoading={!iframeLoaded}
              onLoad={() => setIframeLoaded(true)}
              variant="fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Concept card ──────────────────────────────────────── */

function ConceptCard({ concept, onClick }: { concept: typeof CONCEPTS[0]; onClick: () => void }) {
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.cardCover} style={{ background: concept.coverGradient }}>
        <div className={styles.cardCoverInner}>
          <span className={styles.cardEmoji}>🌸</span>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.tag}>{concept.category}</span>
          <span className={styles.tagOutline}>{concept.subcategory}</span>
        </div>
        <h3 className={styles.cardTitle}>{concept.title}</h3>
        <p className={styles.cardTagline}>{concept.tagline}</p>
        <div className={styles.cardFooter}>
          <span className={styles.cardYear}>{concept.year}</span>
          <span className={styles.cardArrow}>
            View case study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}

/* ─── Concepts page ─────────────────────────────────────── */

export function ConceptsPage() {
  const [active, setActive] = useState<string | null>(null)

  // Handle back navigation
  useEffect(() => {
    const onPop = () => {
      if (active) setActive(null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [active])

  function openConcept(id: string) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setActive(id)
  }

  function closeConcept() {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setActive(null)
  }

  const activeConcept = CONCEPTS.find(c => c.id === active)

  return (
    <div className={styles.page}>
      {activeConcept ? (
        <ConceptDetail concept={activeConcept} onBack={closeConcept} />
      ) : (
        <>
          {/* ── Page header ── */}
          <header className={styles.pageHeader}>
            <p className={styles.pageLabel}>Nocturnal</p>
            <h1 className={styles.pageTitle}>Concepts</h1>
            <p className={styles.pageSubtitle}>
              Independently researched product concepts — each rooted in a real problem,
              designed end-to-end, and built as interactive prototypes.
            </p>
          </header>

          {/* ── Grid ── */}
          <div className={styles.grid}>
            {CONCEPTS.map(c => (
              <ConceptCard key={c.id} concept={c} onClick={() => openConcept(c.id)} />
            ))}

            {/* Coming soon placeholder */}
            <article className={`${styles.card} ${styles.cardSoon}`}>
              <div className={styles.cardCover} style={{ background: 'var(--noc-glass-bg)' }}>
                <div className={styles.cardCoverInner}>
                  <span className={styles.cardEmoji} style={{ opacity: 0.3 }}>+</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.tagOutline}>Coming soon</span>
                </div>
                <h3 className={styles.cardTitle} style={{ opacity: 0.4 }}>Next concept</h3>
                <p className={styles.cardTagline} style={{ opacity: 0.4 }}>Currently in research phase.</p>
              </div>
            </article>
          </div>
        </>
      )}
    </div>
  )
}
