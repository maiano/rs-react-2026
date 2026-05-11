export type Person = {
  entityId: number;
  id: string;
  name: string;
  gender: string;
  birthYearBBY: number | null;
  homeworld?: { name: string } | null;
};

type ApiResponse = {
  results: Person[];
};

const BASE_URL = 'https://sw-next-api.vercel.app/api/v1';

export async function fetchPeople(search: string): Promise<Person[]> {
  const url = new URL(`${BASE_URL}/people`);

  if (search) {
    url.searchParams.set('search', search);
  }

  url.searchParams.set('page', '1');
  url.searchParams.set('limit', '10');

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data: ApiResponse = await res.json();

  return data.results;
}
