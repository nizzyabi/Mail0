"use client";

import {
  ChevronDown,
  ChevronRight,
  Cog,
  LogIn,
  LogOut,
  MonitorCog,
  Moon,
  Sun,
  UserCog,
  UserPlus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useConnections } from "@/hooks/use-connections";
import { signOut, useSession } from "@/lib/auth-client";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { IConnection } from "@/types";
import { useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

export function NavUser() {
  const { data: session, refetch } = useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { data: connections, isLoading } = useConnections();

  const activeAccount = useMemo(() => {
    if (!session) return null;
    return connections?.find((connection) => connection.id === session?.connectionId);
  }, [session, connections]);

  const handleAccountSwitch = (connection: IConnection) => () => {
    return axios
      .put(`/api/v1/mail/connections/${connection.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(refetch)
      .catch((err) => {
        toast.error("Error switching connection", {
          description: err.response.data.message,
        });
      });
  };

  return (
    <DropdownMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit">
              {isLoading ? (
                <>
                  <div className="size-5 animate-pulse rounded-md bg-muted" />
                  <div className="flex min-w-0 flex-col gap-1 leading-none">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={activeAccount?.picture || session?.user.image || "/logo.png"}
                    alt={activeAccount?.name || session?.user.name || "User"}
                    className="shrink-0 rounded-md"
                    width={20}
                    height={20}
                  />
                  <div className="flex min-w-0 flex-col gap-1 leading-none">
                    <span className="flex items-center gap-1 truncate text-[12px] font-semibold">
                      {(activeAccount?.email || session?.user.email)?.slice(0, 16)}...
                      <ChevronDown className="size-3 text-muted-foreground" />
                    </span>
                  </div>
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </SidebarMenuItem>
      </SidebarMenu>
      <DropdownMenuContent
        className="ml-2 w-[--radix-dropdown-menu-trigger-width] min-w-52 font-medium"
        align="end"
        side={"bottom"}
        sideOffset={1}
      >
        {session ? (
          <>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <UserCog size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                  Switch account
                </div>
                <ChevronRight size={8} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="ml-1">
                  {connections?.map((connection) => (
                    <DropdownMenuItem
                      key={connection.id}
                      onClick={handleAccountSwitch(connection)}
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={connection.picture || "/placeholder.svg"}
                        alt={connection.name || connection.email}
                        className="size-4 shrink-0 rounded"
                        width={16}
                        height={16}
                      />
                      <div className="flex flex-col">
                        <span className="text-[12px]">{connection.name || connection.email}</span>
                        {connection.name && (
                          <span className="text-[12px] text-muted-foreground">
                            {connection.email}
                          </span>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/connect-emails")}>
                    <UserPlus size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                    Add another account
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={() => router.push("/connect-emails")}>
              <Cog size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                toast.promise(
                  signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/");
                      },
                    },
                  }),
                  {
                    loading: "Signing out...",
                    success: () => "Signed out successfully!",
                    error: "Error signing out",
                  },
                );
              }}
            >
              <LogOut size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              Log out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/signin")}>
              <LogIn size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              Sign in
            </DropdownMenuItem>
          </>
        )}
        <span className="mt-2 block w-full">
          <Tabs defaultValue={theme} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
                <Moon size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              </TabsTrigger>
              <TabsTrigger value="light" onClick={() => setTheme("light")}>
                <Sun size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              </TabsTrigger>
              <TabsTrigger value="system" onClick={() => setTheme("system")}>
                <MonitorCog size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
