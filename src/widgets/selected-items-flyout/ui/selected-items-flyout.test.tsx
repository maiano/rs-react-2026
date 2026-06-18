import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it } from 'vitest';
import { SelectedItemsFlyout } from './selected-items-flyout';
import { render, screen, userEvent } from '@/test/test-utils';
import { useSelectionStore } from '@/entities/character/model/selection.store';

const messages = {
  selection: {
    selectedCount: 'Selected characters',
    clear: 'Unselect all',
    download: 'Download',
  },
};

function IntlWrapper({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe('SelectedItemsFlyout', () => {
  beforeEach(() => {
    useSelectionStore.setState({ selected: {} });
  });

  it('does not render when nothing is selected', () => {
    const { container } = render(<SelectedItemsFlyout />, { wrapper: IntlWrapper });

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

    render(<SelectedItemsFlyout />, { wrapper: IntlWrapper });

    expect(screen.getByText(/Selected characters:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute('type', 'submit');
    expect(screen.getByDisplayValue(/luke-skywalker/)).toHaveAttribute('name', 'items');

    await user.click(screen.getByRole('button', { name: 'Unselect all' }));

    expect(useSelectionStore.getState().selected).toEqual({});
  });
});
