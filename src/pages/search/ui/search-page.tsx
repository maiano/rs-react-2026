import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useNavigate, useParams } from 'react-router';
import { peopleKeys } from '@/shared/api/query-keys';
import { Button, Card, Spinner } from '@/shared/ui';
import { usePeopleQuery } from '@/entities/character/api/use-people-query';
import { SearchBar } from '@/features/search';
import { Pagination } from '@/features/pagination';
import { CharacterList } from '@/widgets/character-list';
import { SelectedItemsFlyout } from '@/widgets/selected-items-flyout';
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage';
import { getCharactersRoute } from '@/shared/lib/routes/character-routes';
import { usePageParam } from '../model/use-page-param';

const STORAGE_KEY = 'sw-search';

export function SearchPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { detailsId } = useParams();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(STORAGE_KEY, '');
  const [searchValue, setSearchValue] = useState(storedSearchTerm);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(storedSearchTerm);
  const [searchInFlight, setSearchInFlight] = useState(false);
  const [refreshInFlight, setRefreshInFlight] = useState(false);
  const { currentPage, updatePage } = usePageParam();
  const { data, error, isPending, isFetching } = usePeopleQuery({
    search: submittedSearchTerm,
    page: currentPage,
  });
  const hasDetailsOpen = Boolean(detailsId);
  const items = data?.results ?? [];
  const totalPages = data?.pages ?? 0;
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const loading = isPending;
  const backgroundRefreshing = isFetching && !loading && !searchInFlight && !refreshInFlight;

  const shouldTrackSearchLoading = (search: string, page: number) => {
    const nextQueryState = queryClient.getQueryState(
      peopleKeys.list({
        search,
        page,
      })
    );

    return !nextQueryState?.data;
  };

  const handleRefresh = async () => {
    setRefreshInFlight(true);

    try {
      await queryClient.invalidateQueries({
        queryKey: peopleKeys.list({
          search: submittedSearchTerm,
          page: currentPage,
        }),
      });
    } finally {
      setRefreshInFlight(false);
    }
  };

  const handleSearch = () => {
    const trimmed = searchValue.trim();
    const nextPage = 1;

    if (trimmed === submittedSearchTerm) {
      setSearchValue(trimmed);

      if (currentPage !== 1) {
        setSearchInFlight(shouldTrackSearchLoading(trimmed, nextPage));
        updatePage(1);
      }

      return;
    }

    setSearchInFlight(shouldTrackSearchLoading(trimmed, nextPage));
    setStoredSearchTerm(trimmed);
    setSearchValue(trimmed);
    setSubmittedSearchTerm(trimmed);

    if (currentPage !== 1) {
      updatePage(1);
    }
  };

  const handleMainPanelClick = (event: MouseEvent<HTMLElement>) => {
    if (!hasDetailsOpen) return;

    const target = event.target as HTMLElement;

    if (target.closest('a,button,input')) return;

    navigate(getCharactersRoute(currentPage));
  };

  useEffect(() => {
    if (!hasDetailsOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      navigate(getCharactersRoute(currentPage));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, hasDetailsOpen, navigate]);

  useEffect(() => {
    if (!searchInFlight) return;

    const queryKey = peopleKeys.list({
      search: submittedSearchTerm,
      page: currentPage,
    });

    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      const queryState = queryClient.getQueryState(queryKey);

      if (queryState?.fetchStatus === 'idle') {
        setSearchInFlight(false);
      }
    });

    return unsubscribe;
  }, [currentPage, queryClient, searchInFlight, submittedSearchTerm]);

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6 space-y-6">
        <Card className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Star Wars Database
                </p>
                {backgroundRefreshing && (
                  <span className="text-xs text-muted-foreground">Refreshing...</span>
                )}
              </div>

              <h1 className="text-subheading text-foreground">
                Find characters across the galaxy
              </h1>
            </div>

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
          </div>

          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            loading={searchInFlight}
          />
        </Card>

        <div
          className={
            hasDetailsOpen
              ? 'grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-start xl:grid-cols-[minmax(0,1fr)_360px]'
              : 'grid gap-6'
          }
        >
          <Card className="p-6" onClick={handleMainPanelClick}>
            <div>
              {loading && <div className="text-muted-foreground">Loading...</div>}

              {!loading && error && <div className="text-destructive">{errorMessage}</div>}

              {!loading && !error && <CharacterList items={items} compact={hasDetailsOpen} />}
            </div>

            {!loading && !error && items.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={updatePage}
                />
              </div>
            )}
          </Card>

          {hasDetailsOpen && <Outlet />}
        </div>

        <SelectedItemsFlyout />
      </div>
    </main>
  );
}
