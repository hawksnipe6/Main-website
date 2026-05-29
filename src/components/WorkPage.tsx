import { useEffect, useState } from 'react'
import { WORK_SAMPLES } from '../data/workSamples'
import styles from './WorkPage.module.css'

type WorkCaseStudy = {
  slug: string
  title: string
  category: string
  description: string
  href: string
  image: string
  year: string
  format: string
  role: string
  problem: string
  insight: string
  approach: string[]
  decisions: { label: string; desc: string }[]
  outcome: { stat: string; label: string }[]
  deliverables: string[]
  quote: string
}

const CASE_STUDY_DETAILS: Record<string, Omit<WorkCaseStudy, 'slug' | 'title' | 'category' | 'description' | 'href' | 'image'>> = {
  renderfolio: {
    year: '2026',
    format: 'CGI study',
    role: '3D visualisation, lighting, material direction, product storytelling',
    problem:
      'A CGI portfolio has to prove more than software control. It needs to show whether the object feels intentional, whether materials read correctly, and whether the render can make a product feel desirable without relying on clutter.',
    insight:
      'Strong product CGI works when the viewer understands the object before noticing the rendering technique.',
    approach: [
      'Built compact render studies around controlled lighting, material response, camera discipline, and object hierarchy.',
      'Used restraint in composition so surface, scale, shadow, and silhouette could carry the story.',
      'Sequenced the work as a visual capability sample rather than a loose render dump.'
    ],
    decisions: [
      { label: 'Material first', desc: 'Surfaces were treated as the main proof of craft, with careful attention to reflection, roughness, and edge behaviour.' },
      { label: 'Controlled framing', desc: 'Camera angles were kept deliberate so each render reads like a product image, not a software output.' },
      { label: 'Portfolio pacing', desc: 'The project was structured to show range while keeping the visual language compact and consistent.' }
    ],
    outcome: [
      { stat: 'CGI', label: 'Product render studies' },
      { stat: 'CMF', label: 'Material and lighting control' },
      { stat: 'Visual', label: 'Object-led storytelling' }
    ],
    deliverables: ['Render direction', 'Lighting studies', 'Material tests', 'Product compositions', 'Portfolio presentation'],
    quote: 'The object has to feel designed before the render feels impressive.'
  },
  armor: {
    year: '2026',
    format: 'Brand visual system',
    role: 'Visual design, campaign direction, product-led social assets',
    problem:
      'Armor needed product communication that could turn technical features into crisp, scroll-stopping visuals without making the brand feel noisy or over-designed.',
    insight:
      'Feature-led campaigns work better when every visual has one job: explain the value, sharpen the product, and make the brand easier to remember.',
    approach: [
      'Translated product features into modular campaign assets with strong hierarchy and high-contrast compositions.',
      'Built repeatable visual structures for launch moments, social posts, and product-led storytelling.',
      'Kept the system direct so the brand could scale content without losing consistency.'
    ],
    decisions: [
      { label: 'Product as hero', desc: 'The visual system keeps attention on the feature or object instead of surrounding it with decorative noise.' },
      { label: 'Campaign modules', desc: 'Layouts were designed as repeatable frames that can support product claims, launches, and feature drops.' },
      { label: 'High contrast clarity', desc: 'The system uses strong visual contrast to make each asset readable at social feed speed.' }
    ],
    outcome: [
      { stat: 'Brand', label: 'Visual direction' },
      { stat: 'Launch', label: 'Campaign-ready assets' },
      { stat: 'Social', label: 'Repeatable content system' }
    ],
    deliverables: ['Campaign visuals', 'Product feature frames', 'Social media layouts', 'Launch compositions', 'Visual system direction'],
    quote: 'A brand asset should explain the product before the caption has to.'
  },
  alivio: {
    year: '2025',
    format: 'Medical product design',
    role: 'Research, industrial design, CAD, prototyping, app logic, testing, presentation',
    problem:
      'Posture correction and TENS therapy products often feel medical, bulky, and difficult to understand. The challenge was to design a wearable device and connected experience that could support daily use without intimidating the user.',
    insight:
      'A health device becomes more usable when the physical form, feedback loop, and app interface all reduce anxiety instead of adding more instruction.',
    approach: [
      'Mapped user journeys around posture discomfort, habit formation, TENS intensity control, feedback, and long-term use.',
      'Explored body ergonomics, surface contact, placement logic, and wearable proportions through sketches, CAD, renders, and prototype thinking.',
      'Extended the product into an app experience with dashboard logic, data visualisation, feedback states, and usability-led interaction flows.'
    ],
    decisions: [
      { label: 'Body-led form', desc: 'The product form was shaped around placement, comfort, and confidence on the upper back.' },
      { label: 'Clear feedback', desc: 'The interface prioritises understandable states around session progress, posture quality, and therapy control.' },
      { label: 'Prototype validation', desc: 'Design decisions were connected to testing, physical logic, and user journey refinement rather than only surface styling.' }
    ],
    outcome: [
      { stat: 'Device', label: 'Wearable product concept' },
      { stat: 'App', label: 'Dashboard and feedback system' },
      { stat: 'UX', label: 'Journey and usability testing' }
    ],
    deliverables: ['Research synthesis', 'User journey', 'Industrial design concepts', 'CAD model', 'Renders', 'Prototype logic', 'App dashboard', 'Presentation system'],
    quote: 'The product had to feel like daily support, not another medical instruction.'
  },
  'audio-1': {
    year: '2024',
    format: 'Consumer electronics concept',
    role: 'Industrial design, CMF, interface detailing, render presentation',
    problem:
      'Home audio products need to feel technically capable without becoming visually aggressive. The project explored how a speaker-like product can hold presence through proportion, interface detail, and restrained material language.',
    insight:
      'In consumer electronics, perceived quality often comes from the silence between details: seams, surfaces, controls, and visual weight.',
    approach: [
      'Studied restrained audio products and translated that language into a clean product form.',
      'Balanced object presence with interface hierarchy so the product feels usable and considered.',
      'Used rendering and CMF exploration to test material impression, shadow behaviour, and product posture.'
    ],
    decisions: [
      { label: 'Restrained silhouette', desc: 'The form avoids decorative complexity and relies on proportion for character.' },
      { label: 'Interface hierarchy', desc: 'Controls and visible details are organised to feel intentional, not scattered.' },
      { label: 'CMF clarity', desc: 'Material decisions support a premium but quiet consumer-electronics feel.' }
    ],
    outcome: [
      { stat: 'ID', label: 'Form and product language' },
      { stat: 'CMF', label: 'Material direction' },
      { stat: 'UI', label: 'Physical interface detail' }
    ],
    deliverables: ['Form exploration', 'CMF direction', 'Interface detailing', 'Product renders', 'Presentation boards'],
    quote: 'A good audio product should look controlled before it ever makes sound.'
  },
  osmo: {
    year: '2024',
    format: 'Product development study',
    role: 'Sketching, foam modelling, prototyping, ergonomic refinement, presentation',
    problem:
      'Binoculars are held, adjusted, and carried for long periods, so the design problem is not only optical. It is ergonomic, tactile, and behavioural.',
    insight:
      'A binocular product succeeds when the hand understands it as quickly as the eye does.',
    approach: [
      'Moved from early sketches into foam models to study grip, proportion, and viewing posture.',
      'Refined the object through prototype logic, ergonomic contact points, and use sequencing.',
      'Built the final presentation around the evolution from idea to model to product proposal.'
    ],
    decisions: [
      { label: 'Grip logic', desc: 'The body was considered through hand placement, control reach, and carrying comfort.' },
      { label: 'Prototype-driven refinement', desc: 'Foam and form studies helped test volume, proportion, and physical use before finalisation.' },
      { label: 'Use sequence', desc: 'The project considered how the product is picked up, adjusted, held, and stored.' }
    ],
    outcome: [
      { stat: 'Sketch', label: 'Early ideation' },
      { stat: 'Foam', label: 'Physical form testing' },
      { stat: 'Model', label: 'Refined product proposal' }
    ],
    deliverables: ['Sketch development', 'Foam model', 'Prototype logic', 'Ergonomic refinement', 'Product presentation'],
    quote: 'The form had to work in the hand before it worked in the render.'
  },
  bedizen: {
    year: '2024',
    format: 'Wearable product and UI system',
    role: 'Industrial design, wearable form, app/interface system, product storytelling',
    problem:
      'Cranial audio sits between wearable comfort, personal technology, and medical-adjacent perception. The product needed to feel usable, personal, and credible without becoming visually clinical.',
    insight:
      'Wearable audio becomes more believable when the hardware and interface feel like one continuous system.',
    approach: [
      'Explored the headset as both a physical object and a connected digital experience.',
      'Designed around fit, control, tuning, and personalisation rather than styling alone.',
      'Used interface thinking to show how the device could be configured and understood by a user.'
    ],
    decisions: [
      { label: 'Connected system', desc: 'The physical product and digital controls were treated as one combined experience.' },
      { label: 'Comfort signal', desc: 'The form language avoids harshness so the object feels wearable and personal.' },
      { label: 'Tuning clarity', desc: 'The UI supports understanding, adjustment, and control rather than technical overload.' }
    ],
    outcome: [
      { stat: 'Wearable', label: 'Physical product concept' },
      { stat: 'UI', label: 'Connected control system' },
      { stat: 'Experience', label: 'Hardware plus software story' }
    ],
    deliverables: ['Wearable form exploration', 'Product renders', 'UI system', 'Control flow', 'Case-study presentation'],
    quote: 'The device should feel personal before it feels technical.'
  },
  'ice-tray': {
    year: '2024',
    format: 'Universal design study',
    role: 'Usability research, product redesign, accessibility thinking, presentation',
    problem:
      'A simple ice tray can still exclude users through poor grip, unclear sequence, hard release, and awkward handling. The brief was to improve an everyday object through universal design rather than cosmetic change.',
    insight:
      'Universal design is strongest when the improvement feels obvious to every user, not only the user it was designed for.',
    approach: [
      'Studied the use sequence from filling and carrying to freezing, releasing, and serving.',
      'Identified friction points around grip, force, affordance, and water control.',
      'Translated those observations into a clearer product logic for more bodies and use contexts.'
    ],
    decisions: [
      { label: 'Sequence clarity', desc: 'The design focuses on making each step of the object easier to understand and complete.' },
      { label: 'Grip improvement', desc: 'Handling and release were treated as core usability problems, not minor ergonomic details.' },
      { label: 'Everyday accessibility', desc: 'The solution avoids specialised language and keeps the product familiar.' }
    ],
    outcome: [
      { stat: 'UD', label: 'Universal design principles' },
      { stat: 'Use', label: 'Improved handling sequence' },
      { stat: 'Object', label: 'Everyday product redesign' }
    ],
    deliverables: ['Use-case mapping', 'Friction analysis', 'Product redesign', 'Usability rationale', 'Presentation boards'],
    quote: 'The best universal design disappears into a better everyday action.'
  },
  sailfish: {
    year: '2025',
    format: 'Mobility app design',
    role: 'UX strategy, information architecture, UI design, prototype storytelling',
    problem:
      'A futuristic mobility system can easily become difficult to understand if the app overloads the user with novelty. The commuting flow needed to make route planning, timing, and trip confidence feel calm.',
    insight:
      'For new mobility systems, trust comes from predictable information before visual excitement.',
    approach: [
      'Mapped the commuter journey from planning to boarding to arrival with emphasis on time, route, and status clarity.',
      'Designed interface hierarchy around the decisions a commuter needs to make quickly.',
      'Built a calm visual system that makes a speculative transport experience feel usable and believable.'
    ],
    decisions: [
      { label: 'Route-first hierarchy', desc: 'The UI keeps trip status, route logic, and timing visible at the right moments.' },
      { label: 'Calm mobility language', desc: 'The visual system avoids unnecessary futurism so users can focus on the commute.' },
      { label: 'Decision support', desc: 'Screens were structured around what the commuter needs to understand next.' }
    ],
    outcome: [
      { stat: 'UX', label: 'Commuter journey' },
      { stat: 'IA', label: 'Route and status logic' },
      { stat: 'UI', label: 'High-fidelity app screens' }
    ],
    deliverables: ['User flow', 'Information architecture', 'High-fidelity UI', 'Mobility interface system', 'Prototype presentation'],
    quote: 'The future of mobility still has to answer one basic question: where do I go next?'
  },
  medwise: {
    year: '2025',
    format: 'Healthcare decision-support app',
    role: 'UX research, healthcare flows, UI design, warning hierarchy, prototype logic',
    problem:
      'Drug interaction information is often dense, technical, and difficult for non-experts to act on. The app needed to make risk visible without creating panic or false confidence.',
    insight:
      'Healthcare UI should not simplify risk by hiding it. It should make risk understandable enough to act on safely.',
    approach: [
      'Structured the interaction around medication entry, interaction checks, warning severity, and next-step guidance.',
      'Designed a hierarchy that separates critical risk from lower-priority information.',
      'Focused on clarity, accessibility, and decision support for a user who may already be anxious.'
    ],
    decisions: [
      { label: 'Severity hierarchy', desc: 'Warnings are organised so users can distinguish urgency, context, and recommended action.' },
      { label: 'Plain-language flow', desc: 'The interface reduces technical overload while keeping the medical meaning intact.' },
      { label: 'Actionable results', desc: 'The result state is designed to guide the next step instead of only displaying information.' }
    ],
    outcome: [
      { stat: 'Health', label: 'Decision-support UX' },
      { stat: 'Flow', label: 'Medication interaction check' },
      { stat: 'UI', label: 'Risk hierarchy and alerts' }
    ],
    deliverables: ['Healthcare user flow', 'Interaction logic', 'Warning hierarchy', 'High-fidelity screens', 'Prototype rationale'],
    quote: 'The screen should reduce confusion without reducing caution.'
  },
  palan: {
    year: '2024',
    format: 'Packaging design',
    role: 'Packaging structure, visual hierarchy, shelf presence, brand presentation',
    problem:
      'Packaging has to perform in seconds. It needs to communicate category, quality, and brand recall while still working as a physical object on a shelf.',
    insight:
      'Good packaging is not just a wrapper. It is a small, structured argument for why the product should be picked up.',
    approach: [
      'Built the packaging direction around hierarchy, material impression, shelf visibility, and brand memory.',
      'Balanced visual identity with practical readability across surfaces and viewing distances.',
      'Presented the system through controlled mockups and packaging-led visual communication.'
    ],
    decisions: [
      { label: 'Shelf clarity', desc: 'The visual hierarchy was designed to make the product recognisable quickly.' },
      { label: 'Material impression', desc: 'Packaging choices support perceived quality and tactile expectation.' },
      { label: 'Brand recall', desc: 'The system uses distinct visual cues that can survive repeated packaging applications.' }
    ],
    outcome: [
      { stat: 'Pack', label: 'Packaging system' },
      { stat: 'Brand', label: 'Visual identity application' },
      { stat: 'Shelf', label: 'Hierarchy and recall' }
    ],
    deliverables: ['Packaging design', 'Visual hierarchy', 'Mockups', 'Brand application', 'Presentation boards'],
    quote: 'The package has to sell the product before anyone reads the details.'
  },
  'ev-charging': {
    year: '2025',
    format: 'Mobility system design',
    role: 'Systems research, service mapping, UX strategy, interface logic, presentation',
    problem:
      'EV charging anxiety is not only a battery problem. It comes from uncertain infrastructure, poor information, unreliable support, and the fear of being stranded without a clear recovery path.',
    insight:
      'Charging confidence depends on the whole service ecosystem: discovery, availability, route context, emergency support, and trustworthy status information.',
    approach: [
      'Mapped behavioural, infrastructure, and decision-making friction across the EV charging journey.',
      'Explored the ecosystem around users, emergency fleets, accessible charging networks, and roadside assistance.',
      'Translated the system into clearer service logic, interface priorities, and proactive support moments.'
    ],
    decisions: [
      { label: 'Ecosystem view', desc: 'The project treats charging as a connected system rather than a single station-finder screen.' },
      { label: 'Anxiety reduction', desc: 'Information is organised around confidence, backup options, and preventive support.' },
      { label: 'Operational clarity', desc: 'The solution considers emergency fleets and service reliability alongside individual users.' }
    ],
    outcome: [
      { stat: 'System', label: 'EV charging ecosystem map' },
      { stat: 'UX', label: 'Range-anxiety support flows' },
      { stat: 'Service', label: 'Roadside and fleet logic' }
    ],
    deliverables: ['System map', 'User journey', 'Service blueprint', 'Interface logic', 'Research presentation'],
    quote: 'Range anxiety is a service design problem hiding inside an infrastructure problem.'
  }
}

