import { QueryClient } from "@tanstack/react-query";
import { FetchEvent } from "@/service/event-api";
import { AuthError } from "@/service/auth.api";

const queryConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, err: unknown) => {
        if (err instanceof FetchEvent) {
          if (["SERVER_ERROR", "NETWORK_ERROR"].includes(err.type)) {
            return count < 3;
          }
          return false;
        }
        if (err instanceof AuthError) {
          if (["SERVER_ERROR", "NETWORK_ERROR"].includes(err.type)) {
            return count < 3;
          }
          return false;
        }
        return false;
      },
      retryDelay: (attempt) => Math.min(3000, 300 * 2 ** attempt),
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryConfig;
