# AGENTS.md — Arches SA

## Project overview

Bilingual (Arabic/English) marketing site for a multidisciplinary architecture & construction firm based in Riyadh, KSA. Built with **Astro 6 + Tailwind CSS v4**, deployed to **GitHub Pages** via the `withastro/action` CI workflow.

- **Default locale:** `ar` (prefix-free at `/`)
- **Secondary locale:** `en` (prefixed at `/en`)
- **Output:** static HTML (SSG)

---

## Essential commands

```bash
npm run dev          # start dev server (localhost:4321)
npm run build        # production build into dist/
npm run preview      # preview the production build
npm run format       # runs prettier --write .
npx astro check      # type-check .astro files (no npm script defined)
```

No test suite or linter is configured. Use `npx astro check` to validate `.astro` template types after non-trivial edits.

---

## Architecture & data flow

### Route structure

```
src/pages/index.astro        →  /          (Arabic)
src/pages/en/index.astro      →  /en/       (English)
src/pages/404.astro           →  404 page
```

Both locale index pages render the same `<Home />` content component inside `<Layout>`. The only difference is what locale Astro resolves from the URL.

### Content pipeline

All translatable text lives in a single typed file:

**`src/data/content.ts`** — exports:

- `SiteContent` interface (every translatable field typed)
- `getContent(locale: string | undefined): SiteContent` — returns `en` when `locale === "en"`, otherwise `ar`. Callers pass `Astro.currentLocale`, which can be `undefined`, so the fallback matters.
- `ar` and `en` content objects — all site text for each language, plus Unsplash placeholder image URLs under an `IMG` constant

The `getContent()` function is called in `Layout.astro` (which passes `content` to Header/Footer) and in `Home.astro` (which passes it to each section component).

### Component hierarchy

```
Layout.astro              ← HTML shell, global CSS, Header, Footer, reveal script
  └─ Home.astro           ← Content page; imports and renders all sections
       ├─ HeroAnimation   ← full-bleed hero: background video + mask-reveal circle + staggered text
       ├─ WhoColumns      ← "about us" — centered header + 3-column points grid
       ├─ ServicesSticky  ← sticky sidebar nav (links to #service-XX) + scrolling service articles
       ├─ WhyGrid         ← "why us" — 2-column grid with staggered reveal
       ├─ ProjectsCarousel← horizontal snap-scroll carousel of ProjectCards
       └─ ContactFormFocus← dark contact section: EnquiryForm + ContactDetails
```

**UI primitives** (`src/ui/`):

- `Button.astro` — multi-variant link/button (`primary`, `outline`, `ghost`)
- `Eyebrow.astro` — small label above headings
- `SectionHeader.astro` — eyebrow + title + intro combo
- `Reveal.astro` — wraps content in `[data-reveal]` for scroll animation
- `ImageFrame.astro`, `ProjectCard.astro`, `ServiceItem.astro`, `ContactDetails.astro`, `EnquiryForm.astro`

### Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds via `withastro/action` and deploys to GitHub Pages. The `CI=true` environment variable set during the workflow switches `base` to `/arches-sa` (see gotcha below). No manual deploy step.

### Adding a new section

1. **Extend the data model** in `src/data/content.ts`:
   - Add a field to the `SiteContent` interface
   - Add matching content to **both** the `ar` and `en` objects (keeping them structurally identical)
2. **Create the component** at `src/components/sections/<name>/<Name>.astro` — takes `content: SiteContent` as a prop, wraps revealable bits in `<Reveal>`, gives the `<section>` an `id` for nav anchoring.
3. **Mount it** in `src/content/Home.astro` in the desired vertical order.
4. **(Optional)** add a nav entry to `content.nav` in both locales so it appears in the header overlay.

### Placeholder imagery

All hero/service/project images in `content.ts` are remote Unsplash URLs under the `IMG` constant (top of file). When replacing with real assets, either keep them remote or move files into `public/` and reference with `${import.meta.env.BASE_URL}<filename>` so they resolve correctly under the GitHub Pages base path.

