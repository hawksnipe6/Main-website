import { Services } from './Services'
import { Process } from './Process'
import { LogoStrip } from './LogoStrip'
import { Testimonials } from './Testimonials'
import { Faq } from './Faq'
import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <main className={`${styles.page} routeEnter`}>
      <LogoStrip />
      <Testimonials />
      <Services />
      <Process />
      <Faq />
    </main>
  )
}
