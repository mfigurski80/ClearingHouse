export type CacheStructure<T> = { data: T; updated: number };

export function computeCacheKey(ctx: string | readonly unknown[]): string {
  return `CACHED_QUERY_${Array(ctx).join("_")}`;
}

export function pullQueryCache<T>(key: string): CacheStructure<T> | undefined {
  const cache = window.localStorage.getItem(key);
  return cache ? JSON.parse(cache) : undefined;
}

export function persistQueryResult<T>(p: Promise<T>, key: string) {
  return p.then((result) => {
    window.localStorage.setItem(
      key,
      JSON.stringify({ data: result, updated: Date.now() } as CacheStructure<T>)
    );
    return result;
  });
}
