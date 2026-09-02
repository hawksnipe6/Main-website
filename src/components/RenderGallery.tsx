import DomeGallery from './DomeGallery'
import { RENDERS } from '../data/renders'
import { useTheme } from '../hooks/useTheme'
import styles from './RenderGallery.module.css'

// Module-level const → stable reference so DomeGallery's buildItems memo does not
// rerun on every render.
const IMAGES = RENDERS.map((r) => ({ src: r.src, alt: r.alt }))

export function RenderGallery() {
  const theme = useTheme()
  const overlayBlurColor = theme === 'dark' ? '#0D0D0D' : '#F5F4F0'

  return (
    <main className={`${styles.page} routeEnter`}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Render Gallery</h1>
        <p className={styles.pageSubtitle}>
          A collection of CAD visualisations — modelled, lit, and rendered as product studies in
          material behaviour, lighting control, and object storytelling.
        </p>
      </header>

      <div className={styles.stage}>
        <DomeGallery
          images={IMAGES}
          grayscale={false}
          overlayBlurColor={overlayBlurColor}
          segments={26}
          fit={0.5}
          minRadius={600}
          maxVerticalRotationDeg={5}
          dragDampening={2}
          imageBorderRadius="14px"
          openedImageBorderRadius="14px"
          openedImageWidth="min(90vw, 880px)"
          openedImageHeight="min(78vh, 620px)"
        />
      </div>
    </main>
  )
}
