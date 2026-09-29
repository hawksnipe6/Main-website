# SEO implementation notes

## 2026-09-29 — Image/performance pass (`seo-pass` branch)

Checked the framework's Layer 3 (Performance) items against the *current*
code rather than the stale earlier audit, which had flagged several multi-MB
cover images (`armor-custom.png` at 8.7MB, `ice-tray-custom.png` at 1MB) —
those turned out to already be optimized `.webp` files under 225KB on `main`
(a prior, separate optimization pass had already handled them). So this pass
is narrower than the original plan step: three real, verified issues fixed,
not a full re-audit of every image.

### What changed
- **Cut the `/work` page's initial JS from 521KB to 2.3KB.** `GridDistortion`
  (the hover-distortion effect on project cards) statically imported `three`
  at the top of `ProjectsGrid.tsx`, so the *entire* three.js library loaded
  for every `/work` visit regardless of whether anyone ever hovered a card.
  It's now `lazy()`-loaded with the existing plain `<img>` as the `Suspense`
  fallback — same effect, same trigger (hover), just not paid for upfront.
  Confirmed via the build output: `GridDistortion` is now its own 520KB chunk,
  separate from `ProjectsGrid`'s 2.3KB, fetched only on first hover.
- **Host Grotesk italic-500 was used but never loaded.** The only italic text
  on the site (`WorkPage.module.css`'s insight quote) is weight 500, but the
  Google Fonts request only included italic 300/400 — neither used anywhere —
  so the browser was faking a slant on the upright 500 glyphs instead of
  rendering the real italic design. Swapped `1,300;1,400` for `1,500` in the
  font URL: fewer unused font files downloaded, and the actually-used italic
  now renders correctly. (Verified: Google Fonts serves a real, distinct
  italic-500 `@font-face`, not a fallback.) The six upright weights (300–800)
  are all genuinely used at least once each — none were trimmed.
- **Layout shift**: the Martand case-study's four pen-lounge detail photos
  had no reserved space (`.galleryItem` has no CSS height/aspect-ratio, and
  each image's own aspect ratio differs — 4:3, 3:4, 4:5 — so a uniform
  CSS `aspect-ratio` would've cropped them differently than today).  Added
  each image's real natural `width`/`height` as HTML attributes instead —
  the standard, non-visual-changing fix: the browser reserves the correct
  per-image space before it loads, CSS still controls the actual rendered
  size exactly as before.

### Not changed (checked, found already correct)
Every other image container audited (`WorkPage`'s cards/hero/boards,
`ProjectsGrid`'s cards, `Testimonials`' logos, Martand's mobile chapter
images/device video) already has either a CSS `aspect-ratio` or a fixed
pixel/viewport size — genuinely no CLS risk, not touched. `loading`/
`decoding` attributes were already present on every image except the
LCP image (already `eager`, correctly). `WorkPreview.tsx` is dead code
(confirmed unused anywhere in the app) — left alone rather than half-fixed.

### Verified
`npm run build` clean, `node scripts/verify-build.mjs` passes (0 issues,
24/24 unique titles/canonicals), chunk sizes confirmed in the build output.

### Still open (Layer 3, not attempted)
Core Web Vitals / Lighthouse numbers need a live or preview URL to measure —
can't be done from local tooling. The oversized `renders/` gallery (39 files,
3.6MB total, a couple at ~1MB) and the `work/<slug>/` process-board galleries
(several near 1-1.8MB per image) are lazy-loaded and below the fold, so they
don't block LCP, but haven't been individually re-compressed this pass.

---

## 2026-09-29 — SSR pass (`seo-pass` branch, same day as the foundation pass)

The deferred item from the foundation pass below: real page content is now
in the served HTML, not just metadata. Every prerendered route was previously
just `<div id="root"></div>` plus correct `<title>`/meta tags; a crawler that
doesn't execute JavaScript (or a search engine's first, non-rendering pass)
saw none of the actual page copy. It now sees everything a browser does.

