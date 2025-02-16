import { SettingsCard } from "@/components/settings/settings-card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function ShortcutsPage() {
  const shortcuts = [
    { keys: ["⌘", "n"], action: "New Email" },
    { keys: ["⌘", "Enter"], action: "Send Email" },
    { keys: ["⌘", "r"], action: "Reply" },
    { keys: ["⌘", "Shift", "r"], action: "Reply All" },
    { keys: ["⌘", "f"], action: "Forward" },
    { keys: ["⌘", "Shift", "d"], action: "Drafts" },
    { keys: ["⌘", "Shift", "i"], action: "Inbox" },
    { keys: ["⌘", "Shift", "s"], action: "Sent Mail" },
    { keys: ["⌘", "Backspace"], action: "Delete" },
    { keys: ["⌘", "/"], action: "Search" },
    { keys: ["⌘", "Shift", "u"], action: "Mark as Unread" },
    { keys: ["⌘", "Shift", "m"], action: "Mute Thread" },
    { keys: ["⌘", "Shift", "p"], action: "Print Email" },
    { keys: ["⌘", "Shift", "h"], action: "Archive Email" },
    { keys: ["⌘", "Shift", "j"], action: "Mark as Spam" },
    { keys: ["⌘", "Shift", "e"], action: "Move to Folder" },
    { keys: ["⌘", "Shift", "t"], action: "Undo Last Action" },
    { keys: ["⌘", "Shift", "v"], action: "View Email Details" },
    { keys: ["⌘", "Shift", "g"], action: "Go to Drafts" },
    { keys: ["⌘", "Shift", "x"], action: "Expand Email View" },
  ];

  return (
    <div className="grid gap-6">
      <SettingsCard
        title="Keyboard Shortcuts"
        description="View and customize keyboard shortcuts for quick actions."
        footer={
          <div className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Changes</Button>
          </div>
        }
      >
        <div className="grid gap-2 md:grid-cols-2">
          {shortcuts.map((shortcut, index) => (
            <Shortcut key={index} keys={shortcut.keys}>
              {shortcut.action}
            </Shortcut>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

function Shortcut({ children, keys }: { children: ReactNode; keys: string[] }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border bg-card/50 p-2 text-sm text-muted-foreground">
      <span className="font-medium">{children}</span>
      <div className="flex select-none gap-1">
        {keys.map((key) => (
          <kbd
            key={key}
            className="h-6 rounded-[6px] border border-muted-foreground/10 bg-accent px-1.5 font-mono text-xs leading-6"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}
