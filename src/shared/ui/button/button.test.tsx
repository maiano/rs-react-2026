import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';
import { render, screen } from '@/test/test-utils';

describe('Button', () => {
  it('renders button content', () => {
    render(<Button>Search</Button>);

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-button">Search</Button>);

    expect(screen.getByRole('button', { name: 'Search' })).toHaveClass('custom-button');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Search</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Search</Button>);

    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
  });

  it('is disabled and marked busy while loading', () => {
    render(<Button loading>Search</Button>);

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('renders loading indicator when loading', () => {
    render(
      <Button loading loadingIndicator={<span>Loading icon</span>}>
        Search
      </Button>
    );

    expect(screen.getByText('Loading icon')).toBeInTheDocument();
  });
});
