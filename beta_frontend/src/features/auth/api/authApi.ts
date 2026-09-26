import { http } from "@/lib/http/client";
import type { LoginCredentials, RegisterPayload, TokenResponse, User } from "../types";

interface SuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

/** Thin wrappers over `/api/v1/auth/*`. No state lives here. */
export const authApi = {
  login: (credentials: LoginCredentials) => http.post<TokenResponse>("/auth/login", credentials),

  register: async (payload: RegisterPayload) =>
    (await http.post<SuccessEnvelope<User>>("/auth/register", payload)).data,

  me: (signal?: AbortSignal) => http.get<User>("/auth/me", { auth: true, signal }),

  logout: (refreshToken: string) => http.post<void>("/auth/logout", { refresh_token: refreshToken }),
};
