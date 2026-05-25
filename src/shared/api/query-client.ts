import { QueryClient } from '@tanstack/react-query';
import { env } from '@/shared/config/env';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: env.queryStaleTimeMs,
        gcTime: env.queryGcTimeMs,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
