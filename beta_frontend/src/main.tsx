import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import { initPerformanceTier } from "@/lib/performance/performanceTier";
import "@/styles/global.css";

initPerformanceTier();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
