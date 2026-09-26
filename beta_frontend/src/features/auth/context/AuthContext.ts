import { createContext } from "react";
import type { LoginCredentials, RegisterPayload, User } from "../types";

export type AuthStatus = "loading" | "authenticated" | "guest";

export interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
