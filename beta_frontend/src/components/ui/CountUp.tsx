import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

const format = (n: number) => Math.round(n).toLocaleString();

/** Counts from its previous value (0 at first) to `value` once it scrolls into view. */
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(0);
  const inView = useInView(ref, { once: true });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reducedMotion) {
      node.textContent = format(value);
      from.current = value;
      return;
    }

    const controls = animate(from.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    from.current = value;
    return () => controls.stop();
  }, [value, inView, duration, reducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={format(value)}>
      0
    </span>
  );
}
