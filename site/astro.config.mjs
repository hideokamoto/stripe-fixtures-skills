// @ts-check
import { defineConfig } from 'astro/config';

// Static marketing LP. English at "/", Japanese at "/ja".
// Deploys as static output (default) to Cloudflare Pages / GitHub Pages / any static host.
export default defineConfig({
  // Update to the production URL once a domain/Pages project is set.
  site: 'https://stripe-fixtures.pages.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    routing: {
      // EN served at root (/), JA at /ja — no /en prefix.
      prefixDefaultLocale: false,
    },
  },
});
