"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { SettingsGearIcon } from "../icons/animated/settings-gear";
import { CheckCheckIcon } from "../icons/animated/check-check";
import { MessageCircleIcon } from "../icons/animated/message";
import { BookTextIcon } from "../icons/animated/book-text";
import { ArchiveIcon } from "../icons/animated/archive";
import { UsersIcon } from "../icons/animated/users";
import { InboxIcon } from "../icons/animated/inbox";
import { CartIcon } from "../icons/animated/cart";
import { BellIcon } from "../icons/animated/bell";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { XIcon } from "../icons/animated/x";
import { $fetch } from "@/lib/auth-client";
import { BASE_URL } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import useSWR from "swr";

const fetchStats = async () => {
  return await $fetch("/api/v1/mail/count?", { baseURL: BASE_URL }).then((e) => e.data as number[]);
};

const settingsPages = [
  { title: "General", url: "/settings/general" },
  { title: "Connections", url: "/settings/connections" },
  { title: "Appearance", url: "/settings/appearance" },
  { title: "Shortcuts", url: "/settings/shortcuts" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: stats } = useSWR<number[]>("/api/v1/mail/count", fetchStats);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      {
        title: "",
        items: [
          {
            title: "Inbox",
            url: "/mail",
            icon: InboxIcon,
            badge: stats?.[0] ?? 0,
          },
          {
            title: "Drafts",
            url: "/mail/draft",
            icon: BookTextIcon,
          },
          {
            title: "Sent",
            url: "/mail/sent",
            icon: CheckCheckIcon,
          },
          {
            title: "Spam",
            url: "/mail/spam",
            icon: XIcon,
            badge: stats?.[1] ?? 0,
          },
          {
            title: "Archive",
            url: "/mail/archive",
            icon: ArchiveIcon,
          },
        ],
      },
      {
        title: "Categories",
        items: [
          {
            title: "Social",
            url: "/mail/inbox?category=social",
            icon: UsersIcon,
            badge: 972,
          },
          {
            title: "Updates",
            url: "/mail/inbox?category=updates",
            icon: BellIcon,
            badge: 342,
          },
          {
            title: "Forums",
            url: "/mail/inbox?category=forums",
            icon: MessageCircleIcon,
            badge: 128,
          },
          {
            title: "Shopping",
            url: "/mail/inbox?category=shopping",
            icon: CartIcon,
            badge: 8,
          },
        ],
      },
      {
        title: "Advanced",
        items: [
          {
            title: "Settings",
            url: "/settings",
            icon: SettingsGearIcon,
            isExpanded: isSettingsOpen,
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              setIsSettingsOpen(!isSettingsOpen);
            },
            suffix: ChevronDown,
            subItems: settingsPages.map((page) => ({
              title: page.title,
              url: page.url,
              isActive: pathname === page.url,
            })),
          },
          // {
          //   title: "Analytics",
          //   url: "/mail/under-construction/analytics",
          //   icon: ChartLine,
          // },
          // {
          //   title: "Developers",
          //   url: "/mail/under-construction/developers",
          //   icon: Code,
          // },
        ],
      },
    ],
    [stats, isSettingsOpen, pathname],
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader className="mt-2 flex items-center justify-between gap-2">
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
