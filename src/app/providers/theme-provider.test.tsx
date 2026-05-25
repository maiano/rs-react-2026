import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { ThemeProvider } from './theme-provider';
import { useTheme } from '@/shared/lib/theme/use-theme';

function ThemeHarness() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span>{theme}</span>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle theme</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('applies dark class to document when theme changes', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeHarness />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(screen.getByText('light')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
