import { describe, expect, it, vi, beforeEach } from 'vitest';
import { App } from './App';
import { mockPeople } from '@/test/mocks/characters';
import { render, screen, userEvent, waitFor } from '@/test/test-utils';
import { fetchPeople } from '@/shared/api/sw-api';

vi.mock('@/shared/api/sw-api', async () => {
  const actual = await vi.importActual<typeof import('@/shared/api/sw-api')>('@/shared/api/sw-api');

  return {
    ...actual,
    fetchPeople: vi.fn(),
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

describe('App', () => {
  const fetchPeopleMock = vi.mocked(fetchPeople);

  beforeEach(() => {
    fetchPeopleMock.mockReset();
  });

  it('calls api on initial load and renders fetched characters', async () => {
    fetchPeopleMock.mockResolvedValue(mockPeople);

    render(<App />);

    expect(fetchPeopleMock).toHaveBeenCalledWith('');
    expect(await screen.findByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'C-3PO' })).toBeInTheDocument();
  });

  it('uses saved search term from localStorage on initial load', async () => {
    localStorage.setItem('sw-search', 'Luke');
    fetchPeopleMock.mockResolvedValue(mockPeople);

    render(<App />);

    await waitFor(() => {
      expect(fetchPeopleMock).toHaveBeenCalledWith('Luke');
    });
  });

  it('shows loading state while request is pending', async () => {
    const deferred = createDeferred<typeof mockPeople>();
    fetchPeopleMock.mockReturnValue(deferred.promise);

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    deferred.resolve(mockPeople);

    expect(await screen.findByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();
  });

  it('shows error message when api request fails', async () => {
    fetchPeopleMock.mockRejectedValue(new Error('Request failed: 500'));

    render(<App />);

    expect(await screen.findByText('Request failed: 500')).toBeInTheDocument();
  });

  it('renders only the latest search results when requests resolve out of order', async () => {
    const initialRequest = createDeferred<typeof mockPeople>();
    const nextResults = [mockPeople[1]];

    fetchPeopleMock
      .mockReturnValueOnce(initialRequest.promise)
      .mockResolvedValueOnce(nextResults);

    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'C-3PO{Enter}');

    expect(await screen.findByRole('heading', { name: 'C-3PO' })).toBeInTheDocument();

    initialRequest.resolve(mockPeople);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Luke Skywalker' })).not.toBeInTheDocument();
    });
  });
});
