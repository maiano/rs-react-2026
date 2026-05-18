import { cn } from '@/shared/lib/cn';

import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'animate-fade-in rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
}
