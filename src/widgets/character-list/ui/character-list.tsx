import type { Person } from '@/shared/api/sw-api';
import { CharacterCard } from '@/entities/character/ui/character-card';

type Props = {
  items: Person[];
};

export const CharacterList = ({ items }: Props) => {
  if (items.length === 0) {
    return <div className="text-muted-foreground">No results found</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <CharacterCard key={item.entityId} person={item} />
      ))}
    </div>
  );
};
