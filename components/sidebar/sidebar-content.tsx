"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRef, useEffect, useMemo } from "react";
import { isActive } from "@/lib/is-active";
import * as React from "react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  ref?: React.Ref<SVGSVGElement>;
  startAnimation?: () => void;
  stopAnimation?: () => void;
}

interface NavItemProps {
  title: string;
  url: string;
  icon?: React.ComponentType<IconProps>;
  badge?: number;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  suffix?: React.ComponentType<IconProps>;
}

interface SidebarContentProps {
  items: {
    title: string;
    items: NavItemProps[];
    isActive?: boolean;
  }[];
}

type IconRefType = SVGSVGElement & {
  startAnimation?: () => void;
  stopAnimation?: () => void;
};

export function SidebarContent({ items }: SidebarContentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const iconRefs = useRef<{ [key: string]: React.RefObject<IconRefType | null> }>({});

  // Initialize refs for all items
  useEffect(() => {
    items.forEach((section) => {
      section.items.forEach((item) => {
        if (item.icon && !iconRefs.current[item.title]) {
          iconRefs.current[item.title] = React.createRef<IconRefType>();
        }
      });
    });
  }, [items]);

  return (
    <SidebarGroup className="space-y-2.5 py-0">
      <SidebarMenu className="space-y-3">
        {items.map((section) => (
          <Collapsible
            key={section.title}
            defaultOpen={section.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {section.title && (
                  <SidebarGroupLabel className="mb-2">{section.title}</SidebarGroupLabel>
                )}
              </CollapsibleTrigger>
              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <Collapsible defaultOpen={item.isActive} key={j}>
                    <CollapsibleTrigger asChild>
                      <Link
                        href={item.url}
                        onClick={item.onClick}
                        onMouseEnter={() => {
                          const iconRef = iconRefs.current[item.title]?.current;
                          if (iconRef?.startAnimation) {
                            iconRef.startAnimation();
                          }
                        }}
                        onMouseLeave={() => {
                          const iconRef = iconRefs.current[item.title]?.current;
                          if (iconRef?.stopAnimation) {
                            iconRef.stopAnimation();
                          }
                        }}
                      >
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={cn(
                            "flex items-center",
                            (item.isActive || isActive(item.url, pathname, searchParams)) &&
                              "bg-accent text-accent-foreground",
                          )}
                        >
                          {item.icon && (
                            <item.icon
                              ref={iconRefs.current[item.title]}
                              className="relative mr-3 h-3 w-3.5"
                            />
                          )}
                          <p className="mt-0.5 text-[13px]">{item.title}</p>
                        </SidebarMenuButton>
                      </Link>
                    </CollapsibleTrigger>
                  </Collapsible>
                ))}
              </div>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
