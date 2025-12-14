# Carlos Ramos – Portfolio

Personal portfolio built with React + Vite. It showcases selected frontend/back‑end projects, resume, services, and a contact form powered by EmailJS. The site supports Spanish/English, light/dark themes, and optimized media (AVIF/WebP fallbacks).

## Tech stack
- React 19 + Vite 7
- i18next (ES/EN)
- Framer Motion (animations)
- EmailJS for the contact form
- CSS (custom, responsive), prefers-reduced-motion friendly

## Quick start
```bash
npm install
npm run dev
```
Open the URL printed by Vite (default `http://localhost:5173`).

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview the build
- `npm run lint` – ESLint check

## Environment variables
Create `.env` with your EmailJS keys:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Structure (high level)
- `src/components` – UI sections (Hero, Resume, Services, Portfolio, Contact, Navbar, Footer, etc.)
- `src/data/portfolio.js` – project cards (includes AVIF/WebP fallbacks)
- `src/locales/{es,en}.json` – translations
- `src/assets` – images (prefer `.avif`/`.webp`; PNG/GIF only as fallback)
- `src/styles.css` – global styles, layout, responsive rules

## Assets & performance
- Images are provided in AVIF/WebP with PNG fallback when needed; portfolio cards use `<picture>` for best format selection.
- Parallax/background respects `prefers-reduced-motion`.
- Lazy loading on gallery images to reduce initial payload.

## Accessibility & UX
- Keyboard/focusable controls, ARIA labels on buttons/links.
- Theme toggle and language switch close the mobile menu and lock body scroll when open.
- Contact form includes a honeypot and live status messages.

## Deployment notes
- Static build via `npm run build` outputs to `dist/`.
- Set correct `og:image` in `index.html` if you host under a custom domain and want rich previews.
