export type FaqEntry = { question: string; answer: string }

// Rendered by Faq.tsx and serialized into the home page FAQPage schema, so the
// markup and structured data can never drift apart.
export const FAQS: FaqEntry[] = [
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
