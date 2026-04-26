import styles from './Footer.module.css'

const NAV_COLS = [
  {
    title: 'Studio',
    colClass: styles.colCentre,
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#how' },
      { label: 'Disciplines', href: '#disciplines' },
    ],
  },
  {
    title: 'Engage',
    colClass: styles.colRight,
    links: [
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Start a Project', href: '#cta' },
      { label: 'hello@nocturnal.studio', href: 'mailto:hello@nocturnal.studio' },
    ],
  },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.colBrand}>
          <a href="#hero" className={styles.logo}>Nocturnal</a>
          <p className={styles.tagline}>
            Design intelligence studio. We design systems, not screens.
            Execution is evidence of thinking.
          </p>
        </div>
        {NAV_COLS.map((col) => (
          <div key={col.title} className={col.colClass}>
            <div className={styles.colTitle}>{col.title}</div>
            <ul className={styles.colLinks}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Nocturnal. All rights reserved.</span>
        <span>Design intelligence studio</span>
      </div>
    </footer>
  )
}
