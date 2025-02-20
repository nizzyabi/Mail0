import { Settings, Mail, Shield, Palette, Keyboard, Bell } from "lucide-react";
import { SettingsGearIcon } from "@/components/icons/animated/settings-gear";
import { CheckCheckIcon } from "@/components/icons/animated/check-check";
import { MessageCircleIcon } from "@/components/icons/animated/message";
import { BookTextIcon } from "@/components/icons/animated/book-text";
import { SparklesIcon } from "@/components/icons/animated/sparkles";
import { ArchiveIcon } from "@/components/icons/animated/archive";
import { UsersIcon } from "@/components/icons/animated/users";
import { InboxIcon } from "@/components/icons/animated/inbox";
import { CartIcon } from "@/components/icons/animated/cart";
import { BellIcon } from "@/components/icons/animated/bell";
import { XIcon } from "@/components/icons/animated/x";
import { ChevronLeft } from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: number;
  isBackButton?: boolean;
  isSettingsButton?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavConfig {
  path: string;
  sections: NavSection[];
}

export const navigationConfig: Record<string, NavConfig> = {
  mail: {
    path: "/mail",
    sections: [
      {
        title: "",
        items: [
          {
            title: "Inbox",
            url: "/mail/inbox",
            icon: InboxIcon,
            badge: 0,
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
            badge: 0,
          },
          {
            title: "Archive",
            url: "/mail/archive",
            icon: ArchiveIcon,
          },
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
          {
            title: "AI Assistant",
            url: "/mail/ai",
            icon: SparklesIcon,
          },
          {
            title: "Settings",
            url: "/settings/general",
            icon: SettingsGearIcon,
            isSettingsButton: true,
          },
        ],
      },
      // {
      //   title: "Categories",
      //   items: [
      //     {
      //       title: "Social",
      //       url: "/mail/inbox?category=social",
      //       icon: UsersIcon,
      //       badge: 972,
      //     },
      //     {
      //       title: "Updates",
      //       url: "/mail/inbox?category=updates",
      //       icon: BellIcon,
      //       badge: 342,
      //     },
      //     {
      //       title: "Forums",
      //       url: "/mail/inbox?category=forums",
      //       icon: MessageCircleIcon,
      //       badge: 128,
      //     },
      //     {
      //       title: "Shopping",
      //       url: "/mail/inbox?category=shopping",
      //       icon: CartIcon,
      //       badge: 8,
      //     },
      //   ],
      // },
      // {
      //   title: "Advanced",
      //   items: [
      //     {
      //       title: "Settings",
      //       url: "/settings",
      //       icon: SettingsGearIcon,
      //     },
      //   ],
      // },
    ],
  },
  settings: {
    path: "/settings",
    sections: [
      {
        title: "",
        items: [
          {
            title: "Back to Mail",
            url: "/mail",
            icon: ChevronLeft,
            isBackButton: true,
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            title: "General",
            url: "/settings/general",
            icon: Settings,
          },
          {
            title: "Connections",
            url: "/settings/connections",
            icon: Mail,
          },
          {
            title: "Security",
            url: "/settings/security",
            icon: Shield,
          },
          {
            title: "Appearance",
            url: "/settings/appearance",
            icon: Palette,
          },
          {
            title: "Shortcuts",
            url: "/settings/shortcuts",
            icon: Keyboard,
          },
          {
            title: "Notifications",
            url: "/settings/notifications",
            icon: Bell,
          },
        ].map((item) => ({
          ...item,
          isSettingsPage: true,
        })),
      },
    ],
  },
};
