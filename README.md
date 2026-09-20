# Arju Akter — 3D Interactive Portfolio

Premium single-page portfolio for **Mst Arju Akter** (UI/UX & Graphic Designer / Web Developer, Dhaka).
Dark `#0a0a0a` + lime `#C5E01C` studio aesthetic with a full-viewport Three.js scene,
cursor-following 3D cards, GSAP reveals and case-study modals.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

Deploy `dist/` to Vercel / Netlify / any static host.

1. Rebuild. The photo appears in the **hero card** and the **about** section
   with the lime ring + glow automatically.

Until then, a styled **"AA" monogram** placeholder is shown.

## Connect the contact form ★

Open `src/components/Contact.tsx`:

- **Formspree (easiest):** create a form at formspree.io, then set
  `const FORMSPREE_ID = "your-id";` — submissions POST to
  `https://formspree.io/f/<id>`.
- **EmailJS:** `npm i @emailjs/browser` and call `emailjs.send(...)`
  inside `handleSubmit`.
- **Demo mode (default):** logs the payload to the console and shows the
  success state.

## Project structure

```
src/
  data/portfolio.ts      # ★ edit services / projects / skills / photo here
  components/
    Background3D.tsx     # vanilla Three.js scene (shapes + particles + orbs)
    CursorParticles.tsx  # 2D sparkles that follow the mouse
    CustomCursor.tsx     # lime dot + trailing ring cursor
    Magnetic.tsx         # magnetic hover wrapper
    TiltCard.tsx         # 3D tilt + glare wrapper
    Reveal.tsx           # GSAP ScrollTrigger reveals
    Navbar / Hero / Marquee / Services / Work /
    ProjectModal / About / Contact / Footer
  hooks/
    useMousePosition.ts  # raw + smoothed mouse (normalized coords)
    useReducedMotion.ts  # prefers-reduced-motion flag
```

## Performance & a11y notes

- Three.js: low-poly wireframes, DPR clamp (≤1.5, 1 on mobile), rAF paused
  when the tab is hidden, full dispose on unmount, static frame for
  `prefers-reduced-motion`.
- Canvases are `pointer-events: none` and `aria-hidden` — they never block
  interaction or hurt Lighthouse interactivity scores.
- Modal: Esc to close, backdrop click, focus moved to close button, body
  scroll locked while open.
- Focus-visible lime outlines throughout; native cursor restored on touch.

