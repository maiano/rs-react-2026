import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './search-bar';
import { render, screen, userEvent } from '@/test/test-utils';

function SearchBarHarness({
  initialValue = '',
  onSearch = vi.fn(),
}: {
  initialValue?: string;
  onSearch?: () => void;
}) {
  const [value, setValue] = useState(initialValue);

  return <SearchBar value={value} onChange={setValue} onSearch={onSearch} />;
}

describe('SearchBar', () => {
  it('renders input and search button', () => {
    render(<SearchBar value="" onChange={vi.fn()} onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders controlled value', () => {
    render(<SearchBar value="Luke" onChange={vi.fn()} onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('Luke');
  });

  it('updates input when user types', async () => {
    const user = userEvent.setup();

    render(<SearchBarHarness />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'Leia');

    expect(input).toHaveValue('Leia');
  });

  it('calls onSearch when search button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar value="Luke" onChange={vi.fn()} onSearch={onSearch} />);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar value="Yoda" onChange={vi.fn()} onSearch={onSearch} />);

    await user.type(screen.getByRole('textbox'), '{Enter}');

    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
