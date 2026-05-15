import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonState {
  loading: boolean;
  disabled: boolean;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingIndicator?: ReactNode;
  render?: (state: ButtonState) => ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/15 disabled:opacity-50 disabled:pointer-events-none [&>svg]:shrink-0 [&>svg]:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] hover:shadow-sm',
  secondary: 'border border-border bg-secondary text-secondary-foreground shadow-sm hover:bg-muted',
  ghost: 'bg-transparent text-foreground hover:bg-muted hover:text-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  loadingIndicator,
  disabled = false,
  render,
  type,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const state: ButtonState = {
    loading,
    disabled: isDisabled,
  };

  if (render) {
    return (
      <button
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        type={type ?? 'button'}
        {...props}
      >
        {render(state)}
      </button>
    );
  }

  const shouldHideContent = loading && Boolean(loadingIndicator);

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      type={type ?? 'button'}
      {...props}
    >
      {loading && loadingIndicator && (
        <span className="flex items-center justify-center">{loadingIndicator}</span>
      )}

      <span className={cn(shouldHideContent && 'opacity-0')}>{children}</span>
    </button>
  );
}
