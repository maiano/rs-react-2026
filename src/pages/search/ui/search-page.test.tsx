import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { SearchPage } from './search-page';
import { CharacterDetailsPanel } from '@/widgets/character-details';
import { mockPeople, mockPeopleResponse } from '@/test/mocks/characters';
import { render, screen, userEvent, waitFor } from '@/test/test-utils';
import { fetchPeople, fetchPerson } from '@/shared/api/sw-api';

vi.mock('@/shared/api/sw-api', async () => {
  const actual = await vi.importActual<typeof import('@/shared/api/sw-api')>('@/shared/api/sw-api');

  return {
    ...actual,
    fetchPeople: vi.fn(),
    fetchPerson: vi.fn(),
  };
});

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

function renderSearchRoute(initialEntry = '/characters?page=1') {
  const router = createMemoryRouter(
    [
      {
        path: '/characters',
        element: <SearchPage />,
        children: [{ path: ':detailsId', element: <CharacterDetailsPanel /> }],
      },
    ],
    { initialEntries: [initialEntry] }
  );

  render(<RouterProvider router={router} />);

  return router;
}

describe('SearchPage', () => {
  const fetchPeopleMock = vi.mocked(fetchPeople);
  const fetchPersonMock = vi.mocked(fetchPerson);

  beforeEach(() => {
    fetchPeopleMock.mockReset();
    fetchPersonMock.mockReset();
    localStorage.clear();
  });

  it('resets page to 1 when a new search is submitted', async () => {
    fetchPeopleMock.mockResolvedValue(mockPeopleResponse);

    const router = renderSearchRoute('/characters?page=2');
    const user = userEvent.setup();

    await screen.findByRole('heading', { name: 'Luke Skywalker' });

    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'Leia');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=1');
    });
  });

  it('shows details loading state and closes the panel', async () => {
    fetchPeopleMock.mockResolvedValue(mockPeopleResponse);
    const deferredDetails = createDeferred<(typeof mockPeople)[number]>();
    fetchPersonMock.mockReturnValue(deferredDetails.promise);

    const router = renderSearchRoute('/characters/1?page=1');
    const user = userEvent.setup();

    expect(await screen.findByText('Loading details...')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();

    deferredDetails.resolve(mockPeople[0]);

    expect(await screen.findByText('A New Hope')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/characters');
      expect(router.state.location.search).toBe('?page=1');
    });
  });
});
