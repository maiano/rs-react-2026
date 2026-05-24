import { afterEach, describe, expect, it, vi } from 'vitest';
import { downloadSelectedItems } from './download-selected-items';
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

describe('downloadSelectedItems', () => {
  const originalCreateObjectUrl = URL.createObjectURL;
  const originalRevokeObjectUrl = URL.revokeObjectURL;

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectUrl;
    URL.revokeObjectURL = originalRevokeObjectUrl;
    vi.restoreAllMocks();
  });

  it('creates a csv download with useful fields and count in the filename', async () => {
    const createObjectURL = vi.fn((blob: Blob) => {
      expect(blob).toBeInstanceOf(Blob);
      return 'blob:test-url';
    });
    const revokeObjectURL = vi.fn();
    const link = document.createElement('a');
    const click = vi.fn();

    link.click = click;
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;

    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(link);

    downloadSelectedItems(selectedItems);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(link.href).toBe('blob:test-url');
    expect(link.download).toBe('2_items.csv');
    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-url');

    const blob = createObjectURL.mock.calls[0]?.[0];

    expect(blob).toBeDefined();

    if (!blob) {
      throw new Error('Expected CSV blob to be created');
    }

    await expect(blob.text()).resolves.toContain('"Luke ""Red Five"" Skywalker"');
    await expect(blob.text()).resolves.toContain('"Unknown"');
    await expect(blob.text()).resolves.toContain('"Yes"');
    await expect(blob.text()).resolves.toContain('"No"');
    await expect(blob.text()).resolves.toContain('"details_url"');
  });
});
