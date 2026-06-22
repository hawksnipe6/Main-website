import { useEffect, useState } from 'react'
import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abeermahadane44/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.32 8.1h4.36V23H.32V8.1Zm7.25 0h4.18v2.03h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.21 2.9 5.21 6.67V23h-4.35v-7.5c0-1.79-.03-4.08-2.49-4.08-2.49 0-2.87 1.94-2.87 3.95V23H7.57V8.1Z" />
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/abeermahad064c',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.44 11.07c1.55-.45 2.34-1.48 2.34-3.08 0-1.13-.38-2.01-1.15-2.65C9.86 4.71 8.75 4.4 7.3 4.4H0v15.2h7.75c1.45 0 2.6-.38 3.44-1.13.84-.75 1.26-1.81 1.26-3.17 0-1.02-.26-1.89-.78-2.6-.52-.71-1.26-1.25-2.23-1.63ZM3.35 7.02h3.2c.62 0 1.1.14 1.43.41.33.28.5.68.5 1.21 0 .56-.17.99-.5 1.27-.33.28-.8.42-1.41.42H3.35V7.02Zm5.02 9.55c-.37.31-.88.47-1.53.47H3.35v-4.25h3.56c.67 0 1.18.18 1.53.53.35.35.52.83.52 1.44 0 .77-.2 1.37-.59 1.81ZM16.76 4.96h5.12v1.48h-5.12V4.96Zm6.8 8.63c-.09-.82-.29-1.56-.61-2.22-.32-.66-.75-1.21-1.28-1.66-.53-.45-1.16-.79-1.88-1.02-.72-.24-1.51-.35-2.37-.35-1.05 0-1.98.25-2.78.74-.8.49-1.42 1.18-1.86 2.06-.44.88-.66 1.9-.66 3.06 0 1.75.49 3.12 1.48 4.12.99 1 2.37 1.5 4.14 1.5 1.28 0 2.37-.31 3.27-.92.9-.61 1.52-1.48 1.86-2.6h-2.88c-.16.38-.43.69-.81.91-.38.23-.82.34-1.34.34-.77 0-1.36-.22-1.78-.67-.42-.45-.65-1.09-.7-1.93h8.99c.01-.54-.02-.99-.07-1.36Zm-8.89-.55c.12-.74.4-1.3.84-1.68.44-.38.99-.57 1.65-.57.7 0 1.26.2 1.69.6.43.4.68.95.75 1.65h-4.93Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/designwithabeer/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.12 1.39A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a5.86 5.86 0 0 0 1.39 2.12 5.86 5.86 0 0 0 2.12 1.39c.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a6.1 6.1 0 0 0 3.51-3.51c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.39-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
      </svg>
    ),
  },
]

type FooterLink = { label: string; href: string; navigate?: boolean }

const FOOTER_COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Studio',
    links: [
      { label: 'Contact', href: '/contact', navigate: true },
      { label: 'Services', href: '#services' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'Careers', href: 'careers' },
      { label: 'getnctrnl@gmail.com', href: 'mailto:getnctrnl@gmail.com' },
      { label: '+91 70454 21516', href: 'tel:+917045421516' },
    ],
  },
]

export function Footer({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [careerOpen, setCareerOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = careerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [careerOpen])

  return (
    <>
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
                    {link.href === 'careers' ? (
                      <button className={styles.linkButton} onClick={() => setCareerOpen(true)} type="button">
                        {link.label}
                      </button>
                    ) : link.navigate ? (
                      <button className={styles.linkButton} onClick={() => onNavigate?.(link.href)} type="button">
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
              {col.title === 'Engage' && (
                <div className={styles.socialRow} aria-label="Social links">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Nocturnal. All rights reserved.</span>
          <span>Design intelligence studio</span>
        </div>
      </footer>

      {careerOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Careers">
          <button className={styles.scrim} onClick={() => setCareerOpen(false)} aria-label="Close careers" />
          <article className={styles.panel}>
            <button className={styles.close} onClick={() => setCareerOpen(false)} aria-label="Close careers">
              ×
            </button>
            <span className={styles.panelKicker}>Careers</span>
            <h2 className={styles.panelTitle}>Great to see that you are interested.</h2>
            <p className={styles.panelBody}>
              Although we are not hiring at the moment, you can mail us. We will reach out to you soon.
            </p>
            <a className={styles.panelMail} href="mailto:getnctrnl@gmail.com">getnctrnl@gmail.com</a>
          </article>
        </div>
      )}
    </>
  )
}
