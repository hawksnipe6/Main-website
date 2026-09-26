# NOCTURNAL — Silent Explainer Video

## v2 (current) — `explainer-v2.html` / `nocturnal-explainer-v2.mp4`

A ~57s, voiceover-free "real-world product" explainer: real screenshots of
the live site, real portfolio covers, real logo mark — no invented UI, no
placeholder art. Built against a precise motion-design brief (solid
iOS-widget cards, spring/draw easing curves, word-by-word headlines,
whip-pan scene transitions, continuous camera push) using the
`motion-design` skill (`.claude/skills/motion-design/`) for the animation
theory and the site's own real assets for the content.

The brief named a specific YouTube reference video for style; that link
could not be opened in this environment (YouTube is network-blocked here),
so the piece follows the brief's own written motion spec directly instead
of visually copying the reference.

### Visual system (from the brief)

- **Surfaces**: solid filled cards, never translucent/glassy.
  - White scenes: `#FFFFFF` fill, `shadow: 0 20px 44px rgba(17,17,17,.10), 0 3px 10px rgba(17,17,17,.07)`
  - Dark scenes: fill lifted ~11% toward white from the background, `shadow: 0 26px 60px rgba(0,0,0,.62), 0 4px 14px rgba(0,0,0,.45)`
  - Radius: 30px cards, 999px pills
  - Emphasis via a 5px rounded accent-rail inset on a card/row's left edge — never colour text
  - One dominant idea per frame, generous whitespace, minimal line icons
- **Easing**: `--ease-spring: cubic-bezier(0.34,1.56,0.64,1)` for entrances/exits and UI
  morphs (pill → card); `--ease-draw: cubic-bezier(0.16,1,0.3,1)` for the whip-pan
  bridge, path draws, and colour turns
- **Stagger**: 60–100ms between sibling elements; headlines word-by-word at
  70–80ms/word; exits mirror entrances but drop further and resolve faster (~240ms)
- **Scene transitions**: never a hard cut. Each cut is an ~180ms bridge —
  blur 0→8px + brightness 1→1.15 peaking at the midpoint, paired with a fast
  ~96px same-direction slide on outgoing/incoming content (reads as a
  whip-pan). Any background colour swap (light↔dark) happens exactly at the
  blur peak, so it's never seen as a flash of grey.
- **Camera**: the whole frame breathes — a continuous `scale(1.0 → 1.02)`
  push/pull on a ~7.4s cycle, independent of scene cuts, zoom only (no pan),
  so nothing is ever uncovered at the edges.

### Real assets used (nothing invented)

| Asset | Source |
|---|---|
| Homepage hero screenshot | Live capture of `localhost:5173/` (`Hero` component) |
| Projects grid screenshot | Live capture of `localhost:5173/work` (`ProjectsGrid`) |
| "What You Get" screenshot | Live capture of the `Services` section |
| Testimonials screenshot | Live capture of the `Testimonials` section |
| Portfolio covers (Audio 1, Alivio, Bedizen, OSMO Vision 1, Sailfish) | `public/work-cover-*.{png,jpg}` — the site's actual project cover images |
| Logo mark | `public/favicon.svg` — the site's real vector mark |
| Headline "A strategic design team you can trust." | The live site's actual hero copy |
| Portfolio captions/categories | Copied verbatim from `src/data/workSamples.ts` |
| "Constraint Rules Engine / Vendor Intelligence Layer / Parametric 3D Generation" | MFG Copilot's real documented architecture (presented abstractly — no public UI exists to screenshot for this one) |

Screenshots were captured with `capture.mjs` (Playwright against a running
`npm run dev` server, cookie-notice dismissed, 2x device scale). Re-run it
after any redesign to refresh the captures in `assets/ui/`.

### Storyboard

| Scene | Background | Beat |
|---|---|---|
| 1. Open | dark | Real logo mark card (from `favicon.svg`) springs in; "Nocturnal" + "Design Intelligence Studio." tagline with accent rail |
| 2. Statement | light | "A strategic design team you can trust." — word-by-word (the site's real hero headline) |
| 3. Hero UI | light | A pill badge morphs (spring, 25% overshoot) into a full card containing the real homepage screenshot |
| 4. Work UI | dark | Real projects-grid screenshot; "One studio. Every discipline." |
| 5. Portfolio | light | Real cover images cycle through one dominant card — Audio 1, Alivio, Bedizen, OSMO Vision 1, Sailfish — each with its real title + category |
| 6. Services UI | light | Real "What You Get" screenshot; "Every discipline, one team." |
| 7. System | dark | Three pill rows — Constraint Rules Engine / Vendor Intelligence Layer / Parametric 3D Generation — the MFG Copilot architecture, abstracted |
| 8. Testimonials UI | light | Real testimonials screenshot; "Trusted by the teams who shipped it." |
| 9. Sign-off | dark | Logo mark + "Nocturnal" + "getnctrnl.com" pill, camera keeps breathing, fade to black |

### Re-render after edits

```
node capture.mjs     # refresh real screenshots (needs `npm run dev` running on :5173)
node record2.mjs      # play explainer-v2.html headlessly, record to video-out2/*.webm
ffmpeg -i video-out2/*.webm -c:v libx264 -pix_fmt yuv420p -crf 18 \
  -preset medium -movflags +faststart nocturnal-explainer-v2.mp4
```

All timing lives in the `at(ms, fn)` calls at the bottom of
`explainer-v2.html`; the `cutTo(nextId, dir, bg)` function implements the
whip-pan bridge described above.

---

## v1 (superseded) — `explainer.html` / `nocturnal-explainer.mp4`

An earlier ~41s abstract/monochrome kinetic-typography version, built before
the real-asset brief above. Kept for reference; see git history for its
own storyboard notes. `explainer-v2.html` replaces it as the current cut.
