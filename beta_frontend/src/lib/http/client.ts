import { env } from "@/config/env";
import { tokenStorage } from "@/lib/storage/tokenStorage";
import { ApiError } from "./ApiError";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  /** JSON-serialised, unless it is FormData (sent as multipart). */
  body?: unknown;
  /** Attach the bearer token and transparently refresh it once on 401. */
  auth?: boolean;
  signal?: AbortSignal;
}

type SessionExpiredListener = () => void;
const sessionExpiredListeners = new Set<SessionExpiredListener>();

/** Fired when the refresh token is rejected; the auth layer logs the user out. */
export function onSessionExpired(listener: SessionExpiredListener) {
  sessionExpiredListeners.add(listener);
  return () => {
    sessionExpiredListeners.delete(listener);
  };
}

// Loaded lazily so the mock server never ships when mocks are off.
const mockServer = env.mockMode === "off" ? null : import("@/mocks");

async function send(method: Method, path: string, { body, auth, signal }: RequestOptions) {
  const headers: Record<string, string> = { Accept: "application/json" };
  const isForm = body instanceof FormData;
  if (body !== undefined && !isForm) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = tokenStorage.getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const payload = body === undefined ? undefined : isForm ? body : JSON.stringify(body);

  if (mockServer) {
    const mocked = await (await mockServer).handleMockRequest(method, path, { headers, body: payload });
    if (mocked) return mocked;
  }

  try {
    return await fetch(`${env.apiBaseUrl}${path}`, { method, headers, body: payload, signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw ApiError.network();
  }
}

// Refresh tokens rotate on every use, so concurrent 401s must share one
// refresh call: a second call with the same token would be rejected.
let refreshInFlight: Promise<boolean> | null = null;

function refreshSession(): Promise<boolean> {
  refreshInFlight ??= (async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) return false;

    const response = await send("POST", "/auth/refresh", { body: { refresh_token: refreshToken } });
    if (!response.ok) return false;

    const tokens = (await response.json()) as { access_token: string; refresh_token: string };
    tokenStorage.set({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token });
    return true;
  })()
    .catch(() => false)
    .finally(() => {
      refreshInFlight = null;
    });

  return refreshInFlight;
}

async function request<T>(method: Method, path: string, options: RequestOptions = {}): Promise<T> {
  let response = await send(method, path, options);

  if (response.status === 401 && options.auth) {
    if (await refreshSession()) {
      response = await send(method, path, options);
    } else {
      tokenStorage.clear();
      sessionExpiredListeners.forEach((listener) => listener());
    }
  }

  if (!response.ok) throw await ApiError.fromResponse(response);
  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
}

type NoBody = Omit<RequestOptions, "body">;

export const http = {
  get: <T>(path: string, options?: NoBody) => request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: NoBody) => request<T>("POST", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: NoBody) => request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: NoBody) => request<T>("DELETE", path, options),
};
