import { useState, useEffect } from 'react'
import styles from './ConceptsPage.module.css'

/* ─── Types ─────────────────────────────────────────────── */

type Stat = { stat: string; label: string }
type Method = { method: string; why: string; what: string; how: string }
type Step = { step: string; title: string; body: string }
type Solution = { icon: string; label: string; desc: string }

type Concept = {
  id: string
  title: string
  /** Hero subtitle — impact + scope + product name, per the case-study template. */
  tagline: string
  category: string
  subcategory: string
  year: string
  status: string
  coverGradient?: string
  coverType?: 'firstweeks' | 'densly' | 'tollgate' | 'voca'
  coverEmoji?: string
  prototypePath: string
  resetQuery?: string
  thesis: string

  /* 2 · Overview */
  overview: {
    summary: string
    role: string
    timeline: string
    tools: string
    methods: string
    problem: string
  }

  /* 3 · Discovery */
  discovery: Stat[]
  methods: Method[]
  insight: string

  /* 4 · Process */
  processIntro: string
  process: Step[]

  /* 5 · Final design */
  designRationale: string
  solution: Solution[]
  prototypeCopy: string
  prototypeNote: string

  /* 6 · Impact */
  impactIntro: string
  impact: Stat[]

  /* 7 · Learnings */
  learnings: string[]

  quote: string
}

/* ─── Data ──────────────────────────────────────────────── */

