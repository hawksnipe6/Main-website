import { useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Services } from './components/Services'
import { Pricing } from './components/Pricing'
import { Faq } from './components/Faq'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { BookingModal } from './components/BookingModal'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
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
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <CustomCursor />
      <Nav onBooking={() => setModalOpen(true)} />
      <main>
        <Hero onBooking={() => setModalOpen(true)} />
        <Marquee />
        <Services />
        <Pricing onBooking={() => setModalOpen(true)} />
        <Faq />
        <Cta />
      </main>
      <Footer />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