### I18n mechanics

- `Astro.currentLocale` resolves `"ar"` or `"en"` based on URL
- `Layout.astro` derives `dir` (rtl/ltr) and `<html lang>` from content
- Language switcher link in header uses `content.altLocale`
- RTL handled entirely by Tailwind's `rtl:` variant — **no separate RTL CSS files**
- Phone numbers are displayed `dir="ltr"` to keep digits left-to-right
- Arrow icon in buttons uses `rtl:-scale-x-100` and `rtl:group-hover:-translate-x-1`

---

## Patterns & conventions

### Styling

- **Tailwind v4** via `@tailwindcss/vite` (no `tailwind.config` file)
- Theme defined as CSS custom properties in `src/styles/global.css` under `@theme`:
  - `--color-quill-gray-*` — warm neutral (main background)
  - `--color-ink-*` — dark text/surfaces
  - `--color-clay-*` — brown accent (CTAs, highlights)
- Components use `class:list={[...]}` arrays — never string concatenation for classes
- All breakpoints use mobile-first Tailwind prefixes (e.g. `sm:`, `lg:`)

### Component conventions

- Every component declares a `Props` interface within the frontmatter
- Props are destructured with defaults in the frontmatter
- Components accept `class?: string` prop and forward it via `class:list={[..., className]}`
- Section components take `content: SiteContent` as their main data prop
- SVG icons are imported as Astro components (e.g. `import Logo from "../assets/logo.svg"`)
- Background images referenced as CSS `backgroundImage` with `import.meta.env.BASE_URL` prefix (for GitHub Pages base path)

### JavaScript

- Only vanilla JS in `<script>` tags — **no client-side framework** (no React, Vue, Svelte)
- `src/scripts/reveal.ts` — IntersectionObserver-based scroll reveal for `[data-reveal]` elements
- `EnquiryForm.astro` — form submission to Web3Forms API with inline `<script>`
- `HeroAnimation.astro` — video preloading script with `define:vars` for passing props to client JS

### TypeScript

- Strict tsconfig (`astro/tsconfigs/strict`)
- No path aliases — all imports use relative paths
- `src/data/content.ts` is the only `.ts` data file; all other logic is in `.astro` frontmatter

---

## Gotchas

### `import.meta.env.BASE_URL`

The `base` in `astro.config.mjs` is conditionally set:

```
base: process.env.CI ? "/arches-sa" : "/"
```

- Dev: `"/"` — assets resolve from root
- CI (GitHub Pages): `"/arches-sa"` — repo name prepended

**Always** prefix asset paths in components with `import.meta.env.BASE_URL` so they work in both environments. Examples: `favicon.svg`, `background.jpg`, `background.mp4`, `logo-mask.svg`.

### Web3Forms key is a placeholder

`src/ui/EnquiryForm.astro:13` — `const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"`. The form won't actually submit until this is replaced with a real key.

### `src/content.md` is dead weight

This file is not imported by anything. It appears to be an earlier scratch file used to draft Arabic content before it was moved into `src/data/content.ts`. It can be ignored or deleted.

### No client-side routing

This is a static MPA. The nav links use `#hash` anchors to scroll to sections (handled by `scroll-behavior: smooth` + `scroll-margin-top` in `global.css`). No Astro View Transitions / `<ClientRouter />` are enabled.

### Video auto-play

`HeroAnimation.astro` loads a video on `loadeddata`, calls `play()` then immediately `pause()` to get the first frame rendered as a poster. This avoids needing a separate poster image. Some browsers may block this.

### Prettier import ordering

`@ianvs/prettier-plugin-sort-imports` sorts imports as:

1. `<TYPES>`
2. `<THIRD_PARTY_MODULES>`
3. (blank line)
4. `^[./]` (local imports)

Imports within `.astro` frontmatter are also reordered by the Astro prettier plugin.
