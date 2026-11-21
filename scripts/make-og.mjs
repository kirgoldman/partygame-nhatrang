// Обложки для репостов: public/og/blog/<slug>.jpg 1200x630 из первой картинки каждой статьи.
// Запуск: node scripts/make-og.mjs (после добавления статей)
import sharp from 'sharp';
import { readdirSync, readFileSync, existsSync, mkdirSync } from 'node:fs';

mkdirSync('public/og/blog', { recursive: true });
let n = 0;
for (const f of readdirSync('src/content/blog').filter((x) => x.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '');
  const m = readFileSync(`src/content/blog/${f}`, 'utf8').match(/\/(?:blog|video)\/[^"'\s)]+\.webp/);
  if (!m || !existsSync(`public${m[0]}`)) {
    console.log('нет обложки:', slug);
    continue;
  }
  await sharp(`public${m[0]}`)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`public/og/blog/${slug}.jpg`);
  n++;
}
console.log('обложек:', n);
