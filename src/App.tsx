import { useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { LogoStrip } from './components/LogoStrip'
import { Testimonials } from './components/Testimonials'
import { Faq } from './components/Faq'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { CustomScrollbar } from './components/CustomScrollbar'
import { BookingModal } from './components/BookingModal'
import { LoadingScreen } from './components/LoadingScreen'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { WorkPreview } from './components/WorkPreview'
import { WorkPage } from './components/WorkPage'
import { Seo } from './components/Seo'

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
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
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

  const isWorkPage = path === '/work'

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Seo page={isWorkPage ? 'work' : 'home'} />
      <CustomCursor />
      <CustomScrollbar />
      <Nav
        onBooking={() => setModalOpen(true)}
        page={isWorkPage ? 'work' : 'home'}
        onNavigateHome={() => navigateToPath('/')}
        onNavigateWork={() => navigateToPath('/work')}
      />
      {isWorkPage ? (
        <WorkPage />
      ) : (
        <main>
          <Hero onBooking={() => setModalOpen(true)} />
          <LogoStrip />
          <WorkPreview onOpenWork={() => navigateToPath('/work')} />
          <Services />
          <Testimonials />
          <Faq />
          <Cta />
        </main>
      )}
      <Footer />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
