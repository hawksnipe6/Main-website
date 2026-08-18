import { WorkPage } from './WorkPage'
import { RenderGallery } from './RenderGallery'
import { ConceptsPage } from './ConceptsPage'
import styles from './PortfolioPage.module.css'

type Tab = 'work' | 'renders' | 'concepts'

const TABS: { id: Tab; label: string }[] = [
  { id: 'work', label: 'Projects' },
  { id: 'renders', label: 'Render Gallery' },
  { id: 'concepts', label: 'Concepts' },
]

export function PortfolioPage({
  activeTab,
  slug,
  onTabChange,
  onNavigate,
}: {
  activeTab: Tab
  slug?: string
  onTabChange: (tab: Tab) => void
  onNavigate?: (path: string) => void
}) {
  return (
    <main className={`${styles.page} routeEnter`}>
      <div className={styles.shell}>
        <nav className={styles.rail} role="tablist" aria-label="Portfolio sections">
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.railTab} ${activeTab === tab.id ? styles.railTabActive : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div key={activeTab} className={styles.content}>
          {activeTab === 'work' ? (
            <WorkPage embedded activeSlug={slug} onNavigate={onNavigate} />
          ) : activeTab === 'renders' ? (
            <RenderGallery embedded />
          ) : (
            <ConceptsPage embedded activeSlug={slug} onNavigate={onNavigate} />
          )}
        </div>
      </div>
    </main>
  )
}
