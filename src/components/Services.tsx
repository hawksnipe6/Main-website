import { useEffect, useState } from 'react'
import styles from './Services.module.css'

const SERVICES = [
  {
    num: '01',
    title: 'Industrial Design',
    body: 'Industrial design for physical products, from research and form direction to prototype-ready 3D output.',
    deliverables: ['Form Concepts', 'Lo-Fi Prototypes', '3D Renders', '3D Printed Products and Prototypes'],
    projectUrl: 'https://www.behance.net/gallery/227654211/Alivio-Posture-Corrector-and-TENS-Device',
    process: [
      {
        num: '01',
        title: 'Research',
        body: 'Pain points, posture behaviour, and early opportunity mapping.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5d799f227654211.685154a06b98e.png',
      },
      {
        num: '02',
        title: 'Concept Development',
        body: 'Wearable form studies, product language, and usage scenarios.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b86378227654211.6853dd0ae4594.png',
      },
      {
        num: '03',
        title: '3D Visualization',
        body: 'Rendered assembly, material direction, and presentation output.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d64acb227654211.68540b9b1d395.png',
      },
      {
        num: '04',
        title: 'Prototype & Validation',
        body: 'PoC testing, ergonomics checks, and real-use verification.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/679513227654211.6853f428d2578.png',
      },
    ],
  },
  {
    num: '02',
    title: 'Brand Design',
    body: 'Brand identity systems that define positioning, visual language, communication, and recall.',
    deliverables: ['Identity', 'Positioning & Strategy', 'Communication and Advertising', 'Experience'],
    projectUrl: 'https://www.behance.net/gallery/249160397/Visual-Design-for-armor',
    process: [
      {
        num: '01',
        title: 'Identity Direction',
        body: 'Brand cues, attitude, and a sharper visual point of view.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/4a0f10249160397.6a01f2613b575.png',
      },
      {
        num: '02',
        title: 'Visual Language',
        body: 'Typography, color, and composition systems built for recall.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/f090a0249160397.6a01f26139525.png',
      },
      {
        num: '03',
        title: 'Campaign Assets',
        body: 'Marketing expressions translated into bold launch-ready visuals.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/b77b4b249160397.6a01f2613a267.png',
      },
      {
        num: '04',
        title: 'System Rollout',
        body: 'A cohesive brand presence extended across channels and touchpoints.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7b6a2a249160397.6a01f2613e286.png',
      },
    ],
  },
  {
    num: '03',
    title: 'UI/UX System',
    body: 'Product UI/UX systems for apps, dashboards, AI workflows, and digital products that need clarity at scale.',
    deliverables: ['UX Research & Strategy', 'Information Architecture & Wireframing', 'Prototype', 'Design System & Dev handoff'],
    projectUrl: 'https://www.behance.net/gallery/225607573/Sailfish-Hyperloop-Commuting-app',
    process: [
      {
        num: '01',
        title: 'UX Research',
        body: 'Commuter pain points, route logic, and use-case priorities mapped early.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/0a2e54225607573.682441f666569.jpg',
      },
      {
        num: '02',
        title: 'Journey Mapping',
        body: 'Information structure and key user flows organized for clarity.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/74531c225607573.682446edb0b9e.png',
      },
      {
        num: '03',
        title: 'Interface System',
        body: 'Visual patterns, screens, and product behaviors aligned into one UI system.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9e5fac225607573.6824426c430b9.png',
      },
      {
        num: '04',
        title: 'Prototype & Handoff',
        body: 'High-fidelity interaction output prepared for testing and development.',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/31f4ef225607573.6824b408a4219.png',
      },
    ],
  },
  {
    num: '04',
    title: 'Motion Design',
    body: 'CGI, product visualization, motion assets, and interaction details for campaigns, launches, and product communication.',
    deliverables: ['2D & 3D Brand & Marketing Assets', 'Social Media Assets', 'Information & Communication', 'Promo Ads'],
    projectUrl: 'https://www.instagram.com/designwithabeer/',
    process: [
      {
        num: '01',
        title: '3D Brand Frames',
        body: 'Objects and scenes shaped into clean motion-ready visual anchors.',
        image: '/motion-process-01.jpg',
        imageFit: 'contain',
      },
      {
        num: '02',
        title: 'Promo Visuals',
        body: 'Product-led motion stills framed for campaigns and social circulation.',
        image: '/motion-process-02.png',
        imageFit: 'contain',
      },
      {
        num: '03',
        title: 'Motion Experiments',
        body: 'Loops and exploratory studies used to test energy, pacing, and feel.',
        image: '/motion-process-03.jpg',
        imageFit: 'contain',
      },
      {
        num: '04',
        title: 'Social-ready Assets',
        body: 'Compositions tuned for attention, communication, and fast digital recall.',
        video: 'https://instagram.fbom3-5.fna.fbcdn.net/o1/v/t2/f2/m367/AQPQYt1LG81yLaa9yTwjX3UHlLzApv7zfE5lgEvtO7V0PPPXilohk4I_SKJZCoW8yJUmMDiyMwdPret4ADgkG99pjubNWbS7L6TdLC8lD7UaPw.mp4?_nc_cat=108&_nc_oc=AdpF07ZUN-z5x47hdAepUiN1b1PQJ0o0JJXN-uAf4dH_1VkRCNyo2iQACEfjRuWA9ro2E6h2oh-EecQWjUdiQFXo&_nc_sid=9ca052&_nc_ht=instagram.fbom3-5.fna.fbcdn.net&_nc_ohc=Obeu7mfaTSsQ7kNvwGfxTQw&efg=eyJ2ZW5jb2RlX3RhZyI6ImlnLXhwdmRzLmNsaXBzLmMyLUMzLmRhc2hfdnA5LWJhc2ljLWdlbjJfMTA4MHAiLCJ2aWRlb19pZCI6bnVsbCwib2lsX3VybGdlbl9hcHBfaWQiOjkzNjYxOTc0MzM5MjQ1OSwiY2xpZW50X25hbWUiOiJpZyIsInhwdl9hc3NldF9pZCI6MTc4OTc0OTg5MDEzOTk4MzksImFzc2V0X2FnZV9kYXlzIjo4MSwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjEyLCJiaXRyYXRlIjoxNDc4NTIyLCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&_nc_gid=Ugccv8Pu0N6lCm1ivPPI2g&_nc_ss=7a22e&_nc_zt=28&oh=00_Af6oQAMeHEeyB5v6QWDh1D6EYLBZt-sioPUZVhiTKvU7yQ&oe=6A0FF3AC',
        poster: 'https://scontent.cdninstagram.com/v/t51.82787-15/640997438_18039487877755376_4011093043104786646_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=RSoG7h2JEVAQ7kNvwGlzCpT&_nc_oc=AdoNNXupO27ZXXXDZn0y2_9JL0X_4_ByrmdpNMZzLohtfgs9EKM2YfZVOVwyh_toNGaekUxfNR_X0QKJUWz1JOhe&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=Qr9zxdgztDWBgHfnF3VcZQ&_nc_ss=7b689&oh=00_Af4JgcqzU1iQQDYy1QklxcK5nMk9b3faLX4vh3KnVIM-FA&oe=6A0FC913',
      },
    ],
  },
]

