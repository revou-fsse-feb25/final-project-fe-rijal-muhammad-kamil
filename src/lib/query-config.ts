import { QueryClient } from "@tanstack/react-query";
import { HttpError } from "@/service/event-api";

const queryConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, err) => {
        const error = err as unknown;
        if (!(error instanceof HttpError)) return count < 3;
        if (error.type === "CANCELED_ERROR") return false;
        if (error.type === "CLIENT_ERROR") return false;
        return count < 3;
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
