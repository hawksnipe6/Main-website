import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ProofStrip } from './components/ProofStrip'
import { Ledger } from './components/Ledger'
import { BackToTop } from './components/BackToTop'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { CustomScrollbar } from './components/CustomScrollbar'
import { BookingModal } from './components/BookingModal'
import { LoadingScreen } from './components/LoadingScreen'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { PortfolioPage } from './components/PortfolioPage'
import { ContactPage } from './components/ContactPage'
import { PricingPage } from './components/PricingPage'
import { Testimonials } from './components/Testimonials'
import { Services } from './components/Services'
import { Results } from './components/Results'
import { Faq } from './components/Faq'
import { Seo } from './components/Seo'
import { NotFoundPage } from './components/NotFoundPage'
import { PrivacyPage } from './components/PrivacyPage'
import { TermsPage } from './components/TermsPage'

type Page = 'home' | 'work' | 'renders' | 'concepts' | 'contact' | 'pricing' | 'privacy' | 'terms' | 'notFound'

type Route = { page: Page; slug?: string }

function getRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'
  const workMatch = path.match(/^\/work\/([a-z0-9-]+)$/)
  if (workMatch) return { page: 'work', slug: workMatch[1] }
  const conceptMatch = path.match(/^\/concepts\/([a-z0-9-]+)$/)
  if (conceptMatch) return { page: 'concepts', slug: conceptMatch[1] }
  if (path === '/') return { page: 'home' }
  if (path === '/work') return { page: 'work' }
  if (path === '/renders') return { page: 'renders' }
  if (path === '/concepts') return { page: 'concepts' }
  if (path === '/contact') return { page: 'contact' }
  if (path === '/pricing') return { page: 'pricing' }
  if (path === '/privacy') return { page: 'privacy' }
  if (path === '/terms') return { page: 'terms' }
  return { page: 'notFound' }
}

export default function App() {
  useSmoothScroll()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    revealItems.forEach((el) => {
      el.classList.remove('visible')
      observer.observe(el)
    })
    return () => observer.disconnect()
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
        onNavigateWork={() => navigateToPath('/work')}
        onNavigateContact={() => navigateToPath('/contact')}
        onNavigatePricing={() => navigateToPath('/pricing')}
      />
      {page === 'contact' ? (
        <ContactPage />
      ) : page === 'pricing' ? (
        <PricingPage />
      ) : page === 'work' || page === 'renders' || page === 'concepts' ? (
        <PortfolioPage
          activeTab={page}
          slug={slug}
          onTabChange={(tab) => navigateToPath(`/${tab}`)}
          onNavigate={navigateToPath}
        />
      ) : page === 'privacy' ? (
        <PrivacyPage />
      ) : page === 'terms' ? (
        <TermsPage />
      ) : page === 'notFound' ? (
        <NotFoundPage onNavigate={navigateToPath} />
      ) : (
        <main className="routeEnter">
          <Hero onBooking={() => setModalOpen(true)} onSeeWork={() => navigateToPath('/work')} />
          <ProofStrip />
          <Testimonials />
          <Services />
          <Results onNavigate={navigateToPath} />
          <Faq />
          <Ledger />
        </main>
      )}
      <Footer onNavigate={navigateToPath} />
      <BackToTop />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
