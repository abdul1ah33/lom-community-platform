import type { IconName } from "@/components/ui/Icon";

export interface NavItem {
  label: string;
  icon: IconName;
  to: string;
  /** Screens from the UI/UX doc that have no backend yet render as "soon". */
  available: boolean;
  /** Shown in the mobile bottom bar (doc: Home, Search, +, Notifications, Profile). */
  mobile?: boolean;
}

/** Website navigation, per docs/LOM_MVP_UI_UX_Design_Document_v1 §4. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: "home", to: "/", available: true, mobile: true },
  { label: "Search", icon: "search", to: "/search", available: false, mobile: true },
  { label: "Wiki", icon: "book", to: "/wiki", available: false },
  { label: "Notifications", icon: "bell", to: "/notifications", available: false, mobile: true },
  { label: "Bookmarks", icon: "bookmark", to: "/bookmarks", available: false },
  { label: "Profile", icon: "user", to: "/profile", available: true, mobile: true },
  { label: "Settings", icon: "settings", to: "/settings", available: false },
];

/** The Profile item points at the signed-in user's own page so it highlights there. */
export function navHref(item: NavItem, username: string | undefined) {
  return item.to === "/profile" && username ? `/u/${username}` : item.to;
}
