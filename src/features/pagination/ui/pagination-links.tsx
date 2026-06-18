import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/cn';
import { getCharacterDetailsRoute, getCharactersRoute } from '@/shared/lib/routes/character-routes';

type PaginationLinksProps = {
  currentPage: number;
  totalPages: number;
  search: string;
  detailsId?: string;
};

const MAX_VISIBLE_PAGES = 5;

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const halfWindow = Math.floor(MAX_VISIBLE_PAGES / 2);
  let startPage = Math.max(1, currentPage - halfWindow);
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - MAX_VISIBLE_PAGES + 1;
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}

function shouldShowLeadingEllipsis(pages: number[]) {
  return pages[0] > 1;
}

function shouldShowTrailingEllipsis(pages: number[], totalPages: number) {
  return pages[pages.length - 1] < totalPages;
}

function pageLinkClassName(active = false) {
  return cn(
    'inline-flex h-8 items-center justify-center rounded-xl px-3 text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15',
    active
      ? 'bg-primary text-primary-foreground'
      : 'border border-border bg-secondary text-secondary-foreground shadow-sm hover:border-primary/35 hover:bg-[color-mix(in_oklch,var(--secondary)_72%,var(--primary)_28%)] hover:text-foreground hover:shadow-sm'
  );
}

export function PaginationLinks({
  currentPage,
  totalPages,
  search,
  detailsId,
}: PaginationLinksProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);
  const getPageRoute = (page: number) =>
    detailsId ? getCharacterDetailsRoute(detailsId, page, search) : getCharactersRoute(page, search);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={getPageRoute(currentPage - 1)}
          className={pageLinkClassName()}
          aria-label="Previous page"
        >
          <span aria-hidden="true">&#8249;</span>
        </Link>
      ) : (
        <span className={cn(pageLinkClassName(), 'pointer-events-none opacity-50')}>
          <span aria-hidden="true">&#8249;</span>
        </span>
      )}

      {shouldShowLeadingEllipsis(pages) && (
        <span className="px-2 text-sm text-muted-foreground" aria-hidden="true">
          ...
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageRoute(page)}
          className={pageLinkClassName(page === currentPage)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {shouldShowTrailingEllipsis(pages, totalPages) && (
        <span className="px-2 text-sm text-muted-foreground" aria-hidden="true">
          ...
        </span>
      )}

      {currentPage < totalPages ? (
        <Link
          href={getPageRoute(currentPage + 1)}
          className={pageLinkClassName()}
          aria-label="Next page"
        >
          <span aria-hidden="true">&#8250;</span>
        </Link>
      ) : (
        <span className={cn(pageLinkClassName(), 'pointer-events-none opacity-50')}>
          <span aria-hidden="true">&#8250;</span>
        </span>
      )}
    </nav>
  );
}
