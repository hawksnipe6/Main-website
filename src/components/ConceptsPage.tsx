import { useState, useEffect } from 'react'
import styles from './ConceptsPage.module.css'

/* ─── Data ──────────────────────────────────────────────── */

type DiscoveryItem = {
  stat: string
  label: string
}

type SolutionItem = {
  icon: string
  label: string
  desc: string
}

type Concept = {
  id: string
  title: string
  tagline: string
  category: string
  subcategory: string
  year: string
  status: string
  coverGradient?: string
  coverType?: 'firstweeks' | 'densly'
  problem: string
  discovery: DiscoveryItem[]
  insight: string
  solution: SolutionItem[]
  quote: string
}

const CONCEPTS: Concept[] = [
  {
    id: 'densly',
    title: 'Densly',
    tagline: 'A treatment outcome platform for people trying to understand if their hair-loss routine is working.',
    category: 'Health Tech',
    subcategory: 'Outcome Tracking',
    year: '2026',
    status: 'MVP Concept',
    coverType: 'densly',
    problem:
      'Hair-loss treatment is slow, emotionally charged, and hard to measure. People spend on minoxidil, finasteride, supplements, laser devices, clinic procedures, and transplant aftercare, then judge progress through mirror checks and inconsistent photos.',
    discovery: [
      { stat: '4–8 mo', label: 'Typical window before visible treatment change becomes easier to judge' },
      { stat: '3.5 mo', label: 'Median discontinuation point reported among non-adherent topical minoxidil users' },
      { stat: '2.6x', label: 'Higher 1-year follow-up probability observed when photographic assessment was used in AGA care' },
      { stat: '5 views', label: 'Minimum baseline capture set: front, crown, left temple, right temple, top-down' },
    ],
    insight:
      'The product should not diagnose hair loss. It should make the user’s evidence consistent enough for them, their doctor, and their clinic to trust the timeline.',
    solution: [
      { icon: '01', label: 'Guided monthly capture', desc: 'The app controls distance, pose, angle, lighting, and hair-state notes before accepting a scan.' },
      { icon: '02', label: 'Quality gate', desc: 'Bad inputs are rejected. Wet hair, harsh shadow, mismatched angle, and low scalp visibility are flagged before comparison.' },
      { icon: '03', label: 'Zone comparison', desc: 'Front, crown, and temple zones are aligned against baseline so progress is judged consistently over months.' },
      { icon: '04', label: 'Doctor-ready report', desc: 'A clean PDF turns scattered selfies into a chronological treatment record with notes, images, and confidence labels.' },
      { icon: '05', label: 'Clinic dashboard', desc: 'Clinics can monitor post-procedure and medication follow-ups without asking patients to manually explain their progress.' },
    ],
    quote: 'Do not sell a miracle. Sell the missing measurement layer.',
  },
  {
    id: 'firstweeks',
    title: 'Firstweeks',
    tagline: 'A postpartum recovery operating system for first-time mothers.',
    category: 'Health Tech',
    subcategory: 'Mobile App',
    year: '2025',
    status: 'Concept',
    coverGradient: 'linear-gradient(135deg, #DCD8FF 0%, #FFD5E8 50%, #B7CCFF 100%)',
    coverType: 'firstweeks',
    problem:
      'After birth, care drops sharply while risk remains high. A mother is discharged with pamphlets, a phone number, and a six-week appointment. In those weeks, she is expected to identify warning signs, manage pain, feed a newborn, and recover with no structured daily support layer.',
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
      { icon: '⚡', label: 'Risk triage', desc: 'Green / yellow / red classification with specific escalation paths, never a vague see a doctor.' },
      { icon: '💬', label: 'Doctor message builder', desc: 'Auto-generates a structured symptom summary from check-in data, ready to copy or SMS.' },
      { icon: '🤍', label: 'Mental health layer', desc: 'EPDS-style mood screening, harm-thought escalation, and mood pattern tracking built into every check-in.' },
      { icon: '🌸', label: 'Clinician-reviewed community', desc: 'Moderated insights from mothers with similar recovery profiles, not an open forum.' },
    ],
    quote: 'The baby has a thousand trackers. The mother needs one recovery system.',
  },
]


const denslyCategorization = [
  { label: 'Type', value: 'SaaS' },
  { label: 'Market', value: 'B2C' },
  { label: 'Target', value: 'Health consumers' },
  { label: 'Main competitor', value: 'MyHair AI' },
]

const denslyTrendAnalysis =
  'The hair-loss market is experiencing growth due to advancements in AI and increased consumer demand for personalized health solutions, alongside a $50 billion global market size.'

