import styles from './CTAAndFooter.module.css';

const NAV = ['Work', 'About', 'Process', 'Pricing', 'FAQ'];
const SOCIALS = [
  { glyph: '𝕏',  href: '#', label: 'Twitter'  },
  { glyph: 'Be', href: 'https://www.behance.net/abeermahad064c', label: 'Behance'  },
  { glyph: 'in', href: 'https://www.linkedin.com/in/abeermahadane44', label: 'LinkedIn' },
];

export function CTABanner({ onPress }: { onPress: () => void }) {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.ctaWrap}>
          <div className={styles.ctaBg} />
          <div className={styles.ctaInner}>
            <span className={styles.ctaLabel}>Ready to start</span>
            <h2 className={styles.ctaTitle}>Build something<br />worth remembering.</h2>
            <p className={styles.ctaSub}>
              Products that last were designed with intent from the start. One conversation to scope it.
            </p>
            <button className={`btn btn-primary btn-lg ${styles.ctaBtn}`} onClick={onPress}>
              Book a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <span className={styles.wordmark}>Nocturnal</span>
            <p className={styles.tagline}>Phygital design studio.<br />Mumbai · Global.</p>
            <div className={styles.socials}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={s.label}
                >
                  {s.glyph}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className={styles.colLabel}>Navigation</p>
            {NAV.map(l => <p key={l} className={styles.navLink}>{l}</p>)}
          </div>

          {/* Contact */}
          <div>
            <p className={styles.colLabel}>Contact</p>
            <a href="https://www.behance.net/abeermahad064c" target="_blank" rel="noopener noreferrer" className={styles.navLink}>Behance ↗</a>
            <a href="https://www.linkedin.com/in/abeermahadane44" target="_blank" rel="noopener noreferrer" className={styles.navLink}>LinkedIn ↗</a>
            <p className={styles.navLink} style={{ cursor: 'pointer' }}>Book a Call ↗</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2025 Nocturnal. All rights reserved.</p>
          <p className={styles.copy}>Designed by Abeer Mahadane</p>
        </div>
      </div>
    </footer>
  );
}
