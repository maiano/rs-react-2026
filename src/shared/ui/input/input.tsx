import React from 'react';
import { cn } from '@/shared/lib/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const base =
  'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring placeholder:text-muted-foreground';

export class Input extends React.Component<InputProps> {
  render() {
    const { className, ...props } = this.props;

    return <input className={cn(base, className)} {...props} />;
  }
}
