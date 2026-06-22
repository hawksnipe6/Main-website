import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distIndex = resolve(root, 'dist/index.html')
const SITE_URL = 'https://www.getnctrnl.com'

// Per-route metadata — keep in sync with src/components/Seo.tsx
const routes = [
  {
    out: 'dist/work/index.html',
    title: 'Work — Nocturnal Industrial Design, Product UI/UX & CGI Portfolio',
    description:
      'Selected Nocturnal work across industrial design, medical product design, mobility UI/UX, EV charging systems, brand visuals, CGI, packaging, and product visualization.',
    canonical: `${SITE_URL}/work`,
    image: `${SITE_URL}/work-cover-renderfolio-custom.png`,
    ogType: 'article',
    noscriptH1: 'Nocturnal — Industrial Design, UI/UX and CGI Work',
    noscriptBody:
      'Selected Nocturnal projects across industrial design, medical product design, mobility UI/UX, EV charging systems, CGI, packaging, and product visualization.',
  },
  {
    out: 'dist/concepts/index.html',
    title: 'Concepts — Nocturnal Product Concepts and Interactive Case Studies',
    description:
      'Independently researched Nocturnal product concepts including Densly, a hair-loss outcome tracking platform, and Firstweeks, a postpartum recovery operating system.',
    canonical: `${SITE_URL}/concepts`,
    image: `${SITE_URL}/logo%20512.png`,
    ogType: 'article',
    noscriptH1: 'Nocturnal — Product Concepts and Case Studies',
    noscriptBody:
      'Independent Nocturnal concepts rooted in real market problems, product strategy, UI/UX systems, and prototype thinking.',
  },
  {
    out: 'dist/pricing/index.html',
    title: 'Pricing — Nocturnal Design Studio Packages and Custom Scoping',
    description:
      'Fixed-scope, fixed-price design packages across industrial design, UI/UX, motion, and brand. Clear deliverables, revisions, and timelines, with custom scoping when you need it.',
    canonical: `${SITE_URL}/pricing`,
    image: `${SITE_URL}/logo%20512.png`,
    ogType: 'article',
    noscriptH1: 'Nocturnal — Design Studio Pricing',
    noscriptBody:
      'Fixed-scope design packages across industrial design, UI/UX, motion, and brand, with mini packages and custom scoping.',
  },
]

const workSchema = (description) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Nocturnal Work',
  url: `${SITE_URL}/work`,
  description,
})

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    console.warn(`[prerender] pattern not found, skipping: ${pattern}`)
    return html
  }
  return html.replace(pattern, replacement)
}

function buildRoute(template, route) {
  let html = template

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)

  html = replaceTag(
    html,
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${route.description}" />`
  )

  html = replaceTag(
    html,
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${route.canonical}" />`
  )

  html = replaceTag(
    html,
    /<meta property="og:title" content="[\s\S]*?" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:description" content="[\s\S]*?" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:type" content="[\s\S]*?" \/>/,
    `<meta property="og:type" content="${route.ogType}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:url" content="[\s\S]*?" \/>/,
    `<meta property="og:url" content="${route.canonical}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:image" content="[\s\S]*?" \/>/,
    `<meta property="og:image" content="${route.image}" />`
  )

  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[\s\S]*?" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  )
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[\s\S]*?" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  )
  html = replaceTag(
    html,
    /<meta name="twitter:image" content="[\s\S]*?" \/>/,
    `<meta name="twitter:image" content="${route.image}" />`
  )

  // Per-route structured data
  const ld = `<script type="application/ld+json">${JSON.stringify(workSchema(route.description))}</script>`
  html = html.replace('</head>', `    ${ld}\n  </head>`)

  // Crawlable no-JS fallback
  html = replaceTag(
    html,
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>\n      <main style="font-family: sans-serif; padding: 48px; line-height: 1.5;">\n        <h1>${route.noscriptH1}</h1>\n        <p>${route.noscriptBody}</p>\n      </main>\n    </noscript>`
  )

  return html
}

const template = await readFile(distIndex, 'utf8')

for (const route of routes) {
  const outPath = resolve(root, route.out)
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, buildRoute(template, route), 'utf8')
  console.log(`[prerender] wrote ${route.out}`)
}
