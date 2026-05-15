import { useEffect, useRef, useState } from 'react';
import { Button, Input, Spinner } from '@/shared/ui';
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage';

type Props = {
  onSearch: (term: string) => void;
  loading?: boolean;
};

const STORAGE_KEY = 'sw-search';

export function SearchBar({ onSearch, loading = false }: Props) {
  const [lastSubmitted, setLastSubmitted] = useLocalStorage(STORAGE_KEY, '');
  const [value, setValue] = useState('');
  const initialSearchSentRef = useRef(false);

  useEffect(() => {
    if (initialSearchSentRef.current) return;

    setValue(lastSubmitted);
    onSearch(lastSubmitted);
    initialSearchSentRef.current = true;
  }, [lastSubmitted, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = value.trim();

    if (trimmed === lastSubmitted) return;

    setLastSubmitted(trimmed);
    setValue(trimmed);
    onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search characters..."
      />

      <Button
        onClick={handleSearch}
        loading={loading}
        className="min-w-36"
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
