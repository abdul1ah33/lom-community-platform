import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/feedback/ToastProvider";
import { AuthProvider } from "@/features/auth";
import { queryClient } from "./queryClient";
import { router } from "./router";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
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
