# Nocturnal — Web (Next.js)

Phygital design studio landing page. Built with **Next.js 14 App Router**, deployable to **Vercel free tier** in under 2 minutes.

Designed and developed by [Abeer Mahadane](https://www.behance.net/abeermahad064c).

---

## Deploy to Vercel (free)

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
cd nocturnal-web
npm install
vercel
```

Follow the prompts. Done.

### Option B — GitHub → Vercel UI

1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

No environment variables needed.

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | CSS Modules + global CSS variables |
| Font | DM Mono via Google Fonts |
| Animation | CSS keyframes + IntersectionObserver |
| Images | Unsplash (remote, configured in next.config.js) |
| Deployment | Vercel (free tier) |

---

## Project Structure

```
nocturnal-web/
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design tokens, resets, animations
│
├── components/
│   ├── NavBar.tsx / .module.css
│   ├── HeroSection.tsx / .module.css
│   ├── PortfolioSection.tsx / .module.css
│   ├── MidSections.tsx / .module.css   (Intro + Process + Benefits)
│   ├── TestimonialsSection.tsx / .module.css
│   ├── PricingSection.tsx / .module.css
│   ├── FAQSection.tsx / .module.css
│   └── CTAAndFooter.tsx / .module.css
│
├── lib/
│   ├── content.ts          # All copy — edit here, no component changes needed
│   └── useReveal.ts        # Scroll reveal hook
│
├── next.config.js
├── vercel.json
└── tsconfig.json
```

---

## Design System

All tokens live in `app/globals.css` as CSS custom properties:

```css
--black:        #0B0B0B   /* base surface */
--white:        #F5F4F0   /* warm off-white — never pure #FFF */
--grey1:        #A8A8A0   /* secondary body */
--grey2:        #6A6A64   /* meta / captions */
--black-border: #1E1E1E   /* all borders */
```

Fully monochromatic. No accent colour. Hierarchy through scale, weight, and space.

---

## Editing Copy

All text lives in `lib/content.ts`. Update that file to change any section — hero, stats, portfolio, process, testimonials, pricing, FAQ. No component code needs touching.

---

## SEO

Metadata configured in `app/layout.tsx`:
- Title, description, keywords
- Open Graph tags
- Twitter card
- Robots: index + follow

---

## Performance Notes

- All animations are CSS-only or use `IntersectionObserver` — no JS animation libraries
- No client-side data fetching
- Images served via Unsplash CDN with Next.js image optimisation config
- Google Fonts loaded via `@import` in globals.css (swap to `next/font` for zero CLS if needed)
