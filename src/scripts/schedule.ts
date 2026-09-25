// Расписание клуба для «живых» блоков: считает ближайшую игру по времени Нячанга (UTC+7).
export type Slot = { day: number; name: string; href: string };

// 0 — воскресенье, 4 — четверг
export const slots: Slot[] = [
  { day: 4, name: 'Авалон', href: '/avalon/' },
  { day: 5, name: 'Городская мафия', href: '/mafiya-nyachang/' },
  { day: 6, name: 'Тайный Гитлер', href: '/taynyy-gitler/' },
  { day: 0, name: 'Авалон', href: '/avalon/' },
];

const OFFSET = 7 * 3600e3;
const START_H = 19;
const END_H = 23;
const DAY_NAMES = ['в воскресенье', 'в понедельник', 'во вторник', 'в среду', 'в четверг', 'в пятницу', 'в субботу'];

export type Next = { slot: Slot; start: number; end: number; live: boolean; when: string };

export function nextGame(now = Date.now()): Next {
  const vn = new Date(now + OFFSET);
  const midnight = Date.UTC(vn.getUTCFullYear(), vn.getUTCMonth(), vn.getUTCDate()) - OFFSET;
  for (let d = 0; d < 8; d++) {
    const dow = (vn.getUTCDay() + d) % 7;
    const slot = slots.find((s) => s.day === dow);
    if (!slot) continue;
    const start = midnight + d * 864e5 + START_H * 3600e3;
    const end = midnight + d * 864e5 + END_H * 3600e3;
    if (end <= now) continue;
    const live = now >= start;
    const when = live ? 'идёт прямо сейчас' : d === 0 ? 'сегодня в 19:00' : d === 1 ? 'завтра в 19:00' : `${DAY_NAMES[dow]} в 19:00`;
    return { slot, start, end, live, when };
  }
  throw new Error('no slot');
}

export function countdown(ms: number): string {
  const t = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(t / 86400);
  const h = Math.floor((t % 86400) / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return d > 0 ? `${d} д ${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}:${pad(s)}`;
}
