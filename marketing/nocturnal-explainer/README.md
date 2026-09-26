# NOCTURNAL — Silent Explainer Video

A ~41s, voiceover-free motion-graphics explainer built with the `motion-design`
skill (`.claude/skills/motion-design/`), styled to the site's own design
tokens (`src/styles/tokens.css`): monochrome base, Host Grotesk, 10% orange
accent (`--noc-accent`).

Reference brief: a silent, kinetic-typography-led explainer in the vein of
modern tech/SaaS explainer reels (the brief named a specific YouTube video as
a style reference; that link could not be opened in this environment, so the
piece was designed from Nocturnal's own brand system and the motion-design
skill's "Premium" personality archetype instead).

## Files

- `explainer.html` — self-contained source (HTML/CSS/JS, no build step). Open
  directly in a browser to play it back live.
- `nocturnal-explainer.mp4` — rendered output (1920x1080, h264, ~41s, silent).
- `record.mjs` — Playwright script that plays `explainer.html` headlessly and
  records it to video. Re-run after editing the HTML to re-render:
  ```
  node record.mjs   # needs the `playwright` package + a Chromium build
  ```
  then transcode the resulting `.webm` to `.mp4` with ffmpeg:
  ```
  ffmpeg -i video-out/*.webm -c:v libx264 -pix_fmt yuv420p -crf 18 \
    -preset medium -movflags +faststart nocturnal-explainer.mp4
  ```

## Storyboard

Motion personality: **Premium** (350–600ms, `cubic-bezier(0.4,0,0.2,1)`, 0%
overshoot) per the motion-design skill — matches Nocturnal's own principle
that "motion is invisible when correct."

| Scene | Time | Beat |
|---|---|---|
| 1. Logo | 0.0–5.0s | Grid lines draw in; "NOCTURNAL" wordmark assembles letter-by-letter; tagline "Design Intelligence Studio" fades up; accent underline draws under "Intelligence." |
| 2. Statement | 5.0–10.0s | Kinetic typography: "We design systems." appears word-by-word, then "systems." swaps to "not screens." |
| 3. Phygital | 10.0–17.0s | A physical product outline draws itself (SVG stroke animation), then dissolves into a digital wireframe — visualizing "phygital." "PHYGITAL" label cascades in. |
| 4. System | 17.0–24.0s | Three stacked plane cards — Constraint Rules Engine / Vendor Intelligence Layer / Parametric 3D Generation — enter staggered, representing the MFG Copilot architecture as "one system, not three tools." |
| 5. Portfolio | 24.0–31.0s | Five monochrome glyphs cascade across the frame (Audio 1, Alivio, Sailfish, Bedizen, OSMO Vision). |
| 6. Closing statement | 31.0–35.0s | "Identity as infrastructure." |
| 7. Sign-off | 35.0–41.0s | Wordmark returns to center; "getnctrnl.com" fades in with a blinking terminal-style cursor bar (nods to the site's `FaultyTerminal` component), then fades to black. |

## Notes for iteration

- All timing/easing choices are documented inline as CSS custom properties
  (`--ease-premium`, `--ease-out-expo`, `--ease-in-accel`) and a single JS
  timeline array (`at(ms, fn)` calls) at the bottom of `explainer.html` —
  edit the `at(...)` calls to retime any beat.
- To reuse this for a different aspect ratio (e.g. 9:16 for Reels/Shorts),
  change the `#stage`/`html,body` dimensions and viewport in `record.mjs`,
  then adjust font sizes/positions per scene.
