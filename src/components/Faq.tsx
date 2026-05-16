import { useState } from 'react'
import styles from './Faq.module.css'

interface FaqItemProps {
  question: string
  answer: string
}

const FAQS: FaqItemProps[] = [
  {
    question: 'What makes Nocturnal different from other design studios?',
    answer: 'We question the brief before we execute it. The work is delivered as one connected system, not disconnected design files.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Audits usually take two to three weeks. Full brand, product, or interface systems usually take six to ten weeks after scope is locked.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes. We work async-first with structured check-ins, written decisions, and clear handoff points across time zones.',
  },
  {
    question: 'Can you work within a fixed budget?',
    answer: 'Yes, if the budget is declared upfront. We reduce scope, not quality. A smaller sharp system beats a large weak one.',
  },
  {
    question: 'How do I start?',
    answer: 'Send a rough brief. We respond with questions first, then scope the work only if the problem is a clear fit.',
  },
]

function FaqItem({ question, answer }: FaqItemProps) {
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
          <div className="section-label reveal">FAQ</div>
          <h2 className="section-title reveal reveal-d1">
            Questions we hear<br />before the first call.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          The useful answers before we discuss scope, timeline, or fit.
        </p>
      </div>
      <div className={`${styles.list} reveal reveal-d2`}>
        {FAQS.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
    </section>
  )
}
