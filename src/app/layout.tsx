import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/index.css';

const themeBootstrapScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem('app-theme');
    const theme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch {
    document.documentElement.classList.remove('dark');
  }
})();
`;

export const metadata: Metadata = {
  title: 'Galactic Archive',
  description: 'Star Wars character search application',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
