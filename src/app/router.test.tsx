import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RootLayout } from './root-layout';
import { QueryProvider } from './providers/query-provider';
import { ThemeProvider } from './providers/theme-provider';
import { SearchPage } from '@/pages/search';
import { AboutPage } from '@/pages/about';
import { NotFoundPage } from '@/pages/not-found';
import { CharacterDetailsPanel } from '@/widgets/character-details';
import { render, screen, userEvent } from '@/test/test-utils';
import { fetchPeople, fetchPerson } from '@/shared/api/sw-api';
import { mockPeopleResponse } from '@/test/mocks/characters';

vi.mock('@/shared/api/sw-api', async () => {
  const actual = await vi.importActual<typeof import('@/shared/api/sw-api')>('@/shared/api/sw-api');

  return {
    ...actual,
    fetchPeople: vi.fn(),
    fetchPerson: vi.fn(),
  };
});

function renderAppRoute(initialEntry: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
        children: [
          { index: true, element: <div>Home</div> },
          {
            path: 'characters',
            element: <SearchPage />,
            children: [{ path: ':detailsId', element: <CharacterDetailsPanel /> }],
          },
          { path: 'about', element: <AboutPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
    { initialEntries: [initialEntry] }
  );

  render(
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ThemeProvider>
  );

  return router;
}

describe('router pages', () => {
  const fetchPeopleMock = vi.mocked(fetchPeople);
  const fetchPersonMock = vi.mocked(fetchPerson);

  beforeEach(() => {
    fetchPeopleMock.mockReset();
    fetchPersonMock.mockReset();
    fetchPeopleMock.mockResolvedValue(mockPeopleResponse);
    fetchPersonMock.mockResolvedValue(mockPeopleResponse.results[0]);
    localStorage.clear();
  });

  it('navigates to the About page from the header', async () => {
    const user = userEvent.setup();

    renderAppRoute('/characters?page=1');

    await user.click(screen.getByRole('link', { name: 'About' }));

    expect(await screen.findByText('Author: maiano')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'RS School React Course' })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders 404 page for unknown routes', async () => {
    renderAppRoute('/unknown-route');

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Search' })).toHaveAttribute(
      'href',
      '/characters?page=1'
    );
  });
});
