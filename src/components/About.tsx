import styles from './About.module.css'

const CARDS = [
  {
    num: '01',
    title: 'Thinking First',
    body: 'We are not a freelance page, not a trend-chasing visual studio. We are a problem-framing and solution-design system. We design the rules, then build the instances.',
  },
  {
    num: '02',
    title: 'Execution as Evidence',
    body: 'Our outputs show thinking. Every surface, every detail, every system we produce is the physical expression of a considered decision. Complexity disappears. Clarity remains.',
  },
  {
    num: '03',
    title: 'Phygital by Design',
    body: 'We operate at the intersection of digital and physical: brand systems, product design, 3D CAD, motion. One studio, one coherent approach across every surface.',
  },
  {
    num: '04',
    title: 'The Right Clients',
    body: 'Early-stage founders who need clarity. Startups scaling from MVP to structured product. Businesses with fragmented brand and product systems. We do not work with everyone. By design.',
  },
]

export function About() {
  return (
    <section id="about">
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">Introducing Nocturnal</div>
          <h2 className="section-title reveal reveal-d1">High-quality design is not decoration.</h2>
        </div>
        <p className="section-body reveal reveal-d2">
          It is decision-making made visible. One belief drives everything Nocturnal produces, from the first brief to the final handover.
        </p>
      </div>
      <div className={styles.cards}>
        {CARDS.map((card, i) => (
          <div key={card.num} className={`${styles.card} reveal reveal-d${Math.min(i + 1, 3) as 1 | 2 | 3}`}>
            <div className={styles.cardNum}>{card.num}</div>
            <div className={styles.cardTitle}>{card.title}</div>
            <div className={styles.cardBody}>{card.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
