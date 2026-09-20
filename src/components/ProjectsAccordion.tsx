import { useEffect, useRef, useState } from 'react'
import AccordionGallery from './AccordionGallery'
import ElasticMesh from './ElasticMesh'
import { WORK_SAMPLES } from '../data/workSamples'
import { useTheme } from '../hooks/useTheme'
import styles from './ProjectsAccordion.module.css'

type Item = { image: string; label: string; link: string }

// Module-level const → stable reference, matches the current /work grid
// (renderfolio hidden there too).
const ITEMS: Item[] = WORK_SAMPLES.filter((s) => s.slug !== 'renderfolio').map((s) => ({
  image: s.image,
  label: s.title,
  link: `/work/${s.slug}`,
}))

export function ProjectsAccordion({ onNavigate }: { onNavigate: (path: string) => void }) {
  const theme = useTheme()
  const stageRef = useRef<HTMLDivElement>(null)
  const [stageHeight, setStageHeight] = useState(680)

  // AccordionGallery's `height` prop is a plain pixel number, not viewport-relative —
  // measure the full-height stage box and feed it back in.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => setStageHeight(el.clientHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // The active panel's ElasticMesh fallback gradient (only visible for an
  // instant while its image texture uploads) follows the page background.
  const pageBg = theme === 'dark' ? '#0D0D0D' : '#F5F4F0'

  return (
    <main className={`${styles.wrap} routeEnter`}>
      <div ref={stageRef} className={styles.stage}>
        <AccordionGallery
          items={ITEMS}
          height={stageHeight}
          gap={8}
          radius={14}
          expandRatio={0.5}
          defaultIndex={0}
          trigger="hover"
          showLabels
          parallax={0}
          // Label sits on a photo with a dark scrim, same convention as the
          // work-grid card overlays elsewhere — fixed, not theme-reactive.
          accentColor="#E8612A"
          overlayColor="#0D0D0D"
          textColor="#F5F4F0"
          onOpen={(item: Item) => onNavigate(item.link)}
          renderMedia={(item: Item, isActive: boolean) =>
            isActive ? (
              <ElasticMesh
                image={item.image}
                interaction="hover"
                showGrid={false}
                highlight="#E8612A"
                color1={pageBg}
                color2={pageBg}
                enabled
              />
            ) : (
              <img src={item.image} alt={item.label} loading="lazy" draggable={false} />
            )
          }
        />
      </div>
    </main>
  )
}
