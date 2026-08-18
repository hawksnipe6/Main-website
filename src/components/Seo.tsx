import { useEffect } from 'react'
import { WORK_SAMPLES } from '../data/workSamples'
import { CONCEPTS } from './ConceptsPage'

const SITE_URL = 'https://getnctrnl.com'
const LOGO_URL = `${SITE_URL}/logo%20512.png`

type PageKey = 'home' | 'work' | 'renders' | 'concepts' | 'contact' | 'pricing' | 'privacy' | 'terms' | 'notFound'

const PAGE_META: Record<PageKey, { title: string; description: string; canonical: string; image: string; robots?: string }> = {
  home: {
    title: 'Nocturnal | Design Studio, Mumbai: Industrial, UI/UX, Brand, Motion',
    description:
      'Nocturnal is a multidisciplinary design studio in Mumbai. Industrial design from sterling silver instruments to consumer hardware, UI/UX systems, brand and graphic design, motion, and CGI.',
    canonical: SITE_URL,
    image: LOGO_URL,
  },
  work: {
    title: 'Portfolio | Nocturnal Work and Concepts: Industrial Design, UI/UX, CGI',
    description:
      'Selected Nocturnal work and independently researched product concepts spanning industrial design, medical product design, mobility UI/UX, EV charging systems, brand visuals, CGI, packaging, and interactive prototypes.',
    canonical: `${SITE_URL}/work`,
    image: `${SITE_URL}/work-cover-renderfolio-custom.png`,
  },
  renders: {
    title: 'Render Gallery | Nocturnal CGI and Product Visualization',
    description:
      'A gallery of Nocturnal CAD visualisations and product render studies focused on material behaviour, lighting control, and object-led storytelling.',
    canonical: `${SITE_URL}/renders`,
    image: `${SITE_URL}/renders/render-01.webp`,
  },
  concepts: {
    title: 'Portfolio | Nocturnal Work and Concepts: Industrial Design, UI/UX, CGI',
    description:
      'Selected Nocturnal work and independently researched product concepts spanning industrial design, medical product design, mobility UI/UX, EV charging systems, brand visuals, CGI, packaging, and interactive prototypes.',
    canonical: `${SITE_URL}/concepts`,
    image: LOGO_URL,
  },
  contact: {
    title: 'Start a Project | Nocturnal Design Studio',
    description:
      'Book a strategy call with Nocturnal. Thirty minutes, no pitch decks. We identify the design friction in your brand and product and tell you exactly what to fix first.',
    canonical: `${SITE_URL}/contact`,
    image: LOGO_URL,
  },
  pricing: {
    title: 'Pricing | Nocturnal Design Studio',
    description:
      'Fixed-scope, fixed-price design packages across industrial design, UI/UX, motion, and brand. Clear deliverables, revisions, and timelines, with custom scoping when you need it.',
    canonical: `${SITE_URL}/pricing`,
    image: LOGO_URL,
  },
  privacy: {
    title: 'Privacy Policy | Nocturnal',
    description: 'How Nocturnal collects, uses, and protects the information you share through this site.',
    canonical: `${SITE_URL}/privacy`,
    image: LOGO_URL,
  },
  terms: {
    title: 'Terms of Service | Nocturnal',
    description: 'The terms that govern your use of the Nocturnal website.',
    canonical: `${SITE_URL}/terms`,
    image: LOGO_URL,
  },
  notFound: {
    title: 'Page Not Found | Nocturnal',
    description: 'This page does not exist. Find your way back to Nocturnal, home, work, pricing, or contact.',
    canonical: `${SITE_URL}/`,
    image: LOGO_URL,
    robots: 'noindex,follow',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nocturnal',
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: [
    'https://www.behance.net/abeermahad064c',
    'https://www.linkedin.com/in/abeermahadane44/',
    'https://www.instagram.com/designwithabeer/',
  ],
  description:
    'Nocturnal is a multidisciplinary design studio in Mumbai. Industrial design, UI/UX systems, brand and graphic design, motion, and CGI.',
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Nocturnal',
  url: SITE_URL,
  image: LOGO_URL,
  areaServed: ['India', 'Global'],
  priceRange: '$$',
  slogan: 'Design systems, not screens.',
  serviceType: [
    'Industrial Design',
    'Product UI/UX Design',
    'Brand Design',
    'CGI and Motion Design',
    'Product Visualization',
    'Design Systems',
  ],
  description:
    'Strategic design studio for startups, AI products, physical products, interface systems, and brand-led product companies.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes Nocturnal different from other design studios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nocturnal questions the brief before execution and delivers connected systems across brand, product, interface, CGI, and motion instead of disconnected design files.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a typical Nocturnal project take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Audits usually take two to three weeks. Full brand, product, or interface systems usually take six to ten weeks after scope is locked.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Nocturnal work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Nocturnal works async-first with structured check-ins, written decisions, and clear handoff points across time zones.',
      },
    },
  ],
}

const workSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Nocturnal Work',
  url: `${SITE_URL}/work`,
  description: PAGE_META.work.description,
  mainEntity: WORK_SAMPLES.map((work) => ({
    '@type': 'CreativeWork',
    name: work.title,
    description: work.description,
    image: `${SITE_URL}${work.image}`,
    url: work.href,
    genre: work.category,
    creator: {
      '@type': 'Organization',
      name: 'Nocturnal',
      url: SITE_URL,
    },
  })),
}

function setMeta(selector: string, attrs: Record<string, string>) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }
  Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value))
}

function setLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.rel = rel
    document.head.appendChild(tag)
  }
  tag.href = href
}

function setJsonLd(id: string, value: unknown) {
  let tag = document.getElementById(id) as HTMLScriptElement | null
  if (!tag) {
    tag = document.createElement('script')
    tag.id = id
    tag.type = 'application/ld+json'
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(value)
}

function getMeta(page: PageKey, slug?: string) {
  if (page === 'work' && slug) {
    const work = WORK_SAMPLES.find((w) => w.slug === slug)
    if (work) {
      return {
        title: `${work.title} | Nocturnal Work`,
        description: work.description,
        canonical: `${SITE_URL}/work/${slug}`,
        image: `${SITE_URL}${work.image}`,
      }
    }
  }
  if (page === 'concepts' && slug) {
    const concept = CONCEPTS.find((c) => c.id === slug)
    if (concept) {
      return {
        title: `${concept.title} | Nocturnal Concepts`,
        description: concept.tagline,
        canonical: `${SITE_URL}/concepts/${slug}`,
        image: LOGO_URL,
      }
    }
  }
  return PAGE_META[page]
}

export function Seo({ page, slug }: { page: PageKey; slug?: string }) {
  useEffect(() => {
    const meta = getMeta(page, slug)
    document.title = meta.title
    setMeta('meta[name="description"]', { name: 'description', content: meta.description })
    setMeta('meta[name="robots"]', { name: 'robots', content: meta.robots ?? 'index,follow,max-image-preview:large' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: meta.canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: meta.image })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: page === 'home' ? 'website' : 'article' })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Nocturnal' })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: meta.image })
    setLink('canonical', meta.canonical)
    setJsonLd('schema-organization', organizationSchema)
    setJsonLd('schema-professional-service', professionalServiceSchema)
    if (page === 'home') {
      setJsonLd('schema-faq', faqSchema)
      document.getElementById('schema-work')?.remove()
    } else if (page === 'work' && !slug) {
      setJsonLd('schema-work', workSchema)
      document.getElementById('schema-faq')?.remove()
    } else {
      document.getElementById('schema-faq')?.remove()
      document.getElementById('schema-work')?.remove()
    }
  }, [page, slug])

  return null
}
