import { useState } from 'react'
import GridDistortion from './GridDistortion'
import { WORK_SAMPLES } from '../data/workSamples'
import styles from './ProjectsGrid.module.css'

// Module-level const → stable reference, matches the current /work grid
// (renderfolio hidden there too).
const ITEMS = WORK_SAMPLES.filter((s) => s.slug !== 'renderfolio')

// Standalone concept prototypes, served as their own static pages under public/
// (not part of WORK_SAMPLES / the case-study grid above). Listed here so they're
// reachable from the site instead of only by direct URL.
const CONCEPTS = [
  { path: '/densly', title: 'Densly', desc: 'Hair-loss outcome tracking concept' },
  { path: '/tollgate', title: 'Tollgate', desc: 'AI spend controls concept' },
  { path: '/voca', title: 'Voca', desc: 'Voice-driven concept app' },
  { path: '/firstweeks', title: 'Firstweeks', desc: 'Postpartum recovery concept' },
]

export function ProjectsGrid({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <main className={`${styles.wrap} routeEnter`}>
      <h1 className="sr-only">Projects — Nocturnal industrial design, UI/UX, and CGI work</h1>
      <div className={styles.grid}>
        {ITEMS.map((item) => (
          <a
            key={item.slug}
            href={`/work/${item.slug}`}
            className={styles.card}
            onClick={(e) => { e.preventDefault(); onNavigate(`/work/${item.slug}`) }}
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
          </a>
        ))}
      </div>

      <div className={styles.concepts}>
        <span className={styles.conceptsLabel}>Independent concepts</span>
        <ul className={styles.conceptsList}>
          {CONCEPTS.map((c) => (
            <li key={c.path}>
              <a href={c.path} target="_blank" rel="noreferrer">
                {c.title}
                <span className={styles.conceptsDesc}>{c.desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
