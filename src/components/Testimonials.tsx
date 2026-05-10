import styles from './Testimonials.module.css'

// ── Replace these with real client quotes before publishing ──
const TESTIMONIALS = [
  {
    quote:
      'Nocturnal did not just deliver a brand — they rebuilt how we think about our product. The system holds across every touchpoint we throw at it.',
    name:  'Client Name',
    role:  'Founder',
    brand: 'Armor',
    logo:  '/logos/armor.png',
  },
  {
    quote:
      'We came in with a fragmented visual language and left with a design system that actually scales. The thinking behind every decision was visible.',
    name:  'Client Name',
    role:  'CEO',
    brand: 'Aerpace',
    logo:  '/logos/aerpace.png',
  },
  {
    quote:
      'The level of craft matched the ambition of the brief. Every surface, every interaction — it felt authored, not assembled.',
    name:  'Client Name',
    role:  'Creative Director',
    brand: 'Pixelpaw Labs',
    logo:  '/logos/pixelpaw.png',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.header}>
        <div className="section-label reveal">What clients say</div>
        <h2 className="section-title reveal reveal-d1">
          Execution they<br />remember.
        </h2>
      </div>

      <div className={styles.grid}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className={`${styles.card} reveal`} style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className={styles.quoteIcon} aria-hidden="true">"</div>
            <p className={styles.quote}>{t.quote}</p>
            <div className={styles.author}>
              <div className={styles.authorInfo}>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role}, {t.brand}</div>
              </div>
              <img
                src={t.logo}
                alt={t.brand}
                className={styles.brandLogo}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
