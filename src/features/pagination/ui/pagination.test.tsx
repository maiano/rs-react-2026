import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './pagination';
import { render, screen, userEvent } from '@/test/test-utils';

describe('Pagination', () => {
  it('renders nothing when there is only one page', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders page controls and marks current page', () => {
    render(<Pagination currentPage={2} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Previous page' })).toHaveTextContent('Previous');
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveTextContent('Next');
  });

  it('calls onPageChange when a page is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: '3' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('limits visible numbered buttons to seven', () => {
    render(<Pagination currentPage={5} totalPages={12} onPageChange={vi.fn()} />);

    const numberedButtons = screen
      .getAllByRole('button')
      .filter((button) => /^\d+$/.test(button.textContent ?? ''));

    expect(numberedButtons).toHaveLength(7);
  });

  it('shows ellipses when page range is truncated', () => {
    render(<Pagination currentPage={6} totalPages={12} onPageChange={vi.fn()} />);

    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
