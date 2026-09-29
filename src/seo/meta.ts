import { WORK_SAMPLES } from '../data/workSamples.ts'
import { FAQS } from '../data/faqs.ts'

export const SITE_URL = 'https://getnctrnl.com'
export const LOGO_URL = `${SITE_URL}/logo%20512.png`
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`

export type StaticPageKey = 'home' | 'work' | 'renders' | 'contact' | 'privacy' | 'terms' | 'thankYou' | 'notFound'

export type RouteMeta = {
  title: string
  description: string
  canonical: string
  image: string
  imageAlt: string
  ogType: 'website' | 'article'
  robots?: string
  /** Present only for routes that should exist in dist/ as their own prerendered file. */
  outPath?: string
  /** Present only for routes that belong in sitemap.xml. */
  sitemapPath?: string
}

const ROBOTS_NOINDEX = 'noindex,follow'

export const PAGE_META: Record<StaticPageKey, RouteMeta> = {
  home: {
    title: 'Nocturnal Design Studio | Industrial, UI/UX & Brand Design, Mumbai',
    description:
      'Nocturnal is a multidisciplinary design studio in Mumbai, also known as nctrnl. Industrial design from sterling silver instruments to consumer hardware, UI/UX systems, brand and graphic design, motion, and CGI.',
    canonical: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Nocturnal — multidisciplinary design studio, Mumbai',
    ogType: 'website',
    outPath: 'dist/index.html',
    sitemapPath: '/',
  },
  work: {
    title: 'Work — Nocturnal Industrial Design, UI/UX & CGI Portfolio',
    description:
      'Selected Nocturnal projects across industrial design, medical product design, mobility UI/UX, EV charging systems, brand visuals, CGI, packaging, and product visualization.',
    canonical: `${SITE_URL}/work`,
    image: `${SITE_URL}/og/work.png`,
    imageAlt: 'Nocturnal work — industrial design, UI/UX, and CGI portfolio',
    ogType: 'website',
    outPath: 'dist/work/index.html',
    sitemapPath: '/work',
  },
  renders: {
    title: 'Render Gallery — Nocturnal CGI and Product Visualization',
    description:
      'A gallery of Nocturnal CAD visualisations and product render studies focused on material behaviour, lighting control, and object-led storytelling.',
    canonical: `${SITE_URL}/renders`,
    image: `${SITE_URL}/renders/render-01.webp`,
    imageAlt: 'CGI product render study by Nocturnal',
    ogType: 'website',
    outPath: 'dist/renders/index.html',
    sitemapPath: '/renders',
  },
  contact: {
    title: 'Start a Project | Nocturnal Design Studio',
    description:
      'Book a strategy call with Nocturnal. Thirty minutes, no pitch decks. We identify the design friction in your brand and product and tell you exactly what to fix first.',
    canonical: `${SITE_URL}/contact`,
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Nocturnal — start a design project',
    ogType: 'website',
    outPath: 'dist/contact/index.html',
    sitemapPath: '/contact',
  },
  privacy: {
    title: 'Privacy Policy | Nocturnal',
    description: 'How Nocturnal collects, uses, and protects the information you share through this site.',
    canonical: `${SITE_URL}/privacy`,
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Nocturnal — privacy policy',
    ogType: 'website',
    outPath: 'dist/privacy/index.html',
    sitemapPath: '/privacy',
  },
  terms: {
    title: 'Terms of Service | Nocturnal',
    description: 'The terms that govern your use of the Nocturnal website.',
    canonical: `${SITE_URL}/terms`,
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Nocturnal — terms of service',
    ogType: 'website',
    outPath: 'dist/terms/index.html',
    sitemapPath: '/terms',
  },
  thankYou: {
    title: 'Thank You | Nocturnal Design Studio',
    description: 'Your project brief was received. Nocturnal replies to every inquiry within two working days.',
    canonical: `${SITE_URL}/thank-you`,
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Nocturnal — thank you',
    ogType: 'website',
    robots: ROBOTS_NOINDEX,
    outPath: 'dist/thank-you/index.html',
  },
  notFound: {
    title: 'Page Not Found | Nocturnal',
    description: 'This page does not exist. Find your way back to Nocturnal, home, work, or contact.',
    canonical: `${SITE_URL}/`,
    image: DEFAULT_OG_IMAGE,
    imageAlt: 'Nocturnal — page not found',
    ogType: 'website',
    robots: ROBOTS_NOINDEX,
    outPath: 'dist/404.html',
  },
}

/** Every route that should be written to its own dist/**\/index.html by the prerender script. */
export const PRERENDER_ROUTES: { path: string; page: StaticPageKey; slug?: string }[] = [
  { path: '/', page: 'home' },
  { path: '/work', page: 'work' },
  ...WORK_SAMPLES.map((w) => ({ path: `/work/${w.slug}`, page: 'work' as const, slug: w.slug })),
  { path: '/renders', page: 'renders' },
  { path: '/contact', page: 'contact' },
  { path: '/privacy', page: 'privacy' },
  { path: '/terms', page: 'terms' },
  { path: '/thank-you', page: 'thankYou' },
]

export function workMeta(slug: string): RouteMeta | undefined {
  const work = WORK_SAMPLES.find((w) => w.slug === slug)
  if (!work) return undefined
  return {
    title: `${work.title} | Nocturnal Work`,
    description: work.description,
    canonical: `${SITE_URL}/work/${slug}`,
    image: `${SITE_URL}${work.image}`,
    imageAlt: `${work.title} — Nocturnal project cover`,
    ogType: 'article',
    outPath: `dist/work/${slug}/index.html`,
    sitemapPath: `/work/${slug}`,
  }
}

export function getRouteMeta(page: StaticPageKey, slug?: string): RouteMeta {
  if (page === 'work' && slug) {
    const meta = workMeta(slug)
    if (meta) return meta
  }
  return PAGE_META[page]
}

/** Every URL that belongs in sitemap.xml — no fabricated lastmod/changefreq/priority. */
export function sitemapUrls(): string[] {
  const staticUrls = Object.values(PAGE_META)
    .filter((meta) => !meta.robots?.includes('noindex') && meta.sitemapPath)
    .map((meta) => `${SITE_URL}${meta.sitemapPath}`)
  const workUrls = WORK_SAMPLES.map((w) => `${SITE_URL}/work/${w.slug}`)
  const conceptUrls = CONCEPT_PAGES.map((c) => `${SITE_URL}${c.path}`)
  return [...staticUrls, ...workUrls, ...conceptUrls]
}

// ── Standalone static concept prototypes under public/, each its own page ──
export const CONCEPT_PAGES: { path: string; title: string; description: string }[] = [
  {
    path: '/densly',
    title: 'Densly — Hair-Loss Outcome Tracking Concept | Nocturnal',
    description:
      'Densly is an independent Nocturnal concept for tracking hair-loss treatment outcomes: logging routines, photo comparisons, and progress over time.',
  },
  {
    path: '/tollgate',
    title: 'Tollgate — AI Spend Controls Concept | Nocturnal',
    description:
      'Tollgate is an independent Nocturnal concept for setting spend rules and approval limits on autonomous AI agents before they act.',
  },
  {
    path: '/voca',
    title: 'Voca — Concept App | Nocturnal',
    description: 'Voca is an independent Nocturnal interactive concept exploring voice-driven product interaction.',
  },
  {
    path: '/firstweeks',
    title: 'Firstweeks — Postpartum Recovery Concept | Nocturnal',
    description:
      'Firstweeks is an independent Nocturnal concept for a postpartum recovery operating system: recovery tracking, guidance, and support in the weeks after birth.',
  },
]

// ── Structured data (@graph), only fields backed by visible page content ──
const SAME_AS = [
  'https://www.behance.net/abeermahad064c',
  'https://www.linkedin.com/in/abeermahadane44/',
  'https://www.instagram.com/designwithabeer/',
]

const BRAND_ALT_NAMES = ['Nocturnal', 'NDS', 'nctrnl', 'getnctrnl', 'Nocturnal Studio']

const STUDIO_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Mumbai',
  addressRegion: 'Maharashtra',
  addressCountry: 'IN',
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Nocturnal Design Studio',
    alternateName: BRAND_ALT_NAMES,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    email: 'work@getnctrnl.com',
    telephone: '+91-70454-21516',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'work@getnctrnl.com',
      telephone: '+91-70454-21516',
      areaServed: ['IN', 'Global'],
      availableLanguage: ['en'],
    },
    founder: { '@id': `${SITE_URL}/#founder` },
    address: STUDIO_ADDRESS,
    areaServed: ['India', 'Global'],
    knowsAbout: [
      'Industrial design', 'Product design', 'UI/UX design', 'Brand identity',
      '3D rendering', 'CGI', 'Motion design', 'Design systems', 'CAD', 'Product visualization',
    ],
    sameAs: SAME_AS,
    description:
      'Nocturnal Design Studio, also known as nctrnl, is a multidisciplinary design studio in Mumbai working across industrial design, UI/UX systems, brand and graphic design, motion, and CGI.',
  }
}

