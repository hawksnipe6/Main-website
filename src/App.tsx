import { useEffect, useState } from 'react'
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
import { ProjectsAccordion } from './components/ProjectsAccordion'
import { RenderGallery } from './components/RenderGallery'
import { WorkPage } from './components/WorkPage'
import { ContactPage } from './components/ContactPage'
import { Testimonials } from './components/Testimonials'
import { Services } from './components/Services'
import { Faq } from './components/Faq'
import { Seo } from './components/Seo'
import { NotFoundPage } from './components/NotFoundPage'
import { PrivacyPage } from './components/PrivacyPage'
import { TermsPage } from './components/TermsPage'
import { PrivacyNotice } from './components/PrivacyNotice'
import { ThankYouPage } from './components/ThankYouPage'

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

export default function App() {
  useSmoothScroll()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [path, setPath] = useState(window.location.pathname)
  const [noticeVisible, setNoticeVisible] = useState(false)

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
        onNavigateContact={() => navigateToPath('/contact')}
        onNavigate={navigateToPath}
      />
      {page === 'contact' ? (
        <ContactPage onNavigate={navigateToPath} />
      ) : page === 'thankYou' ? (
        <ThankYouPage onNavigate={navigateToPath} />
      ) : page === 'work' ? (
        slug ? (
          <WorkPage activeSlug={slug} onNavigate={navigateToPath} />
        ) : (
          <ProjectsAccordion onNavigate={navigateToPath} />
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
