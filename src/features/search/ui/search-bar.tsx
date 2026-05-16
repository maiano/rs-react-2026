import type { ChangeEvent, KeyboardEvent } from 'react';
import { Button, Input, Spinner } from '@/shared/ui';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading?: boolean;
};

export function SearchBar({ value, onChange, onSearch, loading = false }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search characters..."
        className="sm:flex-1"
      />

      <Button
        onClick={onSearch}
        loading={loading}
        className="sm:min-w-36"
        render={({ loading: isLoading }) => (
          <>
            {isLoading && <Spinner size="sm" variant="inverted" />}
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </>
        )}
      >
        Search
      </Button>
    </div>
  );
}
