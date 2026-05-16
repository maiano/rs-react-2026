import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam ?? '1');
  const currentPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  useEffect(() => {
    if (pageParam === String(currentPage)) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(currentPage));

    setSearchParams(nextParams, { replace: true });
  }, [currentPage, pageParam, searchParams, setSearchParams]);

  const updatePage = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(page));
    setSearchParams(nextParams);
  };

  return { currentPage, updatePage };
}
