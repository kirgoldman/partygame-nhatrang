import { site, week, lila } from './site';

const abs = (path: string) => new URL(path, site.url).toString();

export const orgId = abs('/#club');
export const placeId = abs('/gde-my-igraem/#place');
export const personId = abs('/lila/#yuliana');

export const place = {
  '@type': 'CafeOrCoffeeShop',
  '@id': placeId,
  name: site.venue.name,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.venue.street,
    addressLocality: site.venue.cityLatin,
    addressRegion: site.venue.region,
    postalCode: site.venue.postalCode,
    addressCountry: site.venue.country,
  },
  hasMap: site.venue.mapUrl,
};

export const person = {
  '@type': 'Person',
  '@id': personId,
  name: 'Юлиана',
  jobTitle: 'Коуч, ведущая игры Лила и социальных игр',
  worksFor: { '@id': orgId },
  ...(site.instagram ? { sameAs: [site.instagram] } : {}),
};

export const club = {
  '@type': 'EntertainmentBusiness',
  '@id': orgId,
  name: site.name,
  alternateName: site.alternateName,
  description: site.description,
  url: abs('/'),
  logo: abs('/favicon.svg'),
  image: abs('/og.png'),
  priceRange: site.priceRange,
  currenciesAccepted: 'VND',
  paymentAccepted: 'Наличные',
  knowsLanguage: 'ru',
  areaServed: { '@type': 'City', name: 'Nha Trang' },
  address: place.address,
  location: { '@id': placeId },
  hasMap: site.venue.mapUrl,
  founder: { '@id': personId },
  ...(site.foundingDate ? { foundingDate: site.foundingDate } : {}),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '19:00',
      closes: '23:00',
    },
  ],
  sameAs: [site.telegramGroup, site.telegramDM, ...(site.instagram ? [site.instagram] : [])],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Запись на игры',
    url: site.telegramGroup,
    availableLanguage: 'ru',
  },
};

export const website = {
  '@type': 'WebSite',
  '@id': abs('/#website'),
  url: abs('/'),
  name: site.name,
  inLanguage: 'ru',
  publisher: { '@id': orgId },
};

/** Повторяющееся событие (игровой вечер) для страницы игры */
export function gameEvent(slug: string, pageName: string, description: string, image?: string) {
  const days = week.filter((g) => g.slug === slug);
  const g = days[0];
  return {
    '@type': 'EventSeries',
    '@id': abs(g.href + '#event'),
    name: `${pageName} в Нячанге`,
    description,
    url: abs(g.href),
    inLanguage: 'ru',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: place,
    organizer: { '@id': orgId },
    ...(image ? { image: abs(image) } : {}),
    ...(g.seats ? { maximumAttendeeCapacity: g.seats } : {}),
    eventSchedule: {
      '@type': 'Schedule',
      byDay: days.map((d) => d.schemaDay),
      repeatFrequency: 'P1W',
      startTime: '19:00',
      endTime: '23:00',
      scheduleTimezone: 'Asia/Ho_Chi_Minh',
    },
    offers: {
      '@type': 'Offer',
      price: g.price ?? site.price,
      priceCurrency: 'VND',
      url: site.telegramGroup,
      availability: 'https://schema.org/LimitedAvailability',
      description: 'Оплата ведущему в начале вечера, цена за весь вечер',
    },
  };
}

export const lilaService = {
  '@type': 'Service',
  '@id': abs('/lila/#service'),
  name: 'Игра Лила с ведущей в Нячанге',
  serviceType: 'Трансформационная игра Лила',
  provider: { '@id': personId },
  areaServed: { '@type': 'City', name: 'Nha Trang' },
  url: abs('/lila/'),
  offers: lila.prices.map((p) => ({
    '@type': 'Offer',
    name: p.label,
    price: p.price,
    priceCurrency: 'USD',
    url: site.telegramDM,
  })),
};

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Главная', href: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function article(a: {
  title: string;
  description: string;
  href: string;
  date: Date;
  updated?: Date;
  image?: string;
}) {
  return {
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    url: abs(a.href),
    mainEntityOfPage: abs(a.href),
    datePublished: a.date.toISOString(),
    dateModified: (a.updated ?? a.date).toISOString(),
    inLanguage: 'ru',
    image: abs(a.image ?? '/og.png'),
    author: { '@id': personId, '@type': 'Person', name: 'Юлиана' },
    publisher: { '@id': orgId },
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
