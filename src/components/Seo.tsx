import { useEffect } from 'react'
import { WORK_SAMPLES } from '../data/workSamples'

const SITE_URL = 'https://www.getnctrnl.com'
const LOGO_URL = `${SITE_URL}/logo%20512.png`

type PageKey = 'home' | 'work' | 'concepts' | 'contact' | 'pricing'

const PAGE_META: Record<PageKey, { title: string; description: string; canonical: string; image: string }> = {
  home: {
    title: 'Nocturnal | Industrial Design, UI/UX, CGI and Brand Systems Studio',
    description:
      'Nocturnal is a design intelligence studio for startups and product brands. We build industrial design, UI/UX systems, CGI, motion, and brand systems with strategic clarity.',
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
    'Nocturnal is a design intelligence studio specializing in industrial design, product UI/UX, CGI, motion, and brand systems.',
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

export function Seo({ page }: { page: PageKey }) {
  useEffect(() => {
    const meta = PAGE_META[page]
    document.title = meta.title
    setMeta('meta[name="description"]', { name: 'description', content: meta.description })
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' })
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
    } else if (page === 'work') {
      setJsonLd('schema-work', workSchema)
      document.getElementById('schema-faq')?.remove()
    } else {
      document.getElementById('schema-faq')?.remove()
      document.getElementById('schema-work')?.remove()
    }
  }, [page])

  return null
}