const WORK_CASE_STUDIES: WorkCaseStudy[] = WORK_SAMPLES.map(sample => ({
  ...sample,
  ...CASE_STUDY_DETAILS[sample.slug],
}))

function WorkCard({ work, onClick }: { work: WorkCaseStudy; onClick: () => void }) {
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.cardCover}>
        <img src={work.image} alt={`${work.title} cover`} loading="lazy" />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.tag}>{work.format}</span>
          <span className={styles.tagOutline}>{work.year}</span>
        </div>
        <h3 className={styles.cardTitle}>{work.title}</h3>
        <p className={styles.cardTagline}>{work.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.cardYear}>{work.category}</span>
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

function WorkDetail({ work, onBack }: { work: WorkCaseStudy; onBack: () => void }) {
  return (
    <div className={styles.detail}>
      <button className={styles.backBtn} onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All work
      </button>

      <header className={styles.detailHero}>
        <div className={styles.detailMeta}>
          <span className={styles.tag}>{work.format}</span>
          <span className={styles.tagOutline}>{work.category}</span>
          <span className={styles.tagOutline}>{work.year}</span>
        </div>
        <h1 className={styles.detailTitle}>{work.title}</h1>
        <p className={styles.detailTagline}>{work.description}</p>
      </header>

      <section className={styles.heroImageBlock}>
        <img src={work.image} alt={`${work.title} project visual`} loading="eager" />
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Project role</span>
        <p className={styles.bodyLarge}>{work.role}</p>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>The problem</span>
        <p className={styles.bodyLarge}>{work.problem}</p>
      </section>

      <section className={styles.insightBlock}>
        <span className={styles.sectionLabel}>Core insight</span>
        <p className={styles.insightText}>“{work.insight}”</p>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Approach</span>
        <div className={styles.approachGrid}>
          {work.approach.map((item, index) => (
            <div key={item} className={styles.approachCard}>
              <span className={styles.stepNum}>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Key design decisions</span>
        <div className={styles.solutionGrid}>
          {work.decisions.map(decision => (
            <div key={decision.label} className={styles.solutionCard}>
              <span className={styles.solutionIndex}>{decision.label}</span>
              <p className={styles.solutionDesc}>{decision.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>What the project demonstrates</span>
        <div className={styles.statsGrid}>
          {work.outcome.map(item => (
            <div key={`${item.stat}-${item.label}`} className={styles.statCard}>
              <span className={styles.statNum}>{item.stat}</span>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Deliverables</span>
        <div className={styles.deliverablesGrid}>
          {work.deliverables.map(item => (
            <span key={item} className={styles.deliverable}>{item}</span>
          ))}
        </div>
      </section>

      <section className={styles.quoteBlock}>
        <p className={styles.quote}>{work.quote}</p>
      </section>

      <section className={styles.projectLinkBlock}>
        <div>
          <span className={styles.sectionLabel}>Full project</span>
          <h2>Open the complete Behance case study</h2>
          <p>The external project contains the full visual sequence, process images, renders, screens, and presentation boards.</p>
        </div>
        <a href={work.href} target="_blank" rel="noreferrer" className={styles.projectLink}>
          View on Behance
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
    </div>
  )
}

export function WorkPage() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onPop = () => {
      if (active) setActive(null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [active])

  function openWork(slug: string) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setActive(slug)
  }

  function closeWork() {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setActive(null)
  }

  const activeWork = WORK_CASE_STUDIES.find(work => work.slug === active)

  return (
    <main className={styles.page}>
      {activeWork ? (
        <WorkDetail work={activeWork} onBack={closeWork} />
      ) : (
        <>
          <header className={styles.pageHeader}>
            <p className={styles.pageLabel}>Portfolio</p>
            <h1 className={styles.pageTitle}>Work Sample</h1>
            <p className={styles.pageSubtitle}>
              Selected projects structured as case studies across product design, interface systems, CGI, packaging, mobility, healthcare, and brand visuals.
            </p>
          </header>

          <div className={styles.grid}>
            {WORK_CASE_STUDIES.map(work => (
              <WorkCard key={work.slug} work={work} onClick={() => openWork(work.slug)} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
