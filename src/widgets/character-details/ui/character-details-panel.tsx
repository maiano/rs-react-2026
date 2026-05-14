import { Link, useParams, useSearchParams } from 'react-router';
import { Card, Button } from '@/shared/ui';

export function CharacterDetailsPanel() {
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  return (
    <aside className="xl:sticky xl:top-6">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Details
            </p>

            <h2 className="mt-2 text-subheading font-heading text-card-foreground">
              Character #{detailsId}
            </h2>
          </div>

          <Link to={`/characters?page=${page}`}>
            <Button variant="ghost" size="sm">
              Close
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-body-sm text-muted-foreground">
          This details panel is wired to a nested route.
        </p>
      </Card>
    </aside>
  );
}
