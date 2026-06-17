'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/cn';
import { useTheme } from '@/shared/lib/theme/use-theme';
import { LanguageSwitcher } from '@/features/language-switcher';
import { Button } from '@/shared/ui';

const navLinkClassName = (isActive: boolean) =>
  cn(
    'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'text-primary' : 'text-foreground hover:bg-muted'
  );

const externalLinkClassName =
  'rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted';

export function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/80 backdrop-blur-sm">
      <div className="app-container flex min-h-16 flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <Link
          href="/characters?page=1"
          className="font-heading text-xl tracking-tight text-foreground"
        >
          {t('brand')}
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <Link
            href="/characters?page=1"
            className={navLinkClassName(pathname.startsWith('/characters'))}
          >
            {t('search')}
          </Link>

          <Link href="/about" className={navLinkClassName(pathname === '/about')}>
            {t('about')}
          </Link>

          <a
            href="https://sw-next-api.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={externalLinkClassName}
          >
            {t('api')}
          </a>

          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>

          <Button
            variant="ghost"
            size="md"
            onClick={toggleTheme}
            aria-label={isDarkTheme ? t('switchToLightTheme') : t('switchToDarkTheme')}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15',
              isDarkTheme ? 'text-muted-foreground hover:text-foreground' : 'text-primary'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2v2" />
              <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
              <path d="M16 12a4 4 0 0 0-4-4" />
              <path d="m19 5-1.256 1.256" />
              <path d="M20 12h2" />
            </svg>
          </Button>
        </nav>
      </div>
    </header>
  );
}
