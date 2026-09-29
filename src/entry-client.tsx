import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!

// A prerendered page arrives with real markup already inside #root; a dev-mode
// (vite dev) or non-prerendered load arrives empty. Basing both the loading
// screen's initial state and the hydrate/create choice on this same check
// keeps the client's first render pass identical to whatever the server (or
// its absence) actually produced — no hydration mismatch either way.
const hasPrerenderedContent = rootEl.childElementCount > 0

const app = (
  <StrictMode>
    <App initialLoading={!hasPrerenderedContent} />
  </StrictMode>
)

if (hasPrerenderedContent) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
