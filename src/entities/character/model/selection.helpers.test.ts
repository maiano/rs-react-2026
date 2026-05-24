import { describe, expect, it } from 'vitest';
import { toSelectedItem } from './selection.helpers';
import { mockPeople, personWithUnknownFields } from '@/test/mocks/characters';

describe('toSelectedItem', () => {
  it('maps a person into a selected item snapshot', () => {
    expect(toSelectedItem(mockPeople[0], 3)).toEqual({
      id: 1,
      slug: 'luke-skywalker',
      name: 'Luke Skywalker',
      detailsUrl: '/characters/1?page=3',
      gender: 'male',
      birthYearBBY: -19,
      homeworldName: 'Tatooine',
      faction: 'rebels',
      isForceUser: true,
    });
  });

  it('falls back for missing optional values', () => {
    expect(toSelectedItem(personWithUnknownFields, '1')).toEqual({
      id: 8,
      slug: 'r5-d4',
      name: 'R5-D4',
      detailsUrl: '/characters/8?page=1',
      gender: 'n/a',
      birthYearBBY: null,
      homeworldName: null,
      faction: null,
      isForceUser: false,
    });
  });
});
