import { Card } from '@/shared/ui';
import type { Person } from '@/shared/api/sw-api';
import { formatBirthYear } from '@/shared/lib/format/format-birth-year';
import { cn } from '@/shared/lib/cn';

type Props = {
  person: Person;
  isActive?: boolean;
};

export const CharacterCard = ({ person, isActive = false }: Props) => {
  return (
    <Card
      className={cn(
        'group space-y-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md',
        isActive && 'border-primary/50 shadow-md'
      )}
    >
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

        <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
          <dt className="text-muted-foreground">Force user</dt>
          <dd className="font-medium text-card-foreground">
            {person.meta?.isForceUser ? 'Yes' : 'No'}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
          <dt className="text-muted-foreground">Faction</dt>
          <dd className="font-medium capitalize text-card-foreground">
            {person.meta?.faction ?? 'Unknown'}
          </dd>
        </div>
      </dl>
    </Card>
  );
};
