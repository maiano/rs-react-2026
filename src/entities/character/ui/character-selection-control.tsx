'use client';

import type { SelectedItem } from '@/entities/character/model/selection.store';
import { useIsSelected, useToggleSelection } from '@/entities/character/model/selection.selectors';

type CharacterSelectionControlProps = {
  item: SelectedItem;
  label: string;
};

export function CharacterSelectionControl({ item, label }: CharacterSelectionControlProps) {
  const isSelected = useIsSelected(item.id);
  const toggle = useToggleSelection();

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
      <input
        type="checkbox"
        aria-label={label}
        checked={isSelected}
        onChange={() => toggle(item)}
        className="h-4 w-4 rounded border-border accent-primary"
      />
    </label>
  );
}
