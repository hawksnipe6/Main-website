import styles from './Services.module.css'

const SERVICES = [
  {
    num: '01',
    title: 'Time Unfolded',
    body: 'We remove friction from brand, product, and interface decisions so the work moves faster without becoming careless.',
  },
  {
    num: '02',
    title: 'Systems That Flow',
    body: 'Identity, UX, motion, and 3D are shaped as one language, not separate deliverables stitched together at the end.',
  },
  {
    num: '03',
    title: 'A Silent Guide',
    body: 'Every touchpoint is designed to feel clear, useful, and intentional before it tries to look impressive.',
  },
]

export function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.header}>
        <div className="section-label reveal">Introducing Nocturnal</div>
        <h2 className="section-title reveal reveal-d1">
          Harness invisible structure to design faster, think deeper, and ship sharper.
        </h2>
      </div>
      <div className={styles.grid}>
        {SERVICES.map((s, i) => (
          <article key={s.num} className={`${styles.card} reveal reveal-d${Math.min(i + 1, 3) as 1 | 2 | 3}`}>
            <div className={styles.icon}>{s.num}</div>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.body}>{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
