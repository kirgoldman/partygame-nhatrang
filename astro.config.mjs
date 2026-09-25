// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ВАЖНО: когда купите домен — поменяйте адрес здесь и в src/data/site.ts (поле url)
const SITE = 'https://partygame-nhatrang.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
});
