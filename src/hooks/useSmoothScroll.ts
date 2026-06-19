import { useEffect } from 'react'

const LERP = 0.1          // easing per frame — lower = floatier, higher = snappier
const LINE_HEIGHT = 16    // px per "line" when a mouse reports deltaMode = 1

/**
 * Site-wide smooth scrolling. Intercepts wheel input and eases the window
 * scroll position toward a target with a lerp, instead of jumping instantly.
 *
 * Bails out (uses native scroll) when:
 *  - the user prefers reduced motion
 *  - the pointer is coarse (touch) — native momentum is better there
 *  - the body scroll is locked (a modal / drawer / fullscreen overlay is open
 *    and manages its own scrolling)
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let target = window.scrollY
    let current = window.scrollY
    let raf = 0
    let running = false

    const getMax = () =>
      document.documentElement.scrollHeight - window.innerHeight

    const tick = () => {
      current += (target - current) * LERP
      if (Math.abs(target - current) < 0.5) {
        current = target
        window.scrollTo(0, current)
        running = false
        return
      }
      window.scrollTo(0, current)
      raf = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      // A modal / drawer / fullscreen overlay locked the body — let it scroll itself.
      if (document.body.style.overflow === 'hidden') return
      // Pinch-zoom and horizontal-intent scrolls pass through untouched.
      if (e.ctrlKey) return

      const delta = e.deltaMode === 1 ? e.deltaY * LINE_HEIGHT : e.deltaY
      e.preventDefault()
      target = Math.max(0, Math.min(getMax(), target + delta))

      if (!running) {
        running = true
        current = window.scrollY
        raf = requestAnimationFrame(tick)
      }
    }

    // Keep the target in sync when scrolling happens by other means
    // (keyboard, anchor jumps, resize) so the next wheel starts from the right place.
    const syncIfIdle = () => {
      if (!running) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', syncIfIdle, { passive: true })
    window.addEventListener('resize', syncIfIdle)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', syncIfIdle)
      window.removeEventListener('resize', syncIfIdle)
    }
  }, [])
}
