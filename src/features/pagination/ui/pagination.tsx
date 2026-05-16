import { Button } from '@/shared/ui';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <span aria-hidden="true">&#8249;</span>
        {/* <span>Previous</span> */}
      </Button>

      {shouldShowLeadingEllipsis(pages) && (
        <span className="px-2 text-sm text-muted-foreground" aria-hidden="true">
          ...
        </span>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'secondary'}
          size="sm"
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {shouldShowTrailingEllipsis(pages, totalPages) && (
        <span className="px-2 text-sm text-muted-foreground" aria-hidden="true">
          ...
        </span>
      )}

      <Button
        variant="secondary"
        size="sm"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {/* <span>Next</span> */}
        <span aria-hidden="true">&#8250;</span>
      </Button>
    </nav>
  );
}
