import { describe, expect, it } from 'vitest';
import { Spinner } from './spinner';
import { render, screen } from '@/test/test-utils';

describe('Spinner', () => {
  it('renders spinner with status role', () => {
    render(<Spinner />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Spinner className="custom-spinner" />);

    expect(screen.getByRole('status', { name: 'Loading' })).toHaveClass('custom-spinner');
  });

  it('has loading aria-label', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });
});
