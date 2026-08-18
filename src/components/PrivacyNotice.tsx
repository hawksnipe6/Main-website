import { type MouseEvent } from 'react'
import styles from './PrivacyNotice.module.css'

export function PrivacyNotice({
  visible,
  onDismiss,
  onNavigate,
}: {
  visible: boolean
  onDismiss: () => void
  onNavigate: (path: string) => void
}) {
  const openPrivacy = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate('/privacy')
  }

  if (!visible) return null

  return (
    <div className={styles.notice} role="region" aria-label="Privacy notice">
      <p className={styles.text}>
        This site doesn&apos;t use tracking cookies. It runs cookie-free analytics and saves your
        theme choice in your browser. See the{' '}
        <a href="/privacy" onClick={openPrivacy}>Privacy Policy</a> for details.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={onDismiss}>
          Got it
        </button>
      </div>
    </div>
  )
}
