import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchPeople, type Person } from '@/shared/api/sw-api';

type SearchState = {
  key: string;
  items: Person[];
  error: string | null;
  totalPages: number;
};

export function usePeopleSearch(searchTerm: string, page: number) {
  const requestIdRef = useRef(0);
  const requestKey = useMemo(() => `${searchTerm}::${page}`, [page, searchTerm]);
  const [state, setState] = useState<SearchState>({
    key: '',
    items: [],
    error: null,
    totalPages: 0,
  });

  useEffect(() => {
    const currentRequest = ++requestIdRef.current;

    fetchPeople(searchTerm, page)
      .then((data) => {
        if (currentRequest !== requestIdRef.current) return;

        setState({
          key: requestKey,
          items: data.results,
          error: null,
          totalPages: data.pages,
        });
      })
      .catch((err: unknown) => {
        if (currentRequest !== requestIdRef.current) return;

        setState({
          key: requestKey,
          items: [],
          error: err instanceof Error ? err.message : 'Unknown error',
          totalPages: 0,
        });
      });
  }, [page, requestKey, searchTerm]);

  const loading = state.key !== requestKey;

  return {
    items: state.items,
    loading,
    error: state.error,
    totalPages: state.totalPages,
  };
}
