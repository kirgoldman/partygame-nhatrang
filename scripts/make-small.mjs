// Делает облегчённые копии картинок блога (960 px) в подпапках s/ рядом с оригиналами.
// Запуск: node scripts/make-small.mjs  (после добавления новых картинок в public/blog)
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const W = 960;
const dirs = ['public/blog', 'public/blog/foto'];
let made = 0;
for (const dir of dirs) {
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.webp')) continue;
    const src = join(dir, f);
    const outDir = join(dir, 's');
    const out = join(outDir, f);
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue;
    const meta = await sharp(src).metadata();
    if ((meta.width ?? 0) <= W) continue;
    mkdirSync(outDir, { recursive: true });
    await sharp(src).resize({ width: W }).webp({ quality: 74 }).toFile(out);
    made++;
  }
}
console.log('создано копий:', made);
