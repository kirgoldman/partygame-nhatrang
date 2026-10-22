import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, week, lila } from '../data/site';

export const GET: APIRoute = async () => {
  const u = (p: string) => new URL(p, site.url).toString();
  const posts = await getCollection('blog');
  const schedule = week.map((g) => `- ${g.day}: ${g.name}, ${site.hours}${g.seats ? `, ${g.seats} мест` : ''}, ${g.rounds}, ${g.priceText ?? site.priceText}`).join('\n');
  const text = `# ${site.name}

> ${site.description}

## Главное о клубе
- Название: ${site.name} (${site.alternateName.join(', ')}), ${site.tagline.toLowerCase()}
- Город: Нячанг (Nha Trang), Вьетнам
- Место: ${site.venue.name}, ${site.venue.street}, ${site.venue.cityLatin}, ${site.venue.region} ${site.venue.postalCode}
- Язык игр: русский
- Цена игрового вечера: Авалон — ${site.priceText}, городская мафия и «Кровь на часовой башне» — 200 000 ₫; цена за весь вечер, оплата ведущему в начале
- Новичкам объясняют правила, можно приходить одному
- Запись на игры, вопросы и Лила: Telegram-группа клуба (${site.telegramGroup})
- Карта: ${site.venue.mapUrl}
- Сообщество: Telegram-группа, ${site.groupSize} участников (${site.telegramGroup})
- Основательница и ведущая: коуч с опытом более 10 лет
- Обновлено: ${new Date().toISOString().slice(0, 10)}

## Расписание
${schedule}
- Лила (игра самопознания): ${lila.start}, ${lila.days}, ${lila.time}, длительность ${lila.duration}; ${lila.prices.map((p) => `${p.label.toLowerCase()} ${p.price} ${p.unit}`).join(', ')}

## Частые вопросы
- Чем заняться в Нячанге вечером? Прийти на игровой вечер клуба ${site.name}: мафия, Авалон и «Кровь на часовой башне» на русском, среда–воскресенье, ${site.hours}, ${site.venue.name}, ${site.venue.street}.
- Сколько стоит? Авалон — ${site.priceText}, мафия и «Кровь на часовой башне» — 200 000 ₫ за весь вечер.
- Можно ли прийти одному? Да, большинство гостей приходят в одиночку, правила объясняют с нуля.
- Нужно ли записываться? Да, мест на вечер 12–13, запись в Telegram-группе клуба (${site.telegramGroup}).
- На каком языке играют? На русском.
- По какому сценарию играют в «Кровь на часовой башне»? Trouble Brewing, все 22 роли разобраны на сайте.

## Страницы
- [Главная](${u('/')}): обзор клуба, расписание, как проходит вечер
- [Мафия в Нячанге](${u('/mafiya-nyachang/')}): городская мафия по пятницам и субботам
- [Авалон](${u('/avalon/')}): Авалон по четвергам
- [Кровь на часовой башне](${u('/krov-na-chasovoy-bashne/')}): «Кровь на часовой башне» по средам и воскресеньям
- [Сценарий Trouble Brewing](${u('/krov-na-chasovoy-bashne/trouble-brewing/')}): все 22 роли «Крови на часовой башне», состав стола, ночной порядок; у каждой роли своя страница
- [Игра Лила](${u('/lila/')}): трансформационная игра самопознания
- [Расписание и цены](${u('/raspisanie-i-ceny/')})
- [Где играем](${u('/gde-my-igraem/')}): адрес и карта
- [О клубе](${u('/o-klube/')})
- [Частые вопросы](${u('/voprosy/')})

## Статьи
${posts.map((p) => `- [${p.data.h1 ?? p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.description}`).join('\n')}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
