"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({
  className,
  showLabels = true,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Fixes SSR hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9" />;
  }

  return (
    <ToggleGroup
      type="single"
      className={cn("h-9 justify-start", className)}
      suppressHydrationWarning
      value={theme}
      onValueChange={setTheme}
    >
      <ToggleGroupItem suppressHydrationWarning value="light" className="flex items-center gap-2">
        <Sun className="h-5 w-5" />
        {showLabels ? "Light" : <span className="sr-only">Light</span>}
      </ToggleGroupItem>

      <ToggleGroupItem suppressHydrationWarning value="dark" className="flex items-center gap-2">
        <Moon className="h-5 w-5" />
        {showLabels ? "Dark" : <span className="sr-only">Dark</span>}
      </ToggleGroupItem>

      <ToggleGroupItem suppressHydrationWarning value="system" className="flex items-center gap-2">
        <Laptop className="h-5 w-5" />
        {showLabels ? "System" : <span className="sr-only">System</span>}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
