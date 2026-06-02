# stripe-fixtures — landing page

Marketing landing page for the [`stripe-fixtures`](../skills/stripe-fixtures) Agent Skill.
Built with [Astro](https://astro.build) as a static site. English at `/`, Japanese at `/ja`.

## Why plain Astro (and not Starlight)?

This is a **single-skill** project, so its reference docs live in the repo README and
`SKILL.md` — there is no multi-page docs tree to justify a docs framework. Plain Astro
gives a marketing LP with built-in i18n routing, zero shipped JS, and the lowest
dependency/maintenance surface. If a browseable docs section is ever needed, Starlight
can be added later under `/docs`.

## Local development

```bash
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview    # serve the built site
```

## Content & i18n

All copy lives in [`src/i18n/content.ts`](src/i18n/content.ts) as `content.en` / `content.ja`.
The page components (`src/components/Landing.astro`, `src/layouts/Base.astro`) are
language-agnostic and render from that object, so adding/editing copy never touches markup.

- English → [`src/pages/index.astro`](src/pages/index.astro) → served at `/`
- Japanese → [`src/pages/ja/index.astro`](src/pages/ja/index.astro) → served at `/ja`
- Language switcher and `hreflang` tags are wired in `Landing.astro` / `Base.astro`.

Update `site` in [`astro.config.mjs`](astro.config.mjs) to the production URL so canonical
and `hreflang` links resolve correctly.

## Deploy (Cloudflare Pages)

Static output — no adapter required.

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |

The same `dist/` deploys to GitHub Pages, Netlify, Vercel, or any static host.
