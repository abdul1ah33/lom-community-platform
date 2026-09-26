import { Link } from "react-router-dom";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { FogBackground } from "@/components/effects/FogBackground";

export function NotFoundPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
      <FogBackground variant="calm" />
      <div style={{ position: "relative", zIndex: 2, display: "grid", justifyItems: "center", gap: 16 }}>
        <ArcaneSigil size={180} />
        <h1 style={{ fontFamily: "var(--font-display)", margin: 0, fontSize: 40 }}>Lost in the Fog</h1>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>This page does not exist in any era.</p>
        <Link to="/">Return to the Gray Fog</Link>
      </div>
    </main>
  );
}
