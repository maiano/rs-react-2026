import { cn } from '@/shared/lib/cn';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] shadow-md',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
  ghost: 'bg-transparent hover:bg-muted text-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export class Button extends React.Component<ButtonProps> {
  render() {
    const {
      variant = 'primary',
      size = 'md',
      className,
      loading,
      children,
      disabled,
      ...props
    } = this.props;

    return (
      <button
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? 'Loading...' : children}
      </button>
    );
  }
}
