'use client';

import { useTranslations } from 'next-intl';
import { Button, Card } from '@/shared/ui';
import { downloadSelectedItems } from '@/shared/lib/csv/download-selected-items';
import {
  useClearSelection,
  useSelectedCount,
  useSelectedItems,
} from '@/entities/character/model/selection.selectors';

export function SelectedItemsFlyout() {
  const t = useTranslations('selection');
  const count = useSelectedCount();
  const items = useSelectedItems();
  const clear = useClearSelection();

  if (count === 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-20 mt-6">
      <Card className="border-primary/20 bg-card/95 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-card-foreground">
            {t('selectedCount')}: <span className="text-primary">{count}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={clear}>
              {t('clear')}
            </Button>

            <Button size="sm" onClick={() => downloadSelectedItems(items)}>
              {t('download')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
