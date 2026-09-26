import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { onSessionExpired } from "@/lib/http/client";
import { tokenStorage } from "@/lib/storage/tokenStorage";
import { authApi } from "../api/authApi";
import type { LoginCredentials, RegisterPayload, User } from "../types";
import { AuthContext, type AuthStatus } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(() =>
    tokenStorage.getRefreshToken() ? "loading" : "guest",
  );

  // Restore an existing session on first load.
  useEffect(() => {
    if (!tokenStorage.getRefreshToken()) return;

    const controller = new AbortController();
    authApi
      .me(controller.signal)
      .then((me) => {
        setUser(me);
        setStatus("authenticated");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        tokenStorage.clear();
        setStatus("guest");
      });

    return () => controller.abort();
  }, []);

  useEffect(
    () =>
      onSessionExpired(() => {
        setUser(null);
        setStatus("guest");
      }),
    [],
  );

  const login = useCallback(async (credentials: LoginCredentials) => {
    const tokens = await authApi.login(credentials);
    tokenStorage.set({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token });

    const me = await authApi.me();
    setUser(me);
    setStatus("authenticated");
    return me;
  }, []);

  const register = useCallback(
    async (payload: RegisterPayload) => {
      await authApi.register(payload);
      return login({ email: payload.email, password: payload.password });
    },
    [login],
  );

  // Follows docs/log out flow.txt: revoke server-side, then drop local tokens
  // regardless of the outcome so the user is never stuck "logged in".
  const logout = useCallback(async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) await authApi.logout(refreshToken);
    } catch {
      /* token already invalid or server unreachable; still log out locally */
    } finally {
      tokenStorage.clear();
      setUser(null);
      setStatus("guest");
    }
  }, []);

  const value = useMemo(
    () => ({ status, user, login, register, logout }),
    [status, user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
