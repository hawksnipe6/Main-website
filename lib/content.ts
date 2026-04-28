// ─────────────────────────────────────────────
// Nocturnal — Content Layer
// All copy lives here. Edit without touching components.
// ─────────────────────────────────────────────

export const NAV_LINKS = ['Work', 'About', 'Process', 'Pricing', 'FAQ'] as const;
export type NavKey = (typeof NAV_LINKS)[number];

export const hero = {
  title:     'Design that makes your product unforgettable.',
  subtitle:  'Most brands fade. Yours will not.',
  pills:     ['Industrial Design', 'Brand Systems', 'UX + Motion', '3D / CAD'],
  cta:       'Book a Call',
  secondary: 'See the process →',
};

export const stats = [
  { value: '8+',    label: 'Projects shipped' },
  { value: '1.5k+', label: 'Behance views' },
  { value: '3',     label: 'Press features' },
  { value: '4',     label: 'Countries served' },
];

export const featureCards = [
  {
    tag:   'Hardware',
    title: 'Industrial & Product Design',
    desc:  'Form, geometry, materials, and 3D. From concept sketch through production-ready CAD — every surface, every detail, made on purpose.',
  },
  {
    tag:   'Identity',
    title: 'Brand & Identity Systems',
    desc:  'Visual language, type hierarchy, communication logic — designed to hold across every surface and scale without breaking.',
  },
  {
    tag:   'Digital',
    title: 'UX & Digital Products',
    desc:  'Apps, flows, and interactions designed around how people use things. Sailfish, Medwise, and an EV charging ecosystem built here.',
  },
];

export const portfolio = [
  { title: 'Audio 1',       tag: 'Product Design',  note: 'Yanko Design featured' },
  { title: 'Alivio',        tag: 'Product Design',  note: 'Posture + TENS device' },
  { title: 'OSMO VISION 1', tag: '3D / Render',     note: '800+ views' },
  { title: 'Bedizen',       tag: '3D / Render',      note: 'Cranial audio headset' },
  { title: 'Sailfish',      tag: 'UX / App',         note: 'Hyperloop commuting' },
  { title: 'Medwise',       tag: 'UX / App',         note: 'Drug-drug interaction' },
];

export const process = [
  { step: '01', title: 'Discover', desc: 'Bring the brief, the problem, or the rough idea. The first pass is about definition, not decoration.' },
  { step: '02', title: 'Shape',    desc: 'The system gets structured into direction, hierarchy, and options that can be judged.' },
  { step: '03', title: 'Deliver',  desc: 'You get a coherent result — something you can present, build on, and keep evolving.' },
];

export const benefits = [
  { icon: '◉', title: 'Press-validated work',          desc: 'Audio 1 featured on Yanko Design. OSMO VISION 1 and Bedizen have 1,500+ combined views.' },
  { icon: '⊞', title: 'Physical and digital, connected', desc: 'Industrial hardware, brand, and digital UX in one system. Most studios do one or the other.' },
  { icon: '◈', title: 'Specialist positioning',         desc: 'Shipped healthcare devices, mobility apps, and audio hardware — not a generic visual studio.' },
  { icon: '◎', title: 'Direct founder access',          desc: 'Abeer runs the work. No account manager, no junior handoff, no dilution.' },
  { icon: '◷', title: 'Global reach, Mumbai-based',     desc: 'Clients in India, the US, UK, and EU. Remote-first, structured, documented, timezone-friendly.' },
  { icon: '⊛', title: 'Systems, not one-offs',          desc: 'Every deliverable is designed as part of a reusable system that can evolve without starting over.' },
];

export const testimonials = [
  { text: 'Nocturnal did not just design the product — they reframed the problem. We came in with a brief and left with a strategy.', name: 'Sophia M.', role: 'Product Designer' },
  { text: 'The level of craft is unlike anything I have seen from a studio this size. Every detail was considered.',                    name: 'David N.',  role: 'Founder' },
  { text: 'The 3D renders sold the concept to our investors before we had a prototype. Nocturnal turned a brief into something that looked production-ready.', name: 'Aria L.',   role: 'Researcher' },
  { text: 'Abeer works fast and thinks deep. The brief was complicated — the output made it look simple.',                            name: 'James K.',  role: 'Startup Founder' },
];

export type Plan = {
  name: string; monthlyPrice: string; yearlyPrice: string;
  period: string; desc: string; cta: string; popular: boolean; features: string[];
};

export const plans: Plan[] = [
  { name: 'Foundation',     monthlyPrice: '€0',     yearlyPrice: '€0',    period: '/month', desc: 'For early-stage founders who need design thinking and a clear direction before committing to full execution.', cta: 'Book a Call',  popular: false, features: ['Concept exploration', 'Visual direction', 'One defined deliverable'] },
  { name: 'Standard',       monthlyPrice: '€29',    yearlyPrice: '€279',  period: '/month', desc: 'For products and brands ready for complete, execution-grade design work.',                                       cta: 'Book a Call',  popular: true,  features: ['Full identity system', 'UX flows & product visualisation', 'CAD + renders'] },
  { name: 'Studio Partner', monthlyPrice: 'Custom', yearlyPrice: 'Custom', period: '',       desc: 'For founders and teams who need design embedded, not just delivered. Ongoing retainer.',                        cta: 'Contact Us',   popular: false, features: ['Monthly scope', 'Direct access', 'Consistent output'] },
];

export const faqs = [
  { q: 'What kind of work does Nocturnal take on?',         a: 'Product design, industrial design, brand identity, UX and app design, 3D visualisation, and phygital systems. If the brief spans physical and digital, that is where we work best.' },
  { q: 'Do I need technical knowledge to work with you?',   a: 'No. Bring the problem. One conversation maps the scope, the timeline, and what success looks like.' },
  { q: 'Which projects has Nocturnal shipped?',             a: 'Audio 1 (Yanko Design featured), Alivio, OSMO VISION 1, Bedizen, Sailfish, Medwise, and an EV charging ecosystem.' },
  { q: 'Is there a free engagement available?',             a: 'The first conversation costs nothing. Bring a brief, a problem, or a vague idea.' },
  { q: 'Can I use Nocturnal for business projects?',        a: 'Yes. We work with founders, product teams, and brand managers globally — India, US, UK, and EU.' },
  { q: 'How can I get started?',                            a: 'Book a call. The first conversation is free and scoped to your specific problem.' },
];
