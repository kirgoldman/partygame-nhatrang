// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// ВАЖНО: когда купите домен — поменяйте адрес здесь и в src/data/site.ts (поле url)
const SITE = 'https://partygame-nhatrang.com';

// Дата изменения в sitemap только настоящая: у статей блога берём поле updated (или date) из их файла.
// У остальных страниц lastmod не указываем: честная дата изменения лучше, чем «дата сборки» у всех сразу.
function blogLastmod(slug) {
  try {
    const raw = readFileSync(new URL(`./src/content/blog/${slug}.md`, import.meta.url), 'utf8');
    const front = raw.split('---')[1] ?? '';
    const m = front.match(/^updated:\s*(\d{4}-\d{2}-\d{2})/m) ?? front.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
    return m ? new Date(m[1]).toISOString() : undefined;
  } catch {
    return undefined;
  }
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      serialize(item) {
        const m = item.url.match(/\/blog\/([^/]+)\/$/);
        item.lastmod = m ? blogLastmod(m[1]) : undefined;
        return item;
      },
    }),
  ],
});
