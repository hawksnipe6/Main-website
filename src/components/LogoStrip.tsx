import styles from './LogoStrip.module.css'

type Logo = {
  src: string
  alt: string
  variant?: 'mark' | 'badge'
}

const LOGOS: Logo[] = [
  { src: '/logos/armor-clean.png', alt: 'Armor' },
  { src: '/logos/pixelpaw-clean.png', alt: 'Pixelpaw Labs', variant: 'mark' },
  { src: '/logos/dmos-clean.png', alt: "D'MOS" },
  { src: '/logos/aerpace-clean.png', alt: 'Aerpace', variant: 'mark' },
  { src: '/logos/wehear-clean.png', alt: 'WEHEAR' },
  { src: '/logos/khamir-clean.png', alt: 'Khamir' },
  { src: '/logos/penlounge-clean.png', alt: 'The Pen Lounge', variant: 'badge' },
]

export function LogoStrip() {
  return (
    <section id="brands" className={styles.brands}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">/ Nocturnal</div>
          <h2 className="section-title reveal reveal-d1">
            Brands we have<br />worked with.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Selected collaborators across product, brand, interface, and industrial design.
        </p>
      </div>

      <div className={`${styles.logoRow} reveal reveal-d2`} aria-label="Brands we have worked with">
        {LOGOS.map((logo) => (
          <div key={logo.alt} className={styles.logoCell}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={[
                styles.logo,
                logo.variant === 'mark' ? styles.logoMark : '',
                logo.variant === 'badge' ? styles.logoBadge : '',
              ].join(' ')}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className={`${styles.nextText} reveal reveal-d3`}>YOU CAN BE NEXT</div>
    </section>
  )
}