export function Services() {
  const [active, setActive] = useState<(typeof SERVICES)[number] | null>(null)
  const hasCaseStudyLayout = Boolean(active?.process)

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  return (
    <section id="services" className={styles.services}>
      <div className={styles.header}>
        <div>
          <div className="section-label reveal">Services</div>
          <h2 className="section-title reveal reveal-d1">
            What You Get
          </h2>
        </div>
        <p className="section-body reveal reveal-d2">
          Four focused capabilities for startups and product brands. Each service can stand alone, but the strongest outcomes happen when physical product design, interface design, brand strategy, and launch visuals work as one system.
        </p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <button
            key={service.num}
            className={`${styles.card} reveal`}
            onClick={() => setActive(service)}
            type="button"
            data-service-card
          >
            <span className={styles.num}>{service.num}</span>
            <span className={styles.title}>{service.title}</span>
            <span className={styles.body}>{service.body}</span>
            <span className={styles.openHint}>View scope</span>
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={active.title}>
          <button className={styles.scrim} onClick={() => setActive(null)} aria-label="Close service details" />
          <article className={`${styles.panel} ${hasCaseStudyLayout ? styles.panelWide : ''}`}>
            <button className={styles.close} onClick={() => setActive(null)} aria-label="Close service details">
              ×
            </button>

            {hasCaseStudyLayout && active.process ? (
              <div className={styles.industrialLayout}>
                <div className={styles.industrialIntro}>
                  <span className={styles.panelNum}>{active.num}</span>
                  <h3 className={styles.panelTitle}>{active.title}</h3>
                  <p className={styles.panelBody}>{active.body}</p>
                  <div className={styles.panelDivider} />
                  <div className={styles.scopeTitle}>What you get</div>
                  <ul className={`${styles.scopeList} ${styles.scopeListCompact}`}>
                    {active.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {active.projectUrl && (
                    <a className={`${styles.projectLink} ${styles.projectLinkPill}`} href={active.projectUrl} target="_blank" rel="noreferrer">
                      View project
                    </a>
                  )}
                </div>

                <div className={styles.industrialCardsColumn}>
                  <div className={styles.processHeader}>
                    <div className={styles.scopeTitle}>Process</div>
                  </div>

                  <div className={`${styles.processGrid} ${styles.processGridIndustrial}`}>
                    {active.process.map((step) => (
                      <article key={step.num} className={styles.processCard}>
                        <div className={styles.processMeta}>
                          <span className={styles.processNum}>{step.num}</span>
                          <div>
                            <h4 className={styles.processCardTitle}>{step.title}</h4>
                            <p className={styles.processCardBody}>{step.body}</p>
                          </div>
                        </div>
                        <div className={styles.processImageWrap}>
                          {step.video ? (
                            <video
                              className={styles.processImage}
                              src={step.video}
                              poster={step.poster}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img
                              className={`${styles.processImage} ${step.imageFit === 'contain' ? styles.processImageContain : ''}`}
                              src={step.image}
                              alt={step.title}
                              loading="lazy"
                            />
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <span className={styles.panelNum}>{active.num}</span>
                <h3 className={styles.panelTitle}>{active.title}</h3>
                <p className={styles.panelBody}>{active.body}</p>
                {active.projectUrl && (
                  <a className={styles.projectLink} href={active.projectUrl} target="_blank" rel="noreferrer">
                    View project
                  </a>
                )}
                <div className={styles.panelDivider} />
                <div className={styles.scopeTitle}>What you get</div>
                <ul className={styles.scopeList}>
                  {active.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {active.process && (
                  <>
                    <div className={styles.panelDivider} />
                    <div className={styles.scopeTitle}>Process</div>
                    <div className={styles.processGrid}>
                      {active.process.map((step) => (
                        <article key={step.num} className={styles.processCard}>
                          <div className={styles.processMeta}>
                            <span className={styles.processNum}>{step.num}</span>
                          <div>
                            <h4 className={styles.processCardTitle}>{step.title}</h4>
                            <p className={styles.processCardBody}>{step.body}</p>
                          </div>
                        </div>
                        <div className={styles.processImageWrap}>
                          {step.video ? (
                            <video
                              className={styles.processImage}
                              src={step.video}
                              poster={step.poster}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img
                              className={`${styles.processImage} ${step.imageFit === 'contain' ? styles.processImageContain : ''}`}
                              src={step.image}
                              alt={step.title}
                              loading="lazy"
                            />
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                  </>
                )}
              </>
            )}
          </article>
        </div>
      )}
    </section>
  )
}
