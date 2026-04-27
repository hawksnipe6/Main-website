import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const size = useRef(18)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const half = size.current / 2
      cursor.style.transform = `translate(${e.clientX - half}px, ${e.clientY - half}px)`
    }

    const grow = () => {
      size.current = 34
      cursor.classList.add(styles.hover)
    }

    const shrink = () => {
      size.current = 18
      cursor.classList.remove(styles.hover)
    }

    window.addEventListener('mousemove', move)

    // Re-bind on DOM changes (for dynamic content)
    const bind = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }

    bind()

    const observer = new MutationObserver(bind)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return <div ref={cursorRef} className={styles.cursor} />
}
