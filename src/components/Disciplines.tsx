import styles from './Disciplines.module.css'

const DISCIPLINES = [
  { index: '01', name: 'Brand Identity',      tools: 'Figma · Adobe · Illustrator' },
  { index: '02', name: 'Product Design',       tools: 'Figma · Prototyping' },
  { index: '03', name: '3D Industrial',        tools: 'Blender · Fusion 360 · Keyshot' },
  { index: '04', name: 'Motion & Interaction', tools: 'After Effects · Framer' },
  { index: '05', name: 'UX Strategy',          tools: 'Research · Flows · Audits' },
  { index: '06', name: 'Print & Physical',     tools: 'InDesign · Physical Production' },
]

export function Disciplines() {
  return (
    <section id="disciplines">
      <div className={styles.header}>
        <div className="section-label reveal">Tools &amp; Disciplines</div>
        <h2 className="section-title reveal reveal-d1">The full stack.</h2>
      </div>
      <div className={styles.list}>
        {DISCIPLINES.map((d) => (
          <div key={d.index} className={`${styles.row} reveal`}>
            <span className={styles.index}>{d.index}</span>
            <span className={styles.name}>{d.name}</span>
            <span className={styles.tools}>{d.tools}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
