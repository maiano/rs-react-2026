export type SearchParamsInput = Record<string, string | string[] | undefined>;

export type CharacterSearchParams = {
  page: number;
  search: string;
};

function readFirstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(value: string | string[] | undefined): number {
  const page = Number(readFirstParam(value));

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function parseCharacterSearchParams(
  searchParams: SearchParamsInput
): CharacterSearchParams {
  return {
    page: parsePage(searchParams.page),
    search: readFirstParam(searchParams.search)?.trim() ?? '',
  };
}
