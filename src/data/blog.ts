// Обложка статьи = первая картинка из её текста (путь вида /blog/....webp).
export function coverOf(body: string | undefined): string | undefined {
  return body?.match(/\/(?:blog|video)\/[^"'\s)]+\.webp/)?.[0];
}

// Облегчённая копия картинки (960 px), если она есть: /blog/x.webp -> /blog/s/x.webp.
export function smallOf(src: string): string {
  return src.replace(/\/([^/]+)$/, '/s/$1');
}
