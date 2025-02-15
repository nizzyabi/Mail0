"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  { name: "General", href: "/settings/general" },
  { name: "Connections", href: "/settings/connections" },
  { name: "Security", href: "/settings/security" },
  { name: "Appearance", href: "/settings/appearance" },
  { name: "Shortcuts", href: "/settings/shortcuts" },
  { name: "Notifications", href: "/settings/notifications" },
];

export function SettingsNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState<undefined | { left: string; width: string }>(
    undefined,
  );
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.href === pathname);
    if (activeIndex !== -1) {
      const activeElement = tabRefs.current[activeIndex];
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [pathname]);

  return (
    <div className="relative">
      <div
        className="absolute flex h-[32px] items-center rounded-[7px] bg-accent transition-[left,width,opacity] duration-300 ease-out"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />
      <div
        className="absolute bottom-[-6px] h-[2px] bg-primary transition-[left,width] duration-300 ease-out"
        style={activeStyle}
      />
      <div className="relative flex items-center space-x-[6px]">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={tab.href}
            ref={(el) => {
              tabRefs.current[index] = el!;
            }}
            className={`h-[32px] cursor-pointer px-3 py-2 font-medium transition-colors duration-300 ${
              tab.href === pathname ? "text-foreground" : "text-muted-foreground"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex h-full items-center justify-center whitespace-nowrap text-sm leading-5">
              {tab.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
