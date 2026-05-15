import styles from './LogoStrip.module.css'

const LOGOS = [
  { src: '/logos/armor-clean.png', alt: 'Armor' },
  { src: '/logos/pixelpaw-clean.png', alt: 'Pixelpaw Labs' },
  { src: '/logos/dmos-clean.png', alt: "D'MOS" },
  { src: '/logos/aerpace-clean.png', alt: 'Aerpace' },
  { src: '/logos/wehear-clean.png', alt: 'WEHEAR' },
  { src: '/logos/khamir-clean.png', alt: 'Khamir' },
  { src: '/logos/penlounge-clean.png', alt: 'The Pen Lounge', large: true },
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

      <div className={`${styles.logoFrame} reveal reveal-d2`} aria-label="Brands we have worked with">
        <div className={styles.logoGrid}>
          {LOGOS.map((logo) => (
            <div key={logo.alt} className={styles.logoCell}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${styles.logo} ${logo.large ? styles.logoLarge : ''}`}
                draggable={false}
              />
            </div>
          ))}
        </div>
        <p className={styles.next}>you can be next</p>
      </div>
    </section>
  )
}
