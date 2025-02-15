"use client";

import { createTRPCReact, type inferReactQueryProcedureOptions } from "@trpc/react-query";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { loggerLink, httpBatchLink } from "@trpc/client";
import { type PropsWithChildren, useState } from "react";
import { AppRouter } from "@/trpc";
import SuperJSON from "superjson";
import { toast } from "sonner";
import { env } from "./env";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, { meta }) => {
      if (meta && meta.noGlobalError === true) return;
      toast.error(err.message);
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (err) => toast.error(err.message),
    },
  },
});

export const trpc = createTRPCReact<AppRouter>();

export function TrpcProvider({ children }: PropsWithChildren) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
          transformer: SuperJSON,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
