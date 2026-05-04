import { Card } from '@/shared/ui';
import type { Person } from '@/shared/api/sw-api';

type Props = {
  person: Person;
};

export const CharacterCard = ({ person }: Props) => {
  return (
    <Card className="p-4 space-y-2">
      <h3 className="text-heading">{person.name}</h3>

      <p className="text-body-sm text-muted-foreground">Gender: {person.gender}</p>

      <p className="text-body-sm text-muted-foreground">
        Birth: {person.birthYearBBY ?? 'Unknown'}
      </p>

      <p className="text-body-sm text-muted-foreground">
        Homeworld: {person.homeworld?.name ?? 'Unknown'}
      </p>
    </Card>
  );
};
