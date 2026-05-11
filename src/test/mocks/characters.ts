import type { Person } from '@/shared/api/sw-api';

export const mockPeople: Person[] = [
  {
    entityId: 1,
    id: 'luke-skywalker',
    name: 'Luke Skywalker',
    gender: 'male',
    birthYearBBY: -19,
    homeworld: { name: 'Tatooine' },
  },
  {
    entityId: 2,
    id: 'c-3po',
    name: 'C-3PO',
    gender: 'n/a',
    birthYearBBY: -112,
    homeworld: { name: 'Tatooine' },
  },
  {
    entityId: 3,
    id: 'r2-d2',
    name: 'R2-D2',
    gender: 'n/a',
    birthYearBBY: -33,
    homeworld: { name: 'Naboo' },
  },
];

export const mockPeopleResponse = {
  results: mockPeople,
};

export const personWithUnknownFields: Person = {
  entityId: 8,
  id: 'r5-d4',
  name: 'R5-D4',
  gender: 'n/a',
  birthYearBBY: null,
  homeworld: null,
};
