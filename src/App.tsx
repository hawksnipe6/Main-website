import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { BackToTop } from './components/BackToTop'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { CustomScrollbar } from './components/CustomScrollbar'
import { BookingModal } from './components/BookingModal'
import { LoadingScreen } from './components/LoadingScreen'
import { MobileCta } from './components/MobileCta'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Testimonials } from './components/Testimonials'
import { Services } from './components/Services'
import { Faq } from './components/Faq'
import { Seo } from './components/Seo'
import { PrivacyNotice } from './components/PrivacyNotice'

// Route-only bundles (each drags in a heavy WebGL lib — `three` for
// ProjectsGrid's GridDistortion, `ogl` for ContactPage's FaultyTerminal) are
// code-split so the home page's initial download doesn't include libraries
// only /work, /contact, or /renders actually use.
const LazyProjectsGrid = lazy(() => import('./components/ProjectsGrid').then((m) => ({ default: m.ProjectsGrid })))
const LazyRenderGallery = lazy(() => import('./components/RenderGallery').then((m) => ({ default: m.RenderGallery })))
const LazyWorkPage = lazy(() => import('./components/WorkPage').then((m) => ({ default: m.WorkPage })))
const LazyContactPage = lazy(() => import('./components/ContactPage').then((m) => ({ default: m.ContactPage })))
const LazyNotFoundPage = lazy(() => import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const LazyPrivacyPage = lazy(() => import('./components/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const LazyTermsPage = lazy(() => import('./components/TermsPage').then((m) => ({ default: m.TermsPage })))
const LazyThankYouPage = lazy(() => import('./components/ThankYouPage').then((m) => ({ default: m.ThankYouPage })))

// renderToString can't wait on React.lazy/Suspense, so the server entry passes
// eagerly-imported equivalents in via this prop (see src/routes.server.ts and
// src/entry-server.tsx). The client entry never passes it, so the lazy()
// definitions above — and the client-bundle code-splitting they give us — are
// completely unaffected.
type RouteComponents = Partial<{
  ProjectsGrid: typeof import('./components/ProjectsGrid').ProjectsGrid
  RenderGallery: typeof import('./components/RenderGallery').RenderGallery
  WorkPage: typeof import('./components/WorkPage').WorkPage
  ContactPage: typeof import('./components/ContactPage').ContactPage
  NotFoundPage: typeof import('./components/NotFoundPage').NotFoundPage
  PrivacyPage: typeof import('./components/PrivacyPage').PrivacyPage
  TermsPage: typeof import('./components/TermsPage').TermsPage
  ThankYouPage: typeof import('./components/ThankYouPage').ThankYouPage
}>

type Page = 'home' | 'work' | 'renders' | 'contact' | 'privacy' | 'terms' | 'thankYou' | 'notFound'

type Route = { page: Page; slug?: string }

function getRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'
  const workMatch = path.match(/^\/work\/([a-z0-9-]+)$/)
  if (workMatch) return { page: 'work', slug: workMatch[1] }
  if (path === '/') return { page: 'home' }
  if (path === '/work') return { page: 'work' }
  if (path === '/renders') return { page: 'renders' }
  if (path === '/contact') return { page: 'contact' }
  if (path === '/privacy') return { page: 'privacy' }
  if (path === '/terms') return { page: 'terms' }
  if (path === '/thank-you') return { page: 'thankYou' }
  return { page: 'notFound' }
}

export default function App({
  initialPath,
  initialLoading,
  routeComponents,
}: {
  initialPath?: string
  initialLoading?: boolean
  routeComponents?: RouteComponents
} = {}) {
  useSmoothScroll()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(initialLoading ?? true)
  const [path, setPath] = useState(() => initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/'))
  const [noticeVisible, setNoticeVisible] = useState(false)

  const ProjectsGrid = routeComponents?.ProjectsGrid ?? (LazyProjectsGrid as ComponentType<any>)
  const RenderGallery = routeComponents?.RenderGallery ?? (LazyRenderGallery as ComponentType<any>)
  const WorkPage = routeComponents?.WorkPage ?? (LazyWorkPage as ComponentType<any>)
  const ContactPage = routeComponents?.ContactPage ?? (LazyContactPage as ComponentType<any>)
  const NotFoundPage = routeComponents?.NotFoundPage ?? (LazyNotFoundPage as ComponentType<any>)
  const PrivacyPage = routeComponents?.PrivacyPage ?? (LazyPrivacyPage as ComponentType<any>)
  const TermsPage = routeComponents?.TermsPage ?? (LazyTermsPage as ComponentType<any>)
  const ThankYouPage = routeComponents?.ThankYouPage ?? (LazyThankYouPage as ComponentType<any>)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  useEffect(() => {
    if (loading) return
    try {
      if (!localStorage.getItem('noc-privacy-ack')) setNoticeVisible(true)
    } catch {
      setNoticeVisible(true)
    }
  }, [loading])

  const dismissNotice = () => {
    setNoticeVisible(false)
    try {
      localStorage.setItem('noc-privacy-ack', '1')
    } catch {
      // localStorage unavailable — the notice will just show again next visit
    }
  }

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const watch = (el: Element) => {
      el.classList.remove('visible')
      observer.observe(el)
    }
    document.querySelectorAll('.reveal').forEach(watch)
    // Route components are React.lazy-loaded, so their .reveal nodes mount
    // after this effect already ran its one-shot query — watch for them too.
    const mo = new MutationObserver((mutations) => {
      for (const { addedNodes } of mutations) {
        addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches('.reveal')) watch(node)
          node.querySelectorAll('.reveal').forEach(watch)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [path])

  const navigateToPath = (nextPath: string) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath)
      setPath(nextPath)
    }
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  }

  const { page, slug } = getRoute(path)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Analytics />
      <Seo page={page} slug={slug} />
      <CustomCursor />
      <CustomScrollbar />
      <Nav
        page={page}
        onNavigateHome={() => navigateToPath('/')}
        onNavigateContact={() => navigateToPath('/contact')}
        onNavigate={navigateToPath}
      />
      <Suspense fallback={null}>
        {page === 'contact' ? (
          <ContactPage onNavigate={navigateToPath} />
        ) : page === 'thankYou' ? (
          <ThankYouPage onNavigate={navigateToPath} />
        ) : page === 'work' ? (
          slug ? (
            <WorkPage activeSlug={slug} onNavigate={navigateToPath} />
          ) : (
            <ProjectsGrid onNavigate={navigateToPath} />
          )
        ) : page === 'renders' ? (
          <RenderGallery />
        ) : page === 'privacy' ? (
          <PrivacyPage />
        ) : page === 'terms' ? (
          <TermsPage />
        ) : page === 'notFound' ? (
          <NotFoundPage onNavigate={navigateToPath} />
        ) : (
          <main className="routeEnter">
            <Hero onBooking={() => setModalOpen(true)} onSeeWork={() => navigateToPath('/work')} />
            <div className="heroSpacer" aria-hidden="true" />
            <Testimonials />
            <Services />
            <Faq />
          </main>
        )}
      </Suspense>
      <Footer onNavigate={navigateToPath} />
      <BackToTop
        suppressed={noticeVisible}
        raised={!noticeVisible && page !== 'contact' && page !== 'notFound'}
      />
      <MobileCta page={page} suppressed={noticeVisible} onStart={() => navigateToPath('/contact')} />
      <PrivacyNotice visible={noticeVisible} onDismiss={dismissNotice} onNavigate={navigateToPath} />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
