'use client';
import { useState } from 'react';
import { testimonials } from '@/lib/content';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <span className="label">Testimonials</span>
          <h2 className={styles.title}>What clients say.</h2>
        </div>

        <div className={styles.chips}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.chip} ${active === i ? styles.chipActive : ''}`}
              onClick={() => setActive(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className={styles.card} key={active}>
          <div className={styles.quote}>"</div>
          <p className={styles.text}>{t.text}</p>
          <div className={styles.divider} />
          <div className={styles.footer}>
            <div>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.role}>{t.role}</p>
            </div>
            <span className={styles.counter}>{active + 1} / {testimonials.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