### What changed
- **Split the client entry.** `src/main.tsx` → `src/entry-client.tsx`. It
  checks whether `#root` already has children (i.e., whether this page was
  prerendered) and calls `hydrateRoot` if so, `createRoot` otherwise — the
  same file now correctly handles both a prerendered production page and an
  empty `#root` in `vite dev` (unchanged dev experience, confirmed).
- **New `src/entry-server.tsx`** exports `render(path)`, calling React's
  `renderToString` against the exact same `<App>` tree the client uses.
- **`App.tsx`** now accepts `initialPath` (server has no `window.location`)
  and `initialLoading` (server always renders without the boot animation —
  see below) props, both optional so the client's own behavior is unchanged
  when it doesn't pass them.
- **Route components stay code-split on the client.** `renderToString` can't
  wait on `React.lazy`/`Suspense`, so the eight route components
  (ProjectsGrid, WorkPage, ContactPage, etc.) are still `lazy()`-loaded in
  `App.tsx` for the browser bundle exactly as before, but the server passes
  in eagerly-imported equivalents (`src/routes.server.ts`) via a
  `routeComponents` prop. This file is never imported by the client entry, so
  it has zero effect on client bundle size/code-splitting — verified: the
  client build's chunk sizes are unchanged from the foundation-pass build.
- **Build pipeline**: `npm run build` now also runs
  `vite build --ssr src/entry-server.tsx --outDir dist/server`, and
  `scripts/prerender.mjs` imports that compiled bundle and calls `render(path)`
  per route, injecting the result into `<div id="root">`. The old per-route
  `<noscript>` fallback (a second, hand-written copy of the same information)
  is removed — it's now genuinely redundant, and keeping it would have shown
  visitors with JavaScript disabled the content twice.
- **The loading-screen boot animation no longer plays on a prerendered page
  load.** Previously every fresh page load — home or otherwise — spent
  ~1.8s under the ripple-canvas loading screen before content appeared. Now
  that prerendered pages arrive with real content already visible, replaying
  that animation over content that's already on screen would be a pure
  regression (covers real content, delays nothing except perceived speed).
  It still plays exactly as before in `vite dev` and for any non-prerendered
  load. No hydration mismatch: the client computes whether to skip it from
  the same DOM check (`#root` already has children) that determined the
  server's output, so the two can't disagree. **Flagging this explicitly
  since it's a visible, deliberate brand moment being skipped on the routes
  that matter most (home, work) for real first-time visitors landing from
  search — say if you'd rather keep it on for genuine cold loads and I'll
  gate it more narrowly.**

### Three real render-time bugs this surfaced and fixed
Not hypothetical — the server literally crashed rendering these until fixed:
1. `FaultyTerminal.tsx` (the WebGL contact-page background) read
   `window.devicePixelRatio` in a default *parameter* expression, which
   JavaScript evaluates on every call, not lazily — crashed every server
   render of `/contact`. Guarded with a `typeof window` check.
2. `MartandCaseStudy.tsx` decided desktop-vs-mobile from a **module-level**
   `window.matchMedia(...)` constant evaluated once at import time. On the
   server this is always `false` (desktop); on a real mobile browser it's
   `true` — a guaranteed hydration mismatch on `/work/martand` for any mobile
   visitor. Converted to component state that starts `false` (matching SSR)
   and corrects itself via `useLayoutEffect` before paint, so mobile visitors
   still get the fast mobile version, without a mismatch.
3. `ThemeToggle.tsx`'s initial state deliberately reads the *real* theme
   (already applied by the pre-paint script) so returning dark-mode visitors
   don't see a flash to light — which by design differs from what the server
   (no `document`, no `localStorage`) can know. This is the textbook
   client/server-legitimately-differs case; used React's own
   `suppressHydrationWarning` rather than fighting the pre-paint script.
