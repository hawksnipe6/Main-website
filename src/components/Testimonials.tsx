import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    quote: 'Punctual, hardworking, quick to learn, and an excellent communicator who consistently added value to every task.',
    name:  '',
    role:  '',
    brand: 'Khamir',
    logo:  '/logos/khamir.png',
  },
  {
    quote: 'Abeer excelled across industrial design tasks, showing initiativeness, receptiveness to feedback, and reliable execution that we highly recommend.',
    name:  'Sharath Naik',
    role:  'Founder / Lead Design Engineer',
    brand: 'Pixelpaw Labs',
    logo:  '/logos/pixelpaw.png',
  },
  {
    quote: 'Abeer constantly demonstrated high motivation, sincerity and commendable performance throughout his tenure.',
    name:  'Kshitij Srivastava',
    role:  'AVP Design',
    brand: 'Aerpace',
    logo:  '/logos/aerpace.png',
  },
  {
    quote: 'Outstanding research, ideation sketches and 3D visualizations on the project showcased professionalism and enthusiasm.',
    name:  'Devansu Khorasiya',
    role:  'Design Manager',
    brand: 'WEHEAR',
    logo:  '/logos/wehear.png',
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
          <div
            key={i}
            className={`${styles.card} reveal`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {/* Opening quote mark */}
            <div className={styles.quoteIcon} aria-hidden="true">"</div>

            {/* Quote body */}
            <p className={styles.quote}>{t.quote}</p>

            {/* Author row */}
            <div className={styles.author}>
              <div className={styles.logoCircle}>
                <img
                  src={t.logo}
                  alt={t.brand}
                  className={styles.brandLogo}
                />
              </div>
              <div className={styles.authorInfo}>
                {t.name && <div className={styles.name}>{t.name}</div>}
                {t.role && <div className={styles.role}>{t.role}</div>}
                <div className={t.name ? styles.brandSmall : styles.name}>
                  {t.brand}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
