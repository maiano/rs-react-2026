import { describe, expect, it } from 'vitest';
import { CharacterCard } from './character-card';
import { personWithUnknownFields, mockPeople } from '@/test/mocks/characters';
import { render, screen } from '@/test/test-utils';

describe('CharacterCard', () => {
  it('displays character name', () => {
    render(<CharacterCard person={mockPeople[0]} />);

    expect(screen.getByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();
  });

  it('displays gender, birth year, and homeworld', () => {
    render(<CharacterCard person={mockPeople[0]} />);

    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19 BBY')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });

  it('gracefully handles missing optional fields', () => {
    render(<CharacterCard person={personWithUnknownFields} />);

    expect(screen.getByRole('heading', { name: 'R5-D4' })).toBeInTheDocument();
    expect(screen.getAllByText('Unknown')).toHaveLength(2);
    expect(screen.getByText('n/a')).toBeInTheDocument();
  });
});
