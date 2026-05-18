import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SelectedItemsFlyout } from './selected-items-flyout';
import { render, screen, userEvent } from '@/test/test-utils';
import { useSelectionStore } from '@/entities/character/model/selection.store';

vi.mock('@/shared/lib/csv/download-selected-items', () => ({
  downloadSelectedItems: vi.fn(),
}));

describe('SelectedItemsFlyout', () => {
  beforeEach(() => {
    useSelectionStore.setState({ selected: {} });
  });

  it('does not render when nothing is selected', () => {
    const { container } = render(<SelectedItemsFlyout />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders selected count and clears items', async () => {
    const user = userEvent.setup();

    useSelectionStore.setState({
      selected: {
        1: {
          id: 1,
          slug: 'luke-skywalker',
          name: 'Luke Skywalker',
          detailsUrl: '/characters/1?page=1',
          gender: 'male',
          birthYearBBY: -19,
          homeworldName: 'Tatooine',
          faction: 'rebels',
          isForceUser: true,
        },
      },
    });

    render(<SelectedItemsFlyout />);

    expect(screen.getByText(/Selected characters:/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Unselect all' }));

    expect(useSelectionStore.getState().selected).toEqual({});
  });
});