const CONCEPTS: Concept[] = [
  {
    id: 'tollgate',
    title: 'Tollgate',
    tagline:
      'Giving people a spending firewall they trust more the longer it runs — a consumer-owned control layer that sits between AI shopping agents and their money.',
    category: 'Fintech',
    subcategory: 'Agentic Commerce',
    year: '2026',
    status: 'MVP Concept',
    coverGradient: 'linear-gradient(140deg, #0C1416 0%, #14323A 55%, #1E4D55 100%)',
    coverType: 'tollgate',
    coverEmoji: '🛡️',
    prototypePath: '/tollgate/index.html',
    thesis:
      'Do not build a smarter agent — every platform is giving that away. Build the permission a human can trust: hard limits, instant revocation, and an audit trail the user owns.',
    overview: {
      summary:
        'Tollgate is a consumer spending firewall for the agentic-commerce era. As autonomous agents start running the full purchase loop, the missing piece is not more intelligence — it is a control layer the buyer owns and can revoke. This concept designs that layer end to end, from mandate to audit trail.',
      role: 'Solo — product strategy, UX architecture, UI, prototype',
      timeline: '2026 · 3-week concept sprint',
      tools: 'Figma, React, Framer Motion',
      methods: 'Competitive scan, trust modeling, task flows, prototype',
      problem:
        'By 2026, autonomous agents from OpenAI, Google, Visa, and Mastercard can run the full purchase loop: discover, compare, authorize, and pay, from a goal instead of a click. The intelligence is commoditizing fast; every platform is shipping a shopping agent. What no one has shipped is the consumer-owned layer that governs it: hard spend limits, approved merchants, ask-first thresholds, an audit trail, and revocation that is instant and enforceable. Without it, people are asked to hand an autonomous wallet a blank cheque, and most refuse.',
    },
    discovery: [
      { stat: '$1T+', label: 'E-commerce spend agentic AI is projected to influence by 2026' },
      { stat: '81%', label: 'Of US consumers expect to use AI agents to shop' },
      { stat: '83%', label: 'Cite privacy, data misuse, or unwanted spend as their top concern' },
      { stat: '#1', label: 'Barrier analysts name for adoption is trust, not capability' },
    ],
    methods: [
      {
        method: 'Competitive scan',
        why: 'To check whether any incumbent already ships a consumer-owned control layer.',
        what: 'Every major player ships the agent; none ship user-owned spend governance.',
        how: 'Positioned Tollgate as the permission layer, deliberately not another agent.',
      },
      {
        method: 'Trust modeling',
        why: 'Adoption is blocked by trust, not capability — so trust had to be the design object.',
        what: '83% of buyers name privacy, misuse, or unwanted spend as their first fear.',
        how: 'Made every control revocable, auditable, and enforced at the network in real time.',
      },
      {
        method: 'Task-flow mapping',
        why: 'To isolate the exact moments a human must stay in the loop.',
        what: 'Only three decisions truly need a person: set the mandate, approve an over-limit buy, revoke.',
        how: 'Compressed the entire control surface down to those three human taps.',
      },
    ],
    insight:
      'The agent is becoming a commodity every platform gives away. The scarce, ownable layer is verifiable, revocable permission: a firewall the user trusts more the longer it runs.',
    processIntro:
      'The flow is built around a single principle: the agent acts freely inside rails the user set, and pauses the moment it reaches an edge.',
    process: [
      { step: '01', title: 'Set the mandate', body: 'The user defines a weekly cap, approved merchants, and allowed categories once.' },
      { step: '02', title: 'Agent acts in rails', body: 'Inside those limits the agent buys without friction — no per-purchase nagging.' },
      { step: '03', title: 'Edge pauses it', body: 'Any spend over the threshold freezes the agent and surfaces a request to a human.' },
      { step: '04', title: 'Human decides', body: 'Line items, a cap check, and a countdown arrive together. Approve or decline in one move.' },
      { step: '05', title: 'Everything logs', body: 'Approved, auto, and blocked buys all become an exportable receipt trail the user owns.' },
    ],
    designRationale:
      'The interface hides the machinery and exposes only what a person needs to trust the system: what it is allowed to do, what it is asking for now, and how to shut it off. Every screen answers one of those three questions.',
    solution: [
      { icon: '01', label: 'Mandate builder', desc: 'Set a weekly cap, approved merchants, and allowed categories an agent can never exceed.' },
      { icon: '02', label: 'Ask-first thresholds', desc: 'Any spend over your limit pauses the agent and surfaces a request for a human tap.' },
      { icon: '03', label: 'Real-time approval', desc: 'Pending purchases arrive with line items, a cap check, and a countdown. Approve or decline in one move.' },
      { icon: '04', label: 'Instant revoke', desc: 'One tap disarms every agent, cancels in-flight buys, and is enforced at the network in real time.' },
      { icon: '05', label: 'Audit ledger', desc: 'Every approved, auto, and blocked purchase becomes an exportable receipt trail you and your bank can trust.' },
    ],
    prototypeCopy:
      'Walk the real Tollgate flow: build a mandate, watch the agent buy inside its rails, catch an over-limit request, and revoke in a single tap.',
    prototypeNote: 'Prototype runs locally. No real payment rails are touched — all state is simulated in-browser.',
    impactIntro:
      'As a concept, impact is framed as the success metrics the design is built to hit — the bar a real launch would be measured against.',
    impact: [
      { stat: '3 taps', label: 'The entire human control surface: set mandate, approve, revoke' },
      { stat: '100%', label: 'Of purchases captured in an exportable, bank-legible audit trail' },
      { stat: '<1s', label: 'Target for revocation to be enforced at the network, not just the app' },
      { stat: '0', label: 'Blank-cheque trust required to switch an agent on' },
    ],
    learnings: [
      'Trust is a product surface, not a legal footnote — it earns its own screens.',
      'The strongest feature is the off switch; revocation being instant is what makes the rest usable.',
      'Designing for restraint (fewer decisions surfaced) built more confidence than designing for control (more toggles).',
      'Positioning against the category leaders as the layer they lack was clearer than competing on features.',
    ],
    quote: 'Do not sell a smarter agent. Sell the permission a human can trust.',
  },
  {
    id: 'densly',
    title: 'Densly',
    tagline:
      'Turning scattered mirror-checks into evidence — a treatment-outcome platform that tells people whether their hair-loss routine is actually working.',
    category: 'Health Tech',
    subcategory: 'Outcome Tracking',
    year: '2026',
    status: 'MVP Concept',
    coverType: 'densly',
    prototypePath: '/densly/index.html',
    thesis:
      'Build trust before intelligence. The first product win is not an AI diagnosis — it is repeatable image capture, honest uncertainty, and clinic-ready evidence.',
    overview: {
      summary:
        'Densly is an outcome-tracking platform for people on long, emotionally charged hair-loss treatments. It does not diagnose. It makes a user’s own evidence consistent enough that they, their doctor, and their clinic can trust the timeline — turning noisy camera-roll selfies into a controlled monthly record.',
      role: 'Solo — research, UX, UI, prototype',
      timeline: '2026 · concept build',
      tools: 'Figma, React, on-device capture logic',
      methods: 'Clinical literature review, competitor teardown, capture protocol design, prototype',
      problem:
        'Hair-loss treatment is slow, emotionally charged, and hard to measure. People spend on minoxidil, finasteride, supplements, laser devices, clinic procedures, and transplant aftercare, then judge progress through mirror checks and inconsistent photos taken under different light, angle, and hair state.',
    },
    discovery: [
      { stat: '4–8 mo', label: 'Typical window before visible treatment change becomes easier to judge' },
      { stat: '3.5 mo', label: 'Median discontinuation point reported among non-adherent topical minoxidil users' },
      { stat: '2.6x', label: 'Higher 1-year follow-up probability when photographic assessment was used in AGA care' },
      { stat: '5 views', label: 'Minimum baseline set: front, crown, left temple, right temple, top-down' },
    ],
    methods: [
      {
        method: 'Clinical literature review',
        why: 'To ground the product in how progress is actually judged in dermatology, not in app-store hype.',
        what: 'Photographic follow-up more than doubles one-year retention in androgenetic alopecia care.',
        how: 'Made standardized capture — not a magic density score — the core of the MVP.',
      },
      {
        method: 'Competitor teardown',
        why: 'To find the gap between products that sell treatments and those that measure them.',
        what: 'Brands sell products, clinics sell procedures, communities sell hope — nobody owns the neutral outcome layer.',
        how: 'Positioned Densly as treatment-agnostic infrastructure that stays credible by not selling a cure.',
      },
      {
        method: 'Capture-protocol design',
        why: 'Because inconsistent inputs are the real reason progress is unreadable.',
        what: 'Distance, pose, angle, lighting, and hair state each swing how the same scalp looks.',
        how: 'Built a quality gate that rejects weak captures before they ever reach comparison.',
      },
    ],
    insight:
      'The product should not diagnose hair loss. It should make the user’s evidence consistent enough for them, their doctor, and their clinic to trust the timeline.',
    processIntro:
      'Densly runs a repeatable measurement pipeline: every scan is controlled, gated, aligned, labeled with honest confidence, and packaged for a clinician.',
    process: [
      { step: '01', title: 'Baseline', body: 'Five guided views establish the first comparable record.' },
      { step: '02', title: 'Quality gate', body: 'The app rejects bad lighting, wet hair, and mismatched angles before accepting a scan.' },
      { step: '03', title: 'Alignment', body: 'New photos are matched to baseline by zone and crop so progress is judged consistently.' },
      { step: '04', title: 'Signal', body: 'Users see confidence-labeled progress instead of a fake certainty score.' },
      { step: '05', title: 'Report', body: 'A clinic-ready export turns months of photos into a readable outcome file.' },
    ],
    designRationale:
      'Every decision optimizes for credibility over reassurance. Monthly cadence beats daily scoring because it prevents anxiety spirals; confidence labels beat a single number because honesty is what a doctor will trust. The MVP earns the right to charge for insight by first proving its evidence is stable.',
    solution: [
      { icon: '01', label: 'Guided monthly capture', desc: 'The app controls distance, pose, angle, lighting, and hair-state notes before accepting a scan.' },
      { icon: '02', label: 'Quality gate', desc: 'Bad inputs are rejected. Wet hair, harsh shadow, mismatched angle, and low scalp visibility are flagged before comparison.' },
      { icon: '03', label: 'Zone comparison', desc: 'Front, crown, and temple zones are aligned against baseline so progress is judged consistently over months.' },
      { icon: '04', label: 'Doctor-ready report', desc: 'A clean PDF turns scattered selfies into a chronological treatment record with notes, images, and confidence labels.' },
      { icon: '05', label: 'Clinic dashboard', desc: 'Clinics can monitor post-procedure and medication follow-ups without asking patients to manually explain their progress.' },
    ],
    prototypeCopy:
      'Explore the real Densly flow: guided onboarding, capture consistency, treatment context, and outcome reporting — inside the same iPhone-frame system used across every concept.',
    prototypeNote: 'Prototype is embedded locally. The app stays treatment-agnostic and avoids diagnostic claims.',
    impactIntro:
      'Impact is framed as the validation targets Densly must clear before it earns the right to charge for advanced insight.',
    impact: [
      { stat: '±0', label: 'Two scans ten minutes apart should read the same — stability is the whole product' },
      { stat: '30d', label: 'Capture cadence that measures progress without feeding daily anxiety' },
      { stat: '5→1', label: 'Five scattered selfies compressed into one clinic-legible outcome file' },
      { stat: 'Neutral', label: 'Owns the trust layer by staying treatment-agnostic' },
    ],
    learnings: [
      'In health tools, restraint is a feature — refusing to diagnose is what makes the product trustworthy.',
      'Consistency of input beats sophistication of analysis; a great model on noisy photos still lies.',
      'The report is the product. The moment a user can hand a clinician clean evidence is where value crystallizes.',
      'Anxiety is a design constraint. Cadence and language did more for safety than any disclaimer.',
    ],
    quote: 'Do not sell a miracle. Sell the missing measurement layer.',
  },
  {
    id: 'firstweeks',
    title: 'Firstweeks',
    tagline:
      'Closing the gap between hospital discharge and the six-week check-up — a postpartum recovery operating system for first-time mothers.',
    category: 'Health Tech',
    subcategory: 'Mobile App',
    year: '2025',
    status: 'Concept',
    coverGradient: 'linear-gradient(135deg, #DCD8FF 0%, #FFD5E8 50%, #B7CCFF 100%)',
    coverType: 'firstweeks',
    coverEmoji: '🌸',
    prototypePath: '/firstweeks/index.html',
    resetQuery: 'reset=true',
    thesis:
      'The baby already has a thousand trackers. Firstweeks is the one system built for the mother — the missing daily support layer between discharge and the next real clinical appointment.',
    overview: {
      summary:
        'Firstweeks is a postpartum recovery OS for first-time mothers. After birth, structured care drops to near zero while risk stays high. This concept designs the daily support layer that fills the gap: adaptive check-ins, honest triage, and a clean bridge to a clinician when it matters.',
      role: 'Solo — product strategy, UX, UI, prototype',
      timeline: '2025 · concept build',
      tools: 'Figma, React, local-first storage',
      methods: 'Maternal-health research, journey mapping, triage-logic design, prototype',
      problem:
        'After birth, care drops sharply while risk remains high. A mother is discharged with pamphlets, a phone number, and a six-week appointment. In those weeks, she is expected to identify warning signs, manage pain, feed a newborn, and recover with no structured daily support layer.',
    },
    discovery: [
      { stat: '4–6 weeks', label: 'Average gap between discharge and first postpartum visit' },
      { stat: '50%+', label: 'Of maternal deaths occur after the first 24 hours postpartum' },
      { stat: '1 in 5', label: 'Mothers experience postpartum depression or anxiety' },
      { stat: '80%', label: 'Of postpartum complications are preventable with timely triage' },
    ],
    methods: [
      {
        method: 'Maternal-health research',
        why: 'To understand where the clinical safety net actually fails, not where it looks like it fails.',
        what: 'Most maternal deaths happen after the first day, deep inside the unsupported discharge gap.',
        how: 'Focused the product on the weeks between discharge and the six-week visit, not on birth or the baby.',
      },
      {
        method: 'Journey mapping',
        why: 'To see the mother’s real day, where existing apps stop being useful.',
        what: 'Pregnancy apps end at birth; baby apps track the baby — nobody owns the mother’s recovery.',
        how: 'Designed a mother-first system with a daily rhythm rather than a reference library.',
      },
      {
        method: 'Triage-logic design',
        why: 'Because a vague “see a doctor” is exactly what fails an exhausted new parent.',
        what: '80% of complications are preventable with timely, specific escalation.',
        how: 'Built green/yellow/red classification with concrete next steps for each state.',
      },
    ],
    insight:
      'Most pregnancy apps stop being useful at birth. Most baby apps track the baby. No product acts as the missing layer between hospital discharge and the next real clinical appointment.',
    processIntro:
      'The daily loop is short by design: a mother answers a few adaptive questions, gets a clear signal, and — only when needed — is handed the exact words to escalate.',
    process: [
      { step: '01', title: 'Check in', body: 'A few adaptive questions that change with delivery type, postpartum day, and prior answers.' },
      { step: '02', title: 'Triage', body: 'Answers resolve to green, yellow, or red — never a vague “see a doctor”.' },
      { step: '03', title: 'Escalate', body: 'A red or yellow state produces a specific action path, not generic advice.' },
      { step: '04', title: 'Communicate', body: 'Check-in data auto-builds a structured symptom summary, ready to copy or SMS to a clinician.' },
      { step: '05', title: 'Track', body: 'Mood and recovery patterns accumulate so a real signal is visible before the six-week visit.' },
    ],
    designRationale:
      'Every interaction assumes an exhausted, overloaded user, so the product does the thinking. Questions adapt instead of repeating; triage resolves to a concrete step instead of a warning; the mental-health layer is built into the daily flow rather than bolted on, because the highest-risk moments are the easiest to hide.',
    solution: [
      { icon: '🩺', label: 'Adaptive daily check-ins', desc: 'Questions change based on delivery type, postpartum day, and prior answers.' },
      { icon: '⚡', label: 'Risk triage', desc: 'Green / yellow / red classification with specific escalation paths, never a vague see a doctor.' },
      { icon: '💬', label: 'Doctor message builder', desc: 'Auto-generates a structured symptom summary from check-in data, ready to copy or SMS.' },
      { icon: '🤍', label: 'Mental health layer', desc: 'EPDS-style mood screening, harm-thought escalation, and mood pattern tracking built into every check-in.' },
      { icon: '🌸', label: 'Clinician-reviewed community', desc: 'Moderated insights from mothers with similar recovery profiles, not an open forum.' },
    ],
    prototypeCopy:
      'Complete the onboarding, run a daily check-in, write a journal entry, and explore the care hub. The full prototype runs exactly as it would on a real device.',
    prototypeNote: 'All data is stored locally in your browser. Nothing is sent anywhere.',
    impactIntro:
      'Impact is framed as the outcomes Firstweeks is designed to move in the gap the health system currently leaves open.',
    impact: [
      { stat: '4–6 wk', label: 'The unsupported window this system is built to cover, day by day' },
      { stat: '80%', label: 'Of complications are preventable — the ceiling timely triage is aiming at' },
      { stat: '1 tap', label: 'From symptom to a clinician-ready message, removing the “what do I even say” barrier' },
      { stat: 'Daily', label: 'Cadence that catches mental-health risk that a six-week gap would miss' },
    ],
    learnings: [
      'Designing for an exhausted user means removing decisions, not adding features.',
      'Specific escalation beats comprehensive information — one clear next step outperforms a library.',
      'The highest-value moment was translation: turning a scary symptom into words a mother can send a doctor.',
      'Mental health can’t be a separate tab; embedding screening in the daily loop is what surfaces the risk.',
    ],
    quote: 'The baby has a thousand trackers. The mother needs one recovery system.',
  },
  {
    id: 'voca',
    title: 'Voca',
    tagline:
      'Putting a Praat-quality report in a coat pocket — clinical voice analysis, mobile-first, built for therapists and their patients.',
    category: 'Health Tech',
    subcategory: 'Clinical SaaS',
    year: '2026',
    status: 'MVP Concept',
    coverType: 'voca',
    prototypePath: '/voca/index.html',
    thesis:
      'Do not build a smarter acoustic engine — that already exists. Build the clinical workflow layer that delivers a therapy-ready report before the patient stands up to leave.',
    overview: {
      summary:
        'Voca is a mobile-first clinical voice-analysis tool for speech-language pathologists and their patients. The acoustic engine is a solved problem; the gap is delivery. Voca wraps production-ready analysis in a HIPAA-compliant, phone-native workflow that works in-session and at home.',
      role: 'Solo — product strategy, UX, UI, prototype',
      timeline: '2026 · concept build',
      tools: 'Figma, React, Parselmouth/Praat backend',
      methods: 'Market sizing, clinician workflow analysis, report-format design, prototype',
      problem:
        'Speech therapy clinics run on desktop analysis software built 10–20 years ago. PRAAT is the dominant tool: free, powerful, and built for a 1992 desktop workflow. Manual acoustic scoring burns 20 minutes per patient session. Home practice goes unmeasured between appointments. Nothing in the category is HIPAA-compliant, mobile-first, and usable by both therapist and patient in the same session.',
    },
    discovery: [
      { stat: '220K+', label: 'ASHA-member speech-language pathologists in the US alone' },
      { stat: '20 min', label: 'Manual acoustic scoring time per patient, replaced by under 2 minutes automated' },
      { stat: '$15B', label: 'Voice biomarker market projected by 2033, up from $2B today' },
      { stat: '$8K+', label: 'Entry cost for Kay Pentax Visi-Pitch, the primary hardware alternative to PRAAT' },
    ],
    methods: [
      {
        method: 'Market sizing',
        why: 'To confirm the audience is large, organized, and reachable before designing anything.',
        what: '220K+ ASHA SLPs, a market scaling from $2B to $15B, and no mobile-first compliant tool.',
        how: 'Chose a clear infrastructure gap over a crowded feature race.',
      },
      {
        method: 'Clinician workflow analysis',
        why: 'To find where the 20 desktop minutes per session actually go.',
        what: 'Manual extraction, a separate report template, and aging hardware crashes eat the session.',
        how: 'Designed a record-to-report path that finishes before the patient leaves the room.',
      },
      {
        method: 'Report-format design',
        why: 'Because the deliverable — not the engine — is what a clinic pays for.',
        what: 'A scored, formatted, PDF-exportable card is the artifact that carries clinical trust.',
        how: 'Made the report card the center of the product and the moment of value.',
      },
    ],
    insight:
      'The acoustic analysis engine already exists. What does not exist is the mobile delivery layer, the clinical report format, and the HIPAA-compliant infrastructure to make it usable inside and outside the clinic.',
    processIntro:
      'Voca compresses a 20-minute desktop workflow into a five-step loop that runs on a phone and syncs to a clinician dashboard.',
    process: [
      { step: '01', title: 'Record', body: '60-second guided voice sample with live waveform. Works in-session or as a home recording.' },
      { step: '02', title: 'Analyze', body: 'Parselmouth/Praat extracts pitch range, stability, roughness, jitter, shimmer, and resonance in real time.' },
      { step: '03', title: 'Report', body: 'An acoustic report card is generated immediately: scored, formatted, PDF-exportable.' },
      { step: '04', title: 'Archive', body: 'The session auto-syncs to the therapist dashboard with notes and timestamps attached.' },
      { step: '05', title: 'Track', body: 'Patient home logs and per-metric progress curves stay visible to both sides over time.' },
    ],
    designRationale:
      'The design treats the report card as the product and everything else as plumbing. Recording is guided so patients can self-serve at home; analysis is invisible; the dashboard exists only to keep the therapist’s roster and trends in one place. Positioning as clinical decision support — not diagnosis — keeps the product trustworthy and out of regulatory overreach.',
    solution: [
      { icon: '01', label: '60-second voice recording', desc: 'Guided capture with real-time waveform visualization. Works in-session or as a patient home recording between appointments.' },
      { icon: '02', label: 'Acoustic analysis engine', desc: 'Parselmouth/Praat backend extracts pitch range, stability index, roughness score, jitter, shimmer, and resonance from each sample.' },
      { icon: '03', label: 'Therapy report card', desc: 'Structured acoustic report generated immediately: scored, formatted, and PDF-exportable before the patient leaves the room.' },
      { icon: '04', label: 'Patient home mode', desc: 'Patients self-record between sessions, log practice notes, and view per-metric progress curves inside the same app.' },
      { icon: '05', label: 'Therapist dashboard', desc: 'Web interface with full patient roster, session archive, report filtering by date and metric, and clinic-level aggregated data.' },
    ],
    prototypeCopy:
      'Explore the full Voca flow: onboarding, a live recording session, the acoustic report card, patient roster, and progress tracking. Every interaction is clickable.',
    prototypeNote: 'Tap the red button on the record screen to run an analysis. All data is local. Nothing is sent anywhere.',
    impactIntro:
      'Impact is framed as the clinical and commercial targets Voca must hit to move an SLP off a 20-year-old desktop tool.',
    impact: [
      { stat: '20→2', label: 'Minutes per session — the time reclaimed by automating acoustic scoring' },
      { stat: '±5%', label: 'Accuracy bar against manual therapist scoring before any report is shown' },
      { stat: '0', label: 'PHI in system logs — HIPAA compliance is a precondition, not a feature' },
      { stat: 'Clinic+home', label: 'One tool spanning the session and the practice between sessions' },
    ],
    learnings: [
      'When the engine is commoditized, the delivery layer is the whole opportunity.',
      'The deliverable is the product — designing the report card first clarified every other screen.',
      'Compliance is a design constraint from line one, not a later hardening pass.',
      'Bridging clinic and home in one app turned two disconnected data sources into a single progress story.',
    ],
    quote: 'Do not sell a smarter acoustic engine. Sell the clinical workflow layer that fits in a coat pocket.',
  },
]

