import { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'

const LOAD_DURATION = 1500

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let animationFrame = 0
    let exitTimer = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const nextProgress = Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100))

      setProgress(nextProgress)

      if (elapsed < LOAD_DURATION) {
        animationFrame = window.requestAnimationFrame(tick)
        return
      }

      setExiting(true)
      exitTimer = window.setTimeout(onComplete, 260)
    }

    animationFrame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <div className={`${styles.loader} ${exiting ? styles.exiting : ''}`} role="status" aria-live="polite">
      <div className={styles.content}>
        <img src="/N-dark.png" alt="Nocturnal" className={styles.mark} />
        <div className={styles.track} aria-hidden="true">
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.percent}>{progress}%</div>
      </div>
    </div>
  )
}
