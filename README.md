# Сайт Party Game Нячанг — partygame-nhatrang.com

Статический сайт клуба на Astro. Код лежит в GitHub, Cloudflare Pages сам собирает и публикует сайт.

## Как вносить правки на сайт partygame-nhatrang.com

Сайт подключён к GitHub и настроен на автодеплой:

- Репозиторий: github.com/kirgoldman/partygame-nhatrang (приватный)
- Подключён к Cloudflare Pages (проект "partygame-nhatrang") напрямую через Git-интеграцию
- Сборка: Astro, команда `npm run build`, папка `dist`, Node 22 (файл `.nvmrc`)
- Ветка main = продакшн. Любой коммит в main автоматически собирается и публикуется на partygame-nhatrang.com примерно за 1–2 минуты
- Тестовый адрес Cloudflare: partygame-nhatrang.pages.dev (канонические ссылки ведут на основной домен)
- Zip-архивы и ручная загрузка через Cloudflare Dashboard больше не нужны

Как Claude должен вносить правки:
1. Предпочтительный способ — fine-grained GitHub-токен с доступом Contents: Read and write только к этому репозиторию. Токен пользователь даёт в чате, в репозиторий его не записывать. Claude правит код, проверяет `npm run build` и пушит в main.
   Важно: облачная песочница Claude пушит только в репозитории, добавленные в источники сессии. Если репозитория там нет, пушить через привязанный компьютер (Claude desktop): перенести коммиты git bundle-ом и сделать `git push` оттуда.
2. Резервный способ — веб-редактор GitHub в браузере пользователя (claude-in-chrome): github.com/kirgoldman/partygame-nhatrang/edit/main/<путь-к-файлу>, с коммитом прямо там. Подходит для текстовых правок в одном-двух файлах.

## Где что лежит

- `src/data/site.ts` — все факты о клубе: адрес, цены, часы, ссылки на Telegram и Instagram, число участников группы. Меняете здесь — меняется на всём сайте и в разметке для поисковиков.
- `src/data/schema.ts` — разметка Schema.org для поисковиков и нейросетей.
- `src/data/faq.ts` — частые вопросы на главной.
- `src/data/reviews.ts` — отзывы из Telegram (текст, реакции, ссылка на сообщение). Аватарки — `public/avatars/`.
- `src/pages/` — страницы: главная, `mafiya-nyachang`, `avalon`, `taynyy-gitler`, `lila`, `raspisanie-i-ceny`, `gde-my-igraem`, `o-klube`, `voprosy`, `blog`.
- `src/content/blog/` — статьи блога, обычные `.md`-файлы. Имя файла = адрес страницы.
- `src/components/` — блоки: афиши первого экрана (`HeroDoors`), расписание (`Week`), лента фото и видео (`PhotoStrip`), отзывы (`Reviews`), бегущая строка (`Ticker`) и т. д.
- `src/assets/` — фото и афиши, которые Astro сам сжимает. `public/` — файлы как есть: видео (`public/video`), фото статей (`public/blog/foto`), картинки для соцсетей (`public/og`), favicon.

## Добавить статью
Скопируйте любой файл из `src/content/blog`, поменяйте имя файла, заголовок, описание, дату и текст. После коммита в main сайт пересоберётся сам.

## Локально
```
npm install
npm run dev      # http://localhost:4321
npm run build    # готовый сайт в папке dist/
```

## Настройки Cloudflare Pages
- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Переменная окружения: `NODE_VERSION = 22` (или файл `.nvmrc`, он уже есть)
- Custom domains: `partygame-nhatrang.com` и `www.partygame-nhatrang.com`
- Security → Bots: блокировка AI-ботов (Block AI bots / AI Crawl Control) должна быть выключена, иначе ChatGPT, Claude и Perplexity не увидят сайт.

## После запуска
- Google Search Console и Яндекс Вебмастер: подтвердить сайт, отправить `https://partygame-nhatrang.com/sitemap-index.xml`.
- Bing Webmaster Tools: импортировать сайт из Search Console (Bing питает поиск ChatGPT и Copilot).
- Google Business Profile для клуба: то же название и адрес, что на сайте.
