import { useEffect } from 'react'

export function useScrollNav(selector: string, scrolledClass: string) {
  useEffect(() => {
    const el = document.querySelector(selector)
    if (!el) return

    const handler = () => {
      el.classList.toggle(scrolledClass, window.scrollY > 40)
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [selector, scrolledClass])
}
