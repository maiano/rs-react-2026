const DEFAULT_QUERY_STALE_TIME_MS = 5 * 60 * 1000;
const DEFAULT_QUERY_GC_TIME_MS = 10 * 60 * 1000;

function readNumberEnv(value: string | undefined, fallback: number): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export const env = {
  queryStaleTimeMs: readNumberEnv(
    import.meta.env.VITE_QUERY_STALE_TIME_MS,
    DEFAULT_QUERY_STALE_TIME_MS
  ),
  queryGcTimeMs: readNumberEnv(import.meta.env.VITE_QUERY_GC_TIME_MS, DEFAULT_QUERY_GC_TIME_MS),
};
