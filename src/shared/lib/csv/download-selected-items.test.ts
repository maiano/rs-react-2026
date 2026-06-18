import { describe, expect, it } from 'vitest';
import { createSelectedItemsCsv } from './create-selected-items-csv';
import type { SelectedItem } from '@/entities/character/model/selection.store';

const selectedItems: SelectedItem[] = [
  {
    id: 1,
    slug: 'luke-skywalker',
    name: 'Luke "Red Five" Skywalker',
    detailsUrl: '/characters/1?page=2',
    gender: 'male',
    birthYearBBY: -19,
    homeworldName: 'Tatooine',
    faction: 'rebels',
    isForceUser: true,
  },
  {
    id: 2,
    slug: 'r5-d4',
    name: 'R5-D4',
    detailsUrl: '/characters/2?page=2',
    gender: 'n/a',
    birthYearBBY: null,
    homeworldName: null,
    faction: null,
    isForceUser: false,
  },
];

describe('createSelectedItemsCsv', () => {
  it('creates csv content with useful fields', () => {
    const csv = createSelectedItemsCsv(selectedItems);

    expect(csv).toContain('"Luke ""Red Five"" Skywalker"');
    expect(csv).toContain('"Unknown"');
    expect(csv).toContain('"Yes"');
    expect(csv).toContain('"No"');
    expect(csv).toContain('"details_url"');
  });
});
