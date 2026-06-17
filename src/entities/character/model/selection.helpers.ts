import type { Person } from '@/shared/api/sw-api';
import type { SelectedItem } from './selection.store';
import { getCharacterDetailsRoute } from '@/shared/lib/routes/character-routes';

export function toSelectedItem(
  person: Person,
  page: number | string,
  search = ''
): SelectedItem {
  return {
    id: person.entityId,
    slug: person.id,
    name: person.name,
    detailsUrl: getCharacterDetailsRoute(person.entityId, page, search),
    gender: person.gender,
    birthYearBBY: person.birthYearBBY,
    homeworldName: person.homeworld?.name ?? null,
    faction: person.meta?.faction ?? null,
    isForceUser: Boolean(person.meta?.isForceUser),
  };
}
