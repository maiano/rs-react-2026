import { useState } from 'react';
import { Outlet } from 'react-router';
import { Card } from '@/shared/ui';
import { SearchBar } from '@/features/search';
import { Pagination } from '@/features/pagination';
import { CharacterList } from '@/widgets/character-list';
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage';
import { usePageParam } from '../model/use-page-param';
import { usePeopleSearch } from '../model/use-people-search';

const STORAGE_KEY = 'sw-search';

export function SearchPage() {
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(STORAGE_KEY, '');
  const [searchValue, setSearchValue] = useState(storedSearchTerm);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(storedSearchTerm);
  const { currentPage, updatePage } = usePageParam();
  const { items, loading, error, totalPages } = usePeopleSearch(submittedSearchTerm, currentPage);

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

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6 space-y-6">
        <Card className="p-6">
          <div className="mb-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Star Wars Database
            </p>

            <h1 className="text-subheading text-foreground">Find characters across the galaxy</h1>
          </div>

          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            loading={loading}
          />
        </Card>

        <Card className="p-6">
          <div>
            {loading && <div className="text-muted-foreground">Loading...</div>}

            {!loading && error && <div className="text-destructive">{error}</div>}

            {!loading && !error && <CharacterList items={items} />}
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

          <Outlet />
        </Card>
      </div>
    </main>
  );
}
