import { SettingsNavigation } from "./settings-navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-sidebar p-2">
      <div className="h-full bg-background md:rounded-md md:border">
        <ScrollArea className="h-full max-h-full" type="auto">
          <div className="min-h-[calc(100vh-64px)] max-w-4xl p-8 pt-0">
            <div className="sticky top-0 space-y-4 bg-background pb-6 pt-8">
              <div className="flex w-full max-w-2xl items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
                  <p className="text-muted-foreground">Manage your account and preferences.</p>
                </div>
                <Image
                  alt="mail0 logo"
                  src={"/assets/m0%20rounded%20edges.svg"}
                  width={46}
                  height={46}
                />
              </div>
              <SettingsNavigation />
            </div>
            {children}
          </div>
          <div className="mb-12 flex items-center gap-3.5 px-8 text-sm text-muted-foreground">
            <span>
              {/* TODO: Add build number / version */}
              Mail0 Build #00000
            </span>
            <Link href="/privacy" className="underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline-offset-2 hover:underline">
              Terms of Service
            </Link>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
