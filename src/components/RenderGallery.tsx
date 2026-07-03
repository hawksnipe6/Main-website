import { useEffect, useState, useCallback } from 'react'
import { RENDERS } from '../data/renders'
import styles from './RenderGallery.module.css'

export function RenderGallery({ embedded = false }: { embedded?: boolean } = {}) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const next = useCallback(() => {
    setOpen(i => (i === null ? i : (i + 1) % RENDERS.length))
  }, [])
  const prev = useCallback(() => {
    setOpen(i => (i === null ? i : (i - 1 + RENDERS.length) % RENDERS.length))
  }, [])

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, next, prev])

  const active = open === null ? null : RENDERS[open]

  const body = (
    <>
      {!embedded && (
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Render Gallery</h1>
          <p className={styles.pageSubtitle}>
            A collection of CAD visualisations — modelled, lit, and rendered as product studies in
            material behaviour, lighting control, and object storytelling.
          </p>
        </header>
      )}

      <div className={styles.masonry}>
        {RENDERS.map((r, i) => (
          <button
            key={r.src}
            type="button"
            className={styles.tile}
            onClick={() => setOpen(i)}
            aria-label={`Open render ${i + 1}`}
          >
            <img src={r.src} alt={r.alt} loading="lazy" draggable={false} />
            <span className={styles.tileOverlay} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 3H3v5M12 17h5v-5M3 12v5h5M17 8V3h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Render viewer" onClick={close}>
          <button className={styles.lbClose} onClick={close} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <button
            className={`${styles.lbNav} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous render"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <figure className={styles.lbFigure} onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.alt} />
            <figcaption className={styles.lbCaption}>{(open ?? 0) + 1} / {RENDERS.length}</figcaption>
          </figure>

          <button
            className={`${styles.lbNav} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next render"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  )

  if (embedded) return body

  return <div className={styles.page}>{body}</div>
}
