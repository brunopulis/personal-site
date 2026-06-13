# AGENTS.md — brunopulis/personal-site

## Stack

- **Eleventy v3** (ESM, `"type": "module"`) — static site generator
- **Tailwind CSS v4** — CSS-based config via `@import "tailwindcss"` + `@theme` in `src/assets/css/tailwind.css` (no `tailwind.config.js`)
- **Nunjucks** (.njk) templates + **WebC** components
- **Vitest** for unit tests; **pa11y-ci** for a11y smoke tests
- **Vercel** deployment — build command `npm run build`, output `_site/`

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Tailwind watch + Eleventy dev server (port 8080) in parallel |
| `npm run build` | Full production build: `stats → css → parallel(icons,highlight,assets) → eleventy` |
| `npm test` | `vitest run` (tests in `tests/**/*.test.js`) |
| `npm run test:watch` | `vitest` (watch mode) |
| `npm run test:coverage` | `vitest run --coverage` (covers `src/_config/**`) |
| `npm run test:a11y` | `pa11y-ci` — **requires dev server running** on port 8080 |
| `npm run clean` | Remove `_site/` |

## Architecture

- **`src/_config/`** — Eleventy config: collections, filters (modular), plugins, shortcodes, events
- **`src/_data/`** — global data (main config: `site.json`)
- **`src/_layouts/`** — layout templates (`.njk`)
- **`src/content/`** — all content by type: `posts/`, `books/`, `watching/movies/`, `watching/shows/`, `games/`, `notes/`, `poetry/`, `likes/`, `newsletters/`
- **`src/pages/`** — site pages (about, contact, blog, etc.)
- **`api/guestbook.js`** — Vercel serverless function (also served locally via Eleventy middleware)
- **`scripts/`** — build helpers and data sync scripts (movies, shows, icons, stats, assets)
- **`tests/`** — Vitest unit tests (filters, utils) — **no e2e tests**

## Quirks & Gotchas

- **No ESLint** — only Prettier for formatting. Prettier config at `.prettierrc` (110 print width, single quotes, no trailing commas). Prettier **ignores** `.md` and `.njk` files (see `.prettierignore`).
- **Tailwind v4 config is in CSS only** — do not look for `tailwind.config.js` (it does not exist). Theme tokens are in `src/assets/css/tailwind.css` with custom color palettes.
- **Build uses `npm-run-all`** — `build:stats` must run before Eleventy (generates `siteStats.json`). `cross-env ELEVENTY_ENV=production` is set for production builds.
- **OG images**: SVG→JPEG conversion only runs during dev serve (`ELEVENTY_RUN_MODE === 'serve'`).
- **Image transform plugin** auto-converts images to avif/webp/jpeg at 650/960/1400px widths (30-day cache).
- **`.env` file** is loaded by dotenv in `.eleventy.js`. Used by asset-fetch scripts (profile image, OG default, etc.) — set `SKIP_FETCH_ASSETS=1` to bypass in CI/offline.
- **Content is in Portuguese** — site.json, pages, and error messages are in pt-BR.
- **Guestbook API** stores data in `src/_data/guestbook.json` (committed file — data persists in git).
- **No GitHub Actions workflows** currently configured (only Dependabot for npm updates).

## Testing Notes

- Tests only cover `src/_config/` filters and utils — not layouts, pages, or content.
- Snapshot tests are not used.
- a11y test (`pa11y-ci`) requires the Eleventy dev server to be running and hits 5 URLs at `localhost:8080`.
