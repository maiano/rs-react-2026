import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Card } from '@/shared/ui';

export default async function LocaleNotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-10">
        <Card className="mx-auto max-w-2xl p-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t('eyebrow')}
          </p>

          <h1 className="mt-3 text-heading text-card-foreground">{t('title')}</h1>

          <p className="mt-4 text-body-sm text-muted-foreground">{t('description')}</p>

          <div className="mt-6 flex justify-center">
            <Link
              href="/characters?page=1"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
            >
              {t('backToSearch')}
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
