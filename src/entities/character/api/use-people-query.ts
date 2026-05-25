import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPeople } from '@/shared/api/sw-api';
import { peopleKeys } from '@/shared/api/query-keys';

type UsePeopleQueryParams = {
  search: string;
  page: number;
};

export function usePeopleQuery({ search, page }: UsePeopleQueryParams) {
  return useQuery({
    queryKey: peopleKeys.list({ search, page }),
    queryFn: () => fetchPeople(search, page),
    placeholderData: keepPreviousData,
  });
}
