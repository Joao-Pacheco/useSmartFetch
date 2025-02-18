import { useState, useEffect } from "react";

type CachedData = {
  result: any;
  expiry: number;
};

const cache = new Map<string, CachedData>();

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useSmartFetch<T>(
  url: string,
  options?: RequestInit,
  cacheDuration: number = 300000
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const generateCacheKey = (url: string, options?: RequestInit): string => {
    return url + JSON.stringify(options || {});
  };

  const fetchData = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    const cacheKey = generateCacheKey(url, options);
    const now = Date.now();

    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (cached && cached.expiry > now) {
        setData(cached.result);
        setLoading(false);
        return;
      } else {
        cache.delete(cacheKey);
      }
    }

    try {
      const response = await fetch(url, { ...options, signal });
      if (!response.ok) throw new Error("Erro na requisição");
      const result = await response.json();

      cache.set(cacheKey, { result, expiry: now + cacheDuration });
      setData(result);
    } catch (err) {
      if (!(err instanceof DOMException)) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [url]);

  return { data, loading, error, refetch: () => fetchData() };
}
