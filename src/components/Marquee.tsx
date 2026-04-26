import styles from './Marquee.module.css'

const ITEMS = [
  'High-quality design is not decoration',
  'It is decision-making made visible',
  'We design systems, not screens',
  'Execution is evidence of thinking',
  'Subtract until subtraction would break it',
  'Does this feel authored or generated',
  'Complexity disappears — clarity remains',
  'The brief is never the brief',
]

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>{item}</span>
        ))}
      </div>
    </div>
  )
}
