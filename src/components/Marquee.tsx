import styles from './Marquee.module.css'

const ITEMS = [
  {
    title: 'Audio 1',
    href: 'https://www.behance.net/gallery/190090001/Audio-1',
    image: '/carousel-05.jpg',
  },
  {
    title: 'OSMO VISION 1',
    href: 'https://www.behance.net/gallery/192907129/OSMO-VISION-1',
    image: '/carousel-08.jpg',
  },
  {
    title: 'Visual Design for armor',
    href: 'https://www.behance.net/gallery/249160397/Visual-Design-for-armor',
    image: '/carousel-03.jpg',
  },
  {
    title: 'Bedizen',
    href: 'https://www.behance.net/gallery/190092645/Bedizen-Cranial-Audio-Headset',
    image: '/carousel-12.jpg',
  },
  {
    title: 'Alivio',
    href: 'https://www.behance.net/gallery/227654211/Alivio-Posture-Corrector-and-TENS-Device',
    image: '/carousel-15.jpg',
  },
  {
    title: 'Motion sample',
    href: 'https://www.instagram.com/p/DNrwFQgUkcR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    image: '/work-sample-instagram-05.jpg',
    framed: true,
  },
  {
    title: 'EV Charging ecosystem',
    href: 'https://www.behance.net/gallery/229720139/EV-Charging-ecosystem-System-Design',
    image: '/carousel-16.jpg',
  },
  {
    title: 'Ice Tray',
    href: 'https://www.behance.net/gallery/210538601/Ice-Tray-Universal-Design',
    image: '/carousel-14.jpg',
  },
  {
    title: 'Audio 1 Process',
    href: 'https://www.behance.net/gallery/190090001/Audio-1',
    image: '/carousel-07.jpg',
  },
  {
    title: 'OSMO Prototype',
    href: 'https://www.behance.net/gallery/192907129/OSMO-VISION-1',
    image: '/carousel-11.jpg',
  },
  {
    title: 'Alivio Research',
    href: 'https://www.behance.net/gallery/227654211/Alivio-Posture-Corrector-and-TENS-Device',
    image: '/carousel-04.jpg',
  },
  {
    title: 'Bedizen Interface',
    href: 'https://www.behance.net/gallery/190092645/Bedizen-Cranial-Audio-Headset',
    image: '/carousel-13.jpg',
  },
  {
    title: 'Motion still',
    href: 'https://www.instagram.com/designwithabeer/',
    image: '/carousel-01.jpg',
  },
  {
    title: 'EV Charging Map',
    href: 'https://www.behance.net/gallery/229720139/EV-Charging-ecosystem-System-Design',
    image: '/carousel-17.jpg',
  },
  {
    title: 'OSMO Ideation',
    href: 'https://www.behance.net/gallery/192907129/OSMO-VISION-1',
    image: '/carousel-09.jpg',
  },
  {
    title: 'Audio 1 Braun Study',
    href: 'https://www.behance.net/gallery/190090001/Audio-1',
    image: '/carousel-06.jpg',
  },
  {
    title: 'OSMO Form Exploration',
    href: 'https://www.behance.net/gallery/192907129/OSMO-VISION-1',
    image: '/carousel-10.jpg',
  },
]

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <section className={styles.wrapper} aria-label="Work sample carousel">
      <div className={styles.header}>
        <span className={styles.title}>Work sample</span>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {doubled.map((item, i) => (
            <a
              key={`${item.title}-${i}`}
              className={styles.card}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${item.title}`}
            >
              <img
                className={item.framed ? `${styles.image} ${styles.imageFramed}` : styles.image}
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
