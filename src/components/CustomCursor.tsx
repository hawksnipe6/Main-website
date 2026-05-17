import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

// Only render on non-touch devices
function isTouchDevice() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const width = useRef(18)
  const height = useRef(18)

  useEffect(() => {
    if (isTouchDevice()) return

    const cursor = cursorRef.current
    if (!cursor) return

    cursor.style.display = 'block'
    const bound = new WeakSet<Element>()

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - width.current / 2}px, ${e.clientY - height.current / 2}px)`
    }

    const grow = () => {
      width.current = 34
      height.current = 34
      cursor.classList.add(styles.hover)
    }

    const shrink = () => {
      width.current = 18
      height.current = 18
      cursor.classList.remove(styles.hover)
    }

    window.addEventListener('mousemove', move)

    const bind = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        if (bound.has(el)) return
        bound.add(el)

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

  return (
    <div ref={cursorRef} className={styles.cursor} style={{ display: 'none' }} />
  )
}
