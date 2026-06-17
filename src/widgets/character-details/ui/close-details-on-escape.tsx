'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';

type CloseDetailsOnEscapeProps = {
  href: string;
};

export function CloseDetailsOnEscape({ href }: CloseDetailsOnEscapeProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.replace(href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [href, router]);

  return null;
}
