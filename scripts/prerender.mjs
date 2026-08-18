import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distIndex = resolve(root, 'dist/index.html')
const SITE_URL = 'https://getnctrnl.com'

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
    collection: true,
    noscriptH1: 'Nocturnal — Industrial Design, UI/UX and CGI Work',
    noscriptBody:
      'Selected Nocturnal projects across industrial design, medical product design, mobility UI/UX, EV charging systems, CGI, packaging, and product visualization.',
  },
  {
    out: 'dist/renders/index.html',
    title: 'Render Gallery — Nocturnal CGI and Product Visualization',
    description:
      'A gallery of Nocturnal CAD visualisations and product render studies focused on material behaviour, lighting control, and object-led storytelling.',
    canonical: `${SITE_URL}/renders`,
    image: `${SITE_URL}/renders/render-01.webp`,
    ogType: 'article',
    noscriptH1: 'Nocturnal — Render Gallery and CGI Studies',
    noscriptBody:
      'A collection of Nocturnal CAD visualisations and product render studies across lighting, material, and object storytelling.',
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
  {
    out: 'dist/contact/index.html',
    title: 'Start a Project | Nocturnal Design Studio',
    description:
      'Book a strategy call with Nocturnal. Thirty minutes, no pitch decks. We identify the design friction in your brand and product and tell you exactly what to fix first.',
    canonical: `${SITE_URL}/contact`,
    image: `${SITE_URL}/logo%20512.png`,
    ogType: 'website',
    noscriptH1: 'Contact Nocturnal — Start a Design Project',
    noscriptBody:
      'Email or WhatsApp Nocturnal to start an industrial design, UI/UX, CGI, motion, or brand project, or book a free thirty-minute strategy call.',
  },
  {
    out: 'dist/privacy/index.html',
    title: 'Privacy Policy | Nocturnal',
    description: 'How Nocturnal collects, uses, and protects the information you share through this site.',
    canonical: `${SITE_URL}/privacy`,
    image: `${SITE_URL}/logo%20512.png`,
    ogType: 'website',
    noscriptH1: 'Nocturnal — Privacy Policy',
    noscriptBody: 'How Nocturnal collects, uses, and protects the information you share through this site.',
  },
  {
    out: 'dist/terms/index.html',
    title: 'Terms of Service | Nocturnal',
    description: 'The terms that govern your use of the Nocturnal website.',
    canonical: `${SITE_URL}/terms`,
    image: `${SITE_URL}/logo%20512.png`,
    ogType: 'website',
    noscriptH1: 'Nocturnal — Terms of Service',
    noscriptBody: 'The terms that govern your use of the Nocturnal website.',
  },
]

// Individual case studies, each with its own URL. Keep slugs/titles/descriptions
// in sync with src/data/workSamples.ts and the CASE_STUDY_DETAILS in WorkPage.tsx.
const WORK_ITEMS = [
  { slug: 'martand', title: 'Martand', description: 'A scroll-driven animation study in form, light, and rhythm, rendered frame by frame for frame-perfect motion.', image: '/work-cover-martand.jpg' },
  { slug: 'alivio', title: 'Alivio - Posture Corrector and TENS Device', description: 'A posture and TENS device concept shaped through body research, form exploration, engineering logic, and prototype validation.', image: '/work-cover-alivio.png' },
  { slug: 'audio-1', title: 'Audio 1', description: 'A home-audio concept influenced by restrained consumer electronics, with attention to interface hierarchy, CMF, and product presence.', image: '/work-cover-audio-1.png' },
  { slug: 'renderfolio', title: 'renderfolio.', description: 'A compact collection of rendered product studies focused on material behaviour, lighting control, and object storytelling.', image: '/work-cover-renderfolio-custom.png' },
  { slug: 'armor', title: 'Visual Design for armor', description: 'A visual design system for Armor that turns product features into crisp campaign assets, launch moments, and social-first compositions.', image: '/work-cover-armor-custom.png' },
  { slug: 'osmo', title: 'OSMO VISION 1', description: 'A binocular design study that moves from early sketches into foam models, prototype logic, and ergonomic refinement.', image: '/work-cover-osmo.jpg' },
  { slug: 'bedizen', title: 'Bedizen - Cranial Audio Headset', description: 'A cranial audio headset explored as both physical object and connected digital system, pairing device form with tuning controls.', image: '/work-cover-bedizen.png' },
  { slug: 'ice-tray', title: 'Ice Tray - Universal Design', description: 'A universal-design exercise around a simple kitchen object, improving grip, sequence, clarity, and use for different bodies.', image: '/work-cover-ice-tray-custom.png' },
  { slug: 'sailfish', title: 'Sailfish - Hyperloop Commuting app', description: 'A commuting app concept for a future mobility system, focused on route clarity, information hierarchy, and calm trip planning.', image: '/work-cover-sailfish.png' },
  { slug: 'medwise', title: 'Medwise - Drug-Drug Interaction App', description: 'A healthcare app concept that simplifies medication interaction checks through accessible flows and clear warning hierarchy.', image: '/work-cover-medwise.png' },
  { slug: 'palan', title: 'Palan - Packaging Design', description: 'A packaging design project shaped around shelf presence, hierarchy, material impression, and distinct brand recall.', image: '/work-cover-palan.png' },
  { slug: 'ev-charging', title: 'EV Charging ecosystem | System Design', description: 'A systems study mapping the behavioural, infrastructural, and decision-making friction around EV charging ecosystems.', image: '/work-cover-ev-charging.jpg' },
]

