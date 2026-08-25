# Services Section — setup

Built and verified with `next build` (Next.js 16, App Router, TypeScript, Tailwind).

## 1. Install dependencies

```bash
npm install gsap three lucide-react
```

(TypeScript users on older Next versions: `npm install -D @types/three`)

## 2. Drop the folder in

Copy the whole `ServicesSection` folder into your project's `components/` folder, so you end up with:

```
components/
  ServicesSection/
    ServicesSection.tsx   ← main component
    ServiceCard.tsx        ← single tiltable card
    AmbientOrb.tsx          ← three.js background in the purple rail
    MagneticButton.tsx      ← CTA button
    useTilt.ts              ← pointer-tilt hook
    data.ts                 ← all copy/icons for the 7 tabs — edit freely
    index.ts
```

## 3. Use it on the home page

```tsx
// app/page.tsx
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main>
      {/* ...your other sections... */}
      <ServicesSection />
    </main>
  );
}
```

Requires the `@/*` path alias (default in `create-next-app`). If you don't have it, either add it to `tsconfig.json` or switch the import to a relative path.

## What's inside

- **Scroll animation (GSAP + ScrollTrigger):** the left purple tab rail slides in from the top, the right content panel rises in from the bottom, and the service cards stagger in — all triggered once the section is ~78% into the viewport.
- **Mouse interaction:** every service card tilts in 3D toward the pointer (`useTilt.ts`, via `gsap.quickTo`) with a soft glare that follows the cursor. Both CTA buttons are "magnetic" — they ease toward the pointer and snap back on release.
- **3D:** `AmbientOrb.tsx` renders a lightweight, dependency-light three.js wireframe icosahedron behind the tab rail, with slow auto-rotation plus a subtle mouse-parallax offset. It's dynamically imported with `ssr: false` so it never touches the server render.
- **Tabs:** clicking a category cross-fades the content grid and slides the active-tab highlight pill to the new button (GSAP, not CSS transitions, so it stays perfectly in sync with the scroll timeline).
- **CRO surfaces:** a primary "Get a free quote" CTA in the header, trust bullets next to it, a secondary "Book the audit" link under the tab rail, and a full-width closing CTA banner — each is a distinct conversion surface rather than one repeated button.
- **Accessibility / performance:** tilt and magnetic effects check `prefers-reduced-motion` and `pointer: coarse` (touch) and disable themselves accordingly; the three.js scene disposes all geometries/materials on unmount.

## Customizing

- **Copy & icons:** everything shown is in `data.ts` (`SERVICE_TABS`), typed, so add/remove/reorder tabs or items without touching the layout code.
- **Colors:** the purple gradient is set directly on the rail (`from-[#8B2FF0] via-[#7C3AED] to-[#4C1D95]`) in `ServicesSection.tsx` — replace with your brand hex values.
- **CTA destinations:** both `MagneticButton` calls default to `href="#contact"`; point them at your actual contact route or pass an `onClick` to open a modal/form instead.
