import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Card } from '@/shared/ui';
import { SearchBar } from '@/features/search';
import { Pagination } from '@/features/pagination';
import { CharacterList } from '@/widgets/character-list';
import { SelectedItemsFlyout } from '@/widgets/selected-items-flyout';
import { usePeopleListQuery } from '@/shared/api/people-query';
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage';
import { getCharactersRoute } from '@/shared/lib/routes/character-routes';
import { usePageParam } from '../model/use-page-param';

const STORAGE_KEY = 'sw-search';

export function SearchPage() {
  const navigate = useNavigate();
  const { detailsId } = useParams();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(STORAGE_KEY, '');
  const [searchValue, setSearchValue] = useState(storedSearchTerm);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(storedSearchTerm);
  const { currentPage, updatePage } = usePageParam();
  const { data, error, isPending, isFetching } = usePeopleListQuery(submittedSearchTerm, currentPage);
  const hasDetailsOpen = Boolean(detailsId);
  const items = data?.results ?? [];
  const totalPages = data?.pages ?? 0;
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const loading = isPending;

  const handleSearch = () => {
    const trimmed = searchValue.trim();

    if (trimmed === submittedSearchTerm) {
      if (currentPage !== 1) {
        updatePage(1);
      }

      setSearchValue(trimmed);
      return;
    }

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

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6 space-y-6">
        <Card className="p-6">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Star Wars Database
              </p>
              {isFetching && !loading && (
                <span className="text-xs text-muted-foreground">Refreshing...</span>
              )}
            </div>

            <h1 className="text-subheading text-foreground">Find characters across the galaxy</h1>
          </div>

          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            loading={loading}
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
