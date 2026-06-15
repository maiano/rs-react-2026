import { getRequestConfig } from 'next-intl/server';
import type { AppLocale } from './routing';
import { routing } from './routing';

function isAppLocale(locale: string | undefined): locale is AppLocale {
  return routing.locales.some((supportedLocale) => supportedLocale === locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = isAppLocale(requestedLocale) ? requestedLocale : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
