import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

function read(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function subscribe(onChange: () => void): () => void {
  if (typeof document === 'undefined') return () => {}
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

/**
 * Reactive current theme, mirroring the `data-theme` attribute the ThemeToggle
 * writes on <html>. Same mechanism as RippleCanvas.tsx, exposed as a hook.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => 'light')
}
