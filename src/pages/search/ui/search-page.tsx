import { Outlet } from 'react-router';
import { Card } from '@/shared/ui';
import { SearchBar } from '@/features/search';

export function SearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6 space-y-6">
        <section className="space-y-2">
          <p className="text-xs font-medium uppercase text-muted-foreground">Star Wars Database</p>

          <h1 className="text-heading text-foreground">Character Search</h1>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <div className="space-y-6">
            <Card className="p-4">
              <SearchBar onSearch={() => {}} />
            </Card>

            <Card className="p-6">
              <h2 className="text-subheading font-heading text-card-foreground">Results Area</h2>

              <p className="mt-3 text-body-sm text-muted-foreground">
                This page now owns the main search route.
              </p>
            </Card>
          </div>

          <Outlet />
        </div>
      </div>
    </main>
  );
}
