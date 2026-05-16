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
    get: ['Product audit', 'Opportunity map', 'Concept ideation', 'Form sketches', 'Low-fi prototypes', 'Vendor connect'],
    dont: ['Engineering', 'DFM / tooling', 'Manufacturing', 'Certification', 'Production management'],
  },
  {
    num: '02',
    title: '2D/3D Design',
    get: ['Ideation', 'Sketches', 'Digital mockups', '3D renders', 'Motion output', 'Ready-to-use files'],
    dont: ['Printing', 'Physical mockups', 'Fabrication', 'Long-form video', 'Shoot production'],
  },
  {
    num: '03',
    title: 'UI/UX Design',
    get: ['UX direction', 'User flows', 'Lo-fi / hi-fi screens', 'UI components', 'Dev handoff'],
    dont: ['Development', 'Backend', 'Deployment', 'QA testing', 'Analytics setup'],
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

      <div className={styles.scopeGrid}>
        <div className={styles.block}>
          <h4 className={styles.blockTitle}>What you get</h4>
          <List items={get} type="get" />
        </div>

        <div className={styles.block}>
          <h4 className={styles.blockTitle}>What you don’t get</h4>
          <List items={dont} type="dont" />
        </div>
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
          Three focused scopes. Clear inputs, clean outputs, and no hidden production promises.
        </p>
      </div>

      <div className={styles.grid}>
        {CARDS.map((card, i) => (
          <div key={card.title} className={`reveal reveal-d${Math.min(i + 1, 3) as 1 | 2 | 3}`}>
            <Card {...card} />
          </div>
        ))}
      </div>
    </section>
  )
}