/* ─── Cover visuals ─────────────────────────────────────── */

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

/* ─── iPhone frame ──────────────────────────────────────── */

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

/* ─── Case study template (uxfol.io 7-section structure) ─── */

function CaseStudyTemplate({ concept, onBack }: { concept: Concept; onBack: () => void }) {
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
    ? concept.prototypePath
    : `${concept.prototypePath}?${concept.resetQuery ? concept.resetQuery + '&' : ''}restart=${resetKey}`

  return (
    <div className={styles.detail}>
      <button className={styles.backBtn} onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All concepts
      </button>

      {/* 1 · Hero ─────────────────────────────────────────── */}
      <header className={styles.detailHero}>
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
          <p>{concept.thesis}</p>
        </div>
      </header>

      {/* 2 · Overview ─────────────────────────────────────── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>01 · Overview</span>
        <p className={styles.bodyLarge}>{concept.overview.summary}</p>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewItem}><span>Role</span><strong>{concept.overview.role}</strong></div>
          <div className={styles.overviewItem}><span>Timeline</span><strong>{concept.overview.timeline}</strong></div>
          <div className={styles.overviewItem}><span>Tools</span><strong>{concept.overview.tools}</strong></div>
          <div className={styles.overviewItem}><span>Methods</span><strong>{concept.overview.methods}</strong></div>
        </div>
        <div className={styles.overviewProblem}>
          <span className={styles.overviewProblemLabel}>The core problem</span>
          <p>{concept.overview.problem}</p>
        </div>
      </section>

      {/* 3 · Discovery ────────────────────────────────────── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>02 · Discovery</span>
        <div className={styles.statsGrid}>
          {concept.discovery.map(d => (
            <div key={d.stat} className={styles.statCard}>
              <span className={styles.statNum}>{d.stat}</span>
              <span className={styles.statLabel}>{d.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.methodGrid}>
          {concept.methods.map(m => (
            <article key={m.method} className={styles.methodCard}>
              <h3 className={styles.methodTitle}>{m.method}</h3>
              <div className={styles.methodRow}><span>Why</span><p>{m.why}</p></div>
              <div className={styles.methodRow}><span>What</span><p>{m.what}</p></div>
              <div className={styles.methodRow}><span>How</span><p>{m.how}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* Insight pull-quote */}
      <section className={styles.insightBlock}>
        <p className={styles.insightText}>"{concept.insight}"</p>
      </section>

      {/* 4 · Process ──────────────────────────────────────── */}
      <section className={styles.denslyFlowSection}>
        <div className={styles.denslySectionHeader}>
          <span className={styles.sectionLabel}>03 · Design process</span>
          <p>{concept.processIntro}</p>
        </div>
        <div className={styles.denslyFlowGrid}>
          {concept.process.map(item => (
            <article key={item.step} className={styles.denslyFlowCard}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5 · Final design ─────────────────────────────────── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>04 · Final design</span>
        <p className={styles.bodyLarge}>{concept.designRationale}</p>
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

      {/* Interactive prototype (the phone screen) */}
      <section className={`${styles.demoSection} ${styles.denslyPrototypeSection}`}>
        <div className={styles.demoText}>
          <span className={styles.sectionLabel}>Interactive prototype</span>
          <h2 className={styles.demoHeading}>Try the {concept.title} flow</h2>
          <p className={styles.demoBody}>{concept.prototypeCopy}</p>
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
            <p className={styles.demoNote}>{concept.prototypeNote}</p>
          </div>
        </div>
        <div className={styles.demoPhoneWrap}>
          <IPhoneFrame
            src={iframeSrc}
            resetKey={resetKey}
            isLoading={!iframeLoaded}
            onLoad={() => setIframeLoaded(true)}
            label={`${concept.title} mobile prototype`}
            title={`${concept.title} app prototype`}
          />
        </div>
      </section>

      {prototypeOpen && (
        <div className={styles.prototypeOverlay} role="dialog" aria-modal="true" aria-label={`${concept.title} full phone view`}>
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
              label={`${concept.title} full mobile prototype`}
              title={`${concept.title} app prototype`}
            />
          </div>
        </div>
      )}

      {/* 6 · Impact ───────────────────────────────────────── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>05 · Projected impact</span>
        <p className={styles.bodyLarge}>{concept.impactIntro}</p>
        <div className={styles.statsGrid}>
          {concept.impact.map(d => (
            <div key={d.label} className={styles.statCard}>
              <span className={styles.statNum}>{d.stat}</span>
              <span className={styles.statLabel}>{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7 · Learnings ────────────────────────────────────── */}
      <section className={styles.section}>
        <span className={styles.sectionLabel}>06 · Learnings</span>
        <ul className={styles.learnList}>
          {concept.learnings.map(l => <li key={l}>{l}</li>)}
        </ul>
      </section>

      {/* Closing line */}
      <section className={styles.quoteBlock}>
        <p className={styles.quote}>{concept.quote}</p>
      </section>
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
    <CaseStudyTemplate concept={activeConcept} onBack={closeConcept} />
  ) : (
    <>
      {!embedded && (
        <header className={styles.pageHeader}>
          <p className={styles.pageLabel}>Nocturnal</p>
          <h1 className={styles.pageTitle}>Concepts</h1>
          <p className={styles.pageSubtitle}>
            Independently researched product concepts, each rooted in a real problem,
            designed end-to-end, and documented as a full case study you could copy the structure of.
          </p>
        </header>
      )}

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

      <div className={styles.grid}>
        {CONCEPTS
          .filter(c => filter === 'All' || c.category === filter)
          .map(c => (
            <ConceptCard key={c.id} concept={c} onClick={() => openConcept(c.id)} />
          ))}

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

  if (embedded) return <div className={styles.embedded}>{body}</div>

  return <div className={styles.page}>{body}</div>
}
