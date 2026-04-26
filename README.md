# Nocturnal — Design Intelligence Studio

Website for Nocturnal, a phygital creative agency specialising in product/industrial design, 3D/CAD, branding, and identity work.

## Stack

- React 18 + TypeScript
- Vite
- CSS Modules + CSS custom properties
- Host Grotesk (Google Fonts)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── components/       One component + CSS module per section
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Disciplines.tsx
│   ├── Process.tsx
│   ├── Clients.tsx
│   ├── Pricing.tsx
│   ├── Faq.tsx
│   ├── Cta.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useReveal.ts       Intersection observer for scroll reveals
│   └── useScrollNav.ts    Nav scroll state
├── styles/
│   ├── tokens.css         CSS custom properties — all design tokens
│   └── global.css         Reset + base styles
├── App.tsx                Assembles all sections
└── main.tsx               Entry point
```

## Design system

All tokens are in `src/styles/tokens.css` as CSS custom properties.

**Palette** — fully monochromatic, no accent colour:

| Token | Value | Role |
|---|---|---|
| `--noc-black` | `#0D0D0D` | Page background |
| `--noc-white` | `#F5F4F0` | Primary text, CTA surfaces |
| `--noc-grey-1` | `#1A1A1A` | Hover surfaces |
| `--noc-grey-2` | `#2A2A2A` | Borders, dividers |
| `--noc-grey-4` | `#666666` | Labels, meta |
| `--noc-grey-5` | `#999999` | Body copy on dark |
| `--noc-grey-6` | `#CCCCCC` | Secondary body |

**Typography:** Host Grotesk — 800 weight headlines, 400 body, 300 italic accent. Zero letter-spacing throughout.
