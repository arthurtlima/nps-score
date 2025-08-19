import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const MAX_RETRIES = 3;
export const DEFAULT_STALE_TIME = 0;
export const DEFAULT_CACHE_TIME = 5 * 60 * 1000;
export const HTTP_STATUS_CODES_NO_RETRY = [400, 401, 403, 404, 422];

function retry(failureCount: number, error: unknown) {
  if (failureCount > MAX_RETRIES) {
    return false;
  }

  if (isAxiosError(error)) {
    const isStatusNotRetry = HTTP_STATUS_CODES_NO_RETRY.includes(error.response?.status ?? 0);
    if (isStatusNotRetry) {
      return false;
    }
  }

  return true;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false, 
      retry,
      staleTime: DEFAULT_STALE_TIME,
      gcTime: DEFAULT_CACHE_TIME,
    },
  },
});

export default queryClient;
