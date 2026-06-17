import { setRequestLocale } from 'next-intl/server';
import {
  parseCharacterSearchParams,
  type SearchParamsInput,
} from '@/features/search/model/search-params';
import { CharacterSearchPageServer } from '@/widgets/character-search-page';

type CharactersPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<SearchParamsInput>;
};

export const dynamic = 'force-dynamic';

export default async function CharactersPage({ params, searchParams }: CharactersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CharacterSearchPageServer searchParams={parseCharacterSearchParams(await searchParams)} />
  );
}
