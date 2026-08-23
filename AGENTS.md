# AGENTS.md — brunopulis/personal-site

## Stack

- **Eleventy v3** (ESM, `"type": "module"`) — static site generator
- **Custom SCSS** (cu.css-style, no framework) — single pipeline in `src/_config/events/build-css.js` (`sass.compile` compressed + autoprefixer + cssnano) builds `src/assets/css/app.scss → src/_includes/css/global.css`; tokens in `src/assets/css/abstracts/_theme.scss`
- **Nunjucks** (.njk) templates + **WebC** components
- **Vitest** for unit tests; **Cypress + cypress-axe** for e2e and a11y smoke tests
- **Pagefind** for static search (runs after Eleventy on `_site/`)
- **Vercel** deployment — build command `npm run build`, output `_site/`

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | `node scripts/build-css.js --watch` + Eleventy dev server (port 8080) in parallel |
| `npm run build` | Full production build: `clean → eleventy (ELEVENTY_ENV=production) → pagefind search index` |
| `npm test` | `vitest run` (tests in `tests/**/*.test.js`) |
| `npm run test:watch` | `vitest` (watch mode) |
| `npm run test:coverage` | `vitest run --coverage` (covers `src/_config/**`) |
| `npm run test:e2e` | `cypress run` against an already-running dev server |
| `npm run test:e2e:ci` | starts `eleventy --serve --port=8080` and runs Cypress (`start-server-and-test`) |

## Architecture

- **`src/_config/`** — Eleventy config: collections, filters (modular), plugins, shortcodes, events
- **`src/_data/`** — global data (main config: `site.json`)
- **`src/_layouts/`** — layout templates (`.njk`)
- **`src/content/`** — all content by type: `posts/`, `books/`, `watching/movies/`, `watching/shows/`, `games/`, `notes/`, `poetry/`, `likes/`, `newsletters/`
- **`src/pages/`** — site pages (about, contact, blog, etc.)
- **`scripts/`** — build helpers and data sync scripts (movies, shows, icons, stats, assets)
- **`tests/`** — Vitest unit tests (`tests/unit`) + Cypress e2e specs (`tests/e2e`)

## Quirks & Gotchas

- **No ESLint** — only Prettier for formatting. Prettier config at `.prettierrc` (110 print width, single quotes, no trailing commas). Prettier **ignores** `.md` and `.njk` files (see `.prettierignore`).
- **CSS is SCSS, not Tailwind** — do not look for `tailwind.config.js` (it does not exist). Tokens are in `src/assets/css/abstracts/_theme.scss`. Never introduce Tailwind or utility classes.
- **Build is sequential**: `clean → build:11ty → build:search`. Stats are computed at build time by the `src/_data/siteStats.js` data file — no separate pre-build step needed. `cross-env ELEVENTY_ENV=production` is set for production builds.
- **OG images**: SVG→JPEG conversion only runs during dev serve (`ELEVENTY_RUN_MODE === 'serve'`).
- **Image transform plugin** auto-converts images to avif/webp/jpeg at 650/960/1400px widths (30-day cache).
- **`.env` file** is loaded by dotenv in `.eleventy.js`. Used by asset-fetch scripts (profile image, OG default, etc.) — set `SKIP_FETCH_ASSETS=1` to bypass in CI/offline.
- **Content is in Portuguese** — site.json, pages, and error messages are in pt-BR.
- **No GitHub Actions workflows** currently configured (only Dependabot for npm updates).

## Design

- Brand source of truth: `docs/design.md` (brand guide — essence, palette, typography, voice). The site implements it with the **"a prova tipográfica"** art direction: brand palette (paper `#d9d9d9`, preto `#171e1e`, accent vinho `#610404` / coral `#ff8f7e` on dark), red marks only structural (section dashes, focus underline).
- Before touching any UI/visual, load the project skill **`design`** (`.opencode/skill/design/SKILL.md`).
- Type system: **Source Sans 3** (primary — body, headings, UI) + **Noto Serif** (secondary — only blockquotes). Two families, self-hosted, no mono.

## Testing Notes

- Unit tests cover `src/_config/` filters and utils — not layouts, pages, or content.
- E2E specs in `tests/e2e/*.cy.js` (pages, home, blog, navigation, contact) run against the dev server on port 8080 and include cypress-axe a11y checks.
- Snapshot tests are not used.