export function professionalServiceSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Nocturnal Design Studio',
    alternateName: ['Nocturnal', 'NDS', 'nctrnl', 'getnctrnl'],
    url: SITE_URL,
    image: LOGO_URL,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['India', 'Global'],
    address: STUDIO_ADDRESS,
    slogan: 'Design systems, not screens.',
    serviceType: [
      'Industrial Design',
      'Product UI/UX Design',
      'Brand Design',
      'CGI and Motion Design',
      'Product Visualization',
      'Design Systems',
    ],
    sameAs: SAME_AS,
    description:
      'Strategic design studio in Mumbai for startups, AI products, physical products, interface systems, and brand-led product companies.',
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Nocturnal Design Studio',
    alternateName: [...BRAND_ALT_NAMES, 'nocturnal design studio'],
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Abeer Mahadane',
    url: SITE_URL,
    jobTitle: 'Industrial & Product Designer',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    sameAs: SAME_AS,
  }
}

/** The single entity graph, present once on every page. */
export function entityGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), professionalServiceSchema(), websiteSchema(), personSchema()],
  }
}

/** FAQPage schema built from the same FAQS array the accordion renders. */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function workCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Nocturnal Work',
    url: `${SITE_URL}/work`,
    description: PAGE_META.work.description,
    hasPart: WORK_SAMPLES.map((work) => `${SITE_URL}/work/${work.slug}`),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function workItemSchema(slug: string) {
  const work = WORK_SAMPLES.find((w) => w.slug === slug)
  if (!work) return undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    description: work.description,
    image: `${SITE_URL}${work.image}`,
    url: `${SITE_URL}/work/${slug}`,
    genre: work.category,
    creator: { '@id': `${SITE_URL}/#organization` },
  }
}
