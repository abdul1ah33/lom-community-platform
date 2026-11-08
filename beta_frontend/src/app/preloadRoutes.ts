/**
 * Fetches the main screens' code in the background, so the first tap on a tab
 * switches right away instead of waiting on the network with nothing on screen.
 * A failure is ignored: the route simply loads on demand as usual.
 */
export function preloadRoutes() {
  void Promise.allSettled([
    import("@/pages/WikiPage/WikiPage"),
    import("@/pages/SummariesPage/SummariesPage"),
    import("@/pages/BookmarksPage/BookmarksPage"),
    import("@/pages/ProfilePage/ProfilePage"),
  ]);
}
