// Отзывы участников из Telegram-группы клуба. Авторы согласились на публикацию.
// link — ссылка на сообщение в Telegram (ПКМ по сообщению → «Копировать ссылку»)
// avatar — файл в public/avatars/, если нет — показываем первую букву имени
// reactions — реакции, как под сообщением в Telegram (посетитель сайта тоже может «нажать»)
export type Review = {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  game?: 'mafiya' | 'avalon' | 'taynyy-gitler' | 'lila';
  text: string;
  date?: string;
  time?: string;
  edited?: boolean;
  link?: string;
  reply?: { name: string; text: string; color: string };
  reactions?: { e: string; n: number }[];
};

export const reviews: Review[] = [
  {
    id: 'tiana',
    name: 'Tiana 👩🏼‍💻',
    color: '#d45246',
    avatar: '/avatars/tiana.webp',
    game: 'avalon',
    time: '20:51',
    edited: true,
    link: 'https://t.me/c/2631757294/4643/5950',
    text: 'пишу уже из России 🌦 :)\n\nРебята, была рада знакомству с командой Авалона сезон Февраль-май 2026 🤞🏻🥰😁\n\nЮлиана, спасибо тебе за классную атмосферу, ты - душа компании 🥰\n\nВсем желаю незабываемого лета и море впечатлений!!! 🫂\n\nНадеюсь еще увидимся 🥹🫂',
    reactions: [
      { e: '🤍', n: 4 },
      { e: '👍', n: 3 },
      { e: '🔥', n: 3 },
      { e: '💯', n: 1 },
    ],
  },
  {
    id: 'darya',
    name: 'Darya',
    color: '#e17076',
    game: 'mafiya',
    date: '16 мая',
    time: '19:53',
    link: 'https://t.me/c/2631757294/5837',
    text: 'Я так рада, что спонтанно попала на игру)\n\nОчень организованная и лёгкая мафия, я в шоке прям. Нет такого, что ушла без сил после дебат, как иногда это бывает на таких играх в хаосе. Его не было от слова совсем. Приду ещё! 🫶🏻',
    reactions: [
      { e: '❤️', n: 3 },
      { e: '🥰', n: 1 },
    ],
  },
  {
    id: 'alena',
    name: 'Alena Korotchenko',
    color: '#8e62d8',
    avatar: '/avatars/alena.webp',
    game: 'mafiya',
    time: '23:29',
    link: 'https://t.me/c/2631757294/4643/5396',
    text: 'Лучшая прооооосто сегодня компания на мафию собралась! Обожаю вас 🫶🏻 спасибо за игру всем',
    reactions: [
      { e: '❤️‍🔥', n: 4 },
      { e: '💯', n: 1 },
      { e: '😎', n: 1 },
    ],
  },
  {
    id: 'evgeniya',
    name: 'Евгения 🍀',
    color: '#3a8ad6',
    avatar: '/avatars/evgeniya.webp',
    time: '21:03',
    link: 'https://t.me/c/2631757294/4657/7033',
    text: 'Всем огромное спасибо за игры, для меня это был интересный опыт))',
    reactions: [{ e: '🔥', n: 2 }],
  },
  {
    id: 'danissimo',
    name: 'Danissimo',
    color: '#c0473a',
    avatar: '/avatars/danissimo.webp',
    time: '21:13',
    link: 'https://t.me/c/2631757294/4657/7034',
    text: 'Да, ребята, спасибо всем\nЭто был разнос!',
  },
  {
    id: 'pavel',
    name: 'Pavel 🍀',
    color: '#d6812d',
    avatar: '/avatars/pavel.webp',
    time: '01:46',
    link: 'https://t.me/c/2631757294/1/2810',
    text: 'Спасибо всем ребятам и огромный респект организатору! Это был классный вечер!',
    reactions: [
      { e: '🔥', n: 3 },
      { e: '❤️', n: 2 },
      { e: '🤗', n: 1 },
    ],
  },
  {
    id: 'valeriya',
    name: 'Валерия ❤️',
    color: '#d45246',
    avatar: '/avatars/valeriya.webp',
    game: 'mafiya',
    time: '22:53',
    link: 'https://t.me/c/2631757294/4643/5395',
    text: 'Ребятки, это было шикарно❤️ очень буду по вам скучать искренне',
    reactions: [
      { e: '❤️', n: 6 },
      { e: '😢', n: 2 },
      { e: '🔥', n: 1 },
      { e: '💯', n: 1 },
    ],
  },
  {
    id: 'dyusha-avg',
    name: 'Дюша',
    color: '#8e62d8',
    avatar: '/avatars/dyusha.webp',
    date: '3 августа',
    time: '00:07',
    link: 'https://t.me/c/2631757294/4643/6586',
    reply: { name: 'Александр', text: 'Всем спасибо 🙏🏻', color: '#8e62d8' },
    text: 'Спасибо за эмоции 😂 нервы потрепаны👌🏻🔥😂❤️',
    reactions: [
      { e: '🤣', n: 3 },
      { e: '🥺', n: 1 },
    ],
  },
  {
    id: 'dyusha-may',
    name: 'Дюша',
    color: '#8e62d8',
    avatar: '/avatars/dyusha.webp',
    game: 'mafiya',
    date: '16 мая',
    time: '19:47',
    link: 'https://t.me/c/2631757294/5836',
    text: 'Круто поиграли))))) Дима вообще суперски отыгрывал роль мирного весь вечер 👌',
    reactions: [
      { e: '❤️', n: 2 },
      { e: '👍', n: 1 },
      { e: '😁', n: 1 },
    ],
  },
];

export const gameLabel: Record<NonNullable<Review['game']>, { name: string; color: string }> = {
  mafiya: { name: 'Мафия', color: 'var(--mafia)' },
  avalon: { name: 'Авалон', color: 'var(--avalon)' },
  'taynyy-gitler': { name: 'Тайный Гитлер', color: 'var(--hitler)' },
  lila: { name: 'Лила', color: 'var(--lila)' },
};
