// Единый источник фактов о клубе. Меняете что-то здесь — меняется на всём сайте и в разметке для поисковиков.

export const site = {
  url: 'https://partygame-nhatrang.com', // поменять на купленный домен
  name: 'Party Game Нячанг',
  alternateName: ['PARTY GAME community', 'Party Game Nha Trang'],
  tagline: 'Клуб мафии и социальных игр',
  description:
    'Party Game — клуб мафии, Авалона и Тайного Гитлера в центре Нячанга. Играем четыре вечера в неделю в CCCP Coffee, 19:00–23:00, 150 000 донгов за вечер. Новичкам объясняем правила.',
  foundingDate: '', // год основания клуба — вписать, когда будет известен
  telegramDM: 'https://t.me/juliana_flame',
  telegramDMHandle: '@juliana_flame',
  telegramGroup: 'https://t.me/+OMJQ4EA3FZAyYTRh',
  groupSize: '400+',
  instagram: '', // ссылка на Instagram Юлианы — вписать
  price: 150000,
  priceText: '150 000 ₫',
  currency: 'VND',
  hours: '19:00–23:00',
  venue: {
    name: 'CCCP Coffee',
    street: '112 Đ. Hồng Bàng',
    city: 'Нячанг',
    cityLatin: 'Nha Trang',
    region: 'Khánh Hòa',
    postalCode: '650000',
    country: 'VN',
    countryRu: 'Вьетнам',
    district: 'центр Нячанга',
    mapUrl: 'https://maps.app.goo.gl/YK2DuMNHnbmBAZPV7',
    mapEmbed:
      'https://www.google.com/maps?q=CCCP+Coffee,+112+H%E1%BB%93ng+B%C3%A0ng,+Nha+Trang&output=embed',
  },
  host: {
    name: 'Юлиана',
    role: 'основательница клуба и ведущая, коуч и практик игры Лила',
    experience: 'более 10 лет практики в коучинге',
  },
};

export type Game = {
  slug: string;
  name: string;
  short: string;
  color: string;
  day: string;
  dayShort: string;
  schemaDay: string;
  seats?: number;
  rounds: string;
  role: string;
  href: string;
};

export const week: Game[] = [
  {
    slug: 'avalon',
    name: 'Авалон',
    short: 'Средневековая мафия про рыцарей и шпионов',
    color: 'var(--avalon)',
    day: 'Четверг',
    dayShort: 'Чт',
    schemaDay: 'https://schema.org/Thursday',
    seats: 13,
    rounds: '4–5 партий',
    role: 'Мерлин',
    href: '/avalon/',
  },
  {
    slug: 'mafiya',
    name: 'Городская мафия',
    short: 'Классика: день, ночь, блеф и ведущий',
    color: 'var(--mafia)',
    day: 'Пятница',
    dayShort: 'Пт',
    schemaDay: 'https://schema.org/Friday',
    rounds: '3–4 партии',
    role: 'Дон',
    href: '/mafiya-nyachang/',
  },
  {
    slug: 'taynyy-gitler',
    name: 'Тайный Гитлер',
    short: 'Похожа на мафию, но без долгих выбываний',
    color: 'var(--hitler)',
    day: 'Суббота',
    dayShort: 'Сб',
    schemaDay: 'https://schema.org/Saturday',
    seats: 10,
    rounds: '4–5 партий',
    role: 'Либерал',
    href: '/taynyy-gitler/',
  },
  {
    slug: 'avalon',
    name: 'Авалон',
    short: 'Средневековая мафия про рыцарей и шпионов',
    color: 'var(--avalon)',
    day: 'Воскресенье',
    dayShort: 'Вс',
    schemaDay: 'https://schema.org/Sunday',
    seats: 13,
    rounds: '4–5 партий',
    role: 'Мордред',
    href: '/avalon/',
  },
];

export const lila = {
  start: 'с середины октября 2026',
  days: 'понедельник и среда',
  time: '12:00–17:00 (ориентировочно)',
  duration: 'до 5 часов',
  place: 'кафе в центре Нячанга или дома',
  prices: [
    { label: 'Индивидуально', price: 130, unit: '$' },
    { label: 'В паре', price: 90, unit: '$ с человека' },
    { label: 'Мини-группа 3–4 человека', price: 70, unit: '$ с человека' },
  ],
};

export const nav = [
  { href: '/mafiya-nyachang/', label: 'Мафия' },
  { href: '/avalon/', label: 'Авалон' },
  { href: '/taynyy-gitler/', label: 'Тайный Гитлер' },
  { href: '/lila/', label: 'Лила' },
  { href: '/raspisanie-i-ceny/', label: 'Расписание' },
  { href: '/blog/', label: 'Блог' },
];
