import { useEffect, useRef, useState } from 'react'
import styles from './MartandCaseStudy.module.css'
import { Footer } from './Footer'
import { BookletFlipbook } from './BookletFlipbook'

const FPS = 30      // matches the After Effects composition frame rate
const FADE = 0.4    // seconds — opacity ease at each segment boundary

// Text beats timed to the AE timeline (in seconds of video time).
type Segment = { heading: string; body: string; in: number; out: number }
const SEGMENTS: Segment[] = [
  {
    heading: 'Khandoba Pen',
    body: '',
    in: 20 / FPS, // frame 20
    out: 5.0,
  },
  {
    heading: 'The Cap',
    body: 'The cap, inspired by the Shikhara of the temple, includes embossed patterns and flower ornamentation, along with Lord Khandoba and his sword as the clip.',
    in: 8.0,
    out: 14.0,
  },
  {
    heading: 'The Barrel',
    body: 'The barrel is ornamented with the divine battle between Khandoba, along with Mhalsa, and the demons Mani and Malla. This is the battle which gave him the name Malhari. On the other side, it also has the Deep Sthamb, meaning the pillar of light, a perfect symbol of reaching the light from the darkness.',
    in: 15.0,
    out: Infinity, // stays visible through the end
  },
]

// Opacity for a segment at video time t, with a FADE-second ease in/out.
function segmentOpacity(seg: Segment, t: number): number {
  if (t < seg.in || t > seg.out) return 0
  const fadeIn = Math.min(1, (t - seg.in) / FADE)
  const fadeOut = seg.out === Infinity ? 1 : Math.min(1, (seg.out - t) / FADE)
  return Math.max(0, Math.min(fadeIn, fadeOut))
}

const isMobile = typeof window !== 'undefined'
  && window.matchMedia('(max-width: 768px)').matches
// Desktop-only: the mobile route shows a "best viewed on desktop" notice,
// so the scrub video is always the desktop encode.
const VIDEO_SRC = '/martand.mp4'

const GALLERY = ['/pen-lounge/1.jpg', '/pen-lounge/2.jpg', '/pen-lounge/4.jpg', '/pen-lounge/5.jpg']

const MUTE_KEY = 'penlounge-device-muted'

