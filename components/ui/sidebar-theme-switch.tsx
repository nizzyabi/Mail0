"use client";

import { useTheme } from "next-themes";

import { MoonIcon } from "../icons/animated/moon";
import { Button } from "@/components/ui/button";
import { SunIcon } from "../icons/animated/sun";

export function SidebarThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  async function handleThemeToggle() {
    const newTheme = theme === "dark" ? "light" : "dark";

    function update() {
      setTheme(newTheme);
    }

    if (document.startViewTransition && newTheme !== resolvedTheme) {
      document.documentElement.style.viewTransitionName = "theme-transition";
      await document.startViewTransition(update).finished;
      document.documentElement.style.viewTransitionName = "";
    } else {
      update();
    }
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleThemeToggle}
      className="!cursor-pointer text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
