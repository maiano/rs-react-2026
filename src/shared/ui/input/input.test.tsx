import { describe, expect, it } from 'vitest';
import { Input } from './input';
import { render, screen, userEvent } from '@/test/test-utils';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Search characters..." />);

    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input aria-label="Search" className="custom-input" />);

    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveClass('custom-input');
  });

  it('updates value when user types', async () => {
    const user = userEvent.setup();

    render(<Input aria-label="Search" />);

    const input = screen.getByRole('textbox', { name: 'Search' });

    await user.type(input, 'Luke');

    expect(input).toHaveValue('Luke');
  });

  it('respects disabled state', () => {
    render(<Input aria-label="Search" disabled />);

    expect(screen.getByRole('textbox', { name: 'Search' })).toBeDisabled();
  });
});
