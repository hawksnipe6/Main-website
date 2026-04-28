'use client';
import { useState } from 'react';
import { plans, type Plan } from '@/lib/content';
import styles from './PricingSection.module.css';

function PricingCard({ plan, billing }: { plan: Plan; billing: 'monthly' | 'yearly' }) {
  const price  = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const period = plan.period;

  return (
    <div className={`${styles.card} ${plan.popular ? styles.cardPopular : ''}`}>
      <div className={styles.cardTop}>
        <span className={styles.planName}>{plan.name}</span>
        {plan.popular && <span className={styles.popularBadge}>Popular</span>}
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        {period && <span className={styles.period}>{period}</span>}
      </div>

      <p className={styles.desc}>{plan.desc}</p>

      <button
        className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} ${styles.cta}`}
      >
        {plan.cta}
      </button>

      <div className={styles.dividerRow}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerLabel}>Includes</span>
        <div className={styles.dividerLine} />
      </div>

      <ul className={styles.features}>
        {plan.features.map(f => (
          <li key={f} className={styles.feature}>
            <span className={styles.check}>◎</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingSection() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className={styles.header}>
          <span className="label">Pricing</span>
          <h2 className={styles.title}>Choose the plan that<br />matches your ambition.</h2>
        </div>

        {/* Billing toggle */}
        <div className={styles.toggle}>
          <span className={`${styles.toggleLabel} ${billing === 'monthly' ? styles.toggleLabelActive : ''}`}>
            Monthly
          </span>
          <button
            className={styles.track}
            onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}
            aria-label="Toggle billing period"
          >
            <span className={`${styles.thumb} ${billing === 'yearly' ? styles.thumbRight : ''}`} />
          </button>
          <span className={`${styles.toggleLabel} ${billing === 'yearly' ? styles.toggleLabelActive : ''}`}>
            Yearly
          </span>
          <span className={styles.saveBadge}>Save 20%</span>
        </div>

        <div className={`grid-3 ${styles.grid}`}>
          {plans.map((plan, i) => (
            <div key={plan.name} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <PricingCard plan={plan} billing={billing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
