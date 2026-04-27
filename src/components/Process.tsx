import styles from './Process.module.css'

const STEPS = [
  {
    num: '01',
    title: 'Frame',
    body: 'Every project begins with the right questions — not the obvious ones. We spend time understanding the real problem before any execution begins. The brief is never the brief.',
  },
  {
    num: '02',
    title: 'Design',
    body: 'We build systems, not instances. Decisions are made at the rule level — which means every output is a coherent expression of a shared logic, not a collection of isolated deliverables.',
  },
  {
    num: '03',
    title: 'Deploy',
    body: 'Final work is handed over ready to use — documented, structured, and built to outlast the project. We do not deliver mystery boxes.',
  },
]

export function Process() {
  return (
    <section id="how">
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">Process</div>
          <h2 className="section-title reveal reveal-d1">
            One brief to begin.<br />Three phases to a system.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Every Nocturnal engagement runs through the same three-layer process. The order is not optional.
        </p>
      </div>
      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <div key={step.num} className={`${styles.step} reveal reveal-d${i + 1 as 1 | 2 | 3}`}>
            <span className={styles.num}>{step.num}</span>
            <div className={styles.title}>{step.title}</div>
            <div className={styles.body}>{step.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
