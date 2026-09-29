import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import * as ServerRoutes from './routes.server.ts'

// Called once per route by scripts/prerender.mjs (Node, not a browser — every
// component reachable from here must tolerate `window`/`document` being
// undefined during the render phase; effects never run here at all, which is
// where nearly everything browser-only already lived before this pass).
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App initialPath={path} initialLoading={false} routeComponents={ServerRoutes} />
    </StrictMode>
  )
}
