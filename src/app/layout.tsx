import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Galactic Archive',
  description: 'Star Wars character search application',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
