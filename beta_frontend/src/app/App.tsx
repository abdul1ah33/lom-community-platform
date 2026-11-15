import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/feedback/ToastProvider";
import { AuthProvider } from "@/features/auth";
import { usePerfTier } from "@/lib/performance/performanceTier";
import { queryClient } from "./queryClient";
import { router } from "./router";

export function App() {
  // Slow devices keep the fades but skip the movement, as if motion were reduced.
  const perfTier = usePerfTier();

  return (
    <MotionConfig reducedMotion={perfTier === "low" ? "always" : "user"}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}
