export const peopleKeys = {
  all: ['people'] as const,

  lists: () => [...peopleKeys.all, 'list'] as const,

  list: (params: { search: string; page: number }) => [...peopleKeys.lists(), params] as const,

  details: () => [...peopleKeys.all, 'detail'] as const,

  detail: (id: string) => [...peopleKeys.details(), id] as const,
};
