import { useQuery } from '@tanstack/react-query';
import { fetchPerson } from '@/shared/api/sw-api';
import { peopleKeys } from '@/shared/api/query-keys';

export function usePersonQuery(detailsId?: string) {
  return useQuery({
    queryKey: peopleKeys.detail(detailsId ?? ''),
    queryFn: () => fetchPerson(detailsId ?? ''),
    enabled: Boolean(detailsId),
  });
}
