'use client';
import { useState } from 'react';
import { NAV_LINKS, type NavKey } from '@/lib/content';
import { useTheme } from '@/lib/theme';
import styles from './NavBar.module.css';

type Props = { onNavigate: (key: NavKey) => void; onCTA: () => void };

export default function NavBar({ onNavigate, onCTA }: Props) {
  const [open, setOpen] = useState(false);
  const { toggle } = useTheme();

  const go = (key: NavKey) => { setOpen(false); onNavigate(key); };

  return (
    <>
      <nav className={styles.nav}>
        {/* Left — wordmark + toggle side by side */}
        <div className={styles.brand}>
          <span className={styles.logo}>Nocturnal</span>
          {/* Toggle sits immediately right of wordmark, vertically centered */}
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label="Toggle theme"
          />
        </div>

        {/* Desktop links */}
        <div className={styles.desktop}>
          {NAV_LINKS.map(l => (
            <button key={l} className={styles.link} onClick={() => onNavigate(l)}>{l}</button>
          ))}
          <button className="btn btn-primary btn-sm" onClick={onCTA}>Book a Call</button>
        </div>

        {/* Mobile right */}
        <div className={styles.mobileRight}>
          <button className={styles.hamburger} onClick={() => setOpen(v => !v)} aria-label="Menu">
            <span className={styles.hamLine} style={{ width: 22 }} />
            <span className={styles.hamLine} style={{ width: 16 }} />
          </button>
        </div>
      </nav>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.overlayTop}>
            <div className={styles.brand}>
              <span className={styles.logo}>Nocturnal</span>
              <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" />
            </div>
            <button className={styles.close} onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className={styles.overlayLinks}>
            {NAV_LINKS.map(l => (
              <button key={l} className={styles.overlayLink} onClick={() => go(l)}>
                {l}<span className={styles.arrow}>↗</span>
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => { setOpen(false); onCTA(); }}>Book a Call</button>
          <p className={styles.overlayFooter}>Mumbai · Global</p>
        </div>
      )}
    </>
  );
}
