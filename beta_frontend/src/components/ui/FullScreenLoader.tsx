import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { FogBackground } from "@/components/effects/FogBackground";

/** Shown while an existing session is being restored. */
export function FullScreenLoader() {
  return (
    <div role="status" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <FogBackground variant="calm" />
      <div style={{ position: "relative", zIndex: 2, display: "grid", justifyItems: "center", gap: 20 }}>
        <ArcaneSigil size={160} charged />
        <span style={{ fontFamily: "var(--font-display)", letterSpacing: "0.3em", color: "var(--text-muted)", fontSize: 12 }}>
          PIERCING THE FOG…
        </span>
      </div>
    </div>
  );
}
