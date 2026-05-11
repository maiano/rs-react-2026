import { Card } from '@/shared/ui';
import type { Person } from '@/shared/api/sw-api';
import { formatBirthYear } from '@/shared/lib/format/format-birth-year';

type Props = {
  person: Person;
};

export const CharacterCard = ({ person }: Props) => {
  return (
    <Card className="group space-y-4 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Character
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-tight text-card-foreground">
            {person.name}
          </h3>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-sm font-semibold text-muted-foreground transition group-hover:border-primary/40 group-hover:text-primary">
          #{person.entityId}
        </div>
      </div>

      <dl className="grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
          <dt className="text-muted-foreground">Gender</dt>
          <dd className="font-medium text-card-foreground">{person.gender}</dd>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
          <dt className="text-muted-foreground">Birth year</dt>
          <dd className="font-medium text-card-foreground">
            {formatBirthYear(person.birthYearBBY)}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
          <dt className="text-muted-foreground">Homeworld</dt>
          <dd className="font-medium text-card-foreground">
            {person.homeworld?.name ?? 'Unknown'}
          </dd>
        </div>
      </dl>
    </Card>
  );
};
