export type Person = {
  entityId: number;
  id: string;
  name: string;
  heightCm: number | null;
  massKg: number | null;
  gender: string;
  birthYearBBY: number | null;
  homeworld: { entityId?: number; id?: string; name: string } | null;
  films: Array<{ entityId?: number; id?: string; title: string; episode?: number }>;
  species: Array<{ entityId?: number; id?: string; name: string }>;
  vehicles: Array<{ entityId?: number; id?: string; name: string }>;
  starships: Array<{ entityId?: number; id?: string; name: string }>;
  meta?: {
    isForceUser?: boolean;
    isJedi?: boolean;
    isSith?: boolean;
    faction?: string;
  };
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

export async function fetchPeople(
  search: string,
  page = 1,
  init?: RequestInit
): Promise<PeopleResponse> {
  const url = new URL(`${BASE_URL}/people`);

  if (search) {
    url.searchParams.set('search', search);
  }

  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(PEOPLE_PAGE_LIMIT));

  const res = await fetch(url.toString(), init);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data: PeopleResponse = await res.json();

  return data;
}

export async function fetchPerson(detailsId: string, init?: RequestInit): Promise<Person> {
  const res = await fetch(`${BASE_URL}/people/${detailsId}`, init);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data: Person = await res.json();

  return data;
}
