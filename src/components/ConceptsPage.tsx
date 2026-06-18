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
  coverType?: 'firstweeks' | 'densly' | 'tollgate' | 'voca'
  coverEmoji?: string
  prototypePath?: string
  resetQuery?: string
  problem: string
  discovery: DiscoveryItem[]
  insight: string
  solution: SolutionItem[]
  quote: string
}

const CONCEPTS: Concept[] = [
  {
    id: 'tollgate',
    title: 'Tollgate',
    tagline: 'A consumer spending firewall that sits between AI shopping agents and your money.',
    category: 'Fintech',
    subcategory: 'Agentic Commerce',
    year: '2026',
    status: 'MVP Concept',
    coverGradient: 'linear-gradient(140deg, #0C1416 0%, #14323A 55%, #1E4D55 100%)',
    coverType: 'tollgate',
    coverEmoji: '🛡️',
    prototypePath: '/tollgate/index.html',
    problem:
      'By 2026, autonomous agents from OpenAI, Google, Visa, and Mastercard can run the full purchase loop: discover, compare, authorize, and pay, from a goal instead of a click. The intelligence is commoditizing fast; every platform is shipping a shopping agent. What no one has shipped is the consumer-owned layer that governs it: hard spend limits, approved merchants, ask-first thresholds, an audit trail, and revocation that is instant and enforceable. Without it, people are asked to hand an autonomous wallet a blank cheque, and most refuse.',
    discovery: [
      { stat: '$1T+', label: 'E-commerce spend agentic AI is projected to influence by 2026' },
      { stat: '81%', label: 'Of US consumers expect to use AI agents to shop' },
      { stat: '83%', label: 'Cite privacy, data misuse, or unwanted spend as their top concern' },
      { stat: '#1', label: 'Barrier analysts name for adoption is trust, not capability' },
    ],
    insight:
      'The agent is becoming a commodity every platform gives away. The scarce, ownable layer is verifiable, revocable permission: a firewall the user trusts more the longer it runs.',
    solution: [
      { icon: '01', label: 'Mandate builder', desc: 'Set a weekly cap, approved merchants, and allowed categories an agent can never exceed.' },
      { icon: '02', label: 'Ask-first thresholds', desc: 'Any spend over your limit pauses the agent and surfaces a request for a human tap.' },
      { icon: '03', label: 'Real-time approval', desc: 'Pending purchases arrive with line items, a cap check, and a countdown. Approve or decline in one move.' },
      { icon: '04', label: 'Instant revoke', desc: 'One tap disarms every agent, cancels in-flight buys, and is enforced at the network in real time.' },
      { icon: '05', label: 'Audit ledger', desc: 'Every approved, auto, and blocked purchase becomes an exportable receipt trail you and your bank can trust.' },
    ],
    quote: 'Do not sell a smarter agent. Sell the permission a human can trust.',
  },
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
    coverEmoji: '🌸',
    prototypePath: '/firstweeks/index.html',
    resetQuery: 'reset=true',
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
  {
    id: 'voca',
    title: 'Voca',
    tagline: 'Clinical voice analysis. Mobile-first. Built for therapists.',
    category: 'Health Tech',
    subcategory: 'Clinical SaaS',
    year: '2026',
    status: 'MVP Concept',
    coverType: 'voca',
    problem:
      'Speech therapy clinics run on desktop analysis software built 10–20 years ago. PRAAT is the dominant tool: free, powerful, and built for a 1992 desktop workflow. Manual acoustic scoring burns 20 minutes per patient session. Home practice goes unmeasured between appointments. No existing tool bridges clinic analysis with patient-owned progress tracking, and nothing in the category is HIPAA-compliant, mobile-first, and usable by both therapist and patient in the same session.',
    discovery: [
      { stat: '220K+', label: 'ASHA-member speech-language pathologists in the US alone' },
      { stat: '20 min', label: 'Typical manual acoustic scoring time per patient, replaced by under 2 minutes with automated analysis' },
      { stat: '$15B', label: 'Voice biomarker market projected by 2033, up from $2B today' },
      { stat: '$8K+', label: 'Entry cost for Kay Pentax Visi-Pitch, the primary hardware alternative to PRAAT' },
    ],
    insight:
      'The acoustic analysis engine already exists. What does not exist is the mobile delivery layer, the clinical report format, and the HIPAA-compliant infrastructure to make it usable inside and outside the clinic.',
    solution: [
      { icon: '01', label: '60-second voice recording', desc: 'Guided capture with real-time waveform visualization. Works in-session or as a patient home recording between appointments.' },
      { icon: '02', label: 'Acoustic analysis engine', desc: 'Parselmouth/Praat backend extracts pitch range, stability index, roughness score, jitter, shimmer, and resonance from each sample.' },
      { icon: '03', label: 'Therapy report card', desc: 'Structured acoustic report generated immediately: scored, formatted, and PDF-exportable before the patient leaves the room.' },
      { icon: '04', label: 'Patient home mode', desc: 'Patients self-record between sessions, log practice notes, and view per-metric progress curves inside the same app.' },
      { icon: '05', label: 'Therapist dashboard', desc: 'Web interface with full patient roster, session archive, report filtering by date and metric, and clinic-level aggregated data.' },
    ],
    quote: 'Do not sell a smarter acoustic engine. Sell the clinical workflow layer that fits in a coat pocket.',
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

const denslyOffer = [
  {
    step: '01',
    label: 'Lead magnet',
    title: 'Hair-loss diagnostic quiz',
    price: 'Free',
    body: 'An interactive quiz that helps users define their goal, treatment stage, and baseline risk before the first scan.',
  },
  {
    step: '02',
    label: 'Frontend',
    title: 'Basic selfie hair tracker',
    price: '$5/month',
    body: 'AI-aligned comparison images, monthly reminders, treatment notes, and basic progress history.',
  },
  {
    step: '03',
    label: 'Core',
    title: 'Advanced progression tracker',
    price: '$15/month',
    body: 'Zone timelines, density-style heatmaps, doctor-ready PDF reports, and confidence warnings.',
  },
]

const denslyProofBlocks = [
  {
    title: 'Why now',
    body: 'Personalized health tools, telehealth behavior, and AI-assisted image workflows make users more open to tracking outcomes outside the clinic.',
    cta: 'See why the timing matters',
  },
  {
    title: 'Proof and signals',
    body: 'The strongest validation path is not a viral launch. It is proving that repeated guided captures create more trustworthy follow-up evidence than random camera-roll photos.',
    cta: 'Explore proof signals',
  },
  {
    title: 'The market gap',
    body: 'The hair-loss market has treatments, clinics, creators, and anxious communities. What it lacks is a neutral measurement layer that helps users and clinicians trust the timeline.',
    cta: 'Understand the market gap',
  },
  {
    title: 'Execution plan',
    body: 'Start with a narrow consumer tracker, validate scan consistency, add dermatologist exports, then expand into clinic follow-up dashboards.',
    cta: 'View execution strategy',
  },
]

const denslyFrameworks = [
  {
    title: 'Value equation',
    metric: '6',
    label: 'Good',
    body: 'A strong painkiller concept, but it must earn trust before charging for advanced insight.',
  },
  {
    title: 'Market matrix',
    metric: 'Category king',
    label: 'High uniqueness / high value',
    body: 'The wedge is not another treatment app. It is outcome infrastructure for a treatment-heavy market.',
  },
  {
    title: 'A.C.P. framework',
    metric: '8 / 9 / 8',
    label: 'Audience / Community / Product',
    body: 'Hair-loss communities are active, the pain is visible, and the product can be tested with a small cohort.',
  },
  {
    title: 'Value ladder',
    metric: '$0 → $15 → Clinic',
    label: 'Continuity path',
    body: 'Free quiz, basic tracking, advanced reports, and clinic licensing create a clean expansion path.',
  },
]

const denslyCasePillars = [
  {
    label: 'Problem',
    title: 'Hair-loss progress is emotional, delayed, and badly documented.',
    body: 'People take random photos under different lighting, styling, angles, and hair lengths, then use those images to judge whether months of treatment are working. The decision loop is noisy, anxious, and easy to misread.',
  },
  {
    label: 'Why choose this',
    title: 'A large treatment market lacks a neutral outcome layer.',
    body: 'Minoxidil, finasteride, PRP, transplant recovery, supplements, and clinic plans all depend on proof over time. Densly does not compete with treatments. It measures whether the journey is becoming easier to understand.',
  },
  {
    label: 'Why an app',
    title: 'The phone is already the camera, reminder, journal, and report tool.',
    body: 'A mobile app can guide capture, reject weak photos, maintain monthly cadence, store treatment notes, and generate doctor-ready reports without asking users to buy separate hardware or visit a clinic every month.',
  },
]

/* ─── Voca data ─────────────────────────────────────────── */

const vocaCategorization = [
  { label: 'Type', value: 'SaaS' },
  { label: 'Market', value: 'B2B + B2C' },
  { label: 'Target', value: 'SLPs + patients' },
  { label: 'Main competitor', value: 'PRAAT / Kay Pentax' },
]

const vocaTrendAnalysis =
  'Voice biomarker market projected to grow from $2B to $15B by 2033. Telehealth normalization post-2020 has created direct demand from SLPs for mobile-native clinical tools that replace desktop-only workflows.'

const vocaOpportunity = [
  {
    label: 'Clinician pain',
    title: 'Manual acoustic scoring burns 20 minutes per session.',
    body: 'PRAAT requires manual extraction of pitch, jitter, and shimmer with no mobile interface, no patient-facing view, and no integrated report format. Sessions are interrupted by software crashes on aging clinic hardware.',
  },
  {
    label: 'Patient pain',
    title: 'Home practice goes unmeasured between appointments.',
    body: 'Patients complete voice exercises at home with no logging, no feedback, and no measurable continuity. Progress between sessions is invisible to the therapist until the next appointment.',
  },
  {
    label: 'Market pain',
    title: 'No HIPAA-compliant mobile SaaS exists for voice therapy.',
    body: 'Kay Pentax Visi-Pitch costs $8K+ in hardware. PRAAT is free but desktop-only with a steep learning curve. No product bridges the clinic-to-home gap with compliant, mobile-first infrastructure.',
  },
]

const vocaFlow = [
  { step: '01', title: 'Record', body: '60-second guided voice sample with live waveform visualization. Works in-session or as a home recording.' },
  { step: '02', title: 'Analyze', body: 'Parselmouth/Praat engine extracts pitch range, stability index, roughness, jitter, shimmer, and resonance in real time.' },
  { step: '03', title: 'Report', body: 'Acoustic report card generated immediately: scored, formatted, and PDF-exportable before the patient leaves.' },
  { step: '04', title: 'Archive', body: 'Session auto-syncs to therapist dashboard with session notes, acoustic data, and timestamps attached.' },
  { step: '05', title: 'Track', body: 'Patient home logs and per-metric progress curves are visible to both therapist and patient over time.' },
]

const vocaMvp = [
  '60-second voice recording with real-time waveform visualization',
  'Acoustic analysis: pitch range, stability index, roughness, jitter, shimmer, resonance',
  'Therapy report card: scored, formatted, PDF-exportable before patient departs',
  'Patient home mode: self-record, log entry, view progress graph per metric',
  'Session notes field auto-attached to every acoustic report',
  'Therapist web dashboard with patient roster, session archive, and trend filtering',
]

const vocaRisks = [
  { title: 'Accuracy risk', body: 'Acoustic scores must validate against manual therapist scoring within ±5% on pitch and roughness before any report is shown to a patient.' },
  { title: 'HIPAA risk', body: 'Patient voice data is PHI. Architecture requires encrypted storage, no PHI in system logs, and a BAA-ready infrastructure partner before any clinical deployment.' },
  { title: 'Adoption risk', body: 'SLPs are PRAAT-trained. Workflow change requires trust built through a structured beta with 10 therapists, 200 real sessions, and a published accuracy comparison.' },
  { title: 'Liability risk', body: 'Reports must be positioned as clinical decision support, not diagnostic output. Over-claiming acoustic accuracy creates direct regulatory exposure.' },
]

const vocaOffer = [
  {
    step: '01',
    label: 'Lead magnet',
    title: 'Voice Analysis Quick-Start Guide',
    price: 'Free',
    body: 'Downloadable PDF for SLPs, no account required. Distributed to ASHA community, Reddit r/slp, and LinkedIn SLP groups to drive awareness before beta launch.',
  },
  {
    step: '02',
    label: 'Solo',
    title: 'Per-therapist license',
    price: '$100/month',
    body: 'Unlimited voice recordings, full acoustic report suite, patient home mode for up to 10 active patients, and PDF export. No web dashboard access.',
  },
  {
    step: '03',
    label: 'Clinic',
    title: 'Per-seat clinic license',
    price: '$300–$500/month',
    body: 'Everything in Solo plus the web dashboard with full patient roster, progress tracking, trend visualization, HIPAA-compliant BAA storage, and multi-patient management.',
  },
]

const vocaProofBlocks = [
  {
    title: 'Market gap',
    body: 'ASHA has 220,000+ members. No mobile-first, HIPAA-compliant voice analysis SaaS exists. PRAAT and Kay Pentax are the only real incumbents, both desktop-first and patient-inaccessible.',
    cta: 'See the gap',
  },
  {
    title: 'Why now',
    body: 'Telehealth normalization created demand for device-agnostic clinical tools. Parselmouth makes portable acoustic analysis production-ready without building a custom engine from scratch.',
    cta: 'Explore the timing',
  },
  {
    title: 'Beachhead segment',
    body: 'Trans voice training SLPs are organized, vocal about tooling frustration, and underserved by generic clinical software. They are the proof cohort before expanding to broader SLP practice.',
    cta: 'Understand the wedge',
  },
  {
    title: 'Data moat',
    body: "Each session logged builds a normative database. Voca's acoustic benchmarks, covering trans voice and post-laryngeal surgery, become proprietary clinical reference data no competitor can replicate.",
    cta: 'View the moat',
  },
]

const vocaFrameworks = [
  {
    title: 'Value equation',
    metric: '8',
    label: 'Strong painkiller',
    body: 'Replaces a 20-min manual scoring workflow with a 2-min automated report. Time saved is immediate and measurable per session.',
  },
  {
    title: 'Market matrix',
    metric: 'Category king',
    label: 'High uniqueness / high value',
    body: 'No HIPAA-compliant mobile voice analysis SaaS exists. Voca enters a clear infrastructure gap, not a crowded feature market.',
  },
  {
    title: 'A.C.P. framework',
    metric: '8 / 9 / 9',
    label: 'Audience / Community / Product',
    body: 'SLP community is ASHA-organized, active on Reddit and LinkedIn, with a visible and vocal tool frustration signal.',
  },
  {
    title: 'Value ladder',
    metric: '$0 → $100 → $500',
    label: 'Lead → Solo → Clinic',
    body: 'Free guide, solo practice license, and clinic seat model create a clean expansion path from individual therapist to institutional.',
  },
]

const vocaCasePillars = [
  {
    label: 'Problem',
    title: 'Speech therapy runs on 20-year-old desktop software.',
    body: 'PRAAT and Kay Pentax Visi-Pitch dominate. PRAAT is free but requires manual scoring. Kay Pentax costs $8K+ in hardware. Neither is mobile, patient-facing, or delivered as HIPAA-compliant SaaS.',
  },
  {
    label: 'Why choose this',
    title: 'The infrastructure gap is structural, not technical.',
    body: 'Open-source acoustic analysis (Parselmouth/Praat) is already production-ready. The missing layer is mobile delivery, clinical report formatting, and HIPAA-compliant data architecture, not the analysis engine itself.',
  },
  {
    label: 'Why an app',
    title: 'The phone bridges clinic and home.',
    body: "Voice therapy requires both session data and home practice data. The same tool a therapist uses in-session becomes the patient's monitoring device between appointments, with no separate hardware required.",
  },
]

/* ─── iPhone frame ──────────────────────────────────────── */

/* ─── Voca visual components ────────────────────────────── */

function VocaFloatIcon({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  return (
    <div className={`${styles.vocaFloatIcon} ${size === 'lg' ? styles.vocaFloatIconLarge : styles.vocaFloatIconCard}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

function VocaCover() {
  return (
    <div className={styles.vocaCover}>
      <VocaFloatIcon size="sm" />
    </div>
  )
}

function VocaHeroSignalPanel() {
  return (
    <div className={styles.denslyHeroSignalPanel} aria-label="Voca concept signal">
      <VocaFloatIcon size="lg" />
      <div className={styles.denslyHeroSignalCopy}>
        <span>Clinical signal layer</span>
        <h2>Acoustic intelligence. Clinical format.</h2>
        <p>60-second voice capture, real-time Praat analysis, and a therapy-ready report card, before the patient stands up to leave.</p>
      </div>
      <div className={styles.denslyHeroSignalGrid}>
        <div><strong>60s</strong><span>capture</span></div>
        <div><strong>5</strong><span>acoustic metrics</span></div>
        <div><strong>PDF</strong><span>clinic export</span></div>
      </div>
    </div>
  )
}

function IPhoneFrame({
  src,
  resetKey,
  isLoading,
  onLoad,
  variant = 'inline',
  label = 'Mobile prototype',
  title = 'Mobile app prototype',
}: {
  src: string
  resetKey: number
  isLoading: boolean
  onLoad: () => void
  variant?: 'inline' | 'fullscreen'
  label?: string
  title?: string
}) {
  return (
    <div className={`${styles.phoneOuter} ${variant === 'fullscreen' ? styles.phoneOuterFullscreen : ''}`} aria-label={label}>
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
          title={title}
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

/* ─── Densly floating icon system ───────────────────────── */

function DenslyFloatingIcon({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  return (
    <div className={`${styles.denslyFloatIcon} ${size === 'lg' ? styles.denslyFloatIconLarge : styles.denslyFloatIconCard}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

function DenslyCover() {
  return (
    <div className={styles.denslyCover}>
      <DenslyFloatingIcon size="sm" />
    </div>
  )
}

function DenslyHeroSignalPanel() {
  return (
    <div className={styles.denslyHeroSignalPanel} aria-label="Densly concept signal">
      <DenslyFloatingIcon size="lg" />
      <div className={styles.denslyHeroSignalCopy}>
        <span>Outcome layer</span>
        <h2>Evidence over guesswork.</h2>
        <p>Guided captures, monthly comparison, confidence labels, and doctor-ready exports turn scattered selfies into a usable recovery record.</p>
      </div>
      <div className={styles.denslyHeroSignalGrid}>
        <div><strong>5</strong><span>guided views</span></div>
        <div><strong>30d</strong><span>scan cadence</span></div>
        <div><strong>PDF</strong><span>clinic export</span></div>
      </div>
    </div>
  )
}

/* ─── Densly case study ─────────────────────────────────── */

function DenslyDetail({ concept, onBack }: { concept: Concept; onBack: () => void }) {
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

  function handleRestart() {
    setIframeLoaded(false)
    setResetKey(k => k + 1)
  }

  const iframeSrc = resetKey === 0
    ? '/densly/index.html'
    : `/densly/index.html?restart=${resetKey}`

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
        <div className={styles.denslyHeroVisual} aria-label="Densly concept summary">
          <DenslyHeroSignalPanel />
        </div>
      </header>

      <section className={`${styles.section} ${styles.denslyIntroSection}`}>
        <span className={styles.sectionLabel}>Problem</span>
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

      <section className={styles.denslyCasePillarSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Case study frame</span>
          <h2>Problem, logic, format.</h2>
        </div>
        <div className={styles.denslyCasePillarGrid}>
          {denslyCasePillars.map(item => (
            <article key={item.label} className={styles.denslyCasePillarCard}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
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
          <h2>Commercial shape.</h2>
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
          <h2>Three groups need proof.</h2>
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

      <section className={`${styles.demoSection} ${styles.denslyPrototypeSection}`}>

        <div className={styles.demoText}>
          <span className={styles.sectionLabel}>Interactive prototype</span>
          <h2 className={styles.demoHeading}>Try the Densly flow</h2>
          <p className={styles.demoBody}>
            Explore the real Densly prototype inside the same iPhone-frame system used across the Concepts page. The flow focuses on guided onboarding, capture consistency, treatment context, and outcome reporting.
          </p>

          <div className={styles.demoActions}>
            <button className={styles.restartBtn} onClick={handleRestart}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7A5 5 0 1 1 7 2M7 2V0M7 2L10 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Restart prototype
            </button>
            <button className={styles.prototypeBtn} onClick={() => setPrototypeOpen(true)}>
              Open phone view
            </button>
            <p className={styles.demoNote}>
              Prototype is embedded locally. The app stays treatment-agnostic and avoids diagnostic claims.
            </p>
          </div>
        </div>

        <div className={styles.demoPhoneWrap}>
          <IPhoneFrame
            src={iframeSrc}
            resetKey={resetKey}
            isLoading={!iframeLoaded}
            onLoad={() => setIframeLoaded(true)}
            label="Densly mobile prototype"
            title="Densly app prototype"
          />
        </div>
      </section>

      {prototypeOpen && (
        <div className={styles.prototypeOverlay} role="dialog" aria-modal="true" aria-label="Densly full phone view">
          <div className={styles.prototypeToolbar}>
            <button className={styles.prototypeBackBtn} onClick={() => setPrototypeOpen(false)}>
              Back to case study
            </button>
            <button className={styles.restartBtn} onClick={handleRestart}>
              Restart prototype
            </button>
          </div>
          <div className={styles.prototypeStage}>
            <IPhoneFrame
              src={iframeSrc}
              resetKey={resetKey}
              isLoading={!iframeLoaded}
              onLoad={() => setIframeLoaded(true)}
              variant="fullscreen"
              label="Densly full mobile prototype"
              title="Densly app prototype"
            />
          </div>
        </div>
      )}

      <section className={styles.denslyFlowSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Measurement pipeline</span>
          <h2>Repeatable capture engine.</h2>
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
          <h2>Narrow MVP. Strong trust.</h2>
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

      <section className={styles.denslyOfferSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Offer strategy</span>
          <h2>From curiosity to clinic proof.</h2>
        </div>
        <div className={styles.denslyOfferGrid}>
          {denslyOffer.map(item => (
            <article key={item.title} className={styles.denslyOfferCard}>
              <span className={styles.denslyOfferStep}>{item.step}</span>
              <div>
                <span className={styles.denslyOfferLabel}>{item.label}</span>
                <h3>{item.title} <small>{item.price}</small></h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.denslyProofSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Proof and signals</span>
          <h2>Evidence must beat memory.</h2>
        </div>
        <div className={styles.denslyProofGrid}>
          {denslyProofBlocks.map(item => (
            <article key={item.title} className={styles.denslyProofCard}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>{item.cta} →</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.denslyFrameworkSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Framework fit</span>
          <h2>Strong opportunity. Trust first.</h2>
        </div>
        <div className={styles.denslyFrameworkGrid}>
          {denslyFrameworks.map(item => (
            <article key={item.title} className={styles.denslyFrameworkCard}>
              <span>{item.title}</span>
              <strong>{item.metric}</strong>
              <small>{item.label}</small>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.denslyRiskSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Validation gates</span>
          <h2>Prove consistency first.</h2>
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

/* ─── Voca case study ───────────────────────────────────── */

function VocaDetail({ concept, onBack }: { concept: Concept; onBack: () => void }) {
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

  function handleRestart() {
    setIframeLoaded(false)
    setResetKey(k => k + 1)
  }

  const iframeSrc = resetKey === 0 ? '/voca/index.html' : `/voca/index.html?restart=${resetKey}`

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
            <p>Do not build a smarter acoustic engine. Build the clinical workflow layer that puts a Praat-quality report in a coat pocket, before the patient stands up to leave.</p>
          </div>
        </div>
        <div className={`${styles.denslyHeroVisual} ${styles.vocaHeroVisual}`} aria-label="Voca concept summary">
          <VocaHeroSignalPanel />
        </div>
      </header>

      <section className={`${styles.section} ${styles.denslyIntroSection}`}>
        <span className={styles.sectionLabel}>Problem</span>
        <p className={styles.bodyLarge}>{concept.problem}</p>
        <div className={styles.denslyIntroGrid}>
          <div>
            <h2>The clinic runs on tools older than the iPhone.</h2>
          </div>
          <p>
            PRAAT is the industry standard: free, powerful, and designed for a 1992 desktop workflow. Acoustic scoring requires manual extraction, a separate report template, and a therapist who knows the software. Most do. None of that helps the patient who just left the room without their progress data.
          </p>
        </div>
      </section>

      <section className={styles.denslyCasePillarSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Case study frame</span>
          <h2>Problem, logic, format.</h2>
        </div>
        <div className={styles.denslyCasePillarGrid}>
          {vocaCasePillars.map(item => (
            <article key={item.label} className={styles.denslyCasePillarCard}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
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
        <p className={styles.denslySourceNote}>Source basis used for concept framing: ASHA membership data, voice biomarker market projections, telehealth adoption research, and clinical workflow timing benchmarks from speech-language pathology literature.</p>
      </section>

      <section className={styles.denslyCategorizationSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Categorization</span>
          <h2>Commercial shape.</h2>
        </div>
        <div className={styles.denslyCategorizationCard}>
          <div className={styles.denslyCategoryGrid}>
            {vocaCategorization.map(item => (
              <div key={item.label} className={styles.denslyCategoryItem}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className={styles.denslyTrendBlock}>
            <span>Trend analysis</span>
            <p>{vocaTrendAnalysis}</p>
          </div>
        </div>
      </section>

      <section className={styles.denslyMatrixSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Problem map</span>
          <h2>Three groups need better tools.</h2>
        </div>
        <div className={styles.denslyProblemGrid}>
          {vocaOpportunity.map(item => (
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

      <section className={styles.denslyFlowSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Analysis pipeline</span>
          <h2>Record to report in under 2 minutes.</h2>
        </div>
        <div className={styles.denslyFlowGrid}>
          {vocaFlow.map(item => (
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
          <h2>Narrow MVP. Clinical trust.</h2>
          <ul className={styles.denslyList}>
            {vocaMvp.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className={styles.denslySplitPanel}>
          <span className={styles.sectionLabel}>Business model</span>
          <div className={styles.denslyBusinessRows}>
            <div><span>Free</span><p>Voice Analysis Quick-Start Guide: PDF for SLPs, no account required.</p></div>
            <div><span>$100/mo</span><p>Solo therapist license. Unlimited recordings, full acoustic suite, up to 10 patient home mode slots, PDF export.</p></div>
            <div><span>$300–500/mo</span><p>Clinic seat license. Dashboard, progress tracking, HIPAA-compliant BAA storage, multi-patient management.</p></div>
            <div><span>Phase 2</span><p>API access for telehealth platform embedding (SimplePractice, Therapy Brands).</p></div>
          </div>
        </div>
      </section>

      <section className={styles.denslyOfferSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Offer strategy</span>
          <h2>From guide to clinic infrastructure.</h2>
        </div>
        <div className={styles.denslyOfferGrid}>
          {vocaOffer.map(item => (
            <article key={item.title} className={styles.denslyOfferCard}>
              <span className={styles.denslyOfferStep}>{item.step}</span>
              <div>
                <span className={styles.denslyOfferLabel}>{item.label}</span>
                <h3>{item.title} <small>{item.price}</small></h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.denslyProofSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Proof and signals</span>
          <h2>The category gap is documented.</h2>
        </div>
        <div className={styles.denslyProofGrid}>
          {vocaProofBlocks.map(item => (
            <article key={item.title} className={styles.denslyProofCard}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>{item.cta} →</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.denslyFrameworkSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Framework fit</span>
          <h2>Strong gap. Clear path.</h2>
        </div>
        <div className={styles.denslyFrameworkGrid}>
          {vocaFrameworks.map(item => (
            <article key={item.title} className={styles.denslyFrameworkCard}>
              <span>{item.title}</span>
              <strong>{item.metric}</strong>
              <small>{item.label}</small>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.denslyRiskSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>Validation gates</span>
          <h2>Trust before launch.</h2>
        </div>
        <div className={styles.denslyRiskGrid}>
          {vocaRisks.map(item => (
            <article key={item.title} className={styles.denslyRiskCard}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.demoSection} ${styles.denslyPrototypeSection} ${styles.vocaPrototypeSection}`}>
        <div className={styles.demoText}>
          <span className={styles.sectionLabel}>Interactive prototype</span>
          <h2 className={styles.demoHeading}>Try the Voca flow</h2>
          <p className={styles.demoBody}>
            Explore the full Voca prototype: onboarding, live recording session, acoustic report card, patient roster, and progress tracking. All interactions are clickable.
          </p>
          <div className={styles.demoActions}>
            <button className={styles.restartBtn} onClick={handleRestart}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7A5 5 0 1 1 7 2M7 2V0M7 2L10 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Restart prototype
            </button>
            <button className={styles.prototypeBtn} onClick={() => setPrototypeOpen(true)}>
              Open phone view
            </button>
            <p className={styles.demoNote}>
              Tap the red button on the record screen to run an analysis. All data is local. Nothing is sent anywhere.
            </p>
          </div>
        </div>
        <div className={styles.demoPhoneWrap}>
          <IPhoneFrame
            src={iframeSrc}
            resetKey={resetKey}
            isLoading={!iframeLoaded}
            onLoad={() => setIframeLoaded(true)}
            label="Voca mobile prototype"
            title="Voca app prototype"
          />
        </div>
      </section>

      {prototypeOpen && (
        <div className={styles.prototypeOverlay} role="dialog" aria-modal="true" aria-label="Voca full phone view">
          <div className={styles.prototypeToolbar}>
            <button className={styles.prototypeBackBtn} onClick={() => setPrototypeOpen(false)}>
              Back to case study
            </button>
            <button className={styles.restartBtn} onClick={handleRestart}>
              Restart prototype
            </button>
          </div>
          <div className={styles.prototypeStage}>
            <IPhoneFrame
              src={iframeSrc}
              resetKey={resetKey}
              isLoading={!iframeLoaded}
              onLoad={() => setIframeLoaded(true)}
              variant="fullscreen"
              label="Voca full mobile prototype"
              title="Voca app prototype"
            />
          </div>
        </div>
      )}

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

  if (concept.id === 'voca') {
    return <VocaDetail concept={concept} onBack={onBack} />
  }

  // Reset the embedded app, passes ?reset=true then bounces back
  function handleRestart() {
    setIframeLoaded(false)
    setResetKey(k => k + 1)
  }

  const protoPath = concept.prototypePath ?? '/firstweeks/index.html'
  const iframeSrc = resetKey === 0
    ? protoPath
    : `${protoPath}?${concept.resetQuery ? concept.resetQuery + '&' : ''}restart=${resetKey}`

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
        ) : concept.coverType === 'voca' ? (
          <VocaCover />
        ) : (
          <div className={styles.cardCoverInner}>
            <span className={styles.cardEmoji}>{concept.coverEmoji ?? '🌸'}</span>
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

const CONCEPT_FILTERS = ['All', 'Health Tech', 'Fintech'] as const

export function ConceptsPage({ embedded = false }: { embedded?: boolean } = {}) {
  const [active, setActive] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('All')

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

  const body = activeConcept ? (
    <ConceptDetail concept={activeConcept} onBack={closeConcept} />
  ) : (
    <>
      {/* ── Page header ── */}
      {!embedded && (
        <header className={styles.pageHeader}>
          <p className={styles.pageLabel}>Nocturnal</p>
          <h1 className={styles.pageTitle}>Concepts</h1>
          <p className={styles.pageSubtitle}>
            Independently researched product concepts, each rooted in a real problem,
            designed end-to-end, and built as interactive or product-ready case studies.
          </p>
        </header>
      )}

      {/* ── Category filters ── */}
      <div className={styles.filters} role="tablist" aria-label="Filter concepts by category">
        {CONCEPT_FILTERS.map(f => (
          <button
            key={f}
            type="button"
            className={`${styles.chip} ${filter === f ? styles.chipActive : ''}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className={styles.grid}>
        {CONCEPTS
          .filter(c => filter === 'All' || c.category === filter)
          .map(c => (
            <ConceptCard key={c.id} concept={c} onClick={() => openConcept(c.id)} />
          ))}

        {/* Coming soon placeholder — only in the unfiltered view */}
        {filter === 'All' && (
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
        )}
      </div>
    </>
  )

  if (embedded) return body

  return <div className={styles.page}>{body}</div>
}
