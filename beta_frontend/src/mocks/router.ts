import type { MockHandler } from "./http";

interface Route {
  method: string;
  segments: string[];
  handler: MockHandler;
}

/** Minimal path router: `/users/:username/follow` style patterns. */
export class MockRouter {
  private routes: Route[] = [];

  on(method: string, pattern: string, handler: MockHandler) {
    this.routes.push({ method, segments: pattern.split("/").filter(Boolean), handler });
    return this;
  }

  match(method: string, path: string): { handler: MockHandler; params: Record<string, string> } | null {
    const parts = path.split("/").filter(Boolean);

    for (const route of this.routes) {
      if (route.method !== method || route.segments.length !== parts.length) continue;

      const params: Record<string, string> = {};
      const ok = route.segments.every((segment, i) => {
        if (segment.startsWith(":")) {
          params[segment.slice(1)] = decodeURIComponent(parts[i]);
          return true;
        }
        return segment === parts[i];
      });

      if (ok) return { handler: route.handler, params };
    }
    return null;
  }
}
