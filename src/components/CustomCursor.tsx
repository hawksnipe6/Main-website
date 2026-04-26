import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 9}px, ${e.clientY - 9}px)`
    }

    const grow = () => cursor.classList.add(styles.hover)
    const shrink = () => cursor.classList.remove(styles.hover)

    window.addEventListener('mousemove', move)

    // Grow on interactive elements
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return <div ref={cursorRef} className={styles.cursor} />
}
