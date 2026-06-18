import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useScrollNav } from '../hooks/useScrollNav'
import styles from './Nav.module.css'

const DRAWER_LINKS = [
  { label: 'Work',     href: '#work-preview' },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#how' },
  { label: 'Brands',   href: '#brands' },
  { label: 'FAQ',      href: '#faq' },
]

type NavProps = {
  page: 'home' | 'work' | 'concepts' | 'about' | 'contact'
  onNavigateHome: () => void
  onNavigateWork: () => void
  onNavigateAbout: () => void
  onNavigateContact: () => void
}

export function Nav({ page, onNavigateHome, onNavigateWork, onNavigateAbout, onNavigateContact }: NavProps) {
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

  const navigateHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    close()
    if (page === 'home') {
      const hero = document.querySelector('#hero')
      hero?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      window.history.pushState(null, '', '#hero')
      return
    }
    onNavigateHome()
  }

  const navigateWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    close()
    onNavigateWork()
  }

  const navigateAbout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    close()
    onNavigateAbout()
  }

  const navigateContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    close()
    onNavigateContact()
  }

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    close()
    const section = document.querySelector(href)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.history.pushState(null, '', href)
  }

  return (
    <>
      <nav id="nav" className={`${styles.nav} ${menuOpen ? styles.navMenuOpen : ''}`}>
        <div className={styles.left}>
          <a href="/" className={styles.logo} onClick={navigateHome} aria-label="Nocturnal home">
            Nocturnal
          </a>
        </div>

        <ul className={styles.links}>
          <li>
            <a href="/" onClick={navigateHome}
              style={{ color: page === 'home' ? 'var(--noc-white)' : undefined }}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={navigateAbout}
              style={{ color: page === 'about' ? 'var(--noc-white)' : undefined }}>
              About
            </a>
          </li>
          <li>
            <a href="/work" onClick={navigateWork}
              style={{ color: page === 'work' || page === 'concepts' ? 'var(--noc-white)' : undefined }}>
              Projects
            </a>
          </li>
          <li>
            <a href="/contact" onClick={navigateContact}
              style={{ color: page === 'contact' ? 'var(--noc-white)' : undefined }}>
              Contact
            </a>
          </li>
        </ul>

        <div className={styles.right}>
          <button
            className={`${styles.cta} ${styles.ctaDesktop}`}
            onClick={() => { close(); onNavigateContact() }}
          >
            Start a Project
          </button>
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={styles.progressTrack}>
          <div ref={progressRef} className={styles.progressBar} />
        </div>
      </nav>

      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          <li className={styles.drawerItem} style={{ transitionDelay: menuOpen ? '60ms' : '0ms' }}>
            <a href="/" onClick={navigateHome}>Home</a>
          </li>
          <li className={styles.drawerItem} style={{ transitionDelay: menuOpen ? '120ms' : '0ms' }}>
            <a href="/about" onClick={navigateAbout}>About</a>
          </li>
          <li className={styles.drawerItem} style={{ transitionDelay: menuOpen ? '180ms' : '0ms' }}>
            <a href="/work" onClick={navigateWork}>Projects</a>
          </li>
          <li className={styles.drawerItem} style={{ transitionDelay: menuOpen ? '240ms' : '0ms' }}>
            <a href="/contact" onClick={navigateContact}>Contact</a>
          </li>
          {page === 'home' && DRAWER_LINKS.map((link, index) => (
            <li
              key={link.href}
              className={styles.drawerItem}
              style={{ transitionDelay: menuOpen ? `${index * 60 + 300}ms` : '0ms' }}
            >
              <a href={link.href} onClick={(event) => navigateToSection(event, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button className={styles.drawerCta} onClick={() => { close(); onNavigateContact() }}>
          Start a Project
        </button>
      </div>
    </>
  )
}
