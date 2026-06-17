import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchPerson } from '@/shared/api/sw-api';
import {
  parseCharacterSearchParams,
  type SearchParamsInput,
} from '@/features/search/model/search-params';
import { CharacterDetailsPanelServer } from '@/widgets/character-details/ui/character-details-panel.server';
import { CharacterSearchPageServer } from '@/widgets/character-search-page';

type CharacterDetailsPageProps = {
  params: Promise<{
    locale: string;
    detailsId: string;
  }>;
  searchParams: Promise<SearchParamsInput>;
};

export const dynamic = 'force-dynamic';

export default async function CharacterDetailsPage({
  params,
  searchParams,
}: CharacterDetailsPageProps) {
  const { locale, detailsId } = await params;
  setRequestLocale(locale);

  const parsedSearchParams = parseCharacterSearchParams(await searchParams);
  const t = await getTranslations('characters');

  let item;

  try {
    item = await fetchPerson(detailsId, { cache: 'no-store' });
  } catch {
    notFound();
  }

  return (
    <CharacterSearchPageServer
      searchParams={parsedSearchParams}
      detailsId={detailsId}
      detailsPanel={
        <CharacterDetailsPanelServer
          item={item}
          page={parsedSearchParams.page}
          search={parsedSearchParams.search}
          title={t('detailsEyebrow')}
          labels={{
            name: t('detailLabels.name'),
            gender: t('detailLabels.gender'),
            birthYear: t('detailLabels.birthYear'),
            homeworld: t('detailLabels.homeworld'),
            height: t('detailLabels.height'),
            mass: t('detailLabels.mass'),
            alignment: t('detailLabels.alignment'),
            forceUser: t('detailLabels.forceUser'),
            jedi: t('detailLabels.jedi'),
            sith: t('detailLabels.sith'),
            faction: t('detailLabels.faction'),
            films: t('detailLabels.films'),
            species: t('detailLabels.species'),
            vehicles: t('detailLabels.vehicles'),
            starships: t('detailLabels.starships'),
            unknown: t('detailLabels.unknown'),
            yes: t('detailLabels.yes'),
            no: t('detailLabels.no'),
            close: t('detailLabels.close'),
          }}
        />
      }
    />
  );
}
