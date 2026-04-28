import { useEffect } from 'react'

/**
 * Section-snap scroll.
 * Each wheel tick moves to the next or previous section.
 * Touch devices use native scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return

    const SECTIONS = [
      '#hero', '#about', '#services', '#disciplines',
      '#how', '#clients', '#pricing', '#faq', '#cta'
    ]

    let isScrolling = false

    const getSections = () =>
      SECTIONS.map(id => document.querySelector(id)).filter(Boolean) as Element[]

    const getCurrentIndex = (sections: Element[]) => {
      const mid = window.innerHeight / 2
      let closest = 0
      let minDist = Infinity
      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - mid)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      return closest
    }

    const scrollToSection = (el: Element) => {
      isScrolling = true
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => { isScrolling = false }, 900)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling) return

      const sections = getSections()
      const current = getCurrentIndex(sections)
      const dir = e.deltaY > 0 ? 1 : -1
      const next = Math.max(0, Math.min(sections.length - 1, current + dir))

      if (next !== current) scrollToSection(sections[next])
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) return
      e.preventDefault()
      if (isScrolling) return

      const sections = getSections()
      const current = getCurrentIndex(sections)
      const dir = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : -1
      const next = Math.max(0, Math.min(sections.length - 1, current + dir))

      if (next !== current) scrollToSection(sections[next])
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])
}