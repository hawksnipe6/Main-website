'use client';
import { useEffect, useRef } from 'react';
import { featureCards, process, benefits } from '@/lib/content';
import styles from './MidSections.module.css';

// ── Shared reveal hook ────────────────────────
function useGridReveal(selector: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>(selector);
    if (!items) return;
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    items.forEach((el, i) => { el.style.transitionDelay = `${i * 80}ms`; obs.observe(el); });
    return () => obs.disconnect();
  }, [selector]);
  return ref;
}

// ── Intro ─────────────────────────────────────
export function IntroSection() {
  const ref = useGridReveal('.' + styles.featureCard);
  return (
    <section className="section" id="about">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="label">The Studio</span>
          <h2 className={styles.sectionTitle}>From a sketch to<br />a system that holds.</h2>
        </div>
        <div className={`grid-3 ${styles.featureGrid}`} ref={ref}>
          {featureCards.map(card => (
            <div key={card.title} className={`reveal ${styles.featureCard}`}>
              <div className={styles.featureMedia}>
                <span className={styles.featureTag}>{card.tag}</span>
                <div className={styles.featureGlyph}>
                  {card.tag === 'Hardware' ? '◎' : card.tag === 'Identity' ? 'Aa' : '⊞'}
                </div>
              </div>
              <div className={styles.featureBody}>
                <span className="tag">{card.tag}</span>
                <h3 className={styles.featureTitle}>{card.title}</h3>
                <p className={styles.featureDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────
export function ProcessSection() {
  const ref = useGridReveal('.' + styles.stepCard);
  return (
    <section className="section" id="process">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="label">Process</span>
          <h2 className={styles.sectionTitle}>One brief to start.<br />Three steps to clarity.</h2>
        </div>
        <div className={styles.processRow} ref={ref}>
          {process.map((s, i) => (
            <div key={s.step} className={`reveal ${styles.stepCard}`}>
              <div className={styles.stepBadge}>{s.step}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
              {i < process.length - 1 && <div className={styles.connector}>›</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────
export function BenefitsSection() {
  const ref = useGridReveal('.' + styles.benefitCard);
  return (
    <section className="section">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="label">Why Nocturnal</span>
          <h2 className={styles.sectionTitle}>Built different.<br />Delivered direct.</h2>
        </div>
        <div className={`grid-3`} ref={ref}>
          {benefits.map(b => (
            <div key={b.title} className={`reveal ${styles.benefitCard}`}>
              <div className={styles.benefitIcon}>{b.icon}</div>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
