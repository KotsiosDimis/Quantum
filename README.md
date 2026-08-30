# Quantum Gym

Node.js/Express + EJS site for Quantum Gym. One responsive layout serves desktop and mobile (no separate pages to keep in sync). English/Greek toggle in the header. All business data (prices, contact info, hours, images) lives in one config file.

## Run it

```bash
npm install
npm run dev      # builds CSS, watches for changes, runs the server with auto-reload
```

Open http://localhost:3000

For production:

```bash
npm install --omit=dev
npm start         # builds minified CSS, then starts the server
```

Content (copy, prices, photos) is synced from the `Quantum-Gym-main` React prototype (`src/pages/Home.js`, `src/components/Footer.js`) — that project is the source of truth for anything real. `src/pages/About.jsx`, `Contact.jsx`, `Facilities.jsx`, and `MebershipsTesting.jsx` in that prototype are dead code (not wired into its router) and were **not** used as sources — they contain stale/placeholder data (e.g. Contact.jsx's US phone number and Mon–Fri hours).

There is currently no verified opening-hours data anywhere, so this site doesn't show any — add real hours to `config/site.config.js` once you have them and reintroduce the UI for it.

## Editing content

- **Prices, phone, email, address, social links, images** → [`config/site.config.js`](config/site.config.js). Nothing else needs to change when you edit a price or a phone number.
- **Wording (headings, descriptions, button labels) in English and Greek** → [`locales/en.json`](locales/en.json) and [`locales/el.json`](locales/el.json). Both files share the same keys — if you add a key to one, add it to the other or the English text will show as a fallback.
- **Photos** → real photos live in `public/images/` (copied from the React prototype, hero/about downsized and recompressed with `sharp` since the originals were 2.7–3.6MB). Swap files and update the paths in the config to change them.

## Notes on the build

- Tailwind CSS is compiled locally via PostCSS (`npm run build:css` / `watch:css`), not loaded from a CDN — smaller, faster, and works offline.
- Language switching is a plain server-rendered link (`?lang=en` / `?lang=el`) that sets a cookie, so it works even with JavaScript disabled; a small script preserves the current section (`#hash`) across the switch.
- Accessibility: skip-to-content link, semantic landmarks, labelled icon-only buttons, keyboard-operable carousel (arrow keys, visible focus rings), `prefers-reduced-motion` disables autoplay and instant-scrolls instead of animating, alt text pulled from the locale files.
