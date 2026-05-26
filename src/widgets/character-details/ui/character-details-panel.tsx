import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { usePersonQuery } from '@/entities/character/api/use-person-query';
import { peopleKeys } from '@/shared/api/query-keys';
import { Button, Card, Spinner } from '@/shared/ui';
import { formatBirthYear } from '@/shared/lib/format/format-birth-year';
import { getCharactersRoute } from '@/shared/lib/routes/character-routes';

export function CharacterDetailsPanel() {
  const queryClient = useQueryClient();
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const [refreshInFlight, setRefreshInFlight] = useState(false);
  const { data: item, error, isPending } = usePersonQuery(detailsId);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const loading = isPending;

  const handleRefresh = async () => {
    if (!detailsId) return;

    setRefreshInFlight(true);
    try {
      await queryClient.invalidateQueries({
        queryKey: peopleKeys.detail(detailsId),
      });
    } finally {
      setRefreshInFlight(false);
    }
  };

  return (
    <aside className="md:sticky md:top-6">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Details</p>

            <h2 className="mt-2 text-subheading font-heading text-card-foreground">
              Character #{detailsId}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              loading={refreshInFlight}
              className="min-w-32 border border-border"
              onClick={() => {
                void handleRefresh();
              }}
              render={({ loading: isLoading }) => (
                <>
                  {isLoading && <Spinner size="sm" />}
                  <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                </>
              )}
            >
              Refresh
            </Button>

            <Link to={getCharactersRoute(page)}>
              <Button variant="secondary" size="sm">
                Close
              </Button>
            </Link>
          </div>
        </div>

        {loading && (
          <div className="mt-6 flex items-center gap-3 text-body-sm text-muted-foreground">
            <Spinner size="sm" />
            <span>Loading details...</span>
          </div>
        )}

        {!loading && error && <p className="mt-4 text-body-sm text-destructive">{errorMessage}</p>}

        {!loading && !error && item && (
          <div className="mt-6 space-y-5">
            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium text-card-foreground">{item.name}</dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">Gender</dt>
                <dd className="font-medium text-card-foreground">{item.gender}</dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">Birth year</dt>
                <dd className="font-medium text-card-foreground">
                  {formatBirthYear(item.birthYearBBY)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">Homeworld</dt>
                <dd className="font-medium text-card-foreground">
                  {item.homeworld?.name ?? 'Unknown'}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">Height</dt>
                <dd className="font-medium text-card-foreground">
                  {item.heightCm !== null ? `${item.heightCm} cm` : 'Unknown'}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">Mass</dt>
                <dd className="font-medium text-card-foreground">
                  {item.massKg !== null ? `${item.massKg} kg` : 'Unknown'}
                </dd>
              </div>
            </dl>

            <div className="space-y-3 border-t border-border pt-4 text-sm">
              <p className="text-muted-foreground">Alignment</p>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Force user</dt>
                  <dd className="font-medium text-card-foreground">
                    {item.meta?.isForceUser ? 'Yes' : 'No'}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Jedi</dt>
                  <dd className="font-medium text-card-foreground">
                    {item.meta?.isJedi ? 'Yes' : 'No'}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Sith</dt>
                  <dd className="font-medium text-card-foreground">
                    {item.meta?.isSith ? 'Yes' : 'No'}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Faction</dt>
                  <dd className="font-medium capitalize text-card-foreground">
                    {item.meta?.faction ?? 'Unknown'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3 border-t border-border pt-4 text-sm">
              <p className="text-muted-foreground">Films</p>
              <p className="font-medium text-card-foreground">
                {item.films.length ? item.films.map((film) => film.title).join(', ') : 'Unknown'}
              </p>
            </div>

            <div className="space-y-3 border-t border-border pt-4 text-sm">
              <p className="text-muted-foreground">Species</p>
              <p className="font-medium text-card-foreground">
                {item.species.length
                  ? item.species.map((species) => species.name).join(', ')
                  : 'Unknown'}
              </p>
            </div>

            <div className="space-y-3 border-t border-border pt-4 text-sm">
              <p className="text-muted-foreground">Vehicles</p>
              <p className="font-medium text-card-foreground">
                {item.vehicles.length
                  ? item.vehicles.map((vehicle) => vehicle.name).join(', ')
                  : 'Unknown'}
              </p>
            </div>

            <div className="space-y-3 border-t border-border pt-4 text-sm">
              <p className="text-muted-foreground">Starships</p>
              <p className="font-medium text-card-foreground">
                {item.starships.length
                  ? item.starships.map((starship) => starship.name).join(', ')
                  : 'Unknown'}
              </p>
            </div>
          </div>
        )}
      </Card>
    </aside>
  );
}
