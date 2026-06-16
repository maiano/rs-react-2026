import { getTranslations, setRequestLocale } from 'next-intl/server';

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = 'force-static';

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6">
        <p className="text-xs font-medium uppercase text-muted-foreground">{t('eyebrow')}</p>

        <h1 className="mt-2 text-subheading text-card-foreground">{t('title')}</h1>

        <div className="mt-6 space-y-4 text-body-sm text-muted-foreground">
          <p>{t('author')}</p>

          <p>{t('description')}</p>
        </div>

        <div className="mt-6">
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-ring/15"
          >
            {t('courseLink')}
          </a>
        </div>
      </div>
    </main>
  );
}
