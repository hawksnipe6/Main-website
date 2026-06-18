import { WorkPage } from './WorkPage'
import { ConceptsPage } from './ConceptsPage'
import styles from './PortfolioPage.module.css'

type Tab = 'work' | 'concepts'

const PAGE_TITLE = 'Portfolio'

const TAB_COPY: Record<Tab, { label: string; subtitle: string }> = {
  work: {
    label: 'Portfolio',
    subtitle:
      'Selected projects structured as case studies across product design, interface systems, CGI, packaging, mobility, healthcare, and brand visuals.',
  },
  concepts: {
    label: 'Nocturnal',
    subtitle:
      'Independently researched product concepts, each rooted in a real problem, designed end-to-end, and built as interactive or product-ready case studies.',
  },
}

export function PortfolioPage({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}) {
  const copy = TAB_COPY[activeTab]

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

        <p className={styles.pageLabel}>{copy.label}</p>
        <h1 className={styles.pageTitle}>{PAGE_TITLE}</h1>
        <p className={styles.pageSubtitle}>{copy.subtitle}</p>
      </header>

      <div key={activeTab} className={styles.tabPanel}>
        {activeTab === 'work' ? <WorkPage embedded /> : <ConceptsPage embedded />}
      </div>
    </main>
  )
}
