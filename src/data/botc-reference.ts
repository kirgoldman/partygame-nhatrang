import { roles as troubleRoles, teams } from './botc';
import { moonGroups, moonHref } from './once-in-a-blue-moon';
import { roleGroups, sectsAndViolets } from './sects-and-violets';

export const botcHref = '/krov-na-chasovoy-bashne/';
export const roleSearchHref = `${botcHref}poisk-personazhey/`;
export const nightOrderHref = `${botcHref}nochnoy-poryadok/`;

export const scenarios = [
  {
    id: 'trouble-brewing',
    title: 'Trouble Brewing',
    href: `${botcHref}trouble-brewing/`,
    roles: troubleRoles.map(({ img: id, slug, ru, en, team }) => ({
      id, slug, ru, en, category: teams[team].ruPlural,
    })),
  },
  {
    id: 'once-in-a-blue-moon',
    title: 'Once in a Blue Moon',
    href: moonHref,
    roles: moonGroups.flatMap(({ name: category, roles }) =>
      roles.map(([ru, en, id]) => ({ id, slug: id, ru, en, category })),
    ),
  },
  {
    id: 'sects-and-violets',
    ...sectsAndViolets,
    roles: roleGroups.flatMap(({ name: category, roles }) =>
      roles.map(([ru, en, id]) => ({ id, slug: id, ru, en, category })),
    ),
  },
] as const;

export type ScenarioId = (typeof scenarios)[number]['id'];
