import { useEffect, useRef } from 'react'
import styles from './HeroBg.module.css'

export function HeroBg() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Load but don't autoplay
    video.pause()
    video.currentTime = 0

    const hero = document.getElementById('hero')
    if (!hero) return

    const onScroll = () => {
      const rect = hero.getBoundingClientRect()
      const heroH = hero.offsetHeight
      // 0 at top of hero, 1 when hero bottom hits viewport top
      const progress = Math.max(0, Math.min(1, -rect.top / heroH))
      const duration = video.duration || 13.72
      video.currentTime = progress * duration
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.wrapper}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/hero-bg.mp4"
        muted
        playsInline
        preload="auto"
      />
      {/* Dark overlay so text stays readable */}
      <div className={styles.overlay} />
    </div>
  )
}
