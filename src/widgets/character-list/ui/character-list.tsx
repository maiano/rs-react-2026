import { Link, useParams, useSearchParams } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { getCharacterDetailsRoute } from '@/shared/lib/routes/character-routes';
import type { Person } from '@/shared/api/sw-api';
import { CharacterCard } from '@/entities/character/ui/character-card';
import { useIsSelected, useToggleSelection } from '@/entities/character/model/selection.selectors';
import { toSelectedItem } from '@/entities/character/model/selection.helpers';

type CharacterListItemProps = {
  item: Person;
  detailsId?: string;
  page: string;
};

const CharacterListItem = ({ item, detailsId, page }: CharacterListItemProps) => {
  const isSelected = useIsSelected(item.entityId);
  const toggle = useToggleSelection();

  return (
    <div className="group overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-center justify-between gap-4 bg-muted/55 px-4 py-3 transition-colors group-hover:bg-muted/75">
        <p className="text-xs font-medium uppercase text-muted-foreground">Selection</p>

        <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <input
            type="checkbox"
            aria-label={`Select ${item.name}`}
            checked={isSelected}
            onChange={() => toggle(toSelectedItem(item, page))}
            onClick={(event) => event.stopPropagation()}
            className="h-4 w-4 rounded border-border accent-primary"
          />
        </label>
      </div>

      <Link
        to={getCharacterDetailsRoute(item.entityId, page)}
        className="block rounded-b-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
        aria-current={String(item.entityId) === detailsId ? 'page' : undefined}
      >
        <CharacterCard person={item} isActive={String(item.entityId) === detailsId} />
      </Link>
    </div>
  );
};

type Props = {
  items: Person[];
  compact?: boolean;
};

export const CharacterList = ({ items, compact = false }: Props) => {
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  if (items.length === 0) {
    return <div className="text-muted-foreground">No results found</div>;
  }

  return (
    <div
      className={cn(
        'grid gap-4',
        compact ? 'md:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {items.map((item) => (
        <CharacterListItem key={item.entityId} item={item} detailsId={detailsId} page={page} />
      ))}
    </div>
  );
};
