import { useEffect, useRef } from "react";

/**
 * Calls `onReachEnd` when the returned sentinel element scrolls within
 * `rootMargin` of the viewport. Place the sentinel after the last item.
 */
export function useInfiniteScroll<T extends HTMLElement>(onReachEnd: () => void, enabled: boolean, rootMargin = "600px") {
  const sentinelRef = useRef<T>(null);
  const callback = useRef(onReachEnd);
  callback.current = onReachEnd;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !enabled) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) callback.current();
    }, { rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return sentinelRef;
}
