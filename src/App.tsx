import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { About } from './components/About'
import { Services } from './components/Services'
import { Disciplines } from './components/Disciplines'
import { Process } from './components/Process'
import { Clients } from './components/Clients'
import { Pricing } from './components/Pricing'
import { Faq } from './components/Faq'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Disciplines />
        <Process />
        <Clients />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
