import styles from './Clients.module.css'

const CLIENT_TYPES = [
  {
    title: 'Early-stage founders',
    body: 'You have a product and a problem. You need clarity before you need colour. We help you frame the brand before you build the visual system on top of a shaky foundation.',
  },
  {
    title: 'Startups scaling from MVP',
    body: 'You have traction. The early version worked. Now the product needs to look like the company it\'s becoming — not the one it started as. We rebuild the system to carry the weight.',
  },
  {
    title: 'Businesses with fragmented systems',
    body: 'You have assets everywhere and no coherence. The brand looks different on every surface. We audit, consolidate, and rebuild it as a system that actually holds.',
  },
]

export function Clients() {
  return (
    <section id="clients" className={styles.clients}>
      <div>
        <div className="section-label reveal">Who We Work With</div>
        <h2 className="section-title reveal reveal-d1">
          We do not work<br />with everyone.
        </h2>
        <p className="section-body reveal reveal-d2" style={{ marginTop: '32px' }}>
          By design. The right fit matters more than the project size. If you need a creative order-taker, Nocturnal is the wrong studio.
        </p>
      </div>
      <div className={styles.list}>
        {CLIENT_TYPES.map((ct, i) => (
          <div key={ct.title} className={`${styles.type} reveal reveal-d${Math.min(i + 1, 3) as 1 | 2 | 3}`}>
            <div className={styles.typeTitle}>{ct.title}</div>
            <div className={styles.typeBody}>{ct.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
