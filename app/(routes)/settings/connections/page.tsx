"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SettingsCard } from "@/components/settings/settings-card";
import { useConnections } from "@/hooks/use-connections";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ConnectionsPage() {
  const { data: connections, isLoading } = useConnections();
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const emailProviders = [
    {
      name: "Google",
      icon: "M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05c0 5.71-3.83 9.77-9.6 9.77c-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48c-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51z",
      providerId: "google",
    },
  ];

  return (
    <div className="grid gap-6">
      <SettingsCard title="Email Connections" description="Connect your email accounts to Mail0.">
        <div className="space-y-6">
          {isLoading ? (
            <div className="grid gap-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : connections?.length ? (
            <div className="grid gap-4">
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {connection.picture ? (
                      <Image
                        src={connection.picture}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary">
                          <path fill="currentColor" d={emailProviders[0].icon} />
                        </svg>
                      </div>
                    )}
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="truncate text-sm font-medium">{connection.name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Tooltip
                          delayDuration={0}
                          open={openTooltip === connection.id}
                          onOpenChange={(open) => {
                            if (window.innerWidth <= 768) {
                              setOpenTooltip(open ? connection.id : null);
                            }
                          }}
                        >
                          <TooltipTrigger asChild>
                            <span
                              className="max-w-[180px] cursor-default truncate sm:max-w-[240px] md:max-w-[300px]"
                              onClick={() => {
                                if (window.innerWidth <= 768) {
                                  setOpenTooltip(
                                    openTooltip === connection.id ? null : connection.id,
                                  );
                                }
                              }}
                            >
                              {connection.email}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" align="start" className="select-all">
                            <div className="font-mono">{connection.email}</div>
                          </TooltipContent>
                        </Tooltip>
                        <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
                        <span className="shrink-0">Connected</span>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-primary"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Disconnect Email Account</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to disconnect this email?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="destructive">Remove</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          ) : null}

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Email Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect Email</DialogTitle>
                <DialogDescription>Select an email provider to connect</DialogDescription>
              </DialogHeader>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {emailProviders.map((provider) => (
                  <a key={provider.name} href={`/api/v1/mail/auth/${provider.providerId}/init`}>
                    <Button
                      variant="outline"
                      className="h-24 w-full flex-col items-center justify-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="h-12 w-12">
                        <path fill="currentColor" d={provider.icon} />
                      </svg>
                      <span className="text-xs">{provider.name}</span>
                    </Button>
                  </a>
                ))}
                <Button
                  variant="outline"
                  className="h-24 flex-col items-center justify-center gap-2 border-dashed"
                >
                  <Plus className="h-12 w-12" />
                  <span className="text-xs">More Coming Soon</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SettingsCard>
    </div>
  );
}
