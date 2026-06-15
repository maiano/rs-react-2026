'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ThemeContext, type Theme } from '@/shared/lib/theme/theme-context';

const STORAGE_KEY = 'app-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDark ? 'dark' : 'light';
}

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
