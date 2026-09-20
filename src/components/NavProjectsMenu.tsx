import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import styles from './NavProjectsMenu.module.css'

type Match = 'work' | 'renders'
type Page = 'home' | 'work' | 'renders' | 'contact'

const ITEMS: { label: string; path: string; match: Match }[] = [
  { label: 'Projects', path: '/work', match: 'work' },
  { label: 'Render Gallery', path: '/renders', match: 'renders' },
]

export function NavProjectsMenu({
  page,
  onSelect,
}: {
  page: Page
  onSelect: (path: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const openTimer = useRef<ReturnType<typeof setTimeout>>()
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()
  const hoverCapable = useRef(false)

  useEffect(() => {
    hoverCapable.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    return () => {
      clearTimeout(openTimer.current)
      clearTimeout(closeTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const clearTimers = () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
  }

  const handleMouseEnter = () => {
    if (!hoverCapable.current) return
    clearTimers()
    openTimer.current = setTimeout(() => setOpen(true), 80)
  }

  const handleMouseLeave = () => {
    if (!hoverCapable.current) return
    clearTimers()
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }

  const focusItem = (i: number) => {
    const count = ITEMS.length
    const idx = ((i % count) + count) % count
    itemRefs.current[idx]?.focus()
  }

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => focusItem(0))
    }
  }

  const onItemKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, i: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusItem(i + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusItem(i - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusItem(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusItem(ITEMS.length - 1)
    }
  }

  const activate = (path: string) => {
    setOpen(false)
    onSelect(path)
  }

  const triggerActive = page === 'work' || page === 'renders'

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${triggerActive ? styles.triggerActive : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="nav-projects-menu"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
      >
        Projects
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul id="nav-projects-menu" role="menu" className={styles.panel}>
          {ITEMS.map((item, i) => (
            <li key={item.path} role="none">
              <a
                ref={(el) => (itemRefs.current[i] = el)}
                role="menuitem"
                tabIndex={-1}
                href={item.path}
                aria-current={item.match === page ? 'page' : undefined}
                className={`${styles.item} ${item.match === page ? styles.itemActive : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  activate(item.path)
                }}
                onKeyDown={(e) => onItemKeyDown(e, i)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
