import type { Person } from '@/shared/api/sw-api';
import { Link } from '@/i18n/navigation';
import { Card } from '@/shared/ui';
import { formatBirthYear } from '@/shared/lib/format/format-birth-year';
import { getCharactersRoute } from '@/shared/lib/routes/character-routes';
import { CloseDetailsOnEscape } from './close-details-on-escape';

type DetailLabel = {
  name: string;
  gender: string;
  birthYear: string;
  homeworld: string;
  height: string;
  mass: string;
  alignment: string;
  forceUser: string;
  jedi: string;
  sith: string;
  faction: string;
  films: string;
  species: string;
  vehicles: string;
  starships: string;
  unknown: string;
  yes: string;
  no: string;
  close: string;
};

type CharacterDetailsPanelServerProps = {
  item: Person;
  page: number;
  search: string;
  title: string;
  labels: DetailLabel;
};

function joinNames<T extends { name: string }>(items: T[], unknown: string) {
  return items.length ? items.map((item) => item.name).join(', ') : unknown;
}

function joinFilmTitles(items: Array<{ title: string }>, unknown: string) {
  return items.length ? items.map((item) => item.title).join(', ') : unknown;
}

export function CharacterDetailsPanelServer({
  item,
  page,
  search,
  title,
  labels,
}: CharacterDetailsPanelServerProps) {
  const closeHref = getCharactersRoute(page, search);

  return (
    <aside className="md:sticky md:top-24">
      <CloseDetailsOnEscape href={closeHref} />
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">{title}</p>

            <h2 className="mt-2 text-subheading font-heading text-card-foreground">
              Character #{item.entityId}
            </h2>
          </div>

          <Link
            href={closeHref}
            className="inline-flex h-8 items-center justify-center rounded-xl border border-border bg-secondary px-3 text-xs font-medium text-secondary-foreground shadow-sm transition-all duration-200 hover:border-primary/35 hover:bg-[color-mix(in_oklch,var(--secondary)_72%,var(--primary)_28%)] hover:text-foreground hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
          >
            {labels.close}
          </Link>
        </div>

        <div className="mt-6 space-y-5">
          <dl className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <dt className="text-muted-foreground">{labels.name}</dt>
              <dd className="font-medium text-card-foreground">{item.name}</dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <dt className="text-muted-foreground">{labels.gender}</dt>
              <dd className="font-medium text-card-foreground">{item.gender}</dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <dt className="text-muted-foreground">{labels.birthYear}</dt>
              <dd className="font-medium text-card-foreground">
                {formatBirthYear(item.birthYearBBY)}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <dt className="text-muted-foreground">{labels.homeworld}</dt>
              <dd className="font-medium text-card-foreground">
                {item.homeworld?.name ?? labels.unknown}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <dt className="text-muted-foreground">{labels.height}</dt>
              <dd className="font-medium text-card-foreground">
                {item.heightCm !== null ? `${item.heightCm} cm` : labels.unknown}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <dt className="text-muted-foreground">{labels.mass}</dt>
              <dd className="font-medium text-card-foreground">
                {item.massKg !== null ? `${item.massKg} kg` : labels.unknown}
              </dd>
            </div>
          </dl>

          <div className="space-y-3 border-t border-border pt-4 text-sm">
            <p className="text-muted-foreground">{labels.alignment}</p>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">{labels.forceUser}</dt>
                <dd className="font-medium text-card-foreground">
                  {item.meta?.isForceUser ? labels.yes : labels.no}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">{labels.jedi}</dt>
                <dd className="font-medium text-card-foreground">
                  {item.meta?.isJedi ? labels.yes : labels.no}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">{labels.sith}</dt>
                <dd className="font-medium text-card-foreground">
                  {item.meta?.isSith ? labels.yes : labels.no}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">{labels.faction}</dt>
                <dd className="font-medium capitalize text-card-foreground">
                  {item.meta?.faction ?? labels.unknown}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-3 border-t border-border pt-4 text-sm">
            <p className="text-muted-foreground">{labels.films}</p>
            <p className="font-medium text-card-foreground">
              {joinFilmTitles(item.films, labels.unknown)}
            </p>
          </div>

          <div className="space-y-3 border-t border-border pt-4 text-sm">
            <p className="text-muted-foreground">{labels.species}</p>
            <p className="font-medium text-card-foreground">
              {joinNames(item.species, labels.unknown)}
            </p>
          </div>

          <div className="space-y-3 border-t border-border pt-4 text-sm">
            <p className="text-muted-foreground">{labels.vehicles}</p>
            <p className="font-medium text-card-foreground">
              {joinNames(item.vehicles, labels.unknown)}
            </p>
          </div>

          <div className="space-y-3 border-t border-border pt-4 text-sm">
            <p className="text-muted-foreground">{labels.starships}</p>
            <p className="font-medium text-card-foreground">
              {joinNames(item.starships, labels.unknown)}
            </p>
          </div>
        </div>
      </Card>
    </aside>
  );
}
