import type { Person } from '@/shared/api/sw-api';
import { Link } from '@/i18n/navigation';
import { CharacterCard } from '@/entities/character/ui/character-card';
import { getCharacterDetailsRoute } from '@/shared/lib/routes/character-routes';

type CharacterListServerProps = {
  items: Person[];
  page: number;
  search: string;
  emptyMessage: string;
};

export function CharacterListServer({
  items,
  page,
  search,
  emptyMessage,
}: CharacterListServerProps) {
  if (items.length === 0) {
    return <div className="text-muted-foreground">{emptyMessage}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.entityId}
          href={getCharacterDetailsRoute(item.entityId, page, search)}
          className="block rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
        >
          <CharacterCard person={item} />
        </Link>
      ))}
    </div>
  );
}
