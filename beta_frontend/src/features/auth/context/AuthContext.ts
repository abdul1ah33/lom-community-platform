import { createContext } from "react";
import type { LoginCredentials, RegisterPayload, User } from "../types";

export type AuthStatus = "loading" | "authenticated" | "guest";

export interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
  /** Merges fresh fields (e.g. a new avatar from the profile module) into the signed-in user. */
  updateUser: (patch: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
