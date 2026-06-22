import { WorkPage } from './WorkPage'
import { ConceptsPage } from './ConceptsPage'
import styles from './PortfolioPage.module.css'

type Tab = 'work' | 'concepts'

export function PortfolioPage({
  activeTab,
  onTabChange,
  onNavigate,
}: {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onNavigate?: (path: string) => void
}) {
  return (
    <main className={`${styles.page} routeEnter`}>
      <header className={styles.pageHeader}>
        <div className={styles.tabs} role="tablist" aria-label="Portfolio sections">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'work'}
            className={`${styles.tab} ${activeTab === 'work' ? styles.tabActive : ''}`}
            onClick={() => onTabChange('work')}
          >
            Work
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'concepts'}
            className={`${styles.tab} ${activeTab === 'concepts' ? styles.tabActive : ''}`}
            onClick={() => onTabChange('concepts')}
          >
            Concepts
          </button>
        </div>
      </header>

      <div key={activeTab} className={styles.tabPanel}>
        {activeTab === 'work' ? <WorkPage embedded onNavigate={onNavigate} /> : <ConceptsPage embedded />}
      </div>
    </main>
  )
}
