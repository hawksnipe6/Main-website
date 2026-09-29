import { useEffect } from 'react'
import {
  type StaticPageKey,
  getRouteMeta,
  entityGraph,
  faqSchema,
  workCollectionSchema,
  breadcrumbSchema,
  workItemSchema,
  SITE_URL,
} from '../seo/meta'

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

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove()
}

export function Seo({ page, slug }: { page: StaticPageKey; slug?: string }) {
  useEffect(() => {
    const meta = getRouteMeta(page, slug)
    document.title = meta.title
    setMeta('meta[name="description"]', { name: 'description', content: meta.description })
    setMeta('meta[name="robots"]', { name: 'robots', content: meta.robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: meta.canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: meta.image })
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: meta.imageAlt })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: meta.ogType })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Nocturnal' })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: meta.image })
    setLink('canonical', meta.canonical)

    // Entity graph (Organization/ProfessionalService/WebSite/Person) is emitted
    // once, statically, in index.html — not duplicated here at runtime.

    if (page === 'home') {
      setJsonLd('schema-faq', faqSchema())
      removeJsonLd('schema-work')
      removeJsonLd('schema-breadcrumb')
      removeJsonLd('schema-work-item')
    } else if (page === 'work' && !slug) {
      setJsonLd('schema-work', workCollectionSchema())
      removeJsonLd('schema-faq')
      removeJsonLd('schema-breadcrumb')
      removeJsonLd('schema-work-item')
    } else if (page === 'work' && slug) {
      const item = workItemSchema(slug)
      if (item) setJsonLd('schema-work-item', item)
      else removeJsonLd('schema-work-item')
      setJsonLd(
        'schema-breadcrumb',
        breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Work', url: `${SITE_URL}/work` },
          { name: meta.title.replace(' | Nocturnal Work', ''), url: meta.canonical },
        ])
      )
      removeJsonLd('schema-faq')
      removeJsonLd('schema-work')
    } else {
      removeJsonLd('schema-faq')
      removeJsonLd('schema-work')
      removeJsonLd('schema-breadcrumb')
      removeJsonLd('schema-work-item')
    }
  }, [page, slug])

  return null
}
