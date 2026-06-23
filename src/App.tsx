import { useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
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

type Page = 'home' | 'work' | 'concepts' | 'contact' | 'pricing'

function getPage(pathname: string): Page {
  if (pathname === '/work') return 'work'
  if (pathname === '/concepts') return 'concepts'
  if (pathname === '/contact') return 'contact'
  if (pathname === '/pricing') return 'pricing'
  return 'home'
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

  const page = getPage(path)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Seo page={page} />
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
      ) : page === 'work' || page === 'concepts' ? (
        <PortfolioPage
          activeTab={page}
          onTabChange={(tab) => navigateToPath(tab === 'work' ? '/work' : '/concepts')}
          onNavigate={navigateToPath}
        />
      ) : (
        <main className="routeEnter">
          <Hero onBooking={() => setModalOpen(true)} />
          <Testimonials />
          <Services />
          <Results onNavigate={navigateToPath} />
          <Faq />
        </main>
      )}
      <Footer onNavigate={navigateToPath} />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
