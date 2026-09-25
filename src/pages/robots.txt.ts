import type { APIRoute } from 'astro';
import { site } from '../data/site';

const rules = `# Party Game Нячанг — всем поисковикам и AI-ассистентам можно всё
User-agent: *
Allow: /

# Поисковые и AI-краулеры (явно разрешены, чтобы клуб находили через нейросети)
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: YandexBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

`;

export const GET: APIRoute = () =>
  new Response(`${rules}Sitemap: ${new URL('/sitemap-index.xml', site.url)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