const denslyOpportunity = [
  {
    label: 'Consumer pain',
    title: 'Users cannot tell signal from noise.',
    body: 'Lighting, hair length, oil, camera distance, styling, and angle can make the same scalp look better or worse. That uncertainty makes users overreact, stop early, or keep paying without evidence.',
  },
  {
    label: 'Clinic pain',
    title: 'Follow-up proof is fragmented.',
    body: 'Dermatology and transplant clinics need credible before-after documentation, but patient camera rolls are unstructured. Consultations lose time reconstructing the story.',
  },
  {
    label: 'Market pain',
    title: 'The treatment layer has no neutral outcome layer.',
    body: 'Brands sell products. Clinics sell procedures. Communities sell hope. A neutral tracker can own the trust layer by staying treatment-agnostic.',
  },
]

const denslyFlow = [
  { step: '01', title: 'Baseline', body: 'Five guided views establish the first comparable record.' },
  { step: '02', title: 'Quality gate', body: 'The app rejects bad lighting, wet hair, and mismatched angles.' },
  { step: '03', title: 'Alignment', body: 'New photos are matched to baseline by zone and crop.' },
  { step: '04', title: 'Signal', body: 'Users see confidence-labeled progress instead of a fake certainty score.' },
  { step: '05', title: 'Report', body: 'A clinic-ready export turns months of photos into a readable outcome file.' },
]

const denslyMvp = [
  'Guided camera protocol for front, crown, top-down, and temple capture',
  'Same-day retest check to prove score stability before public launch',
  'Progress timeline with month stacks and confidence labels',
  'Treatment journal for dosage, start date, side effects, shedding, and routine changes',
  'Dermatologist export with images, dates, user notes, and quality warnings',
  'Clinic console for post-procedure and medication follow-up cohorts',
]

