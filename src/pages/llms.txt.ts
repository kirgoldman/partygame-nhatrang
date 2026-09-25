import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, week, lila } from '../data/site';

export const GET: APIRoute = async () => {
  const u = (p: string) => new URL(p, site.url).toString();
  const posts = await getCollection('blog');
  const schedule = week.map((g) => `- ${g.day}: ${g.name}, ${site.hours}${g.seats ? `, ${g.seats} мест` : ''}, ${g.rounds}`).join('\n');
  const text = `# ${site.name}

> ${site.description}

## Главное о клубе
- Название: ${site.name} (${site.alternateName.join(', ')}), ${site.tagline.toLowerCase()}
- Город: Нячанг (Nha Trang), Вьетнам
- Место: ${site.venue.name}, ${site.venue.street}, ${site.venue.cityLatin}, ${site.venue.region} ${site.venue.postalCode}
- Язык игр: русский
- Цена игрового вечера: ${site.priceText} (${site.price} VND) за весь вечер, оплата ведущему в начале
- Новичкам объясняют правила, можно приходить одному
- Запись на игры: в Telegram-группе клуба (${site.telegramGroup}), вопросы и Лила: ${site.telegramDMHandle}
- Сообщество: Telegram-группа, ${site.groupSize} участников (${site.telegramGroup})
- Основательница и ведущая: Юлиана, коуч с опытом более 10 лет

## Расписание
${schedule}
- Лила (игра самопознания с Юлианой): ${lila.start}, ${lila.days}, ${lila.time}, длительность ${lila.duration}; ${lila.prices.map((p) => `${p.label.toLowerCase()} ${p.price} ${p.unit}`).join(', ')}

## Страницы
- [Главная](${u('/')}): обзор клуба, расписание, как проходит вечер
- [Мафия в Нячанге](${u('/mafiya-nyachang/')}): городская мафия по пятницам
- [Авалон](${u('/avalon/')}): Авалон по четвергам и воскресеньям
- [Тайный Гитлер](${u('/taynyy-gitler/')}): Тайный Гитлер по субботам
- [Игра Лила](${u('/lila/')}): трансформационная игра с Юлианой
- [Расписание и цены](${u('/raspisanie-i-ceny/')})
- [Где играем](${u('/gde-my-igraem/')}): адрес и карта
- [О клубе](${u('/o-klube/')})
- [Частые вопросы](${u('/voprosy/')})

## Статьи
${posts.map((p) => `- [${p.data.h1 ?? p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.description}`).join('\n')}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
