import { useScrollNav } from '../hooks/useScrollNav'
import styles from './Nav.module.css'
import { ThemeToggle } from './ThemeToggle'  // add this import

// Inside the return, add <ThemeToggle /> before the CTA:
<ThemeToggle />
<a href="#cta" className={styles.cta}>Start a Project</a>
export function Nav() {
  useScrollNav('#nav', styles.scrolled)

  return (
    <nav id="nav" className={styles.nav}>
      <a href="#hero" className={styles.logo}>Nocturnal</a>
      <ul className={styles.links}>
        <li><a href="#about">Studio</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#how">Process</a></li>
        <li><a href="#pricing">Engage</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href="#cta" className={styles.cta}>Start a Project</a>
    </nav>
  )
}
