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
    name: 'Clarity',
    price: 'Diagnose before you prescribe',
    note: 'Audit · Research · Direction',
    features: [
      'Revenue-leak brand audit',
      'Competitive trust analysis',
      'Positioning and market clarity',
      'One prioritised deliverable',
      'Clear investment roadmap',
    ],
  },
  {
    name: 'Conversion',
    price: 'Fix what is losing you deals',
    note: 'Brand · Product · Trust',
    features: [
      'Audit of existing brand system',
      'Identity that earns market trust',
      'Product UI designed to cut drop-off',
      'Motion logic that signals quality',
      'Updated brand guidelines',
      'Design decisions tied to outcomes',
    ],
    featured: true,
  },
  {
    name: 'Dominance',
    price: 'Build for category leadership',
    note: 'Strategy · System · Market',
    features: [
      'Full brand strategy and positioning',
      'Complete identity system',
      'Product and UI design system',
      'Physical and 3D collateral',
      'Motion language across surfaces',
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
          <div className="section-label reveal">Results</div>
          <h2 className="section-title reveal reveal-d1">
            Design that pays.<br />Systems that close.
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Companies with strong design systems outperform weaker-branded competitors by 2:1.
          Nocturnal builds the brand, product, and motion systems that create that gap.
          Three tiers. One standard of execution.
        </p>
      </div>
      <div className={`${styles.grid} reveal`}>
        {TIERS.map((tier) => (
          <Tier key={tier.name} {...tier} onBooking={onBooking} />
        ))}
      </div>
      <p className={`${styles.note} reveal`}>
        Poor design is a revenue problem. Businesses do not lose deals on price alone.
        Weak brand and fragmented product experience kill deals before pricing enters the conversation.
        Nocturnal removes that friction.
      </p>
    </section>
  )
}
