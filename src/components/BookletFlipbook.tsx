import { useEffect, useState } from 'react'
// @ts-expect-error - react-pageflip ships without bundled types
import HTMLFlipBook from 'react-pageflip'
import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import styles from './BookletFlipbook.module.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

const PDF_SRC = '/khanderaya-booklet.pdf'

export function BookletFlipbook() {
  const [pages, setPages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const pdf = await pdfjsLib.getDocument(PDF_SRC).promise
        const imgs: string[] = []
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 2 })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          const ctx = canvas.getContext('2d')
          if (!ctx) continue
          await page.render({ canvas, canvasContext: ctx, viewport }).promise
          imgs.push(canvas.toDataURL('image/jpeg', 0.85))
          if (cancelled) return
        }
        if (!cancelled) { setPages(imgs); setLoading(false) }
      } catch {
        if (!cancelled) { setFailed(true); setLoading(false) }
      }
    })()

    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className={styles.status}>
        <span className={styles.spinner} aria-hidden="true" />
        <span>Loading booklet</span>
      </div>
    )
  }

  if (failed || pages.length === 0) {
    return (
      <div className={styles.status}>
        <a href={PDF_SRC} target="_blank" rel="noreferrer" className={styles.fallbackLink}>
          Open the booklet (PDF)
        </a>
      </div>
    )
  }

  return (
    <HTMLFlipBook
      width={560}
      height={560}
      size="stretch"
      minWidth={280}
      maxWidth={620}
      minHeight={280}
      maxHeight={620}
      showCover
      mobileScrollSupport
      maxShadowOpacity={0.4}
      className={styles.book}
      style={{}}
    >
      {pages.map((src, i) => (
        <div key={i} className={styles.page}>
          <img src={src} alt={`Booklet page ${i + 1}`} />
        </div>
      ))}
    </HTMLFlipBook>
  )
}
