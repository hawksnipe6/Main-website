import { Cta } from './Cta'
import { GridCanvas } from './GridCanvas'
import styles from './ContactPage.module.css'

export function ContactPage() {
  return (
    <main className={`${styles.page} routeEnter`}>

      {/* ── Join our team ───────────────────────── */}
      <div className={styles.sectionWrap}>
        <GridCanvas />
        <section className={styles.section}>
        <div className={styles.inner}>
          <p className={`${styles.sectionLabel} reveal`}>Join our team</p>
          <p className={`${styles.joinText} reveal reveal-d1`}>
            We are a small team. Everyone here works directly on projects from
            brief to delivery, with no account management or handoff layers
            between the designer and the work. We take on projects that require
            thinking, not just production. If you design with intention and can
            hold a clear perspective on what you are making and why, we want to
            hear from you.
          </p>
          <a
            href="mailto:getnctrnl@gmail.com"
            className={`${styles.joinEmail} reveal reveal-d2`}
          >
            getnctrnl@gmail.com
          </a>
          <p className={`${styles.fraudNotice} reveal reveal-d3`}>
            Nocturnal does not use third-party recruiters or conduct interviews
            over text. We will never ask for personal or financial information.
            If you receive a message from anyone claiming to represent Nocturnal
            from a domain other than getnctrnl.com, treat it as fraudulent and
            report it to your service provider.
          </p>
        </div>
        </section>
      </div>

      {/* ── Booking calendar ────────────────────── */}
      <Cta />

    </main>
  )
}
