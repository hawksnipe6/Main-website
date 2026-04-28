'use client';
import { useState } from 'react';
import { faqs } from '@/lib/content';
import styles from './FAQSection.module.css';

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.item}>
      <button className={styles.row} onClick={() => setOpen(v => !v)}>
        <span className={styles.question}>{q}</span>
        <span className={styles.icon}>{open ? '−' : '+'}</span>
      </button>
      {open && <p className={styles.answer}>{a}</p>}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className={styles.header}>
          <span className="label">FAQ</span>
          <h2 className={styles.title}>Your questions, answered.</h2>
        </div>
        <div className={styles.list}>
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}
