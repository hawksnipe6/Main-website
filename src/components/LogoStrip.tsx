import { useRef } from 'react'
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
  const logoRowRef = useRef<HTMLDivElement>(null)

  const move = (direction: 1 | -1) => {
    const row = logoRowRef.current
    if (!row) return

    const isMobile = window.matchMedia('(max-width: 640px)').matches
    const maxScroll = row.scrollWidth - row.clientWidth
    const current = row.scrollLeft
    const step = isMobile ? row.clientWidth : Math.max(240, row.clientWidth * 0.42)
    let next = current + direction * step

    if (direction === 1 && current >= maxScroll - 2) {
      next = 0
    }

    if (direction === -1 && current <= 2) {
      next = maxScroll
    }

    row.scrollTo({
      left: Math.min(maxScroll, Math.max(0, next)),
      behavior: 'smooth',
    })
  }

  return (
    <section id="brands" className={styles.brands}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">WORK EX</div>
          <h2 className="section-title reveal reveal-d1">
            People who trust
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Selected collaborators across product, brand, interface, and industrial design.
        </p>
      </div>

      <div ref={logoRowRef} className={`${styles.logoRow} reveal reveal-d2`} aria-label="People who trust">
        {LOGOS.map((logo) => (
          <div key={logo.alt} className={`${styles.logoCell} ${styles[logo.shape ?? 'rect']}`}>
            <img src={logo.src} alt={logo.alt} className={styles.logo} draggable={false} />
          </div>
        ))}
      </div>

      <div className={`${styles.controls} reveal reveal-d3`}>
        <button className={styles.arrow} onClick={() => move(-1)} aria-label="Previous brand logos" type="button">
          ←
        </button>
        <button className={styles.arrow} onClick={() => move(1)} aria-label="Next brand logos" type="button">
          →
        </button>
      </div>

      <div className={`${styles.nextText} reveal reveal-d3`}>YOU CAN BE NEXT</div>
    </section>
  )
}
