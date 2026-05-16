import styles from './Footer.module.css'

const FOOTER_COLS = [
  {
    title: 'Studio',
    links: [
      { label: 'Brands', href: '#brands' },
      { label: 'Services', href: '#services' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Start a Project', href: '#cta' },
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
