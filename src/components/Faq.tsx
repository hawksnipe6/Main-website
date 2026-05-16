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

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">FAQ</div>
          <h2 className="section-title reveal reveal-d1">Questions before
            we begin.</h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Clear answers before the first call. No vague process. No hidden assumptions.
        </p>
      </div>

      <div className={styles.list}>
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.question} className={`${styles.item} ${isOpen ? styles.itemOpen : ''} reveal`}>
              <button
                className={styles.question}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon}>+</span>
              </button>
              <div className={styles.answer}>
                <div className={styles.answerClip}>
                  <p className={styles.answerInner}>{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