// Keep in sync with the CONCEPTS array in src/components/ConceptsPage.tsx.
const CONCEPT_ITEMS = [
  { slug: 'tollgate', title: 'Tollgate', tagline: 'Giving people a spending firewall they trust more the longer it runs — a consumer-owned control layer that sits between AI shopping agents and their money.' },
  { slug: 'densly', title: 'Densly', tagline: 'Turning scattered mirror-checks into evidence — a treatment-outcome platform that tells people whether their hair-loss routine is actually working.' },
  { slug: 'firstweeks', title: 'Firstweeks', tagline: 'Closing the gap between hospital discharge and the six-week check-up — a postpartum recovery operating system for first-time mothers.' },
  { slug: 'voca', title: 'Voca', tagline: 'Putting a Praat-quality report in a coat pocket — clinical voice analysis, mobile-first, built for therapists and their patients.' },
]

for (const item of WORK_ITEMS) {
  routes.push({
    out: `dist/work/${item.slug}/index.html`,
    title: `${item.title} | Nocturnal Work`,
    description: item.description,
    canonical: `${SITE_URL}/work/${item.slug}`,
    image: `${SITE_URL}${item.image}`,
    ogType: 'article',
    noscriptH1: `Nocturnal — ${item.title}`,
    noscriptBody: item.description,
  })
}

for (const item of CONCEPT_ITEMS) {
  routes.push({
    out: `dist/concepts/${item.slug}/index.html`,
    title: `${item.title} | Nocturnal Concepts`,
    description: item.tagline,
    canonical: `${SITE_URL}/concepts/${item.slug}`,
    image: `${SITE_URL}/logo%20512.png`,
    ogType: 'article',
    noscriptH1: `Nocturnal — ${item.title}`,
    noscriptBody: item.tagline,
  })
}

// Every indexable route, with crawl priority. Keep in sync with `routes` above.
const sitemapPages = [
  { path: '/', priority: '1.0' },
  { path: '/work', priority: '0.9' },
  { path: '/renders', priority: '0.75' },
  { path: '/concepts', priority: '0.8' },
  { path: '/pricing', priority: '0.7' },
  { path: '/contact', priority: '0.6' },
  { path: '/privacy', priority: '0.2' },
  { path: '/terms', priority: '0.2' },
  ...WORK_ITEMS.map((item) => ({ path: `/work/${item.slug}`, priority: '0.65' })),
  ...CONCEPT_ITEMS.map((item) => ({ path: `/concepts/${item.slug}`, priority: '0.6' })),
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

  // Per-route structured data (only the Work index is a CollectionPage)
  if (route.collection) {
    const ld = `<script type="application/ld+json">${JSON.stringify(workSchema(route.description))}</script>`
    html = html.replace('</head>', `    ${ld}\n  </head>`)
  }

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

// Generate sitemap.xml so it is always current with the route list above.
const today = new Date().toISOString().slice(0, 10)
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapPages
    .map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
    )
    .join('\n') +
  '\n</urlset>\n'

await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap, 'utf8')
console.log('[prerender] wrote dist/sitemap.xml')
