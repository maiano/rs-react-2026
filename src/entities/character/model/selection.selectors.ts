import { useShallow } from 'zustand/react/shallow';
import { useSelectionStore } from './selection.store';

export const useIsSelected = (id: number) => useSelectionStore((s) => Boolean(s.selected[id]));

export const useSelectedCount = () => useSelectionStore((s) => Object.keys(s.selected).length);

export const useSelectedItems = () => useSelectionStore(useShallow((s) => Object.values(s.selected)));

export const useToggleSelection = () => useSelectionStore((s) => s.toggle);

export const useRemoveSelection = () => useSelectionStore((s) => s.remove);

export const useClearSelection = () => useSelectionStore((s) => s.clear);

export const useSelectedIds = () => useSelectionStore((s) => Object.keys(s.selected));
