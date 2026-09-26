import { Navigate, Outlet, useLocation } from "react-router-dom";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { useAuth } from "../hooks/useAuth";

/** Only signed-in users pass; others are sent to /login and returned afterwards. */
export function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <FullScreenLoader />;
  if (status === "guest") return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
