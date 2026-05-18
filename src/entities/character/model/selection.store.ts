import { create } from 'zustand';

export type SelectedItem = {
  id: number;
  slug: string;
  name: string;
  detailsUrl: string;
  gender: string;
  birthYearBBY: number | null;
  homeworldName: string | null;
  faction: string | null;
  isForceUser: boolean;
};

type SelectionState = {
  selected: Record<number, SelectedItem>;

  toggle: (item: SelectedItem) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useSelectionStore = create<SelectionState>((set) => ({
  selected: {},

  toggle: (item) =>
    set((state) => {
      const exists = state.selected[item.id];

      if (exists) {
        const next = { ...state.selected };
        delete next[item.id];
        return { selected: next };
      }

      return {
        selected: {
          ...state.selected,
          [item.id]: item,
        },
      };
    }),

  remove: (id) =>
    set((state) => {
      const next = { ...state.selected };
      delete next[id];
      return { selected: next };
    }),

  clear: () => set({ selected: {} }),
}));
