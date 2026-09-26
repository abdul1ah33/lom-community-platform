import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FogBackground } from "@/components/effects/FogBackground";
import { ParticleField } from "@/components/effects/ParticleField";
import { useAuth } from "@/features/auth";
import { ComposerProvider } from "@/features/posts";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import styles from "./AppShell.module.css";

/** Signed-in layout: ambient background, left sidebar (desktop) / bottom bar (mobile), page outlet. */
export function AppShell() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <ComposerProvider>
      <div className={styles.shell}>
        <FogBackground variant="calm" />
        <ParticleField density={0.45} />
        <div className={styles.sidebar}>
          <Sidebar onLogout={handleLogout} loggingOut={loggingOut} />
        </div>
        <main className={styles.main}>
          <Outlet context={{ onLogout: handleLogout }} />
        </main>
        <MobileNav />
      </div>
    </ComposerProvider>
  );
}
