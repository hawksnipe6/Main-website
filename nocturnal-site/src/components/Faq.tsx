import { useState } from 'react'
import styles from './Faq.module.css'

interface FaqItemProps {
  question: string
  answer: string
}

const FAQS: FaqItemProps[] = [
  {
    question: 'What makes Nocturnal different from other design studios?',
    answer: 'We start with the problem, not the brief. Most studios execute what they are told. We spend more time questioning the brief than anyone is comfortable with — and that investment produces work that holds. All delivered as a connected system, not siloed services.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'It depends entirely on scope. An audit typically runs two to three weeks. A full brand or product system runs six to ten weeks. We scope every project before we commit to a timeline — no guesses, no padding.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes. We work with clients across time zones. All project communication is async-first, with structured check-ins at key milestones. Location is not a constraint.',
  },
  {
    question: 'Can you work within a fixed budget?',
    answer: 'If you declare a budget upfront, we scope the work to fit it. We do not discount arbitrarily — we reduce scope instead. What remains is built to full Nocturnal standard. A smaller but excellent system beats a large, mediocre one.',
  },
  {
    question: 'How do I start?',
    answer: 'Send us a brief — even a rough one. We will respond with questions, not a quote. The first conversation is always about understanding whether we are the right fit for your problem.',
  },
]

function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.item} ${open ? styles.open : ''}`}>
      <button
        className={styles.question}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={styles.icon} aria-hidden="true">+</span>
      </button>
      <div className={styles.answer}>{answer}</div>
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq">
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">FAQ</div>
          <h2 className="section-title reveal reveal-d1">
            Questions we hear<br />before the first call.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          If something is not answered here, send it in the brief. First conversation is always about fit.
        </p>
      </div>
      <div className={styles.list}>
        {FAQS.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
    </section>
  )
}
