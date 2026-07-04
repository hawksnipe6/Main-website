import styles from './ProofStrip.module.css'

// Facts, not claims. Every number here must survive a client call.
const FACTS = [
  { num: '925', label: 'Sterling silver instrument, CAD to cast-ready' },
  { num: '9', label: 'Months from brief to CAD, Martand' },
  { num: '4', label: 'Disciplines under one roof' },
  { num: '1', label: 'Featured on Yanko Design' },
]

export function ProofStrip() {
  return (
    <section className={styles.strip} aria-label="Studio facts">
      <div className={styles.inner}>
        {FACTS.map((f) => (
          <div key={f.label} className={`${styles.cell} reveal`}>
            <span className={styles.num}>{f.num}</span>
            <span className={styles.label}>{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
