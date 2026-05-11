import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './search-bar';
import { render, screen, userEvent } from '@/test/test-utils';

describe('SearchBar', () => {
  it('renders input and search button', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('shows empty input and triggers empty search when localStorage is empty', () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('restores saved value from localStorage', () => {
    localStorage.setItem('sw-search', 'Luke');
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    expect(screen.getByRole('textbox')).toHaveValue('Luke');
    expect(onSearch).toHaveBeenCalledWith('Luke');
  });

  it('updates input when user types', async () => {
    const user = userEvent.setup();

    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'Leia');

    expect(input).toHaveValue('Leia');
  });

  it('submits trimmed value and saves it to localStorage on button click', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByRole('textbox');

    await user.type(input, '  Luke Skywalker  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenLastCalledWith('Luke Skywalker');
    expect(localStorage.getItem('sw-search')).toBe('Luke Skywalker');
    expect(input).toHaveValue('Luke Skywalker');
  });

  it('does not call onSearch again when trimmed value has not changed', async () => {
    localStorage.setItem('sw-search', 'Luke');
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('Luke');
  });

  it('submits search on Enter key press', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'Yoda{Enter}');

    expect(onSearch).toHaveBeenLastCalledWith('Yoda');
    expect(localStorage.getItem('sw-search')).toBe('Yoda');
  });
});
