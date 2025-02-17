"use client";

import { Book, ChevronDown, HelpCircle, LogIn, LogOut, UserPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useConnections } from "@/hooks/use-connections";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { IConnection } from "@/types";
import { useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

export function NavUser() {
  const { data: session, refetch } = useSession();
  const router = useRouter();
  const { data: connections, isLoading, mutate } = useConnections();

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
      .then(() => mutate())
      .catch((err) => {
        toast.error("Error switching connection", {
          description: err.response.data.message,
        });
      });
  };

  const handleLogout = () => {
    if (!session) return;

    const remainingConnections = connections?.filter(
      (connection) => connection.id !== session.connectionId,
    );

    if (remainingConnections?.length) {
      // Delete current connection and switch to the next
      return axios
        .delete(`/api/v1/mail/connections/${session.connectionId}`)
        .then(() => handleAccountSwitch(remainingConnections[0])())
        .catch((err) => {
          toast.error("Error logging out", {
            description: err.response?.data?.message,
          });
        });
    } else {
      // No remaining accounts, delete connection and proceed with full better-auth sign out
      return toast.promise(
        axios.delete(`/api/v1/mail/connections/${session.connectionId}`).then(() =>
          signOut({
            fetchOptions: {
              onSuccess: () => router.push("/"),
            },
          }),
        ),
        {
          loading: "Signing out...",
          success: "Signed out successfully!",
          error: "Error signing out",
        },
      );
    }
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
        className="ml-3 w-[--radix-dropdown-menu-trigger-width] min-w-56 font-medium"
        align="end"
        side={"bottom"}
        sideOffset={1}
      >
        <DropdownMenuItem onClick={() => router.push("/support")}>
          <div className="flex cursor-pointer items-center gap-2 text-[13px]">
            <HelpCircle size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
            <p className="text-[13px] opacity-60">Customer Support</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => window.open("https://github.com/nizzyabi/mail0", "_blank")}
        >
          <div className="flex cursor-pointer items-center gap-2 text-[13px]">
            <Book size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
            <p className="text-[13px] opacity-60">Documentation</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="space-y-1">
          {session ? (
            <>
              <div className="px-1 py-1.5 text-[11px] text-muted-foreground">Accounts</div>
              {connections?.map((connection) => (
                <DropdownMenuItem
                  key={connection.id}
                  onClick={handleAccountSwitch(connection)}
                  className={`flex cursor-pointer items-center gap-3 py-0.5 ${
                    connection.id === session?.connectionId ? "bg-accent" : ""
                  }`}
                >
                  <Image
                    src={connection.picture || "/placeholder.svg"}
                    alt={connection.name || connection.email}
                    className="size-5 shrink-0 rounded"
                    width={16}
                    height={16}
                  />
                  <div className="-space-y-1">
                    <p className="text-[12px]">{connection.name || connection.email}</p>
                    {connection.name && (
                      <p className="text-[12px] text-muted-foreground">
                        {connection.email.length > 25
                          ? `${connection.email.slice(0, 25)}...`
                          : connection.email}
                      </p>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                className="mt-1 cursor-pointer"
                onClick={() => router.push("/settings/connections")}
              >
                <div className="flex items-center gap-2">
                  <UserPlus size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                  <p className="text-[13px] opacity-60">Add email</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut size={16} strokeWidth={2} className="mr-1 opacity-60" aria-hidden="true" />
                <p className="text-[13px] opacity-60">Log out</p>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/login")}>
                <LogIn size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                <p className="text-[13px] opacity-60">Sign in</p>
              </DropdownMenuItem>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
