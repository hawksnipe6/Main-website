import { useEffect, useState } from 'react'
import styles from './PricingPage.module.css'

const EMAIL = 'getnctrnl@gmail.com'
const WHATSAPP_DISPLAY = '+91 70454 21516'
const WHATSAPP_URL = 'https://wa.me/917045421516'

/**
 * NOTE: Prices below are ILLUSTRATIVE starting points based on an emerging,
 * multidisciplinary studio. Review and set your own before publishing — edit the
 * `priceUSD` / `priceINR` numbers in the DOMAINS data. Structure, deliverables,
 * and copy are ready.
 */

type Currency = 'USD' | 'INR'

type Tier = {
  name: string
  bestFor: string
  priceUSD: number
  priceINR: number
  deliverables: string[]
  revisions: string
  timeline: string
  featured?: boolean
  locked?: boolean
}

function formatPrice(tier: Tier, currency: Currency) {
  return currency === 'USD'
    ? `$${tier.priceUSD.toLocaleString('en-US')}`
    : `₹${tier.priceINR.toLocaleString('en-IN')}`
}

type Domain = {
  key: string
  label: string
  tagline: string
  tiers: Tier[]
}

const DOMAINS: Domain[] = [
  {
    key: 'product',
    label: 'Product',
    tagline: 'Industrial design for physical products, from form direction to prototype-ready output.',
    tiers: [
      {
        name: 'Focused',
        bestFor: 'A single product concept, visualized.',
        priceUSD: 400,
        priceINR: 35000,
        deliverables: ['Research snapshot', 'Form concepts (3 directions)', '1 set of 3D hero renders'],
        revisions: '2 revision rounds',
        timeline: '~1 week',
      },
      {
        name: 'Core',
        bestFor: 'Full industrial design, render-ready.',
        priceUSD: 600,
        priceINR: 50000,
        deliverables: ['Research + opportunity map', 'Form direction + CAD model', 'CMF / material direction', 'Hero render set'],
        revisions: '3 revision rounds',
        timeline: '~2–3 weeks',
        featured: true,
      },
      {
        name: 'Complete',
        bestFor: 'Concept to validated prototype.',
        priceUSD: 2100,
        priceINR: 180000,
        deliverables: ['Everything in Core', 'Lo-fi + 3D-printed prototype', 'Ergonomic checks', 'Presentation deck'],
        revisions: '4 revision rounds',
        timeline: '~5–6 weeks',
        locked: true,
      },
    ],
  },
  {
    key: 'motion',
    label: 'Motion',
    tagline: 'CGI, product visualization, and 2D / 3D motion for launches and product communication.',
    tiers: [
      {
        name: 'Focused',
        bestFor: 'One crisp motion asset.',
        priceUSD: 220,
        priceINR: 18000,
        deliverables: ['1× up to 15s 2D motion / explainer', '1 delivery format', 'Licensed music'],
        revisions: '2 revision rounds',
        timeline: '~1 week',
      },
      {
        name: 'Core',
        bestFor: 'A short 3D product film that sells.',
        priceUSD: 400,
        priceINR: 35000,
        deliverables: [
          'Up to 5× 3D product films, 4–15s',
          '3D product render + animation',
          'Sound design included',
          'All source & project files',
        ],
        revisions: '2 revision rounds',
        timeline: '~1–2 weeks',
        featured: true,
      },
      {
        name: 'Complete',
        bestFor: 'A full launch motion kit.',
        priceUSD: 1050,
        priceINR: 90000,
        deliverables: ['3D product film + variants', 'Social cutdowns (3 ratios)', 'Promo stills', 'Sound design'],
        revisions: '3 revision rounds',
        timeline: '~4 weeks',
        locked: true,
      },
    ],
  },
  {
    key: 'uiux',
    label: 'UI/UX',
    tagline: 'Product UI/UX systems for apps, dashboards, and AI workflows that need clarity at scale.',
    tiers: [
      {
        name: 'Focused',
        bestFor: 'One flow, fully designed.',
        priceUSD: 300,
        priceINR: 25000,
        deliverables: ['1 core flow, 1 platform', '3–5 key screens', 'Wireframe + high-fidelity UI'],
        revisions: '2 revision rounds',
        timeline: '~1 week',
      },
      {
        name: 'Core',
        bestFor: 'A complete product surface.',
        priceUSD: 470,
        priceINR: 40000,
        deliverables: ['UX research snapshot', 'IA + key user flows', '10–15 screens', 'Design system starter', 'Clickable prototype'],
        revisions: '3 revision rounds',
        timeline: '~2–3 weeks',
        featured: true,
      },
      {
        name: 'Complete',
        bestFor: 'End-to-end product, dev-ready.',
        priceUSD: 1750,
        priceINR: 150000,
        deliverables: ['Full UX research + strategy', 'Full app screen set', 'Complete design system', 'Interactive prototype', 'Developer handoff'],
        revisions: '4 revision rounds',
        timeline: '~5–6 weeks',
        locked: true,
      },
    ],
  },
  {
    key: 'graphic',
    label: 'Graphic',
    tagline: 'Brand identity systems that define positioning, visual language, and recall.',
    tiers: [
      {
        name: 'Focused',
        bestFor: 'A sharp visual identity.',
        priceUSD: 240,
        priceINR: 20000,
        deliverables: ['Logo system', 'Color + type direction', 'Basic usage sheet'],
        revisions: '2 revision rounds',
        timeline: '~1 week',
      },
      {
        name: 'Core',
        bestFor: 'A complete brand system.',
        priceUSD: 400,
        priceINR: 35000,
        deliverables: ['Branding', 'Identity system', 'Social media content design'],
        revisions: '3 revision rounds',
        timeline: '~2–3 weeks',
        featured: true,
      },
      {
        name: 'Complete',
        bestFor: 'Brand, built to launch.',
        priceUSD: 1400,
        priceINR: 120000,
        deliverables: ['Strategy + identity', 'Full brand guidelines', 'Collateral suite', 'Campaign / launch visuals', 'Social system'],
        revisions: '4 revision rounds',
        timeline: '~5 weeks',
        locked: true,
      },
    ],
  },
]

