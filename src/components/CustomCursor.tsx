import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

function canUseCustomCursor() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const desktopViewport = window.matchMedia('(min-width: 1025px)').matches
  return finePointer && desktopViewport
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const width = useRef(18)
  const height = useRef(18)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const viewportQuery = window.matchMedia('(min-width: 1025px)')
    const update = () => setEnabled(canUseCustomCursor())

    update()
    pointerQuery.addEventListener('change', update)
    viewportQuery.addEventListener('change', update)

    return () => {
      pointerQuery.removeEventListener('change', update)
      viewportQuery.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

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
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={cursorRef} className={styles.cursor} style={{ display: 'none' }} />
  )
}
