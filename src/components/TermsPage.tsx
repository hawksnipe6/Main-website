import styles from './LegalPage.module.css'

export function TermsPage() {
  return (
    <main className={`${styles.page} routeEnter`}>
      <header className={styles.header}>
        <p className={styles.label}>Terms of Service</p>
        <h1 className={styles.title}>The terms for using this site.</h1>
        <p className={styles.updated}>Last updated 18 August 2026</p>
      </header>

      <div className={styles.content}>
        <h2>Who this is for</h2>
        <p>
          These terms cover your use of getnctrnl.com. They are separate from any signed agreement,
          proposal, or statement of work for an actual design project — those documents govern the
          engagement itself and take precedence over anything written here.
        </p>

        <h2>Site content</h2>
        <p>
          Everything on this site — case studies, images, renders, writing, and brand assets — is
          the work of Nocturnal or its named clients and is shown here to represent our practice.
          Do not reproduce, redistribute, or reuse it commercially without our written permission.
        </p>

        <h2>Pricing and information</h2>
        <p>
          Pricing, timelines, and package details shown on this site are starting reference points,
          not a binding quote. Final scope, price, and timeline are confirmed in writing before any
          project begins. We try to keep this site accurate but do not guarantee that every detail
          is current at the moment you read it.
        </p>

        <h2>Inquiries and hiring</h2>
        <p>
          Nocturnal does not use third-party recruiters or conduct hiring interviews over text
          message. We will never ask a job applicant or prospective client for personal or financial
          information through chat. If you receive a message claiming to represent Nocturnal from a
          domain other than getnctrnl.com, treat it as fraudulent.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Use this site lawfully. Do not attempt to disrupt it, scrape it at scale, or misrepresent
          your identity when submitting a form.
        </p>

        <h2>No warranty</h2>
        <p>
          This site is provided as is. We make reasonable efforts to keep it accurate and available
          but do not guarantee it will be error-free or uninterrupted.
        </p>

        <h2>Liability</h2>
        <p>
          To the extent permitted by law, Nocturnal is not liable for indirect or consequential
          damages arising from your use of this site. Nothing here limits liability that cannot be
          limited under applicable law.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India.</p>

        <h2>Changes</h2>
        <p>If these terms change materially, we will update the date at the top of this page.</p>

        <h2>Contact</h2>
        <p>
          Email <a href="mailto:getnctrnl@gmail.com">getnctrnl@gmail.com</a> or call{' '}
          <a href="tel:+917045421516">+91 70454 21516</a>.
        </p>

        <div className={styles.notice}>
          This page is written in plain language for a small studio's website. It is not a
          substitute for legal advice specific to your jurisdiction.
        </div>
      </div>
    </main>
  )
}
