import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { ProtectedRoute } from "@/features/auth";
import { HomePage } from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        // Shown while a lazy route's code loads on a fresh page load.
        hydrateFallbackElement: <FullScreenLoader />,
        children: [
          { index: true, element: <HomePage /> },
          // Profile screens are split into their own chunk and loaded on first visit.
          {
            path: "profile",
            lazy: () => import("@/pages/ProfilePage/ProfilePage").then((m) => ({ Component: m.MyProfileRedirect })),
          },
          {
            path: "profile/edit",
            lazy: () => import("@/pages/EditProfilePage/EditProfilePage").then((m) => ({ Component: m.EditProfilePage })),
          },
          {
            path: "bookmarks",
            lazy: () => import("@/pages/BookmarksPage/BookmarksPage").then((m) => ({ Component: m.BookmarksPage })),
          },
          {
            path: "wiki",
            lazy: () => import("@/pages/WikiPage/WikiPage").then((m) => ({ Component: m.WikiPage })),
          },
          {
            path: "wiki/:slug",
            lazy: () => import("@/pages/WikiPage/WikiEntryPage").then((m) => ({ Component: m.WikiEntryPage })),
          },
          {
            path: "p/:id",
            lazy: () => import("@/pages/PostPage/PostPage").then((m) => ({ Component: m.PostPage })),
          },
          {
            path: "u/:username",
            lazy: () => import("@/pages/ProfilePage/ProfilePage").then((m) => ({ Component: m.ProfilePage })),
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
