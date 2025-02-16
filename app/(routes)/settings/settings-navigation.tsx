"use client";

import { Settings, Mail, Shield, Palette, Keyboard, Bell } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const tabs = [
  {
    name: "General",
    href: "/settings/general",
    icon: Settings,
    description: "Account preferences and settings",
  },
  {
    name: "Connections",
    href: "/settings/connections",
    icon: Mail,
    description: "Manage connected email accounts",
  },
  {
    name: "Security",
    href: "/settings/security",
    icon: Shield,
    description: "Password and authentication",
  },
  {
    name: "Appearance",
    href: "/settings/appearance",
    icon: Palette,
    description: "Customize your interface",
  },
  {
    name: "Shortcuts",
    href: "/settings/shortcuts",
    icon: Keyboard,
    description: "Keyboard shortcuts and hotkeys",
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
    description: "Manage your notifications",
  },
];

export function SettingsNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnPath = searchParams.get("from");

  const getHref = (tabHref: string) => {
    return returnPath ? `${tabHref}?from=${returnPath}` : tabHref;
  };

  return (
    <div className="flex flex-col md:w-80">
      {/* Mobile Dropdown or Scroll */}
      <div className="md:hidden">
        <div className="scrollbar-none flex overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={getHref(tab.href)}
              className={cn(
                "flex min-w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
                pathname === tab.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:space-y-1">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={getHref(tab.href)}
            className={cn(
              "group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === tab.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <tab.icon className="h-5 w-5" />
            <div className="flex flex-col gap-y-0.5">
              <span>{tab.name}</span>
              <span
                className={cn(
                  "line-clamp-1 text-xs font-normal transition-colors",
                  pathname === tab.href
                    ? "text-accent-foreground/80"
                    : "text-muted-foreground/70 group-hover:text-accent-foreground/80",
                )}
              >
                {tab.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
