import styles from './Footer.module.css'

const FOOTER_COLS = [
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#how' },
      { label: 'Disciplines', href: '#disciplines' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Start a Project', href: '#cta' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'getncrtnl@gmail.com', href: 'mailto:getncrtnl@gmail.com' },
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

        {FOOTER_COLS.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <div className={styles.colTitle}>{col.title}</div>
            <ul className={styles.colLinks}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Nocturnal. All rights reserved.</span>
        <span>Design intelligence studio</span>
      </div>
    </footer>
  )
}
