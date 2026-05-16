import { useEffect, useState } from 'react'
import styles from './Services.module.css'

const SERVICES = [
  {
    num: '01',
    title: 'Industrial Design',
    body: 'Physical product thinking from form direction to prototype-ready output.',
    deliverables: ['Form Concepts', 'Lo-Fi Prototypes', '3D Renders', '3D Printed Products and Prototypes'],
  },
  {
    num: '02',
    title: 'Brand Design',
    body: 'Identity systems that define how a brand looks, speaks, and behaves.',
    deliverables: ['Identity', 'Positioning & Strategy', 'Communication and Advertising', 'Experience'],
  },
  {
    num: '03',
    title: 'UI UX System',
    body: 'Interface systems that make product decisions clear, usable, and scalable.',
    deliverables: ['UX Research & Strategy', 'Information Architecture & Wireframing', 'Prototype', 'Design System & Dev handoff'],
  },
  {
    num: '04',
    title: 'Motion and Interaction',
    body: 'Motion assets and interaction details that make communication feel authored.',
    deliverables: ['2D & 3D Brand & Marketing Assets', 'Social Media Assets', 'Information & Communication', 'Promo Ads'],
  },
]

export function Services() {
  const [active, setActive] = useState<(typeof SERVICES)[number] | null>(null)

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

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
          Four focused capabilities. Each one can stand alone, but the strongest outcomes happen when they work together.
        </p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <button
            key={service.num}
            className={`${styles.card} reveal`}
            onClick={() => setActive(service)}
            type="button"
          >
            <span className={styles.num}>{service.num}</span>
            <span className={styles.title}>{service.title}</span>
            <span className={styles.body}>{service.body}</span>
            <span className={styles.openHint}>View scope</span>
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={active.title}>
          <button className={styles.scrim} onClick={() => setActive(null)} aria-label="Close service details" />
          <article className={styles.panel}>
            <button className={styles.close} onClick={() => setActive(null)} aria-label="Close service details">
              ×
            </button>
            <span className={styles.panelNum}>{active.num}</span>
            <h3 className={styles.panelTitle}>{active.title}</h3>
            <p className={styles.panelBody}>{active.body}</p>
            <div className={styles.panelDivider} />
            <div className={styles.scopeTitle}>What you get</div>
            <ul className={styles.scopeList}>
              {active.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      )}
    </section>
  )
}
