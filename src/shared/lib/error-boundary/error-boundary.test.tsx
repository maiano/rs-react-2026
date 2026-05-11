import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './error-boundary';
import { App } from '@/app/App';
import { mockPeople } from '@/test/mocks/characters';
import { render, screen, userEvent } from '@/test/test-utils';
import { fetchPeople } from '@/shared/api/sw-api';

vi.mock('@/shared/api/sw-api', async () => {
  const actual = await vi.importActual<typeof import('@/shared/api/sw-api')>('@/shared/api/sw-api');

  return {
    ...actual,
    fetchPeople: vi.fn(),
  };
});

class ThrowingChild extends Error {
  constructor() {
    super('Boom');
  }
}

const BrokenComponent = () => {
  throw new ThrowingChild();
};

describe('ErrorBoundary', () => {
  const fetchPeopleMock = vi.mocked(fetchPeople);

  beforeEach(() => {
    fetchPeopleMock.mockReset();
  });

  it('shows fallback ui and logs error when child component throws', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try refreshing or click the button.')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('shows fallback ui when trigger error button is clicked in app', async () => {
    fetchPeopleMock.mockResolvedValue(mockPeople);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    await screen.findByRole('heading', { name: 'Luke Skywalker' });
    await user.click(screen.getByRole('button', { name: 'Trigger Error' }));

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