export function PricingPage() {
  const [contactFor, setContactFor] = useState<string | null>(null)
  const [currency, setCurrency] = useState<Currency>('USD')

  useEffect(() => {
    if (contactFor === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setContactFor(null) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [contactFor])

  return (
    <main className={`${styles.page} routeEnter`}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <p className={styles.label}>Pricing</p>
          <div className={styles.currencyToggle} role="group" aria-label="Currency">
            <button
              className={`${styles.currencyBtn} ${currency === 'USD' ? styles.currencyBtnActive : ''}`}
              onClick={() => setCurrency('USD')}
              aria-pressed={currency === 'USD'}
              aria-label="Show prices in US dollars"
            >
              $
            </button>
            <button
              className={`${styles.currencyBtn} ${currency === 'INR' ? styles.currencyBtnActive : ''}`}
              onClick={() => setCurrency('INR')}
              aria-pressed={currency === 'INR'}
              aria-label="Show prices in Indian rupees"
            >
              ₹
            </button>
          </div>
        </div>
        <h1 className={styles.title}>Fixed scope. Fixed price. No surprises.</h1>
        <p className={styles.subtitle}>
          Pick a package and you know exactly what you get, how many revisions, and when. Need something bigger or unusual? Talk to us and we will scope it directly.
        </p>
      </header>

      <div className={styles.panel}>
        {DOMAINS.map((domain) => (
          <section key={domain.key} className={styles.domainBox}>
            <span className={styles.domainChip}>{domain.label}</span>
            <p className={styles.domainTagline}>{domain.tagline}</p>
            <div className={styles.grid}>
              {domain.tiers.map((tier) => (
                <article key={tier.name} className={`${styles.card} ${tier.featured ? styles.cardFeatured : ''}`}>
                  {tier.featured && <span className={styles.badge}>Most popular</span>}
                  <h2 className={styles.tierName}>{tier.name}</h2>
                  <p className={styles.bestFor}>{tier.bestFor}</p>
                  <p className={`${styles.price} ${tier.locked ? styles.priceLocked : ''}`}>{formatPrice(tier, currency)}</p>
                  <p className={styles.priceNote}>{tier.locked ? 'scoped on request' : 'fixed, per project'}</p>
                  <div className={styles.divider} />
                  <ul className={styles.featList}>
                    {tier.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className={styles.metaRow}>
                    <span>{tier.revisions}</span>
                    <span>{tier.timeline}</span>
                  </div>
                  {tier.locked ? (
                    <button className={`${styles.cardCta} ${styles.lockCta}`} onClick={() => setContactFor(`${domain.label} · ${tier.name}`)}>
                      <svg className={styles.lock} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" />
                        <path className={styles.shackle} d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
                      </svg>
                      Contact to unlock
                    </button>
                  ) : (
                    <button className={styles.cardCta} onClick={() => setContactFor(`${domain.label} · ${tier.name}`)}>Start {tier.name}</button>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}

        <p className={styles.note}>
          <strong>Every package includes</strong> a kickoff call, source files, and commercial usage rights.
          Copywriting, development build, and print production are quoted separately.
        </p>
      </div>

      <section className={styles.customBand}>
        <div className={styles.customInner}>
          <div>
            <h2 className={styles.customTitle}>Bigger or unusual scope?</h2>
            <p className={styles.customText}>
              Most of our best work starts as a conversation. Tell us the outcome you need and we will scope it directly, fixed where we can, custom where it counts.
            </p>
          </div>
          <button className={styles.customCta} onClick={() => setContactFor('Custom scope')}>
            Start a conversation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {contactFor !== null && (
        <div
          className={styles.contactOverlay}
          onClick={() => setContactFor(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Contact Nocturnal"
        >
          <div className={styles.contactCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.contactClose} onClick={() => setContactFor(null)} aria-label="Close">×</button>
            <p className={styles.contactEyebrow}>{contactFor}</p>
            <h2 className={styles.contactTitle}>Let's talk.</h2>
            <p className={styles.contactBody}>Email or WhatsApp at</p>
            <div className={styles.contactLinks}>
              <a className={styles.contactLink} href={`mailto:${EMAIL}`}>
                <span className={styles.contactLinkLabel}>Email</span>
                <span className={styles.contactLinkValue}>{EMAIL}</span>
              </a>
              <a className={styles.contactLink} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <span className={styles.contactLinkLabel}>WhatsApp</span>
                <span className={styles.contactLinkValue}>{WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