function MartandDesktop({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (path: string) => void }) {
  const overlayRef    = useRef<HTMLDivElement>(null)
  const scrubRef      = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const deviceRef     = useRef<HTMLVideoElement>(null)
  const progressRef   = useRef<HTMLDivElement>(null)
  const hintRef       = useRef<HTMLDivElement>(null)
  const navBgRef      = useRef<HTMLDivElement>(null)
  const rafRef        = useRef<number>(0)
  const segRefs       = useRef<(HTMLDivElement | null)[]>([])

  const videoReady    = useRef(false)

  const [muted, setMuted] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = window.localStorage.getItem(MUTE_KEY)
    return stored === null ? true : stored === 'true'
  })

  // Loading gate — the scrub video is large, so first-time visitors see a
  // loader until enough has buffered to scrub smoothly.
  const [loading, setLoading] = useState(true)
  const markReady = () => { videoReady.current = true; setLoading(false) }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ── Device video: autoplay (muted) when in view, pause when out ─────────
  useEffect(() => {
    const v = deviceRef.current
    if (!v) return
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e.isIntersecting) {
          // Respect the user's persisted mute choice; never force-unmute.
          v.muted = muted
          v.play().catch(() => { v.muted = true; v.play().catch(() => {}) })
        } else {
          v.pause()
        }
      },
      { threshold: 0.5 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [muted])

  const toggleMute = () => {
    const v = deviceRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (typeof window !== 'undefined') window.localStorage.setItem(MUTE_KEY, String(v.muted))
    if (!v.muted && v.paused) v.play().catch(() => {})
  }

  useEffect(() => {
    const el    = overlayRef.current
    const scrub = scrubRef.current
    if (!el || !scrub) return

    const getScrollMax = () => Math.max(0, el.scrollHeight - el.clientHeight)
    const getScrubMax  = () => Math.max(1, scrub.offsetHeight - el.clientHeight)

    const tick = () => {
      // Native scroll position — no easing/lerp.
      const pos = el.scrollTop

      // Video progress is measured against the scrub section only, so the
      // clip reaches its last frame exactly as the reveal scrolls in.
      const scrubP = Math.max(0, Math.min(1, pos / getScrubMax()))
      // Page progress spans the whole experience (scrub + reveal + footer).
      const pageP = Math.max(0, Math.min(1, pos / getScrollMax()))

      const v = videoRef.current
      const dur = v?.duration || 0
      if (v && dur && videoReady.current) {
        v.currentTime = scrubP * dur
      }

      // Drive each text segment's opacity off the video timeline.
      const t = scrubP * dur
      for (let i = 0; i < SEGMENTS.length; i++) {
        const node = segRefs.current[i]
        if (node) node.style.opacity = String(segmentOpacity(SEGMENTS[i], t))
      }

      // Progress bar reflects overall page position.
      if (progressRef.current) progressRef.current.style.width = `${pageP * 100}%`
      // Scroll hint stays through the scrub, fades as the video completes.
      if (hintRef.current)     hintRef.current.style.opacity   = scrubP < 0.92 ? '1' : '0'
      // Nav gets a solid backdrop once the video is done and the reveal scrolls in.
      if (navBgRef.current)    navBgRef.current.style.opacity   = scrubP > 0.98 ? '1' : '0'

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={overlayRef} className={styles.overlay}>

      {/* Solid backdrop behind the nav once the reveal scrolls in */}
      <div ref={navBgRef} className={styles.navBackdrop} aria-hidden="true" />

      {/* Progress bar — direct child of overlay so it paints above reveal content */}
      <div className={styles.progressTrack}>
        <div ref={progressRef} className={styles.progressBar} />
      </div>

      {/* ── Scrubbed timeline video ─────────────────────── */}
      <div ref={scrubRef} className={styles.scrub}>
        <div className={styles.sticky}>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className={styles.video}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => { videoReady.current = true }}
            onLoadedData={markReady}
            onCanPlay={markReady}
          />

          {loading && (
            <div className={styles.loader} aria-live="polite">
              <span className={styles.spinner} aria-hidden="true" />
              <span className={styles.loaderText}>Loading experience</span>
            </div>
          )}

          <button className={styles.backBtn} onClick={onBack} aria-label="Back to all work">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </button>

          <div className={styles.chaptersWrap}>
            {SEGMENTS.map((seg, i) => (
              <div
                key={seg.heading}
                ref={(node) => { segRefs.current[i] = node }}
                className={styles.chapter}
              >
                <h2 className={styles.chapterHeading}>{seg.heading}</h2>
                {seg.body && <p className={styles.chapterBody}>{seg.body}</p>}
              </div>
            ))}
          </div>

          <div ref={hintRef} className={styles.scrollHint}>
            <span>Scroll down</span>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
              <path d="M7 2V16M7 16L3 12M7 16L11 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Reveal: device showcase, blurb, gallery, disclaimer ─── */}
      <div className={styles.reveal}>

        <section className={styles.deviceBlock}>
          <div className={styles.deviceCard}>
            <video
              ref={deviceRef}
              src="/pen-lounge-device.mp4"
              poster="/pen-lounge-device-poster.jpg"
              className={styles.deviceVideo}
              playsInline
              loop
              muted
              preload="metadata"
            />
            <button
              className={styles.muteBtn}
              onClick={toggleMute}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
            >
              {muted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                  <path d="M17 9l4 6M21 9l-4 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                  <path d="M16.5 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <div className={styles.deviceText}>
            <h2 className={styles.deviceHeading}>Available at The Pen Lounge</h2>
            <h3 className={styles.blurbHeading}>A pen carved from devotion</h3>
            <p className={styles.blurbBody}>
              The Khandoba Pen translates temple craft into an object you can hold every day. Every surface, from the Shikhara-inspired cap to the battle reliefs along the barrel, is drawn from the iconography of Lord Khandoba. It is part writing instrument, part keepsake, made for those who value story as much as form.
            </p>
            <a
              className={styles.penLink}
              href="https://thepenlounge.com/product/bespoke-martand-malhari-jejuri-heritage-limited-edition-fountain-pen/"
              target="_blank"
              rel="noreferrer"
            >
              Visit The Pen Lounge
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        <section className={styles.gallery}>
          {GALLERY.map((src, i) => (
            <div key={src} className={styles.galleryItem}>
              <img src={src} alt={`Khandoba Pen detail ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </section>

        <section className={styles.bookletSection}>
          <h2 className={styles.bookletHeading}>An Offering to Khanderaya</h2>
          <p className={styles.bookletSub}>The story behind the Khandoba Pen. Drag a corner or tap the edges to turn the pages.</p>
          <BookletFlipbook />
        </section>

        <section className={styles.disclaimer}>
          <p>
            © {new Date().getFullYear()} The Pen Lounge. All rights reserved. This design and all associated visual assets, 3D models, animations, renders, and product imagery are the copyrighted property of The Pen Lounge. No part of this work may be reproduced, copied, modified, distributed, or sold without prior written permission. All trademarks and references remain the property of their respective owners.
          </p>
        </section>

        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  )
}

function MartandMobileNotice({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.mobileNotice}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Back to all work">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All work
      </button>

      <div className={styles.mobileInner}>
        <svg className={styles.mobileIcon} width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="3.5" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 20.5h8M12 16.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <h2 className={styles.mobileTitle}>Best viewed on desktop</h2>
        <p className={styles.mobileSub}>This experience is built for larger screens. Open it on a desktop to view the full Khandoba Pen story.</p>
      </div>
    </div>
  )
}

export function MartandCaseStudy(props: { onBack: () => void; onNavigate?: (path: string) => void }) {
  // The Martand scrub video is baked on cream, so this experience always renders
  // light (until a dark-baked sequence is added). Force light while open — and
  // keep it light even if the visitor flips the theme toggle mid-experience —
  // then restore their chosen theme on exit.
  useEffect(() => {
    const el = document.documentElement
    const forceLight = () => {
      if (el.getAttribute('data-theme') !== 'light') el.setAttribute('data-theme', 'light')
    }
    forceLight()
    const obs = new MutationObserver(forceLight)
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      obs.disconnect()
      let stored = 'dark'
      try { stored = localStorage.getItem('noc-theme') === 'light' ? 'light' : 'dark' } catch { /* private mode */ }
      el.setAttribute('data-theme', stored)
    }
  }, [])

  return isMobile
    ? <MartandMobileNotice onBack={props.onBack} />
    : <MartandDesktop {...props} />
}
