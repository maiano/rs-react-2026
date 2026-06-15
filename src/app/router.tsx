import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from '@/app/root-layout';
import { SearchPage } from '@/views/search';
import { AboutPage } from '@/views/about';
import { NotFoundPage } from '@/views/not-found';
import { CharacterDetailsPanel } from '@/widgets/character-details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/characters?page=1" replace />,
      },
      {
        path: 'characters',
        element: <SearchPage />,
        children: [
          {
            path: ':detailsId',
            element: <CharacterDetailsPanel />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
