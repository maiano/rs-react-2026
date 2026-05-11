import React from 'react';
import { cn } from '@/shared/lib/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const base =
  'flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none transition focus:ring-1 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground';

export class Input extends React.Component<InputProps> {
  render() {
    const { className, ...props } = this.props;

    return <input className={cn(base, className)} {...props} />;
  }
}
