'use client';
import { hero, stats } from '@/lib/content';
import styles from './HeroSection.module.css';

type Props = { onCTA: () => void };

export default function HeroSection({ onCTA }: Props) {
  return (
    <>
      <section className={styles.hero}>
        {/* Background image */}
        <div className={styles.bg} />
        <div className={styles.vignette} />

        {/* Ambient orb */}
        <div className={styles.orb} aria-hidden />

        <div className="container">
          <div className={styles.content}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Phygital Design Studio · Mumbai
            </div>

            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.subtitle}>{hero.subtitle}</p>

            <div className={styles.ctaRow}>
              <button className="btn btn-primary btn-lg" onClick={onCTA}>
                {hero.cta}
              </button>
              <button className={styles.ghostCta} onClick={onCTA}>
                {hero.secondary}
              </button>
            </div>

            <div className={styles.pills}>
              {hero.pills.map(p => (
                <span key={p} className={styles.pill}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={styles.scrollHint} aria-hidden>
          <div className={styles.mouse}>
            <div className={styles.mouseDot} />
          </div>
          <span className={styles.scrollLabel}>Scroll to explore</span>
        </div>
      </section>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        {stats.map((s, i) => (
          <div key={s.label} className={styles.statItem}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
            {i < stats.length - 1 && <div className={styles.statDivider} />}
          </div>
        ))}
      </div>
    </>
  );
}
