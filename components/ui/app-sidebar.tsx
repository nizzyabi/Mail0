"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { SquarePenIcon, SquarePenIconHandle } from "../icons/animated/square-pen";
import { SidebarThemeSwitch } from "@/components/theme/sidebar-theme-switcher";
import { useOpenComposeModal } from "@/hooks/use-open-compose-modal";
import { navigationConfig } from "@/config/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { $fetch } from "@/lib/auth-client";
import { BASE_URL } from "@/lib/constants";
import { useTheme } from "next-themes";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Button } from "./button";
import Image from "next/image";
import useSWR from "swr";

const fetchStats = async () => {
  return await $fetch("/api/v1/mail/count?", { baseURL: BASE_URL }).then((e) => e.data as number[]);
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: stats } = useSWR<number[]>("/api/v1/mail/count", fetchStats);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { currentSection, navItems } = useMemo(() => {
    // Find which section we're in based on the pathname
    const section = Object.entries(navigationConfig).find(([_, config]) =>
      pathname.startsWith(config.path),
    );

    const currentSection = section?.[0] || "mail";
    const items = [...navigationConfig[currentSection].sections];

    if (currentSection === "mail" && stats) {
      if (items[0]?.items[0]) {
        items[0].items[0].badge = stats[0] ?? 0;
      }
      if (items[0]?.items[3]) {
        items[0].items[3].badge = stats[1] ?? 0;
      }
    }

    return { currentSection, navItems: items };
  }, [pathname, stats]);

  const showComposeButton = currentSection === "mail";

  return (
    <Sidebar collapsible="icon" {...props} className="flex flex-col items-center pl-1">
      <div className="flex w-full flex-col">
        <SidebarHeader className="flex flex-col gap-2 p-2">
          <Image
            src={theme === "dark" ? "/white-icon.svg" : "/black-icon.svg"}
            className="mt-3"
            alt="Logo"
            width={28}
            height={28}
          />
          <NavUser />
          <AnimatePresence mode="wait">
            {showComposeButton && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ComposeButton />
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarHeader>
        <SidebarContent className="py-0 pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: currentSection === "mail" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentSection === "mail" ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 py-0"
            >
              <NavMain items={navItems} />
            </motion.div>
          </AnimatePresence>
        </SidebarContent>
      </div>
      <div className="mb-2 mt-auto pl-1.5">
        <SidebarThemeSwitch />
      </div>
    </Sidebar>
  );
}

function ComposeButton() {
  const iconRef = useRef<SquarePenIconHandle>(null);
  const { open } = useOpenComposeModal();
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <Button
      onClick={open}
      className="mt-1 h-8 w-[calc(100%)] border bg-secondary text-primary shadow shadow-black/5 hover:bg-secondary/90"
      onMouseEnter={() => {
        const icon = iconRef.current;
        if (icon?.startAnimation) {
          icon.startAnimation();
        }
      }}
      onMouseLeave={() => {
        const icon = iconRef.current;
        if (icon?.stopAnimation) {
          icon.stopAnimation();
        }
      }}
    >
      {state === "collapsed" && !isMobile ? (
        <SquarePenIcon ref={iconRef} className="size-4" />
      ) : (
        <>
          <span className="text-center text-sm"> Compose</span>
        </>
      )}
    </Button>
  );
}
