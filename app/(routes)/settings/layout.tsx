"use client";

import { SettingsNavigation } from "./settings-navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">
        <div className="sticky top-0 z-20 mb-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <h1 className="text-2xl font-bold sm:text-3xl">Settings</h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Manage your account and preferences.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <SettingsNavigation />

          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="min-h-[calc(100vh-300px)]">{children}</div>

              <div className="mt-12 flex items-center gap-3.5 text-sm text-muted-foreground">
                <span>Mail0 Build #00000</span>
                <div className="h-4 w-[1px] bg-border" />
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
                <div className="h-4 w-[1px] bg-border" />
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
