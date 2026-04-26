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
    name: 'Foundation',
    price: 'On enquiry',
    note: 'Audit · Discovery · Core Identity',
    features: [
      'Brand audit and gap analysis',
      'Positioning and strategy workshop',
      'Core identity system',
      'Typography and colour foundations',
      'Usage guidelines document',
    ],
  },
  {
    name: 'Full System',
    price: 'On enquiry',
    note: 'Identity · Product · Motion',
    features: [
      'Everything in Foundation',
      'Extended visual language',
      'Product or UI design system',
      'Motion and interaction logic',
      '3D / physical collateral',
      'Full brand guidelines',
    ],
    featured: true,
  },
  {
    name: 'Retainer',
    price: 'On enquiry',
    note: 'Ongoing · Design Partner',
    features: [
      'Dedicated studio capacity',
      'Monthly deliverable scope',
      'Priority turnaround',
      'Strategic review sessions',
      'All disciplines available',
    ],
  },
]

function Tier({ name, price, note, features, featured }: PricingTierProps) {
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
    </div>
  )
}

export function Pricing() {
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
          <Tier key={tier.name} {...tier} />
        ))}
      </div>
      <p className={`${styles.note} reveal`}>
        If you have a declared budget, we will scope the work to it — without compromising the
        standard of what we deliver. Scope changes, quality does not.
      </p>
    </section>
  )
}
