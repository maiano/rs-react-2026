import { useShallow } from 'zustand/react/shallow';
import { useSelectionStore } from './selection.store';

export const useIsSelected = (id: number) => useSelectionStore((s) => Boolean(s.selected[id]));

export const useSelectedCount = () => useSelectionStore((s) => Object.keys(s.selected).length);

export const useSelectedItems = () => useSelectionStore((s) => Object.values(s.selected));

export const useSelectionActions = () =>
  useSelectionStore(
    useShallow((s) => ({
      toggle: s.toggle,
      remove: s.remove,
      clear: s.clear,
    }))
  );

export const useSelectedIds = () => useSelectionStore((s) => Object.keys(s.selected));
