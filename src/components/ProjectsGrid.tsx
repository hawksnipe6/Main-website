import { useState } from 'react'
import GridDistortion from './GridDistortion'
import { WORK_SAMPLES } from '../data/workSamples'
import styles from './ProjectsGrid.module.css'

// Module-level const → stable reference, matches the current /work grid
// (renderfolio hidden there too).
const ITEMS = WORK_SAMPLES.filter((s) => s.slug !== 'renderfolio')

export function ProjectsGrid({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <main className={`${styles.wrap} routeEnter`}>
      <div className={styles.grid}>
        {ITEMS.map((item) => (
          <button
            key={item.slug}
            type="button"
            className={styles.card}
            onClick={() => onNavigate(`/work/${item.slug}`)}
            onMouseEnter={() => setHovered(item.slug)}
            onMouseLeave={() => setHovered((h) => (h === item.slug ? null : h))}
          >
            <span className={styles.media}>
              {hovered === item.slug ? (
                <GridDistortion imageSrc={item.image} grid={12} mouse={0.15} strength={0.12} relaxation={0.9} />
              ) : (
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" draggable={false} />
              )}
            </span>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.desc}>{item.category}</span>
          </button>
        ))}
      </div>
    </main>
  )
}
