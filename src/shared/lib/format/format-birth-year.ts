export function formatBirthYear(value: number | null): string {
  if (value === null) return 'Unknown';

  const year = Math.abs(value);

  if (value > 0) {
    return `${year} ABY`;
  }

  if (value < 0) {
    return `${year} BBY`;
  }

  return '0 BBY';
}
