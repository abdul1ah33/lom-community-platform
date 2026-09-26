import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Normalised pointer position (-1…1 on each axis, 0 at the viewport centre),
 * smoothed with a spring. Multiply by a depth factor to parallax a layer.
 */
export function usePointerParallax(): { x: MotionValue<number>; y: MotionValue<number> } {
  const reducedMotion = usePrefersReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reducedMotion]);

  return { x, y };
}
