# SEO implementation notes

Implemented on 2026-05-26.

## What changed

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

## Still recommended

This is a strong technical SEO baseline, but the site is still a single-page app. For stronger organic ranking, add dedicated indexable service pages later:

- `/industrial-design`
- `/ui-ux-design`
- `/cgi-motion`
- `/brand-systems`
- `/ai-product-design`
- `/startup-design-partner`

Each page should include 600–1,000 words of specific service copy, project proof, process, FAQs, and internal links.
