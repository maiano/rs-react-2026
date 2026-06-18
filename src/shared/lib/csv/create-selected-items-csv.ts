import type { SelectedItem } from '@/entities/character/model/selection.store';

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function createSelectedItemsCsv(items: SelectedItem[]) {
  const header = [
    'id',
    'slug',
    'name',
    'gender',
    'birth_year_bby',
    'homeworld',
    'faction',
    'force_user',
    'details_url',
  ];

  const rows = items.map((item) => [
    String(item.id),
    item.slug,
    item.name,
    item.gender,
    item.birthYearBBY === null ? 'Unknown' : String(item.birthYearBBY),
    item.homeworldName ?? 'Unknown',
    item.faction ?? 'Unknown',
    item.isForceUser ? 'Yes' : 'No',
    item.detailsUrl,
  ]);

  return [header, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(','))
    .join('\n');
}
