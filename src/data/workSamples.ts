export type WorkSample = {
  slug: string
  title: string
  category: string
  description: string
  href: string
  image: string
}

export const WORK_SAMPLES: WorkSample[] = [
  {
    slug: 'martand',
    title: 'Martand',
    category: 'Motion and animation',
    description:
      'A scroll-driven animation study in form, light, and rhythm, rendered frame by frame for frame-perfect motion.',
    href: '',
    image: '/work-cover-martand.jpg',
  },
  {
    slug: 'alivio',
    title: 'Alivio - Posture Corrector and TENS Device',
    category: 'Medical product design',
    description:
      'A posture and TENS device concept shaped through body research, form exploration, engineering logic, and prototype validation.',
    href: 'https://www.behance.net/gallery/227654211/Alivio-Posture-Corrector-and-TENS-Device',
    image: '/work-cover-alivio.png',
  },
  {
    slug: 'audio-1',
    title: 'Audio 1',
    category: 'Industrial design and interface detailing',
    description:
      'A home-audio concept influenced by restrained consumer electronics, with attention to interface hierarchy, CMF, and product presence.',
    href: 'https://www.behance.net/gallery/190090001/Audio-1',
    image: '/work-cover-audio-1.png',
  },
  {
    slug: 'renderfolio',
    title: 'renderfolio.',
    category: '3D visualisation and render studies',
    description:
      'A compact collection of rendered product studies focused on material behaviour, lighting control, and object storytelling.',
    href: 'https://www.behance.net/gallery/235226069/renderfolio',
    image: '/work-cover-renderfolio-custom.png',
  },
  {
    slug: 'armor',
    title: 'Visual Design for armor',
    category: 'Brand visuals and campaign systems',
    description:
      'A visual design system for Armor that turns product features into crisp campaign assets, launch moments, and social-first compositions.',
    href: 'https://www.behance.net/gallery/249160397/Visual-Design-for-armor',
    image: '/work-cover-armor-custom.png',
  },
  {
    slug: 'osmo',
    title: 'OSMO VISION 1',
    category: 'Ideation, prototyping, and product development',
    description:
      'A binocular design study that moves from early sketches into foam models, prototype logic, and ergonomic refinement.',
    href: 'https://www.behance.net/gallery/192907129/OSMO-VISION-1',
    image: '/work-cover-osmo.jpg',
  },
  {
    slug: 'bedizen',
    title: 'Bedizen - Cranial Audio Headset',
    category: 'Wearable product and UI system',
    description:
      'A cranial audio headset explored as both physical object and connected digital system, pairing device form with tuning controls.',
    href: 'https://www.behance.net/gallery/190092645/Bedizen-Cranial-Audio-Headset',
    image: '/work-cover-bedizen.png',
  },
  {
    slug: 'ice-tray',
    title: 'Ice Tray - Universal Design',
    category: 'Everyday product and usability study',
    description:
      'A universal-design exercise around a simple kitchen object, improving grip, sequence, clarity, and use for different bodies.',
    href: 'https://www.behance.net/gallery/210538601/Ice-Tray-Universal-Design',
    image: '/work-cover-ice-tray-custom.png',
  },
  {
    slug: 'sailfish',
    title: 'Sailfish - Hyperloop Commuting app',
    category: 'Mobility product interface',
    description:
      'A commuting app concept for a future mobility system, focused on route clarity, information hierarchy, and calm trip planning.',
    href: 'https://www.behance.net/gallery/225607573/Sailfish-Hyperloop-Commuting-app',
    image: '/work-cover-sailfish.png',
  },
  {
    slug: 'medwise',
    title: 'Medwise - Drug-Drug Interaction App',
    category: 'Healthcare interface and decision support',
    description:
      'A healthcare app concept that simplifies medication interaction checks through accessible flows and clear warning hierarchy.',
    href: 'https://www.behance.net/gallery/214356855/Medwise-Drug-Drug-Interaction-App',
    image: '/work-cover-medwise.png',
  },
  {
    slug: 'palan',
    title: 'Palan - Packaging Design',
    category: 'Packaging and visual communication',
    description:
      'A packaging design project shaped around shelf presence, hierarchy, material impression, and distinct brand recall.',
    href: 'https://www.behance.net/gallery/210581509/Palan-Packaging-Design',
    image: '/work-cover-palan.png',
  },
  {
    slug: 'ev-charging',
    title: 'EV Charging ecosystem | System Design',
    category: 'Mobility service and system design',
    description:
      'A systems study mapping the behavioural, infrastructural, and decision-making friction around EV charging ecosystems.',
    href: 'https://www.behance.net/gallery/229720139/EV-Charging-ecosystem-System-Design',
    image: '/work-cover-ev-charging.jpg',
  },
]

export const FEATURED_WORK_SAMPLES = WORK_SAMPLES.slice(0, 7)
