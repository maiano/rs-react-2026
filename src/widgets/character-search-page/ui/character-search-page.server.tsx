import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { fetchPeople, type PeopleResponse } from '@/shared/api/sw-api';
import { Button, Card, Input } from '@/shared/ui';
import { PaginationLinks } from '@/features/pagination/ui/pagination-links';
import type { CharacterSearchParams } from '@/features/search/model/search-params';
import { CharacterListServer } from '@/widgets/character-list/ui/character-list.server';
import { SelectedItemsFlyout } from '@/widgets/selected-items-flyout';

type CharacterSearchPageServerProps = {
  searchParams: CharacterSearchParams;
  detailsPanel?: ReactNode;
  detailsId?: string;
};

export async function CharacterSearchPageServer({
  searchParams,
  detailsPanel,
  detailsId,
}: CharacterSearchPageServerProps) {
  const t = await getTranslations('characters');
  const { page, search } = searchParams;

  let data: PeopleResponse | null = null;
  let failed = false;

  try {
    data = await fetchPeople(search, page, { cache: 'no-store' });
  } catch {
    failed = true;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                {t('eyebrow')}
              </p>

              <h1 className="text-subheading text-foreground">{t('title')}</h1>
            </div>

            <form className="flex flex-col gap-3 sm:flex-row">
              <Input
                name="search"
                defaultValue={search}
                placeholder={t('searchPlaceholder')}
                className="sm:flex-1"
              />
              <input type="hidden" name="page" value="1" />
              <Button type="submit" className="sm:min-w-36">
                {t('searchButton')}
              </Button>
            </form>
          </Card>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-start xl:grid-cols-[minmax(0,1fr)_360px]">
            <Card className="p-6">
              {failed && <div className="text-destructive">{t('error')}</div>}

              {!failed && data && (
                <>
                  <CharacterListServer
                    items={data.results}
                    page={page}
                    search={search}
                    emptyMessage={t('empty')}
                    selectionLabel={(name) => t('selectCharacter', { name })}
                  />

                  {data.results.length > 0 && (
                    <div className="mt-6">
                      <PaginationLinks
                        currentPage={page}
                        totalPages={data.pages}
                        search={search}
                        detailsId={detailsId}
                      />
                    </div>
                  )}
                </>
              )}
            </Card>

            {detailsPanel ?? (
              <aside className="md:sticky md:top-24">
                <Card className="p-6">
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    {t('detailsEyebrow')}
                  </p>
                  <h2 className="mt-2 text-subheading font-heading text-card-foreground">
                    {t('detailsTitle')}
                  </h2>
                  <p className="mt-4 text-body-sm text-muted-foreground">
                    {t('detailsDescription')}
                  </p>
                </Card>
              </aside>
            )}
          </div>

          <SelectedItemsFlyout />
        </div>
      </div>
    </main>
  );
}