const denslyRisks = [
  { title: 'Accuracy risk', body: 'Selfies are noisy. The MVP must reject weak captures before it tries to compare anything.' },
  { title: 'Medical risk', body: 'The product should not diagnose alopecia, recommend drugs, or claim exact follicle density from casual photos.' },
  { title: 'Anxiety risk', body: 'Daily scoring can make users spiral. Monthly cadence and confidence language are safer.' },
  { title: 'Trust risk', body: 'If two photos taken ten minutes apart generate different results, the product loses credibility.' },
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

/* ─── Densly visual system ──────────────────────────────── */

function DenslyAppLogo() {
  return (
    <div className={styles.denslyLogo} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

function DenslyPhone({ variant, compact = false }: { variant: 'capture' | 'timeline' | 'report' | 'routine'; compact?: boolean }) {
  return (
    <div className={`${styles.denslyPhone} ${compact ? styles.denslyPhoneCompact : ''}`}>
      <div className={styles.denslyNotch} />
      <div className={styles.denslyApp}>
        {variant === 'capture' && (
          <>
            <div className={styles.denslyTopbar}>
              <span>Baseline</span>
              <span>Step 2/5</span>
            </div>
            <div className={styles.captureView}>
              <div className={styles.headShape}>
                <div className={styles.hairMass} />
                <div className={styles.zoneRing} />
              </div>
              <div className={styles.captureGrid} />
              <div className={styles.captureInstruction}>Align crown inside the guide</div>
            </div>
            <div className={styles.qualityPanel}>
              <div>
                <span className={styles.miniLabel}>Quality gate</span>
                <strong>Good capture</strong>
              </div>
              <span className={styles.statusDot}>96</span>
            </div>
            <button className={styles.denslyAction}>Use this scan</button>
          </>
        )}

        {variant === 'timeline' && (
          <>
            <div className={styles.denslyTopbar}>
              <span>Progress</span>
              <span>Month 6</span>
            </div>
            <div className={styles.progressHero}>
              <DenslyAppLogo />
              <h4>Crown stability detected</h4>
              <p>Comparison confidence: high</p>
            </div>
            <div className={styles.zoneList}>
              <div><span>Crown</span><strong>+8%</strong></div>
              <div><span>Left temple</span><strong>Flat</strong></div>
              <div><span>Right temple</span><strong>+3%</strong></div>
            </div>
            <div className={styles.timelineBars}>
              <span style={{ height: '34%' }} />
              <span style={{ height: '38%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '52%' }} />
              <span style={{ height: '58%' }} />
              <span style={{ height: '63%' }} />
            </div>
          </>
        )}

        {variant === 'report' && (
          <>
            <div className={styles.denslyTopbar}>
              <span>Report</span>
              <span>PDF</span>
            </div>
            <div className={styles.reportCard}>
              <DenslyAppLogo />
              <h4>Dermatology summary</h4>
              <p>6-month treatment record prepared for consult.</p>
            </div>
            <div className={styles.reportRows}>
              <div><span>Routine</span><strong>Minoxidil 5%</strong></div>
              <div><span>Started</span><strong>12 Jan</strong></div>
              <div><span>Adherence</span><strong>82%</strong></div>
              <div><span>Flag</span><strong>No severe shedding</strong></div>
            </div>
            <button className={styles.denslyAction}>Export for doctor</button>
          </>
        )}

        {variant === 'routine' && (
          <>
            <div className={styles.denslyTopbar}>
              <span>Routine</span>
              <span>Today</span>
            </div>
            <div className={styles.routineHero}>
              <span>Do not judge week by week.</span>
              <strong>Next scan in 19 days</strong>
            </div>
            <div className={styles.routineList}>
              <div><span />Minoxidil PM</div>
              <div><span />Progress note</div>
              <div><span />Side-effect check</div>
            </div>
            <div className={styles.calendarStrip}>
              <span>M</span><span>T</span><span>W</span><span>T</span><strong>F</strong><span>S</span><span>S</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function DenslyCover() {
  return (
    <div className={styles.denslyCover}>
      <div className={styles.denslyCoverPanel}>
        <div className={styles.coverHeader}>
          <DenslyAppLogo />
          <span>outcome layer</span>
        </div>
        <div className={styles.coverPhoneRow}>
          <DenslyPhone variant="capture" compact />
          <DenslyPhone variant="timeline" compact />
        </div>
      </div>
    </div>
  )
}

/* ─── Densly case study ─────────────────────────────────── */

function DenslyDetail({ concept, onBack }: { concept: Concept; onBack: () => void }) {
  return (
    <div className={styles.detail}>
      <button className={styles.backBtn} onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All concepts
      </button>

      <header className={styles.denslyHero}>
        <div className={styles.denslyHeroCopy}>
          <div className={styles.detailMeta}>
            <span className={styles.tag}>{concept.category}</span>
            <span className={styles.tagOutline}>{concept.subcategory}</span>
            <span className={styles.tagOutline}>{concept.year}</span>
            <span className={styles.tagStatus}>{concept.status}</span>
          </div>
          <h1 className={styles.detailTitle}>{concept.title}</h1>
          <p className={styles.detailTagline}>{concept.tagline}</p>
          <div className={styles.denslyThesisCard}>
            <span>Product thesis</span>
            <p>Build trust before intelligence. The first product win is not an AI diagnosis. It is repeatable image capture, honest uncertainty, and clinic-ready evidence.</p>
          </div>
        </div>
        <div className={styles.denslyHeroVisual} aria-label="Densly mobile interface previews">
          <DenslyPhone variant="capture" />
          <DenslyPhone variant="timeline" />
          <DenslyPhone variant="report" />
        </div>
      </header>

      <section className={`${styles.section} ${styles.denslyIntroSection}`}>
        <span className={styles.sectionLabel}>Why this should exist</span>
        <p className={styles.bodyLarge}>{concept.problem}</p>
        <div className={styles.denslyIntroGrid}>
          <div>
            <h2>The mirror is not a measurement system.</h2>
          </div>
          <p>
            Hair changes slowly, but anxiety updates daily. The user keeps comparing old selfies taken under different light and different hair states. Densly turns that chaotic habit into a controlled monthly protocol, then packages the result into a timeline that a user and clinician can understand.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Research signals</span>
        <div className={styles.statsGrid}>
          {concept.discovery.map(d => (
            <div key={d.stat} className={styles.statCard}>
              <span className={styles.statNum}>{d.stat}</span>
              <span className={styles.statLabel}>{d.label}</span>
            </div>
          ))}
        </div>
        <p className={styles.denslySourceNote}>Source basis used for concept framing: clinical literature on androgenetic alopecia, minoxidil adherence, photographic follow-up behavior, and mobile medical app risk guidance.</p>
      </section>


      <section className={styles.denslyCategorizationSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Categorization</span>
          <h2>Commercial shape of the concept.</h2>
        </div>
        <div className={styles.denslyCategorizationCard}>
          <div className={styles.denslyCategoryGrid}>
            {denslyCategorization.map(item => (
              <div key={item.label} className={styles.denslyCategoryItem}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className={styles.denslyTrendBlock}>
            <span>Trend analysis</span>
            <p>{denslyTrendAnalysis}</p>
          </div>
        </div>
      </section>

      <section className={styles.denslyMatrixSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Problem map</span>
          <h2>Three groups already need the same thing: proof over memory.</h2>
        </div>
        <div className={styles.denslyProblemGrid}>
          {denslyOpportunity.map(item => (
            <article key={item.label} className={styles.denslyProblemCard}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.insightBlock}>
        <p className={styles.insightText}>"{concept.insight}"</p>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>MVP product system</span>
        <div className={styles.solutionGrid}>
          {concept.solution.map(s => (
            <div key={s.label} className={`${styles.solutionCard} ${styles.numberedSolutionCard}`}>
              <span className={styles.solutionIcon}>{s.icon}</span>
              <div>
                <p className={styles.solutionTitle}>{s.label}</p>
                <p className={styles.solutionDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.denslyScreensSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Interface direction</span>
          <h2>Wellness-soft visually, clinical in behavior.</h2>
          <p>The app uses soft product-card proportions from the references, but the interaction model stays strict: fewer decorative screens, clearer capture gates, and no fake medical certainty.</p>
        </div>
        <div className={styles.denslyScreensGrid}>
          <div className={styles.denslyScreenCard}>
            <DenslyPhone variant="capture" />
            <div>
              <span>01</span>
              <h3>Guided capture</h3>
              <p>The interface behaves like a camera protocol, not a casual selfie flow. It tells the user exactly what must be corrected before the scan is allowed.</p>
            </div>
          </div>
          <div className={styles.denslyScreenCard}>
            <DenslyPhone variant="timeline" />
            <div>
              <span>02</span>
              <h3>Progress timeline</h3>
              <p>Progress is shown through confidence-labeled zones and month stacks. The user sees trend direction without being trapped by a single fragile score.</p>
            </div>
          </div>
          <div className={styles.denslyScreenCard}>
            <DenslyPhone variant="routine" />
            <div>
              <span>03</span>
              <h3>Adherence layer</h3>
              <p>The app keeps treatment notes, routine adherence, side effects, and shedding context close to the image timeline, because the photo alone is never the full story.</p>
            </div>
          </div>
          <div className={styles.denslyScreenCard}>
            <DenslyPhone variant="report" />
            <div>
              <span>04</span>
              <h3>Doctor-ready export</h3>
              <p>Every scan can become a structured report with image quality warnings, medication history, and notes. This is where consumer tracking becomes useful to clinics.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.denslyFlowSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Measurement pipeline</span>
          <h2>The core product is a repeatability engine.</h2>
        </div>
        <div className={styles.denslyFlowGrid}>
          {denslyFlow.map(item => (
            <article key={item.step} className={styles.denslyFlowCard}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.denslySplitSection}>
        <div className={styles.denslySplitPanel}>
          <span className={styles.sectionLabel}>What ships first</span>
          <h2>Keep the MVP narrow enough to be trusted.</h2>
          <ul className={styles.denslyList}>
            {denslyMvp.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className={styles.denslySplitPanel}>
          <span className={styles.sectionLabel}>Business model</span>
          <div className={styles.denslyBusinessRows}>
            <div><span>Free</span><p>Hair-loss diagnostic quiz, baseline capture, one progress report preview.</p></div>
            <div><span>$5/mo</span><p>Basic tracking, reminders, visual timeline, and treatment journal.</p></div>
            <div><span>$15/mo</span><p>Advanced heatmaps, PDF exports, trend alerts, and doctor-share package.</p></div>
            <div><span>Clinic license</span><p>White-labeled dashboard for consults, procedure follow-ups, and retention.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.denslyVisualDirection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Visual reference translation</span>
          <h2>From cosmetic softness to outcome utility.</h2>
          <p>The uploaded references were used for rounded product-card proportions, soft negative space, cropped image behavior, muted sage actions, and editorial calm. The case study keeps those cues while using the existing Nocturnal typography and page system.</p>
        </div>
        <div className={styles.referenceGrid}>
          <img src="/concepts/densly-ref-01.png" alt="Hydration hair-care visual reference board" />
          <img src="/concepts/densly-ref-02.png" alt="Soft product commerce mobile UI reference" />
          <img src="/concepts/densly-ref-03.png" alt="Minimal order and product mobile UI reference" />
        </div>
      </section>

      <section className={styles.denslyRiskSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Validation gates</span>
          <h2>The pilot should prove consistency before growth.</h2>
        </div>
        <div className={styles.denslyRiskGrid}>
          {denslyRisks.map(item => (
            <article key={item.title} className={styles.denslyRiskCard}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.quoteBlock}>
        <p className={styles.quote}>{concept.quote}</p>
      </section>
    </div>
  )
}

/* ─── Concept detail page ───────────────────────────────── */

function ConceptDetail({ concept, onBack }: { concept: Concept; onBack: () => void }) {
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

  if (concept.id === 'densly') {
    return <DenslyDetail concept={concept} onBack={onBack} />
  }

  // Reset the embedded app, passes ?reset=true then bounces back
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
            The full prototype is embedded below. It runs exactly as it would on a real device.
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

function ConceptCard({ concept, onClick }: { concept: Concept; onClick: () => void }) {
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.cardCover} style={{ background: concept.coverGradient || 'var(--noc-black)' }}>
        {concept.coverType === 'densly' ? (
          <DenslyCover />
        ) : (
          <div className={styles.cardCoverInner}>
            <span className={styles.cardEmoji}>🌸</span>
          </div>
        )}
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
              Independently researched product concepts, each rooted in a real problem,
              designed end-to-end, and built as interactive or product-ready case studies.
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
