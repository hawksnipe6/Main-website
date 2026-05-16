import styles from './LogoStrip.module.css'

type Logo = {
  src: string
  alt: string
  shape?: 'rect' | 'square' | 'circle' | 'wide'
}

const LOGOS: Logo[] = [
  { src: '/logos/armor-new.png', alt: 'Armor', shape: 'rect' },
  { src: '/logos/pixelpaw-new.png', alt: 'Pixelpaw Labs', shape: 'square' },
  { src: '/logos/dmos-new.png', alt: "D'MOS", shape: 'square' },
  { src: '/logos/aerpace-new.png', alt: 'Aerpace', shape: 'square' },
  { src: '/logos/wehear-new.png', alt: 'WEHEAR', shape: 'rect' },
  { src: '/logos/khamir-new.png', alt: 'Khamir', shape: 'rect' },
  { src: '/logos/penlounge-uploaded.png', alt: 'The Pen Lounge', shape: 'circle' },
  { src: '/logos/mejari-habitat-uploaded.png', alt: 'Mejari Habitat', shape: 'wide' },
]

export function LogoStrip() {
  return (
    <section id="brands" className={styles.brands}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">Nocturnal</div>
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
          <div key={logo.alt} className={`${styles.logoCell} ${styles[logo.shape ?? 'rect']}`}>
            <img src={logo.src} alt={logo.alt} className={styles.logo} draggable={false} />
          </div>
        ))}
      </div>

      <div className={`${styles.nextText} reveal reveal-d3`}>YOU CAN BE NEXT</div>
    </section>
  )
}
