import { redirect } from '@/i18n/navigation';

type LocaleHomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  redirect({
    href: '/characters?page=1',
    locale,
  });
}
