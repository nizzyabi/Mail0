"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Provider as JotaiProvider } from "jotai";

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <JotaiProvider>
      <NuqsAdapter>
        <NextThemesProvider {...props}>
          {/* <PostHogProvider client={posthog}> */}
          <SidebarProvider>{children}</SidebarProvider>
          {/* </PostHogProvider> */}
        </NextThemesProvider>
      </NuqsAdapter>
    </JotaiProvider>
  );
}
