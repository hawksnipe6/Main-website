// Writes per-route dist/**/index.html files + sitemap.xml from src/seo/meta.ts.
// NOTE: vercel.json's `rewrites` map each clean URL to its physical index.html
// explicitly (rather than relying on platform default behaviour) — if a route
// is added to or removed from PRERENDER_ROUTES/CONCEPT_PAGES in meta.ts, add or
// remove the matching rewrite in vercel.json too.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_URL,
  PRERENDER_ROUTES,
  getRouteMeta,
  faqSchema,
  workCollectionSchema,
  breadcrumbSchema,
  workItemSchema,
  sitemapUrls,
} from '../src/seo/meta.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distIndex = resolve(root, 'dist/index.html')

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    console.warn(`[prerender] pattern not found, skipping: ${pattern}`)
    return html
  }
  return html.replace(pattern, replacement)
}

function jsonLd(id, value) {
  return `<script type="application/ld+json" id="${id}">${JSON.stringify(value)}</script>`
}

function buildRoute(template, { page, slug, path }) {
  const meta = getRouteMeta(page, slug)
  let html = template

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)

  html = replaceTag(
    html,
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${meta.description}" />`
  )

  html = replaceTag(
    html,
    /<meta name="robots" content="[\s\S]*?" \/>/,
    `<meta name="robots" content="${meta.robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />`
  )

  html = replaceTag(
    html,
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${meta.canonical}" />`
  )

  html = replaceTag(
    html,
    /<meta property="og:title" content="[\s\S]*?" \/>/,
    `<meta property="og:title" content="${meta.title}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:description" content="[\s\S]*?" \/>/,
    `<meta property="og:description" content="${meta.description}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:type" content="[\s\S]*?" \/>/,
    `<meta property="og:type" content="${meta.ogType}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:url" content="[\s\S]*?" \/>/,
    `<meta property="og:url" content="${meta.canonical}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:image" content="[\s\S]*?" \/>/,
    `<meta property="og:image" content="${meta.image}" />`
  )
  html = replaceTag(
    html,
    /<meta property="og:image:alt" content="[\s\S]*?" \/>/,
    `<meta property="og:image:alt" content="${meta.imageAlt}" />`
  )

  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[\s\S]*?" \/>/,
    `<meta name="twitter:title" content="${meta.title}" />`
  )
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[\s\S]*?" \/>/,
    `<meta name="twitter:description" content="${meta.description}" />`
  )
  html = replaceTag(
    html,
    /<meta name="twitter:image" content="[\s\S]*?" \/>/,
    `<meta name="twitter:image" content="${meta.image}" />`
  )

  // Per-route structured data, in addition to the single entity graph already in the template.
  const extraLd = []
  if (page === 'home') {
    extraLd.push(jsonLd('schema-faq', faqSchema()))
  } else if (page === 'work' && !slug) {
    extraLd.push(jsonLd('schema-work', workCollectionSchema()))
  } else if (page === 'work' && slug) {
    const item = workItemSchema(slug)
    if (item) extraLd.push(jsonLd('schema-work-item', item))
    extraLd.push(
      jsonLd(
        'schema-breadcrumb',
        breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Work', url: `${SITE_URL}/work` },
          { name: meta.title.replace(' | Nocturnal Work', ''), url: meta.canonical },
        ])
      )
    )
  }
  if (extraLd.length) {
    html = html.replace('</head>', `    ${extraLd.join('\n    ')}\n  </head>`)
  }

  // Crawlable no-JS fallback
  html = replaceTag(
    html,
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>\n      <main style="font-family: sans-serif; padding: 48px; line-height: 1.5;">\n        <h1>${meta.title}</h1>\n        <p>${meta.description}</p>\n        <p><a href="${meta.canonical}">${path}</a></p>\n      </main>\n    </noscript>`
  )

  return html
}

const template = await readFile(distIndex, 'utf8')

for (const route of PRERENDER_ROUTES) {
  const meta = getRouteMeta(route.page, route.slug)
  if (!meta.outPath) continue
  const outPath = resolve(root, meta.outPath)
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, buildRoute(template, route), 'utf8')
  console.log(`[prerender] wrote ${meta.outPath}`)
}

// 404.html — served by Vercel (see vercel.json) with a real HTTP 404, not the SPA shell.
{
  const meta = getRouteMeta('notFound')
  const outPath = resolve(root, meta.outPath)
  await mkdir(dirname(outPath), { recursive: true })
  const html = buildRoute(template, { page: 'notFound', path: '/404' })
  await writeFile(outPath, html, 'utf8')
  console.log(`[prerender] wrote ${meta.outPath}`)
}

// Sitemap — indexable URLs only, <loc> alone. No fabricated lastmod/changefreq/priority.
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapUrls()
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`)
    .join('\n') +
  '\n</urlset>\n'

await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap, 'utf8')
console.log('[prerender] wrote dist/sitemap.xml')
