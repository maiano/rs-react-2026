import type { Person } from '@/shared/api/sw-api';
import { Link } from '@/i18n/navigation';
import { CharacterCard } from '@/entities/character/ui/character-card';
import { CharacterSelectionControl } from '@/entities/character/ui/character-selection-control';
import { toSelectedItem } from '@/entities/character/model/selection.helpers';
import { getCharacterDetailsRoute } from '@/shared/lib/routes/character-routes';
import { cn } from '@/shared/lib/cn';

type CharacterListServerProps = {
  items: Person[];
  page: number;
  search: string;
  emptyMessage: string;
  selectionLabel: (name: string) => string;
  compact?: boolean;
};

export function CharacterListServer({
  items,
  page,
  search,
  emptyMessage,
  selectionLabel,
  compact = false,
}: CharacterListServerProps) {
  if (items.length === 0) {
    return <div className="text-muted-foreground">{emptyMessage}</div>;
  }

  return (
    <div
      className={cn(
        'grid gap-4',
        compact ? 'md:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {items.map((item) => (
        <div
          key={item.entityId}
          className="group overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between gap-4 bg-muted/55 px-4 py-3 transition-colors group-hover:bg-muted/75">
            <p className="text-xs font-medium uppercase text-muted-foreground">Selection</p>

            <CharacterSelectionControl
              item={toSelectedItem(item, page, search)}
              label={selectionLabel(item.name)}
            />
          </div>

          <Link
            href={getCharacterDetailsRoute(item.entityId, page, search)}
            className="block rounded-b-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
          >
            <CharacterCard person={item} />
          </Link>
        </div>
      ))}
    </div>
  );
}
