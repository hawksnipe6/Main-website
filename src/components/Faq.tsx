import { useState } from 'react'
import { FAQS, type FaqEntry } from '../data/faqs'
import styles from './Faq.module.css'

function FaqItem({ question, answer }: FaqEntry) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.item} ${open ? styles.open : ''}`}>
      <button className={styles.question} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{question}</span>
        <span className={styles.icon} aria-hidden="true">+</span>
      </button>
      <div className={styles.answer} aria-hidden={!open}>
        <div className={styles.answerInner}>{answer}</div>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className="section-title reveal">
            Questions we hear<br />before the first call.
          </h2>
        </div>
      </div>
      <div className={`${styles.list} reveal reveal-d2`}>
        {FAQS.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
    </section>
  )
}
