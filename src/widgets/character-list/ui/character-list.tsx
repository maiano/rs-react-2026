import { Link, useParams, useSearchParams } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { getCharacterDetailsRoute } from '@/shared/lib/routes/character-routes';
import type { Person } from '@/shared/api/sw-api';
import { CharacterCard } from '@/entities/character/ui/character-card';

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
        <Link
          key={item.entityId}
          to={getCharacterDetailsRoute(item.entityId, page)}
          className="block rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
          aria-current={String(item.entityId) === detailsId ? 'page' : undefined}
        >
          <CharacterCard person={item} isActive={String(item.entityId) === detailsId} />
        </Link>
      ))}
    </div>
  );
};
