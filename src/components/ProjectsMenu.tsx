import { useState } from 'react'
import InfiniteMenu from './InfiniteMenu'
import { WORK_SAMPLES } from '../data/workSamples'
import { useTheme } from '../hooks/useTheme'
import styles from './ProjectsMenu.module.css'

type MenuItem = { image: string; link: string; title: string; description: string }

// Module-level const → stable reference so InfiniteMenu never rebuilds its
// WebGL texture atlas on re-render. Mirrors the current /work grid (renderfolio
// is hidden there too).
const ITEMS: MenuItem[] = WORK_SAMPLES.filter((s) => s.slug !== 'renderfolio').map((s) => ({
  image: s.image,
  link: `/work/${s.slug}`,
  title: s.title,
  description: s.category,
}))

export function ProjectsMenu({ onNavigate }: { onNavigate: (path: string) => void }) {
  const theme = useTheme()
  const backgroundColor = theme === 'dark' ? '#0D0D0D' : '#F5F4F0'
  const [active, setActive] = useState<MenuItem>(ITEMS[0])

  return (
    <main className={`${styles.wrap} routeEnter`}>
      <div className={styles.stage}>
        <InfiniteMenu
          items={ITEMS}
          backgroundColor={backgroundColor}
          onNavigate={onNavigate}
          onActiveItemChange={(item: MenuItem) => {
            if (item) setActive(item)
          }}
          fallback={
            <ul className={styles.fallbackGrid}>
              {ITEMS.map((it) => (
                <li key={it.link}>
                  <a
                    href={it.link}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(it.link)
                    }}
                  >
                    <img src={it.image} alt={it.title} loading="lazy" />
                    <span>{it.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          }
        />
      </div>

      <div className={styles.caption} aria-live="polite">
        <span className={styles.captionCategory}>{active?.description}</span>
        <h2 className={styles.captionTitle}>{active?.title}</h2>
        <button
          type="button"
          className={styles.captionCta}
          onClick={() => active && onNavigate(active.link)}
        >
          View project
        </button>
      </div>
    </main>
  )
}
