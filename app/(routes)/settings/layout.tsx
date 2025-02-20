"use client";

import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<SettingsLayoutSkeleton />}>
      <SettingsLayoutContent>{children}</SettingsLayoutContent>
    </Suspense>
  );
}

function SettingsLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto border bg-card shadow-sm md:flex md:rounded-2xl md:shadow-sm">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-1.5 bg-card p-2 backdrop-blur-md">
        <SidebarToggle className="h-fit px-2" />
        <h1 className="flex-1 text-center text-sm font-medium capitalize">Settings</h1>
      </div>

      <div className="mx-auto w-full flex-1 pb-0 md:px-2 md:pb-0 lg:px-4 lg:pb-0">
        <div className="flex flex-col justify-center gap-8 pt-4 md:flex-row">
          <div className="container flex-1">
            <ScrollArea className="h-full pb-4">{children}</ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsLayoutSkeleton() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto border bg-card shadow-sm md:flex md:rounded-2xl md:shadow-sm">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-1.5 p-2">
        <div className="h-9 w-9 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-9 w-[68px] animate-pulse rounded-md bg-muted" />
      </div>

      <div className="mx-auto w-full flex-1 pb-0 md:px-2 md:pb-0 lg:px-4 lg:pb-0">
        <div className="flex flex-col gap-8 pt-4 md:flex-row">
          {/* Navigation */}
          <div className="md:sticky md:top-[15px] md:h-fit">
            <div className="flex flex-col md:w-80">
              {/* Mobile Navigation Skeleton */}
              <div className="md:hidden">
                <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex min-w-[120px] animate-pulse items-center gap-2 rounded-md bg-muted px-4 py-2"
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Navigation Skeleton */}
              <div className="hidden md:flex md:flex-col md:space-y-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center gap-x-3 rounded-md bg-muted p-2"
                    style={{
                      height: "64px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="h-[calc(100vh-360px)] space-y-4 md:h-[calc(100vh-320px)]">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4 rounded-lg border p-4">
                  <div className="h-4 w-1/4 rounded bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-muted" />
                    <div className="h-4 w-5/6 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
