# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# typography
- Use Plus Jakarta Sans + Manrope font pair from Google Fonts via next/font. Confidence: 0.80

# third-party
- Prefers sourcing complex interactive visual effects from established open-source component libraries (e.g., React Bits Ferrofluid) rather than building custom WebGL/Shader effects from scratch. Confidence: 0.50

# design-system
- Use `@tabler/icons-react` for iconography alongside lucide-react. Confidence: 0.70
- Aceternity-style feature grid: dark border-divided cards with hover gradient overlay (from neutral-800 to transparent), accent-colored left bar that scales up on hover, and title that slides right on hover. Confidence: 0.70
- Dark brand palette: --background near #0C1128/#0C0C0D, --primary/CTA anchored to #EB461D, white text, muted cool-gray secondary text. Confidence: 0.75
- Avoid floating/glass containers for hero sections — prefer full-bleed background image with clean text directly on the background. Confidence: 0.75

# layout
See [layout/taste.md](layout/taste.md)
# communication
- Prefers terse, direct commands with minimal explanation (e.g., "revert code to immidiete previous") — expects the agent to infer context and execute autonomously. Confidence: 0.82
- Provides source materials (case-study PDFs, client logo assets) inside the repo and expects them to be the authoritative source for content — derive copy from those files rather than inventing it. Confidence: 0.50
- When the user pastes a full project description/copy directly in the request (e.g., a video's story and specs), that text is authoritative — use it faithfully (condensed as needed) for the portfolio entry rather than writing new marketing copy. Confidence: 0.70
- When reverting or changing a feature, keep changes surgically contained — do not touch or alter unrelated sections of the codebase. Confidence: 0.60
- For carousels/tabs, prefers reusing established in-repo patterns (existing slider conventions like HeroMediaSlider, shared pill-tab styling from the portfolio page) over introducing new interaction designs. Confidence: 0.60

# css
- Pays close attention to visual rendering details — will report pixel-level CSS rendering bugs (e.g., circles showing as squares) and expects precise fixes. Confidence: 0.55
- Use plain `<img>` tags for SVG assets (e.g., client logo files) instead of `next/image` — Next.js's image optimizer rejects `image/svg+xml` unless `dangerouslyAllowSVG` is configured, so SVG sources must bypass the optimizer. Confidence: 0.65

# animation
- Expects all page sections to consistently use the same initial-load cinematic reveal animation — if one section lacks it, will call it out and expects it to use the same `data-cinematic` attributes used elsewhere. Confidence: 0.70
- Prefers per-item staggered `data-cinematic` attributes on individual cards/elements in a grid section (with incremental delays) rather than wrapping the entire grid in a single cinematic element — items should rise one by one on scroll. Confidence: 0.65

# media
- For video content (previews/playlists), prefers native HTML5 `<video preload="metadata" muted playsInline>` card previews — muted play on hover (capable devices only), click to open a modal with native controls and a playlist for multiple clips; no custom video players. Confidence: 0.70
- Prefers lightweight implementations that avoid generating new assets — e.g., no poster images or video transcoding; use metadata-loaded previews instead. Confidence: 0.65

# accessibility
- Expects an accessible + responsive quality bar: keyboard-accessible media controls, modal dismissal via close button/backdrop/Escape, no horizontal overflow from 320px to desktop widths, and reduced-motion mode disabling nonessential preview/transition motion. Confidence: 0.65

# hero
See [hero/taste.md](hero/taste.md)
.md)
