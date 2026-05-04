import React from 'react';
import { cn } from '@/shared/lib/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export class Card extends React.Component<CardProps> {
  render() {
    const { className, ...props } = this.props;

    return (
      <div
        className={cn(
          'rounded-lg border border-border bg-card text-card-foreground p-4 shadow-sm transition hover:shadow-md',
          'animate-fade-in',
          className
        )}
        {...props}
      />
    );
  }
}
