import { env } from "@/config/env";
import { db, type MockUser } from "./db";
import { apiError, MockHttpError } from "./http";

const ACCESS_PREFIX = "mock-access.";

export function issueAccessToken(userId: string) {
  return `${ACCESS_PREFIX}${userId}`;
}

export function newMockUser(fields: Pick<MockUser, "id" | "username" | "email" | "password">): MockUser {
  return {
    ...fields,
    display_name: null,
    avatar_url: null,
    bio: null,
    location: null,
    favorite_character: null,
    favorite_pathway: null,
    current_chapter: 0,
    progress_updated_at: null,
    joined_at: new Date().toISOString(),
    posts: 0,
    comments: 0,
    likes_received: 0,
  };
}

function bearer(headers: Headers) {
  const value = headers.get("Authorization");
  return value?.startsWith("Bearer ") ? value.slice(7) : null;
}

function jwtSubject(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const sub = (JSON.parse(json) as { sub?: unknown }).sub;
    return typeof sub === "string" ? sub : null;
  } catch {
    return null;
  }
}

/**
 * In "users" mode auth is real, so the viewer is identified by the real JWT.
 * The first time a real account is seen, it is mirrored into the mock DB
 * using the real `/auth/me` so its profile can be edited.
 */
async function mirrorRealUser(token: string): Promise<MockUser | null> {
  const sub = jwtSubject(token);
  if (!sub) return null;

  const existing = db.byId(sub);
  if (existing) return existing;

  const response = await fetch(`${env.apiBaseUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (!response.ok) return null;

  const me = (await response.json()) as { id: string; username: string; email: string };
  const user = newMockUser({ id: me.id, username: me.username, email: me.email, password: "" });
  db.insertUser(user);
  return user;
}

/** The signed-in user, or null for anonymous requests. */
export async function currentUser(headers: Headers): Promise<MockUser | null> {
  const token = bearer(headers);
  if (!token) return null;

  if (token.startsWith(ACCESS_PREFIX)) return db.byId(token.slice(ACCESS_PREFIX.length)) ?? null;
  if (env.mockMode === "users") return mirrorRealUser(token);
  return null;
}

/** Like `currentUser`, but answers 401 the same way the backend does. */
export async function requireUser(headers: Headers): Promise<MockUser> {
  const user = await currentUser(headers);
  if (!user) {
    throw new MockHttpError(
      apiError(401, "INVALID_ACCESS_TOKEN", "The authentication token is invalid or has expired."),
    );
  }
  return user;
}