4. (Not a bug, a pre-existing one fixed in passing.) `WorkPage.tsx`'s hero
   image used `fetchPriority="high"` — the camelCase form React 19 recognizes,
   but this project is on React 18.3, which doesn't, and was silently
   dropping the LCP hint. Switched to the lowercase attribute form, which
   React 18.3 does pass through.

### Verified (not just "should work")
- `npm run build` (fresh, `rm -rf dist` first) passes clean: `tsc`, client
  build, SSR build, prerender — no warnings, no errors.
- **`scripts/verify-build.mjs`** (new — a permanent post-build check, not a
  one-off): walks every `dist/**/index.html`, confirms unique title +
  canonical per route (24/24), every JSON-LD block parses, and every
  React-rendered route has real content — exactly one `<h1>` — inside
  `#root`, not an empty shell. Run it after any future build:
  `node scripts/verify-build.mjs` (exits non-zero on any issue).
- Directly invoked `render(path)` from the compiled SSR bundle for all 20
  routes (every static page, all 12 `/work/<slug>` pages, `/nope`) — zero
  crashes, zero React "swallowed error" markers, exactly one `<h1>` each.
- `vite preview` (serving the real `dist/` output) confirms actual page copy
  is present in the raw HTML — e.g. `/work/armor/` (with trailing slash,
  which is what `vite preview` correctly resolves to the nested file)
  contains "Visual Design for armor" and "campaign assets" 17/6 times
  respectively, not just in a title tag.
- `vite dev` still serves an empty `#root` + `entry-client.tsx`, confirming
  the dev experience (and the `createRoot` fallback path) is unchanged.
- Home page content (`A strategic design team`) confirmed present in
  `dist/index.html`'s raw HTML via `vite preview`.

### Still not verified (needs a real deploy, not local tooling)
Same item as the foundation pass, now higher-stakes since there's real
content to lose if it's wrong: `vite preview`'s bare-path routing quirk
(`/work/armor` without a trailing slash falls back to the SPA/home page
locally) can't confirm whether `vercel.json`'s explicit rewrites correctly
serve `dist/work/armor/index.html` for the bare path on actual Vercel
infrastructure. This was already mitigated by making the rewrites explicit
rather than relying on assumed platform behavior — still needs a preview
deploy to confirm before merging.

### Files changed (this pass, in addition to the foundation pass)
New: `src/entry-client.tsx`, `src/entry-server.tsx`, `src/routes.server.ts`,
`scripts/verify-build.mjs`.
Deleted: `src/main.tsx` (replaced by `entry-client.tsx`).
Modified: `src/App.tsx`, `index.html` (script tag), `package.json` (build
script), `scripts/prerender.mjs`, `src/components/FaultyTerminal.tsx`,
`src/components/MartandCaseStudy.tsx`, `src/components/ThemeToggle.tsx`,
`src/components/WorkPage.tsx`.

---

## 2026-09-29 — Foundation pass (`seo-pass` branch)

Applied against `origin/main` @ `2461e09` (2026-09-27), which had drifted from an
earlier local checkout — the audit below reflects the site as it actually is now
(per-project `/work/<slug>` routes, `/privacy`, `/terms`, `/thank-you`; `/concepts`
and `/pricing` removed). Scope was deliberately split in two: this pass covers
Foundation, Structured Data, and crawlable-link/heading fixes. **Full SSR
pre-rendering of real page content into the served HTML (so non-JS crawlers see
actual copy, not just metadata) was scoped but not attempted this pass** — it's
the single highest-risk, highest-regression change in the plan (touches every
WebGL/canvas/video component, the build pipeline, and hydration), and the user
asked to sequence it as a separate follow-up after this lower-risk pass lands and
gets reviewed. That decision is recorded so it isn't mistaken for an oversight.

### What changed

