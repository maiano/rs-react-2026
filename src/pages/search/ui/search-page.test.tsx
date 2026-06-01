import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { SearchPage } from './search-page';
import { CharacterDetailsPanel } from '@/widgets/character-details';
import { mockPeople, mockPeopleResponse } from '@/test/mocks/characters';
import { createQueryWrapper } from '@/test/query-test-utils';
import { render, screen, userEvent, waitFor, within } from '@/test/test-utils';
import type { PeopleResponse } from '@/shared/api/sw-api';
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

function renderSearchRoute(
  initialEntry = '/characters?page=1',
  QueryWrapper?: ({ children }: { children: ReactNode }) => ReactNode
) {
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

  render(<RouterProvider router={router} />, { wrapper: QueryWrapper });

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
    const { QueryWrapper } = createQueryWrapper();

    const router = renderSearchRoute('/characters?page=2', QueryWrapper);
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
    const { QueryWrapper } = createQueryWrapper();

    const router = renderSearchRoute('/characters/1?page=1', QueryWrapper);
    const user = userEvent.setup();

    expect(await screen.findByText('Loading details...')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();

    deferredDetails.resolve(mockPeople[0]);

    expect(await screen.findByText('A New Hope')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/characters');
      expect(router.state.location.search).toBe('?page=1');
    });
  });

  it('closes details panel on Escape key press', async () => {
    fetchPeopleMock.mockResolvedValue(mockPeopleResponse);
    fetchPersonMock.mockResolvedValue(mockPeople[0]);
    const { QueryWrapper } = createQueryWrapper();

    const router = renderSearchRoute('/characters/1?page=1', QueryWrapper);

    expect(await screen.findByText('A New Hope')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/characters');
      expect(router.state.location.search).toBe('?page=1');
    });
  });

  it('shows list loading state while the people query is pending', async () => {
    const deferredPeople = createDeferred<PeopleResponse>();
    fetchPeopleMock.mockReturnValue(deferredPeople.promise);
    const { QueryWrapper } = createQueryWrapper();

    renderSearchRoute('/characters?page=1', QueryWrapper);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    deferredPeople.resolve(mockPeopleResponse);

    expect(await screen.findByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();
  });

  it('shows list error state when the people query fails', async () => {
    fetchPeopleMock.mockRejectedValue(new Error('Request failed: 500'));
    const { QueryWrapper } = createQueryWrapper();

    renderSearchRoute('/characters?page=1', QueryWrapper);

    expect(await screen.findByText('Request failed: 500')).toBeInTheDocument();
  });

  it('reuses cached list data and refetches after manual refresh', async () => {
    fetchPeopleMock.mockImplementation(async (_search, page = 1) => ({
      ...mockPeopleResponse,
      page,
      total: 24,
      pages: 2,
    }));

    const { QueryWrapper } = createQueryWrapper();
    const router = renderSearchRoute('/characters?page=1', QueryWrapper);
    const user = userEvent.setup();

    expect(await screen.findByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();
    expect(fetchPeopleMock).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: '2' }));

    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=2');
    });
    expect(fetchPeopleMock).toHaveBeenCalledTimes(2);

    await user.click(screen.getByRole('button', { name: '1' }));

    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=1');
    });
    expect(fetchPeopleMock).toHaveBeenCalledTimes(2);

    await user.click(screen.getByRole('button', { name: 'Refresh' }));

    await waitFor(() => {
      expect(fetchPeopleMock).toHaveBeenCalledTimes(3);
    });
  });

  it('shows details error state when the details query fails', async () => {
    fetchPeopleMock.mockResolvedValue(mockPeopleResponse);
    fetchPersonMock.mockRejectedValue(new Error('Request failed: 404'));
    const { QueryWrapper } = createQueryWrapper();

    renderSearchRoute('/characters/1?page=1', QueryWrapper);

    expect(await screen.findByText('Request failed: 404')).toBeInTheDocument();
  });

  it('reuses cached details data and refetches after manual refresh', async () => {
    fetchPeopleMock.mockResolvedValue(mockPeopleResponse);
    fetchPersonMock.mockResolvedValue(mockPeople[0]);
    const { QueryWrapper } = createQueryWrapper();
    const router = renderSearchRoute('/characters?page=1', QueryWrapper);
    const user = userEvent.setup();

    const characterLink = await screen.findByRole('link', { name: /Luke Skywalker/i });

    await user.click(characterLink);

    expect(await screen.findByText('A New Hope')).toBeInTheDocument();
    expect(fetchPersonMock).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/characters');
    });

    await user.click(await screen.findByRole('link', { name: /Luke Skywalker/i }));

    expect(await screen.findByText('A New Hope')).toBeInTheDocument();
    expect(fetchPersonMock).toHaveBeenCalledTimes(1);

    const detailsPanel = screen.getByRole('complementary');

    await user.click(within(detailsPanel).getByRole('button', { name: 'Refresh' }));

    await waitFor(() => {
      expect(fetchPersonMock).toHaveBeenCalledTimes(2);
    });
  });
});
