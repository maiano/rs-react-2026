import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { CharacterList } from './character-list';
import { mockPeople } from '@/test/mocks/characters';
import { render, screen } from '@/test/test-utils';

describe('CharacterList', () => {
  it('renders the correct number of character cards', () => {
    render(
      <MemoryRouter>
        <CharacterList items={mockPeople} />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Character')).toHaveLength(mockPeople.length);
  });

  it('shows empty state when there are no items', () => {
    render(
      <MemoryRouter>
        <CharacterList items={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('displays character data correctly', () => {
    render(
      <MemoryRouter>
        <CharacterList items={mockPeople} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'C-3PO' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'R2-D2' })).toBeInTheDocument();
    expect(screen.getAllByText('Tatooine')).toHaveLength(2);
    expect(screen.getByText('Naboo')).toBeInTheDocument();
  });
});
