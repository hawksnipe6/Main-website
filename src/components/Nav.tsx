import { useEffect, useRef, useState } from 'react'
import { useScrollNav } from '../hooks/useScrollNav'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { label: 'About', href: '#services' },
  { label: 'Features', href: '#brands' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function Nav({ onBooking }: { onBooking: () => void }) {
  useScrollNav('#nav', styles.scrolled)
  const progressRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%'
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav id="nav" className={styles.nav}>
        <a href="#hero" className={styles.logo} onClick={close}>Nocturnal</a>

        <ul className={styles.links}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <button className={`${styles.cta} ${styles.ctaDesktop}`} onClick={() => { close(); onBooking(); }}>
          Get Started
        </button>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        <div className={styles.progressTrack}>
          <div ref={progressRef} className={styles.progressBar} />
        </div>
      </nav>

      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`} onClick={close} aria-hidden="true" />
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} className={styles.drawerItem} style={{ transitionDelay: menuOpen ? `${i * 55 + 120}ms` : '0ms' }}>
              <a href={l.href} onClick={close}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className={styles.drawerCta} onClick={() => { close(); onBooking(); }}>Get Started</button>
      </div>
    </>
  )
}
