import { useEffect, useRef, useState } from 'react'
import styles from './CustomScrollbar.module.css'

export function CustomScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<number>()
  const dragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)

  useEffect(() => {
    const thumb = thumbRef.current
    if (!thumb) return

    const metrics = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const ratio = clientHeight / scrollHeight
      const thumbHeight = Math.max(ratio * clientHeight, 40)
      const maxTravel = clientHeight - thumbHeight
      const maxScroll = scrollHeight - clientHeight
      return { scrollHeight, clientHeight, thumbHeight, maxTravel, maxScroll }
    }

    const update = () => {
      const { thumbHeight, maxTravel, maxScroll } = metrics()
      if (maxScroll <= 0) {
        thumb.style.opacity = '0'
        return
      }
      thumb.style.opacity = ''
      const scrollRatio = document.documentElement.scrollTop / maxScroll
      thumb.style.height = `${thumbHeight}px`
      thumb.style.transform = `translateY(${scrollRatio * maxTravel}px)`
    }

    const show = () => {
      setVisible(true)
      window.clearTimeout(hideTimer.current)
      hideTimer.current = window.setTimeout(() => {
        if (!dragging.current) setVisible(false)
      }, 1200)
    }

    const onScroll = () => {
      update()
      show()
    }

    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true
      dragStartY.current = e.clientY
      dragStartScroll.current = document.documentElement.scrollTop
      thumb.setPointerCapture(e.pointerId)
      show()
      e.preventDefault()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const { maxTravel, maxScroll } = metrics()
      const deltaY = e.clientY - dragStartY.current
      const next = dragStartScroll.current + (deltaY / maxTravel) * maxScroll
      window.scrollTo({ top: next })
    }

    const onPointerUp = () => {
      dragging.current = false
      show()
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    thumb.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      thumb.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <div className={`${styles.track} ${visible ? styles.visible : ''}`}>
      <div ref={thumbRef} className={styles.thumb} />
    </div>
  )
}
