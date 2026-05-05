import { useEffect } from 'react'

/**
 * Lightweight lerp smooth scroll.
 * Replaces section-snap — all sections scroll freely and fully.
 * Touch devices use native scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return

    let target = window.scrollY
    let current = window.scrollY
    let rafId = 0
    let ticking = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const clamp = (v: number) =>
      Math.max(0, Math.min(v, document.documentElement.scrollHeight - window.innerHeight))

    const tick = () => {
      current = lerp(current, target, 0.1)
      window.scrollTo(0, current)

      if (Math.abs(target - current) > 0.5) {
        rafId = requestAnimationFrame(tick)
      } else {
        window.scrollTo(0, target)
        current = target
        ticking = false
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      target = clamp(target + e.deltaY)
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId)
    }
  }, [])
}
