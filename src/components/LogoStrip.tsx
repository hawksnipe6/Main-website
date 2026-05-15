import styles from './LogoStrip.module.css'

const LOGOS = [
  { src: '/logos/armor.png', alt: 'Armor' },
  { src: '/logos/pixelpaw.png', alt: 'Pixelpaw Labs' },
  { src: '/logos/dmos.png', alt: "D'MOS" },
  { src: '/logos/aerpace.png', alt: 'Aerpace' },
  { src: '/logos/wehear.png', alt: 'WEHEAR' },
  { src: '/logos/khamir.png', alt: 'Khamir' },
  { src: '/logos/penlounge.png', alt: 'The Pen Lounge' },
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
          Selected collaborations across product, brand, interface, and industrial design.
        </p>
      </div>

      <div className={`${styles.logoGrid} reveal reveal-d2`} aria-label="Brands we have worked with">
        {LOGOS.map((logo) => (
          <div key={logo.alt} className={styles.logoCell}>
            <img src={logo.src} alt={logo.alt} className={styles.logo} draggable={false} />
          </div>
        ))}
      </div>
    </section>
  )
}
