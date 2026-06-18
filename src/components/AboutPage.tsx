import { Services } from './Services'
import { Process } from './Process'
import { LogoStrip } from './LogoStrip'
import { Testimonials } from './Testimonials'
import { Faq } from './Faq'

export function AboutPage() {
  return (
    <main className="routeEnter">
      <Services />
      <Process />
      <LogoStrip />
      <Testimonials />
      <Faq />
    </main>
  )
}
