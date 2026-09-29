# SEO implementation notes

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
