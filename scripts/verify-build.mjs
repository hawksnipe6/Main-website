// Post-build SEO/SSR sanity check. Run after `npm run build`:
//   node scripts/verify-build.mjs
// Checks (per the framework's own Final QC phase): unique title/canonical per
// route, valid JSON-LD, and that every React-rendered route actually has real
// content — exactly one <h1> — inside #root, not just an empty shell.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

const files = walk('dist')
  .filter((f) => f.endsWith('index.html') || f.endsWith('404.html'))
  .filter((f) => !f.includes(join('dist', 'server')))
  .map((f) => f.replace(/\\/g, '/'))

const titles = new Map()
const cans = new Map()
let issues = 0

for (const f of files) {
  const html = readFileSync(f, 'utf8')
  const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1]
  const c = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1]
  if (titles.has(t)) { console.log('DUP TITLE', t, '--', f, 'vs', titles.get(t)); issues++ }
  else titles.set(t, f)
  if (c) {
    if (cans.has(c)) { console.log('DUP CANON', c, '--', f, 'vs', cans.get(c)); issues++ }
    else cans.set(c, f)
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json) } catch { console.log('BAD JSON-LD', f); issues++ }
  }

  // firstweeks/ is a separately-built app (its own JS bundle fills #root
  // client-side) — its real <h1> is a sibling of #root, not inside it.
  if (f.includes('/firstweeks/')) continue

  // Vite's build moves the entry <script type="module"> tag into <head>, so
  // #root's content just runs to the matching </div> right before </body>.
  const rootMatch = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/)
  if (rootMatch) {
    const rootContent = rootMatch[1]
    const h1s = (rootContent.match(/<h1[^>]*>/g) || []).length
    if (rootContent.length < 500) { console.log('SUSPICIOUSLY SHORT ROOT', f, rootContent.length, 'chars'); issues++ }
    if (h1s !== 1) { console.log('H1 COUNT', h1s, f); issues++ }
  } else if (html.includes('id="root"')) {
    console.log('ROOT PATTERN DID NOT MATCH (check the template structure)', f)
    issues++
  }
  if (html.includes('data-msg=')) { console.log('SWALLOWED SSR RENDER ERROR', f); issues++ }
}

console.log(`\n${files.length} files | ${titles.size} unique titles | ${cans.size} unique canonicals | ${issues} issue(s)`)
if (issues > 0) process.exit(1)
