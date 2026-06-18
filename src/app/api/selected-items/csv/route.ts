import { NextResponse } from 'next/server';
import type { SelectedItem } from '@/entities/character/model/selection.store';
import { createSelectedItemsCsv } from '@/shared/lib/csv/create-selected-items-csv';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isSelectedItem(value: unknown): value is SelectedItem {
  if (!isRecord(value)) return false;

  const birthYear = value.birthYearBBY;
  const homeworldName = value.homeworldName;
  const faction = value.faction;

  return (
    typeof value.id === 'number' &&
    Number.isInteger(value.id) &&
    typeof value.slug === 'string' &&
    typeof value.name === 'string' &&
    typeof value.detailsUrl === 'string' &&
    typeof value.gender === 'string' &&
    (typeof birthYear === 'number' || birthYear === null) &&
    (typeof homeworldName === 'string' || homeworldName === null) &&
    (typeof faction === 'string' || faction === null) &&
    typeof value.isForceUser === 'boolean'
  );
}

function parseSelectedItems(value: string): SelectedItem[] | null {
  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed) || !parsed.every(isSelectedItem)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const itemsValue = formData.get('items');

  if (typeof itemsValue !== 'string') {
    return NextResponse.json({ error: 'Missing selected items' }, { status: 400 });
  }

  const items = parseSelectedItems(itemsValue);

  if (!items) {
    return NextResponse.json({ error: 'Invalid selected items' }, { status: 400 });
  }

  const csv = createSelectedItemsCsv(items);
  const filename = `${items.length}_items.csv`;

  return new Response(csv, {
    headers: {
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'text/csv;charset=utf-8',
    },
  });
}
