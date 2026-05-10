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
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Brands we have worked with</div>
      <div className={styles.track}>
        {doubled.map((logo, i) => (
          <div key={i} className={styles.logoWrap}>
            <div className={styles.logoCircle}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logo}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
