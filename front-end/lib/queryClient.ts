import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const __MAX_RETRIES__ = 3;
export const __DEFAULT_CACHE_TIME__ = 0;
export const __HTTP_STATUS_CODES_NO_RETRY__ = [400, 401, 403, 404, 422];

function retry(failureCount: number, error: unknown) {
  if (failureCount > __MAX_RETRIES__) {
    return false;
  }

  if (isAxiosError(error)) {
    const isStatusNotRetry = __HTTP_STATUS_CODES_NO_RETRY__.includes(error.response?.status ?? 0);

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
      refetchOnMount: true,
      retry,
      gcTime: __DEFAULT_CACHE_TIME__,
    },
  },
});

export default queryClient;