**Foundation**
- **Single source of truth for all SEO data** (`src/seo/meta.ts`): titles,
  descriptions, canonicals, OG/Twitter data, and the structured-data graph, used
  by both `Seo.tsx` (client-side nav) and `scripts/prerender.mjs` (build-time).
  Previously these were hand-duplicated in three places and had already drifted
  (different `/work` titles in `Seo.tsx` vs. `prerender.mjs`; `/concepts` and
  `/pricing` routes still listed in `Seo.tsx` after those pages were removed).
- **Deduplicated JSON-LD.** `index.html` previously emitted Organization/
  ProfessionalService/WebSite/Person as four separate top-level objects, then
  `Seo.tsx` injected Organization/ProfessionalService/WebSite *again* on every
  route. Now there's one `@graph` in `index.html`, and `Seo.tsx` no longer
  re-injects it.
- **Removed unsupported schema claims:** `priceRange: "$$"` (the pricing page no
  longer exists) and the unused `<link rel="image_src">`.
- **Soft-404 → real 404.** Every unindexable URL previously returned HTTP 200
  with home-page content. `vercel.json` no longer has a catch-all rewrite;
  Vercel's own `404.html` handling now applies to anything that isn't an actual
  route. *(The rewrite/redirect behavior in `vercel.json` — clean-URL → nested
  `index.html` resolution, `/work/` → `/work` — could only be verified against
  `vite preview`, which doesn't read `vercel.json` at all and gave a false
  negative for bare paths. See "Not yet verified" below.)*
