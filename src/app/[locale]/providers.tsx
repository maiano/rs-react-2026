'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/app/providers/theme-provider';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
