export type Person = {
  entityId: number;
  id: string;
  name: string;
  gender: string;
  birthYearBBY: number | null;
  homeworld?: { name: string } | null;
};

export type PeopleResponse = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  results: Person[];
};

const BASE_URL = 'https://sw-next-api.vercel.app/api/v1';
const PEOPLE_PAGE_LIMIT = 12;

export async function fetchPeople(search: string, page = 1): Promise<PeopleResponse> {
  const url = new URL(`${BASE_URL}/people`);

  if (search) {
    url.searchParams.set('search', search);
  }

  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(PEOPLE_PAGE_LIMIT));

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data: PeopleResponse = await res.json();

  return data;
}
