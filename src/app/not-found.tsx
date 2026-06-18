import { Card } from '@/shared/ui';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-10">
        <Card className="mx-auto max-w-2xl p-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Error 404
          </p>

          <h1 className="mt-3 text-heading text-card-foreground">Page not found</h1>

          <p className="mt-4 text-body-sm text-muted-foreground">
            The route you requested does not exist or is still under construction.
          </p>
        </Card>
      </div>
    </main>
  );
}
