import { describe, expect, it } from 'vitest';
import { Card } from './card';
import { render, screen } from '@/test/test-utils';

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Character details</Card>);

    expect(screen.getByText('Character details')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Character details</Card>);

    expect(screen.getByText('Character details')).toHaveClass('custom-card');
  });
});
