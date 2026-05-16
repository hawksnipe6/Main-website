import styles from './Services.module.css'

const SERVICES = [
  {
    num: '01',
    title: 'Strategic Design',
    body: 'Brand positioning systems, design audits, UX strategy. We frame the problem before we solve it — so the solution holds.',
  },
  {
    num: '02',
    title: 'Visual & Communication Systems',
    body: 'Identity systems — not just logos. Visual languages that scale, flex, and hold across every touchpoint, every format.',
  },
  {
    num: '03',
    title: 'Motion & Interaction',
    body: 'Motion systems, interaction behaviours, micro-interaction logic. The invisible layer that makes an interface feel alive, intentional, and authored.',
  },
  {
    num: '04',
    title: 'Product Thinking',
    body: 'MVP definition, UX flows, design-led product strategy. We work as a thinking partner — not just the executor of someone else\'s brief.',
  },
  {
    num: '05',
    title: '3D / CAD',
    body: 'Blender, Fusion 360, Keyshot. Product and industrial design with zero tolerance for sloppy form. Exactly right, not approximately right.',
  },
  {
    num: '06',
    title: 'Studio Operations',
    body: 'Proposals, contracts, onboarding — all built to the same standard as client work. The studio experience reflects the studio\'s values, completely.',
  },
]

export function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">Services</div>
          <h2 className="section-title reveal reveal-d1">
            Different disciplines.<br />One coherent system.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Six capabilities. All connected. Always deployed as a unified system, never as isolated deliverables.
        </p>
      </div>
      <div className={styles.grid}>
        {SERVICES.map((s) => (
          <div key={s.num} className={`${styles.card} reveal`}>
            <div className={styles.num}>{s.num}</div>
            <div className={styles.title}>{s.title}</div>
            <div className={styles.body}>{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
