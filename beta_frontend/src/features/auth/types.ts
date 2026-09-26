/** Mirrors backend `app/modules/users/schemas.py::UserResponse`. */
export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
}

/** Mirrors backend `app/modules/auth/schemas.py::LoginRequest`. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Mirrors backend `app/modules/users/schemas.py::UserCreate`. */
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

/** Mirrors backend `app/modules/auth/schemas.py::TokenResponse`. */
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
