import { beforeEach, describe, expect, it } from 'vitest';
import { useSelectionStore, type SelectedItem } from './selection.store';

const firstItem: SelectedItem = {
  id: 1,
  slug: 'luke-skywalker',
  name: 'Luke Skywalker',
  detailsUrl: '/characters/1?page=1',
  gender: 'male',
  birthYearBBY: -19,
  homeworldName: 'Tatooine',
  faction: 'rebels',
  isForceUser: true,
};

const secondItem: SelectedItem = {
  id: 2,
  slug: 'c-3po',
  name: 'C-3PO',
  detailsUrl: '/characters/2?page=1',
  gender: 'n/a',
  birthYearBBY: -112,
  homeworldName: 'Tatooine',
  faction: 'unknown',
  isForceUser: false,
};

describe('selection store', () => {
  beforeEach(() => {
    useSelectionStore.setState({ selected: {} });
  });

  it('adds and removes an item via toggle', () => {
    useSelectionStore.getState().toggle(firstItem);
    expect(useSelectionStore.getState().selected).toEqual({ 1: firstItem });

    useSelectionStore.getState().toggle(firstItem);
    expect(useSelectionStore.getState().selected).toEqual({});
  });

  it('removes a specific item', () => {
    useSelectionStore.setState({ selected: { 1: firstItem, 2: secondItem } });

    useSelectionStore.getState().remove(1);

    expect(useSelectionStore.getState().selected).toEqual({ 2: secondItem });
  });

  it('clears all selected items', () => {
    useSelectionStore.setState({ selected: { 1: firstItem, 2: secondItem } });

    useSelectionStore.getState().clear();

    expect(useSelectionStore.getState().selected).toEqual({});
  });
});
