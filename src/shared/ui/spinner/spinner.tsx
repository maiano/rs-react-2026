import { cn } from '@/shared/lib/cn';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerVariant = 'primary' | 'accent' | 'inverted';

type SpinnerProps = {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
};

export function Spinner({
  size = 'md',
  variant = 'primary',
  className,
}: SpinnerProps) {
  const sizeClasses: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4 border border-2',
    md: 'h-6 w-6 border border-2',
    lg: 'h-10 w-10 border border-[3px]',
  };

  const variantClasses: Record<SpinnerVariant, string> = {
    primary: 'border-primary/40 border-t-primary shadow-[0_0_12px_oklch(0.78_0.17_65)]',

    accent: 'border-accent/40 border-t-accent shadow-[0_0_12px_oklch(0.68_0.16_230)]',

    inverted: 'border-white/30 border-t-white shadow-[0_0_8px_rgba(255,255,255,0.7)]',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('rounded-full animate-spin', sizeClasses[size], variantClasses[variant], className)}
    />
  );
}
