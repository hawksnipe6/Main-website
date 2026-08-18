import styles from './LegalPage.module.css'

export function PrivacyPage() {
  return (
    <main className={`${styles.page} routeEnter`}>
      <header className={styles.header}>
        <p className={styles.label}>Privacy Policy</p>
        <h1 className={styles.title}>How Nocturnal handles your information.</h1>
        <p className={styles.updated}>Last updated 18 August 2026</p>
      </header>

      <div className={styles.content}>
        <h2>What we collect</h2>
        <p>
          We collect information you choose to give us. That happens in two places on this site:
          the project intake form and the call-booking form. Both ask for your name, email address,
          and a short note about your project or preferred time. We do not ask for payment details,
          government ID, or any other sensitive information through this site.
        </p>
        <p>
          Your theme preference (light or dark) is saved in your browser&apos;s local storage so the
          site remembers it on your next visit. That value never leaves your browser.
        </p>

        <h2>How we use it</h2>
        <p>
          We use the information you submit to reply to your inquiry, schedule a call, and, if you
          become a client, to manage the project. We do not sell your information, and we do not use
          it for advertising.
        </p>

        <h2>Third-party services</h2>
        <p>
          Form submissions are delivered to us through{' '}
          <a href="https://web3forms.com" target="_blank" rel="noreferrer">Web3Forms</a>, a
          third-party form-delivery service. Web3Forms processes the data you submit only to route
          it to our inbox. Fonts are served by Google Fonts, which may log requests including your
          IP address as part of delivering the font files. We do not currently run analytics or
          advertising trackers on this site.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep inquiry and booking submissions for as long as reasonably needed to respond to
          you or, if you become a client, for the duration of the working relationship and standard
          business record-keeping afterward. You can ask us to delete your information at any time
          using the contact details below.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us what information we hold about you, ask us to correct it, or ask us to
          delete it. Email{' '}
          <a href="mailto:getnctrnl@gmail.com">getnctrnl@gmail.com</a> and we will act on it directly.
        </p>

        <h2>Children</h2>
        <p>This site is intended for businesses and individuals seeking design services, not children.</p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes in a material way, we will update the date at the top of this page.
        </p>

        <h2>Contact</h2>
        <p>
          Nocturnal is based in Mumbai, India. For any question about this policy, email{' '}
          <a href="mailto:getnctrnl@gmail.com">getnctrnl@gmail.com</a> or call{' '}
          <a href="tel:+917045421516">+91 70454 21516</a>.
        </p>

        <div className={styles.notice}>
          This page describes our actual data practices in plain language. It is not a substitute
          for legal advice specific to your jurisdiction.
        </div>
      </div>
    </main>
  )
}
