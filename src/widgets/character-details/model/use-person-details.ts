import { useEffect, useRef, useState } from 'react';
import { fetchPerson, type Person } from '@/shared/api/sw-api';

type DetailsState = {
  key: string;
  item: Person | null;
  error: string | null;
};

export function usePersonDetails(detailsId?: string) {
  const requestIdRef = useRef(0);
  const [state, setState] = useState<DetailsState>({
    key: '',
    item: null,
    error: null,
  });

  useEffect(() => {
    if (!detailsId) return;

    const currentRequest = ++requestIdRef.current;

    fetchPerson(detailsId)
      .then((item) => {
        if (currentRequest !== requestIdRef.current) return;

        setState({
          key: detailsId,
          item,
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (currentRequest !== requestIdRef.current) return;

        setState({
          key: detailsId,
          item: null,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      });
  }, [detailsId]);

  return {
    item: state.key === detailsId ? state.item : null,
    error: state.key === detailsId ? state.error : null,
    loading: Boolean(detailsId) && state.key !== detailsId,
  };
}
