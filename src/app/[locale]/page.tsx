import { getTranslations } from 'next-intl/server';

export default async function LocaleHomePage() {
  const t = await getTranslations('migration');

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6">
        <h1 className="mt-2 text-subheading text-foreground">{t('title')}</h1>
      </div>
    </main>
  );
}
