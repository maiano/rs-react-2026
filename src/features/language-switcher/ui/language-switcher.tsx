'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';

const localeLabels: Record<AppLocale, string> = {
  en: 'EN',
  ru: 'RU',
};

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLocaleChange = (nextLocale: AppLocale) => {
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    router.replace(href, { locale: nextLocale });
  };

  return (
    <label className="sr-only">
      Language
      <select
        value={locale}
        onChange={(event) => handleLocaleChange(event.target.value as AppLocale)}
        className="not-sr-only h-10 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
        aria-label="Language"
      >
        {routing.locales.map((supportedLocale) => (
          <option key={supportedLocale} value={supportedLocale}>
            {localeLabels[supportedLocale]}
          </option>
        ))}
      </select>
    </label>
  );
}
