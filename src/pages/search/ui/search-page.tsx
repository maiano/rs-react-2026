import { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import { SearchBar } from '@/features/search';
import { CharacterList } from '@/widgets/character-list';
import { fetchPeople, type Person } from '@/shared/api/sw-api';

export function SearchPage() {
  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const handleSearch = async (term: string) => {
    const currentRequest = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPeople(term);

      if (currentRequest !== requestIdRef.current) return;

      setItems(data);
      setLoading(false);
    } catch (err) {
      if (currentRequest !== requestIdRef.current) return;

      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6 space-y-6">
        <section className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <div className="mb-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Star Wars Database
            </p>

            <h1 className="text-subheading text-foreground">Find characters across the galaxy</h1>
          </div>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </section>

        <section className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <div>
            {loading && <div className="text-muted-foreground">Loading...</div>}

            {!loading && error && <div className="text-destructive">{error}</div>}

            {!loading && !error && <CharacterList items={items} />}
          </div>

          <Outlet />
        </section>
      </div>
    </main>
  );
}