- **`robots.txt`**: removed `Disallow: /thank-you` (was using robots.txt as a
  substitute for noindex, against the framework's own rule). `/thank-you` is now
  crawlable but `noindex` via both its meta tag and an `X-Robots-Tag` header
  scoped to just that path — the old blanket `X-Robots-Tag: index, follow` on
  every path is gone.
- **Sitemap** now lists only real, currently-indexable URLs (added the 12
  `/work/<slug>` pages and the 4 concept pages, which were both missing), and no
  longer fabricates `<lastmod>`/`<changefreq>`/`<priority>` — Google doesn't use
  the latter two as ranking input, and the `lastmod` was always just "today",
  not a real modification date.
- **apple-touch-icon.png** regenerated at the size it already claimed (180×180 —
  it was actually 96×96 on disk). Added a 48×48 PNG favicon alongside the SVG.
- **OG image**: added `public/og/default.png` and `public/og/work.png`
  (1200×630, generated from the existing brand mark, not stock/placeholder
  art) plus `og:image:width/height/alt` — previously almost every page shared
  one small square logo with no dimensions.

**Structured data**
- FAQPage schema is now generated directly from the same `FAQS` array
  `Faq.tsx` renders (`src/data/faqs.ts`) — previously the schema had 3 questions
  with reworded text that didn't match the 5 visible questions/answers.
  Guaranteed to match going forward since they're the same source.
- `/work/<slug>` pages now get `CreativeWork` + `BreadcrumbList` schema (none
  existed before).
- `/work`'s `CollectionPage` schema now points `hasPart` at the internal
  `/work/<slug>` URLs instead of external Behance links (one, Martand, had no
  URL at all since it doesn't have a Behance page).
- Concept pages (see below) got their first schema: `BreadcrumbList` +
  `CreativeWork`, matching the same shape.

**Crawlable links & headings**
- `/work` (grid) and `/renders` had **zero headings** — the only `<h1>` in each
  component was gated behind an `embedded` prop that's always `true` on the
  live routes. Added a visually-hidden `<h1>` to each (no visual change).
- `/contact` had **zero headings** — fixed by promoting the intake form's
  existing `<h2>Tell us what you are making.</h2>` to `<h1>` (no visual
  change, same CSS class).
- Martand's desktop view (the majority of `/work/martand` visitors) had zero
  `<h1>` — only `<h2>` chapter headings. The first chapter heading ("Khandoba
  Pen") is now `<h1>`.
- Tollgate's standalone prototype had **three** `<h1>` (one per onboarding
  step, all present in the DOM at once). Kept the first, demoted the other two
  to `<h2>` — same class, so no visual change.
- Converted `<button onClick>` internal navigation to real `<a href>` (crawlers
  only follow `<a href>`, not `onClick` handlers): the `/work` grid cards, the
  404 page's "Back to home"/"See the work"/quick-links, and Nav's two
  "Start a Project" CTAs. Footer's `Contact`/`Privacy Policy`/`Terms of
  Service` links were already real anchors visually but were `<button>`
  elements — converted to `<a>` with the same click handler.
- Fixed Footer's `#services`/`#testimonials`/`#hero` links, which were
  relative fragments — they resolved to e.g. `/contact#services` (a
  non-existent target) on any non-home route. Now `/#services` etc.

**Orphan pages**
- The four standalone concept prototypes (`/densly`, `/tollgate`, `/voca`,
  `/firstweeks`) were live, crawlable (HTTP 200), but had bare one-word
  `<title>` tags, no description/canonical/OG, and — after the Concepts tab
  was removed from the app — **no internal link to them from anywhere on the
  site**. Gave each real metadata + schema, added them to the sitemap, and
  added a small "Independent concepts" links row under the `/work` grid so
  they're reachable again.

### Explicitly not done (by design, not oversight)
- **No fabricated content.** No new testimonials, stats, FAQs, credentials, or
  reviews were added. The founder's full name/title appear in schema (as they
  already did, pre-existing) but not yet visibly on the page — flagged as a
  real, minor gap below, not fixed, since adding visible copy wasn't asked for.
- **No keyword stuffing or forced word count.** Titles/descriptions were
  tightened, not padded.
- **No redesign.** Every change above was verified to be either invisible
  (schema, meta tags, semantic-only tag swaps on identically-styled elements)
  or a small, additive element (the sr-only headings, the concepts link row)
  consistent with the existing visual language.

### Not yet verified
- **`vercel.json`'s rewrite/redirect behavior needs a real Vercel preview
  deploy.** `vite preview` (the only thing runnable in this session) doesn't
  read `vercel.json` — it has its own SPA fallback that gave a false negative
  for bare-path nested routes (`/work/armor` without a trailing slash served
  the wrong page locally, while `/work/armor/` with the slash worked). To stay
  safe rather than rely on an unverified assumption about Vercel's implicit
  clean-URL resolution, `vercel.json` now has **explicit** rewrites mapping
  every clean route to its physical `index.html`. This should be correct, but
  needs confirming on an actual preview deploy before merging: `curl -I /nope`
  → 404, `/work/`→308→`/work`, `/work/armor` (no slash) serves the armor page,
  `/thank-you` carries the noindex header.
- No Lighthouse/Core Web Vitals or Rich Results Test run this pass (needs a
  live/preview URL).

### Files changed
New: `src/seo/meta.ts`, `src/data/faqs.ts`, `public/og/default.png`,
`public/og/work.png`, `public/favicon-48.png`.
Rewritten: `scripts/prerender.mjs`, `src/components/Seo.tsx`, `vercel.json`,
`public/robots.txt`.
Modified: `index.html`, `src/components/Faq.tsx`, `src/components/Footer.tsx`,
`src/components/Nav.tsx`, `src/components/NotFoundPage.tsx`,
`src/components/ProjectsGrid.tsx` (+ `.module.css`),
`src/components/RenderGallery.tsx`, `src/components/ProjectIntake.tsx`,
`src/components/MartandCaseStudy.tsx`, `src/styles/global.css` (added a
`.sr-only` utility), `public/{densly,tollgate,voca,firstweeks}/index.html`,
`public/apple-touch-icon.png` (regenerated).

### Health score (0–100, this pass only — not inflated; layers not touched score low on purpose)

| Sub-score | Score | Why |
|---|---|---|
| Technical SEO | 75 | Soft-404/dup-schema/dup-metadata fixed; live content-in-HTML still pending (next pass) |
| Crawlability | 72 | Main nav paths now real `<a href>`; Services-modal/Scheduler internal links not audited this pass |
| Indexability | 82 | noindex correct, sitemap accurate, no robots.txt misuse |
| Metadata | 90 | Verified programmatically: 24/24 routes have unique title/description/canonical |
| On-page SEO | 50 | Headings fixed; keyword/content-depth work (framework Layer 4) not attempted |
| Heading structure | 88 | Verified: every route has exactly one reachable `<h1>`, no skipped levels introduced |
| Structured data | 80 | Deduped, FAQ now matches visible text exactly, breadcrumbs added; still light on Product/Service-level detail |
| Image SEO | 35 | Not touched this pass — no width/height/srcset audit, large uncompressed case-study boards remain |
| Internal linking | 62 | Orphan concept pages relinked; broader internal-linking audit (Phase 18) not done |
| URL architecture | 80 | Trailing-slash dedup, clean explicit routing |
| Content quality | 45 | No content work this pass |
| Search intent | 45 | No content work this pass |
| E-E-A-T | 40 | Schema is honest/deduped but thin; founder not visibly named on-page |
| Topical authority | 20 | Not assessed this pass |
| Performance | 30 | Not touched — 521KB ProjectsGrid chunk (three.js), unoptimized case-study images, LoadingScreen delay all still open |
| Core Web Vitals | n/a | Not measured — needs a live URL |
| Mobile SEO | n/a | Not measured this pass |
| Accessibility | 65 | sr-only headings and real links help; no full audit |
| AEO readiness | 55 | FAQ schema integrity fixed; no new Q&A/entity content |
| Competitive coverage | 0 | Not attempted this pass (Layer 6, needs external research) |

**Overall: ~58/100** — a real jump in technical correctness (deduplication,
real headings, real 404s, accurate sitemap/schema), with performance, content,
and competitive work still ahead, plus the SSR pass still to come.

### Recommended next steps
1. Deploy this branch to a Vercel preview and run the "Not yet verified" checks
   above before merging.
2. The deferred SSR pass: pre-render real page content (not just metadata) into
   the served HTML for non-JS crawlers and AI answer engines.
3. Image optimization pass: width/height or `aspect-ratio` + `srcset` on
   case-study images (several are 1–1.7MB), and reconsider `armor-custom.png`
   /`ice-tray-custom.png` (8.7MB / 1MB) if they're still referenced anywhere.
4. Performance: code-split the `three.js`-dependent `GridDistortion` out of the
   521KB `ProjectsGrid` chunk; measure whether the ~1.8s `LoadingScreen` delays
   LCP.
5. Content: the six service-page ideas from the previous pass (below) are
   still open, now updated for the current sitemap.

---

## 2026-05-26 — Original pass

- Rewrote the default homepage title and meta description for search intent around industrial design, UI/UX, CGI, motion, and brand systems.
- Added canonical URLs, robots meta, Open Graph tags, and Twitter preview tags.
- Added a React SEO component that updates metadata for `/` and `/work`.
- Added structured data for Organization, ProfessionalService, FAQPage, and the work portfolio collection.
- Reworked the homepage H1 from abstract positioning into an indexable service statement.
- Rewrote service copy to include clear commercial keywords without changing the visual system.
- Improved work page H1 and image alt text.
- Rebuilt sitemap.xml to include real crawlable URLs only: `/` and `/work`.
- Added `vercel.json` rewrites so `/work` resolves correctly in a Vite SPA deployment.
- Added a no-JavaScript fallback with a crawlable H1 and description.

### Still recommended

This is a strong technical SEO baseline, but the site is still a single-page app. For stronger organic ranking, add dedicated indexable service pages later:

- `/industrial-design`
- `/ui-ux-design`
- `/cgi-motion`
- `/brand-systems`
- `/ai-product-design`
- `/startup-design-partner`

Each page should include 600–1,000 words of specific service copy, project proof, process, FAQs, and internal links.
