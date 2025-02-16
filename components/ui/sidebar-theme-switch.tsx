"use client";

import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useTheme } from "next-themes";

import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function SidebarThemeSwitch() {
  const { theme, systemTheme, resolvedTheme, setTheme } = useTheme();

  async function handleThemeChange(newTheme: string) {
    let nextResolvedTheme = newTheme;

    if (newTheme === "system" && systemTheme) {
      nextResolvedTheme = systemTheme;
    }

    function update() {
      setTheme(newTheme);
    }

    if (document.startViewTransition && nextResolvedTheme !== resolvedTheme) {
      document.documentElement.style.viewTransitionName = "theme-transition";
      await document.startViewTransition(update).finished;
      document.documentElement.style.viewTransitionName = "";
    } else {
      update();
    }
  }

  return (
    <Select value={theme} onValueChange={handleThemeChange}>
      <SelectPrimitive.Trigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
        >
          {theme === "dark" && <MoonIcon />}
          {theme === "light" && <SunIcon />}
          {theme === "system" && <LaptopMinimalIcon />}
        </Button>
      </SelectPrimitive.Trigger>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
