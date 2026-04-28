import { useEffect } from 'react'

/**
 * Framer-style lerp smooth scroll.
 * Intercepts wheel events and lerps the scroll position
 * toward the target for a momentum feel.
 * Skips touch devices — native momentum scroll is already better there.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return

    let target = window.scrollY
    let current = window.scrollY
    let rafId = 0
    let running = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const clamp = (v: number) =>
      Math.max(0, Math.min(v, document.documentElement.scrollHeight - window.innerHeight))

    const tick = () => {
      current = lerp(current, target, 0.085)
      window.scrollTo(0, current)

      if (Math.abs(target - current) > 0.5) {
        rafId = requestAnimationFrame(tick)
      } else {
        window.scrollTo(0, target)
        current = target
        running = false
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      target = clamp(target + e.deltaY)
      if (!running) {
        running = true
        rafId = requestAnimationFrame(tick)
      }
    }

    // Anchor-click: update target after native scroll completes
    const onHashChange = () => {
      setTimeout(() => {
        target = window.scrollY
        current = window.scrollY
      }, 50)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('hashchange', onHashChange)
      cancelAnimationFrame(rafId)
    }
  }, [])
}
