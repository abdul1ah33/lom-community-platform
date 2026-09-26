import { db } from "../db";
import { apiError, json, noContent, validationError, type MockRequest } from "../http";
import { issueAccessToken, newMockUser, requireUser } from "../identity";
import type { MockRouter } from "../router";

/** Mirrors backend `app/modules/auth/router.py`. Only active in "all" mode. */
export function registerAuthHandlers(router: MockRouter) {
  router
    .on("POST", "/auth/register", ({ body }: MockRequest) => {
      const { username = "", email = "", password = "" } = (body ?? {}) as Record<string, string>;

      const details = [];
      if (username.length < 3 || username.length > 50)
        details.push({ field: "username", message: "String should have between 3 and 50 characters" });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        details.push({ field: "email", message: "value is not a valid email address" });
      if (password.length < 8 || password.length > 128)
        details.push({ field: "password", message: "String should have between 8 and 128 characters" });
      if (details.length) return validationError(details);

      if (db.byUsername(username))
        return apiError(409, "USERNAME_ALREADY_EXISTS", "A user with this username already exists.");
      if (db.findUser((u) => u.email.toLowerCase() === email.toLowerCase()))
        return apiError(409, "EMAIL_ALREADY_EXISTS", "A user with this email already exists.");

      const user = newMockUser({ id: crypto.randomUUID(), username, email, password });
      db.insertUser(user);

      return json(
        {
          success: true,
          message: "User registered successfully.",
          data: { id: user.id, username, email, avatar_url: null, bio: null },
        },
        201,
      );
    })

    .on("POST", "/auth/login", ({ body }) => {
      const { email = "", password = "" } = (body ?? {}) as Record<string, string>;
      const user = db.findUser((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user || user.password !== password)
        return apiError(401, "INVALID_CREDENTIALS", "Invalid email or password.");

      return json({
        access_token: issueAccessToken(user.id),
        refresh_token: db.createSession(user.id),
        token_type: "bearer",
      });
    })

    .on("GET", "/auth/me", async ({ headers }) => {
      const user = await requireUser(headers);
      return json({
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
        bio: user.bio,
      });
    })

    .on("POST", "/auth/refresh", ({ body }) => {
      const token = (body as { refresh_token?: string } | null)?.refresh_token ?? "";
      const userId = db.consumeSession(token);
      if (!userId || !db.byId(userId))
        return apiError(401, "INVALID_REFRESH_TOKEN", "The refresh token is invalid or has expired.");

      return json({
        access_token: issueAccessToken(userId),
        refresh_token: db.createSession(userId),
        token_type: "bearer",
      });
    })

    .on("POST", "/auth/logout", ({ body }) => {
      db.consumeSession((body as { refresh_token?: string } | null)?.refresh_token ?? "");
      return noContent();
    });
}
