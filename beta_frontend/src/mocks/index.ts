import { env } from "@/config/env";
import { db } from "./db";
import { registerAuthHandlers } from "./handlers/auth";
import { registerUserHandlers } from "./handlers/users";
import { MockHttpError } from "./http";
import { MockRouter } from "./router";

const router = new MockRouter();
if (env.mockMode === "all") registerAuthHandlers(router);
if (env.mockMode !== "off") registerUserHandlers(router);

if (import.meta.env.DEV) {
  (window as unknown as { lomMockReset: () => void }).lomMockReset = () => {
    db.reset();
    console.info("[mock api] data reset to seed; reload the page.");
  };
  console.info(`[mock api] mode "${env.mockMode}". Reset data with lomMockReset().`);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Answers a request from the in-browser mock server, or returns null so the
 * caller falls through to the real network.
 */
export async function handleMockRequest(
  method: string,
  pathWithQuery: string,
  init: { headers: Record<string, string>; body?: BodyInit | null },
): Promise<Response | null> {
  const url = new URL(pathWithQuery, window.location.origin);
  const match = router.match(method, url.pathname);
  if (!match) return null;

  let body: unknown = init.body ?? null;
  if (typeof init.body === "string") {
    try {
      body = JSON.parse(init.body);
    } catch {
      /* leave as raw string */
    }
  }

  // Realistic latency so loading states are visible.
  await sleep(250 + Math.random() * 350);

  try {
    return await match.handler({
      method,
      path: url.pathname,
      params: match.params,
      query: url.searchParams,
      body,
      headers: new Headers(init.headers),
    });
  } catch (error) {
    if (error instanceof MockHttpError) return error.response;
    throw error;
  }
}
