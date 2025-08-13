"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import queryConfig from "@/lib/query-config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function QueryProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryConfig}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default QueryProviders;
