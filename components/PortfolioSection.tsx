'use client';
import { useEffect, useRef } from 'react';
import { portfolio } from '@/lib/content';
import styles from './PortfolioSection.module.css';

export default function PortfolioSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll<HTMLElement>('.' + styles.cell);
    if (!items) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add(styles.visible); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * 55}ms`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="work">
      <div className="container">
        <div className={styles.header}>
          <span className="label">Work</span>
          <h2 className={styles.title}>Selected projects.</h2>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {portfolio.map((p, i) => (
            <div key={p.title} className={styles.cell}>
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.projectTitle}>{p.title}</span>
              <div className={styles.meta}>
                <span className="tag">{p.tag}</span>
                {p.note && <span className={styles.note}>{p.note}</span>}
              </div>
              <span className={styles.arrow}>↗</span>
            </div>
          ))}
        </div>

        <div className={styles.behance}>
          <span className={styles.behanceLabel}>Full portfolio on Behance</span>
          <a
            href="https://www.behance.net/abeermahad064c"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.behanceLink}
          >
            abeermahad064c ↗
          </a>
        </div>
      </div>
    </section>
  );
}
