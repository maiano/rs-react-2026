import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchPeople } from './sw-api';
import { mockPeopleResponse } from '@/test/mocks/characters';

function createJsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

describe('fetchPeople', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns people from successful response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(createJsonResponse(mockPeopleResponse));

    const result = await fetchPeople('Luke');

    expect(result).toEqual(mockPeopleResponse.results);
  });

  it('calls fetch with expected search, page, and limit params', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(createJsonResponse(mockPeopleResponse));

    await fetchPeople('Luke');

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const requestUrl = new URL(String(fetchMock.mock.calls[0][0]));

    expect(requestUrl.pathname).toBe('/api/v1/people');
    expect(requestUrl.searchParams.get('search')).toBe('Luke');
    expect(requestUrl.searchParams.get('page')).toBe('1');
    expect(requestUrl.searchParams.get('limit')).toBe('10');
  });

  it('omits search param when search term is empty', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(createJsonResponse(mockPeopleResponse));

    await fetchPeople('');

    const requestUrl = new URL(String(fetchMock.mock.calls[0][0]));

    expect(requestUrl.searchParams.has('search')).toBe(false);
    expect(requestUrl.searchParams.get('page')).toBe('1');
    expect(requestUrl.searchParams.get('limit')).toBe('10');
  });

  it('throws an error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 500 }));

    await expect(fetchPeople('Luke')).rejects.toThrow('Request failed: 500');
  });
});
