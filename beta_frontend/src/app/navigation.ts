import type { IconName } from "@/components/ui/Icon";

export interface NavItem {
  label: string;
  icon: IconName;
  to: string;
  /** Screens from the UI/UX doc that have no backend yet render as "soon". */
  available: boolean;
  /**
   * Has its own slot in the mobile bottom bar; everything else goes under "More".
   * The doc's bar has Search and Notifications, but those aren't built yet, so the
   * screens people can actually use get the slots for now.
   */
  mobile?: boolean;
}

/** Website navigation, per docs/LOM_MVP_UI_UX_Design_Document_v1 §4. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: "home", to: "/", available: true, mobile: true },
  { label: "Search", icon: "search", to: "/search", available: false },
  { label: "Wiki", icon: "book", to: "/wiki", available: true, mobile: true },
  { label: "Summaries", icon: "scroll", to: "/summaries", available: true, mobile: true },
  { label: "Notifications", icon: "bell", to: "/notifications", available: false },
  { label: "Bookmarks", icon: "bookmark", to: "/bookmarks", available: true },
  { label: "Profile", icon: "user", to: "/profile", available: true },
  { label: "Settings", icon: "settings", to: "/settings", available: false },
];

/** The Profile item points at the signed-in user's own page so it highlights there. */
export function navHref(item: NavItem, username: string | undefined) {
  return item.to === "/profile" && username ? `/u/${username}` : item.to;
}
