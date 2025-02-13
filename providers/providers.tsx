"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Provider } from "jotai";
import * as React from "react";

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <Provider>
      <NextThemesProvider {...props}>
        {/* <PostHogProvider client={posthog}> */}
        <SidebarProvider>{children}</SidebarProvider>
        {/* </PostHogProvider> */}
      </NextThemesProvider>
    </Provider>
  );
}
