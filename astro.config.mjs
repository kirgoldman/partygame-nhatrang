// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, existsSync } from 'node:fs';
import sharp from 'sharp';

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

// Картинки в статьях: добавляем width/height и облегчённый вариант (srcset), если он есть в public/**/s/.
// Копии делает scripts/make-small.mjs. Остальные картинки не трогаем.
// HTML внутри markdown приходит как «raw»-узлы, поэтому правим строку.
function rehypeBlogImages() {
  const dims = new Map();
  const imgRe = /<img\b([^>]*?)\bsrc="(\/(?:blog|video)\/[^"]+\.webp)"([^>]*)>/g;
  const fix = async (html) => {
    const found = [...html.matchAll(imgRe)];
    let out = html;
    for (const m of found) {
      const [whole, before, src, after] = m;
      if (/\bwidth=/.test(before + after)) continue;
      const file = new URL(`./public${src}`, import.meta.url);
      if (!existsSync(file)) continue;
      if (!dims.has(src)) {
        const meta = await sharp(file.pathname).metadata();
        dims.set(src, [meta.width, meta.height]);
      }
      const [w, h] = dims.get(src);
      let extra = ` width="${w}" height="${h}"`;
      const small = src.replace(/\/([^/]+)$/, '/s/$1');
      if (existsSync(new URL(`./public${small}`, import.meta.url))) {
        extra += ` srcset="${small} 960w, ${src} ${w}w" sizes="(max-width: 46rem) 100vw, 736px"`;
      }
      out = out.replace(whole, `<img${before}src="${src}"${after}${extra}>`);
    }
    return out;
  };
  const visit = async (node) => {
    if (node.type === 'raw' && typeof node.value === 'string' && node.value.includes('<img')) {
      node.value = await fix(node.value);
    }
    for (const child of node.children ?? []) await visit(child);
  };
  return async (tree) => {
    await visit(tree);
  };
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { rehypePlugins: [rehypeBlogImages] },
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
