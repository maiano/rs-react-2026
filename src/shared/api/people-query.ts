import { useQuery } from '@tanstack/react-query';
import { fetchPeople } from './sw-api';
import { peopleKeys } from './query-keys';

export function usePeopleListQuery(search: string, page: number) {
  return useQuery({
    queryKey: peopleKeys.list({ search, page }),
    queryFn: () => fetchPeople(search, page),
  });
}
