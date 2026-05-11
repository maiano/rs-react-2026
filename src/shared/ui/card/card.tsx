import React from 'react';
import { cn } from '@/shared/lib/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export class Card extends React.Component<CardProps> {
  render() {
    const { className, ...props } = this.props;

    return (
      <div
        className={cn(
          'animate-fade-in rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md',
          className
        )}
        {...props}
      />
    );
  }
}
