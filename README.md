# capiOS · Carlos Ramos portfolio

Live: **https://carlosramos.app**

My developer portfolio, built as an interactive desktop: windows you can drag, resize and minimize, a Dock, a menu bar and a working Terminal. Projects, experience, CV and a contact form all live inside it as "apps".

## Stack
- React 19 + TypeScript, built with Vite 7
- Tailwind CSS 3 for styling, Framer Motion for animation
- i18next for Spanish / English
- EmailJS for the contact form, called from a Vercel serverless function (`api/contact.ts`) so no keys reach the browser, with per-IP and global rate limiting against spam

## How it works
```
src/
  App.tsx            login → desktop flow
  os/                the "operating system"
    WindowManager.tsx  window state (open, minimized, maximized, z-order) via React context
    Window.tsx         draggable / resizable window frame
    Desktop.tsx        desktop icons + renders open windows (apps are lazy-loaded)
    Dock.tsx, MenuBar.tsx, LoginScreen.tsx
  apps/              one component per app: Projects, About, Terminal, CV, Mail
  data/portfolio.ts  profile, projects, skills and CV files (single source of truth)
  locales/           es.json / en.json (all UI text)
api/
  contact.ts         serverless function that validates the contact form and sends it via EmailJS
```

- **Window manager:** a pure reducer (`os/windowsReducer.ts`) holds every window's state and z-index, exposed through a React context; focusing a window raises it.
- **Terminal:** a small pure command parser (`apps/terminalCommands.ts`) (`help`, `whoami`, `skills`, `projects`, `experience`, `education`, `contact`, `open cv`, `neofetch`, `clear`) that reads the same data as the rest of the UI.
- **Mobile:** windows open full screen and the Dock adapts.
- **Language:** Spanish or English from the browser setting, switchable from the menu bar; the CV shown and downloaded follows the language.
- **Accessibility:** respects `prefers-reduced-motion` and includes a `<noscript>` text version.

## Run it locally
```bash
npm install
cp .env.example .env   # add your EmailJS keys (only needed for the contact form)
npm run dev
```

| Script | |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | type-check, then production build to `dist/` |
| `npm run typecheck` | TypeScript check only |
| `npm test` | unit tests (Vitest): window manager, terminal commands, contact API |
| `npm run preview` | preview the build |
| `npm run lint` | ESLint |

## Environment variables
Set these in Vercel (Project → Settings → Environment Variables) and in a local `.env`:
```
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
```
They are read only by `api/contact.ts` on the server. To test the contact form locally use `vercel dev` (plain `npm run dev` does not run the API).

## Contact
carlosramos4dev@gmail.com · [GitHub](https://github.com/capimaker) · [LinkedIn](https://www.linkedin.com/in/carlos-ramos7/)
