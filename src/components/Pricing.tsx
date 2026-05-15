import styles from './Pricing.module.css'

type ScopeCard = {
  num: string
  title: string
  get: string[]
  dont: string[]
}

const CARDS: ScopeCard[] = [
  {
    num: '01',
    title: 'Industrial Design',
    get: [
      'Existing product audit',
      'Opportunity mapping',
      'Concept ideation',
      'Form exploration sketches',
      'Low-fidelity prototypes',
      'Vendor connect',
    ],
    dont: [
      'End-to-end engineering',
      'Tooling & DFM',
      'Manufacturing setup',
      'Compliance / certification',
      'Mass production support',
    ],
  },
  {
    num: '02',
    title: '2D/3D Design',
    get: [
      'Ideation',
      'Sketches',
      'Digital mockups',
      '3D visualisations',
      'Motion design',
      'Ready-to-use output',
    ],
    dont: [
      'Printing facilities',
      'Physical mockups',
      'Fabrication / installation',
      'Long-format video production',
      'On-ground shoot coordination',
    ],
  },
  {
    num: '03',
    title: 'UI/UX Design',
    get: [
      'UX ideation',
      'User flows',
      'Lo-fi & hi-fi mockups',
      'Design system components',
      'Dev-ready handoff',
    ],
    dont: [
      'App / website development',
      'Backend setup',
      'Deployment',
      'QA testing',
      'Analytics integration',
    ],
  },
]

function List({ items, type }: { items: string[]; type: 'get' | 'dont' }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={type === 'get' ? styles.getItem : styles.dontItem}>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Card({ num, title, get, dont }: ScopeCard) {
  return (
    <article className={styles.card}>
      <span className={styles.num}>{num} /</span>
      <h3 className={styles.cardTitle}>{title}</h3>

      <div className={styles.divider} />

      <div className={styles.block}>
        <h4 className={styles.blockTitle}>What you get</h4>
        <List items={get} type="get" />
      </div>

      <div className={styles.divider} />

      <div className={styles.block}>
        <h4 className={styles.blockTitle}>What you don’t get</h4>
        <List items={dont} type="dont" />
      </div>
    </article>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">Services</div>
          <h2 className="section-title reveal reveal-d1">
            How we help<br />you build better.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Focused, high-impact design services to move your product forward without unnecessary overhead.
        </p>
      </div>

      <div className={`${styles.grid} reveal reveal-d2`}>
        {CARDS.map((card) => <Card key={card.title} {...card} />)}
      </div>
    </section>
  )
}
