'use client';
import styles from './CTAModal.module.css';

type Props = { source: string; onClose: () => void };

export default function CTAModal({ onClose }: Props) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        <p className={styles.eyebrow}>Book a Call</p>
        <h2 className={styles.title}>Let's talk about your project.</h2>
        <p className={styles.sub}>
          No commitment, no sales deck. Pick a time and we'll scope the brief together.
        </p>

        <a
          href="https://calendar.app.google/t1jjP2Tvnh7JBe8D7"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary ${styles.submit}`}
          onClick={onClose}
        >
          Book a time →
        </a>
        <p className={styles.privacy}>First conversation is free.</p>
      </div>
    </div>
  );
}
