import styles from './Pricing.module.css'

interface PricingTierProps {
  name: string
  price: string
  note: string
  features: string[]
  featured?: boolean
}

const TIERS: PricingTierProps[] = [
  {
    name: 'Explore',
    price: 'On enquiry',
    note: 'Audit · Discovery · Direction',
    features: [
      'Brand audit and gap analysis',
      'Positioning and strategy workshop',
      'Core identity direction',
      'One defined deliverable',
      'Clear brief for next steps',
    ],
  },
  {
    name: 'Refine',
    price: 'On enquiry',
    note: 'Identity · Product · Motion',
    features: [
      'Audit of existing system',
      'Targeted design intervention',
      'Extended visual language',
      'Product or UI design updates',
      'Motion and interaction logic',
      'Updated brand guidelines',
    ],
    featured: true,
  },
  {
    name: 'Build',
    price: 'On enquiry',
    note: 'Strategy · System · Execution',
    features: [
      'Full brand strategy and positioning',
      'Complete identity system',
      'Product and UI design system',
      '3D / physical collateral',
      'Motion language',
      'Full brand guidelines',
    ],
  },
]

function Tier({ name, price, note, features, featured, onBooking }: PricingTierProps & { onBooking: () => void }) {
  return (
    <div className={`${styles.tier} ${featured ? styles.featured : ''}`}>
      <span className={styles.tierName}>{name}</span>
      <div className={styles.tierPrice}>{price}</div>
      <span className={styles.tierNote}>{note}</span>
      <div className={styles.divider} />
      <ul className={styles.features}>
        {features.map((f) => (
          <li key={f} className={styles.feature}>{f}</li>
        ))}
      </ul>
      <button
        className={`${styles.tierCta} ${featured ? styles.tierCtaFeatured : ''}`}
        onClick={onBooking}
      >
        Send a brief
      </button>
    </div>
  )
}

export function Pricing({ onBooking }: { onBooking: () => void }) {
  return (
    <section id="pricing">
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">Engage</div>
          <h2 className="section-title reveal reveal-d1">
            Scoped to the work.<br />Never to a menu.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Every project is priced on scope. These tiers are starting orientations, not packages.
          Send a brief and we will tell you what the work actually costs.
        </p>
      </div>
      <div className={`${styles.grid} reveal`}>
        {TIERS.map((tier) => (
          <Tier key={tier.name} {...tier} onBooking={onBooking} />
        ))}
      </div>
      <p className={`${styles.note} reveal`}>
        If you have a declared budget, we will scope the work to it — without compromising the
        standard of what we deliver. Scope changes, quality does not.
      </p>
    </section>
  )
}
