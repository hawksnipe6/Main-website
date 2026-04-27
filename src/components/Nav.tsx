import { useEffect, useRef } from 'react'
import { useScrollNav } from '../hooks/useScrollNav'
import { ThemeToggle } from './ThemeToggle'
import styles from './Nav.module.css'

export function Nav() {
  useScrollNav('#nav', styles.scrolled)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <nav id="nav" className={styles.nav}>
      {/* Left — logo + toggle stacked */}
      <div className={styles.left}>
        <a href="#hero" className={styles.logo}>Nocturnal</a>
        <ThemeToggle />
      </div>

      {/* Centre — nav links */}
      <ul className={styles.links}>
        <li><a href="#about">Studio</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#how">Process</a></li>
        <li><a href="#pricing">Engage</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>

      {/* Right — CTA */}
      <a href="#cta" className={styles.cta}>Start a Project</a>

      {/* Scroll progress bar */}
      <div className={styles.progressTrack}>
        <div ref={progressRef} className={styles.progressBar} />
      </div>
    </nav>
  )
}
