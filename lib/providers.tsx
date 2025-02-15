"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Provider as JotaiProvider } from "jotai";
import { TrpcProvider } from "./trpc";

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <JotaiProvider>
      <NuqsAdapter>
        <NextThemesProvider {...props}>
          <TrpcProvider>
            {/* <PostHogProvider client={posthog}> */}
            <SidebarProvider>{children}</SidebarProvider>
            {/* </PostHogProvider> */}
          </TrpcProvider>
        </NextThemesProvider>
      </NuqsAdapter>
    </JotaiProvider>
  );
}
