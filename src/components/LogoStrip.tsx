import styles from './LogoStrip.module.css'

const LOGOS = [
  { src: '/logos/armor.png',    alt: 'Armor'         },
  { src: '/logos/pixelpaw.png', alt: 'Pixelpaw Labs'  },
  { src: '/logos/dmos.png',     alt: "D'MOS"          },
  { src: '/logos/aerpace.png',  alt: 'Aerpace'        },
  { src: '/logos/wehear.png',   alt: 'Wehear'         },
  { src: '/logos/khamir.png',   alt: 'Khamir'         },
  { src: '/logos/penlounge.png',alt: 'The Pen Lounge' },
]

export function LogoStrip() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Brands we have worked with</div>
      <div className={styles.grid} aria-label="Brands we have worked with">
        {LOGOS.map((logo) => (
          <div key={logo.alt} className={styles.logoWrap}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={styles.logo}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
