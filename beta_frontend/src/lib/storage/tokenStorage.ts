/**
 * Persists the session tokens returned by POST /auth/login and /auth/refresh.
 *
 * The backend returns both tokens in the JSON body (no httpOnly cookie yet), so
 * they live in localStorage. Everything goes through this module so the storage
 * strategy can be swapped (e.g. for cookies) without touching callers.
 */
const ACCESS_KEY = "lom.access_token";
const REFRESH_KEY = "lom.refresh_token";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export const tokenStorage = {
  getAccessToken: () => safeGet(ACCESS_KEY),
  getRefreshToken: () => safeGet(REFRESH_KEY),

  set({ accessToken, refreshToken }: TokenPair) {
    try {
      localStorage.setItem(ACCESS_KEY, accessToken);
      localStorage.setItem(REFRESH_KEY, refreshToken);
    } catch {
      /* storage unavailable (private mode): the session only lasts for this page */
    }
  },

  clear() {
    try {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    } catch {
      /* ignore */
    }
  },
};
