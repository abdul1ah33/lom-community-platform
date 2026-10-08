# Backend endpoints for the beta frontend

Everything the `beta_frontend` calls, in one checklist. Endpoints marked **🆕** don't exist in
`backend/` yet; the frontend currently gets them from its in-browser mock
(`beta_frontend/src/mocks/`). The full request/response details for each module are in
[`api-contracts/`](api-contracts/).

Base path for everything: **`/api/v1`**

| Legend | Meaning                                       |
| ------ | --------------------------------------------- |
| ✅     | Already implemented in `backend/`             |
| 🆕     | To build                                      |
| 🔒     | Bearer token required                         |
| 👁     | Bearer token optional (fills `viewer` fields) |

---

## 1. Auth (`backend/app/modules/auth/router.py`)

| ✓  | Method | Path             | Auth | Notes                                                              |
| -- | ------ | ---------------- | ---- | ------------------------------------------------------------------ |
| ✅ | POST   | `/auth/register` |      | `{ username, email, password }` → 201 `SuccessResponse<UserResponse>` |
| ✅ | POST   | `/auth/login`    |      | `{ email, password }` → `{ access_token, refresh_token, token_type }` |
| ✅ | GET    | `/auth/me`       | 🔒   | → `UserResponse`                                                   |
| ✅ | POST   | `/auth/refresh`  |      | `{ refresh_token }` → new token pair (rotates)                     |
| ✅ | POST   | `/auth/logout`   |      | `{ refresh_token }` → 204                                          |

Small follow-ups on existing auth:

- [ ] **Reserve the username `me`** at registration (it would collide with `/users/me`).
- [ ] *(Optional)* accept `current_chapter` (int, 0–1394) on `POST /auth/register`. Today the
      frontend saves it right after sign-up with `PATCH /users/me`, so this is not required.
      If you add it, report errors with `field: "current_chapter"`.
- [ ] **CORS**: not needed while the frontend uses the Vite dev proxy, but a deployed frontend on
      another origin needs `CORSMiddleware` (or the same reverse-proxy setup).

---

## 2. Profiles & follows ([profiles.md](api-contracts/profiles.md))

| ✓  | Method | Path                              | Auth | Returns                  |
| -- | ------ | --------------------------------- | ---- | ------------------------ |
| 🆕 | GET    | `/users/{username}`               | 👁   | `UserProfile`            |
| 🆕 | PATCH  | `/users/me`                       | 🔒   | `UserProfile`            |
| 🆕 | POST   | `/users/me/avatar` (multipart `file`) | 🔒 | `UserProfile`          |
| 🆕 | DELETE | `/users/me/avatar`                | 🔒   | `UserProfile`            |
| 🆕 | POST   | `/users/{username}/follow`        | 🔒   | 204 (idempotent)         |
| 🆕 | DELETE | `/users/{username}/follow`        | 🔒   | 204 (idempotent)         |
| 🆕 | GET    | `/users/{username}/followers`     | 👁   | `Page<UserSummary>`      |
| 🆕 | GET    | `/users/{username}/following`     | 👁   | `Page<UserSummary>`      |

**New `users` columns:** `display_name` (≤50), `location` (≤60), `favorite_character` (≤60),
`favorite_pathway` (one of 22 slugs), `current_chapter` (int, default 0, 0–1394),
`progress_updated_at`, plus `created_at` if missing (exposed as `joined_at`). `bio` is capped at 300.
**New table:** `follows(follower_id, followee_id, created_at)`.

`UserProfile.stats` = `posts`, `comments`, `followers`, `following`, `likes_received` (all computed).
`achievements` may be `[]` for now (the codes and rules the mock uses are in profiles.md).

---

## 3. Posts, likes & tags ([posts.md](api-contracts/posts.md))

| ✓  | Method | Path                          | Auth | Returns                               |
| -- | ------ | ----------------------------- | ---- | ------------------------------------- |
| 🆕 | GET    | `/posts?feed=latest\|following&tag=&cursor=&limit=` | 👁 (🔒 for `following`) | `Page<Post>` |
| 🆕 | POST   | `/posts`                      | 🔒   | 201 `Post`                            |
| 🆕 | GET    | `/posts/{id}` (`?reveal=true`) | 👁  | `Post`                                |
| 🆕 | PATCH  | `/posts/{id}`                 | 🔒   | `Post` (author only)                  |
| 🆕 | DELETE | `/posts/{id}`                 | 🔒   | 204 (author only)                     |
| 🆕 | POST   | `/posts/{id}/like`            | 🔒   | 204 (idempotent)                      |
| 🆕 | DELETE | `/posts/{id}/like`            | 🔒   | 204 (idempotent)                      |
| 🆕 | GET    | `/users/{username}/posts`     | 👁   | `Page<Post>`                          |
| 🆕 | GET    | `/tags/trending`              | 👁   | `[{ tag, count }]` (top 10)           |
| 🆕 | POST   | `/posts/{id}/bookmark`        | 🔒   | 204 (idempotent)                      |
| 🆕 | DELETE | `/posts/{id}/bookmark`        | 🔒   | 204 (idempotent, no 404)              |
| 🆕 | GET    | `/users/me/bookmarks`         | 🔒   | `Page<Post>`, most recently saved first |

**New tables:** `posts` (body ≤2000, `spoiler_chapter` 1–1394 or NULL, `edited_at`),
`post_tags(post_id, tag)` (≤5 per post, ≤30 chars each), `post_likes(user_id, post_id)`,
`post_bookmarks(user_id, post_id, created_at)` (private; `Post.viewer.bookmarked`).

**Spoilers (two layers).** The frontend already blurs posts whose `spoiler_chapter` is past the
reader's `current_chapter`, so returning the full `body` always works. The optional **server
layer**: for a signed-in non-author whose chapter is below `spoiler_chapter`, return
`"body": null, "redacted": true`; `GET /posts/{id}?reveal=true` returns the full text. The
frontend handles both. Anonymous requests count as chapter 0.

---

## 4. Comments & mentions ([comments.md](api-contracts/comments.md))

| ✓  | Method | Path                              | Auth | Returns                                 |
| -- | ------ | --------------------------------- | ---- | --------------------------------------- |
| 🆕 | GET    | `/posts/{id}/comments`            | 👁   | `Page<Comment>`, top level, newest first |
| 🆕 | POST   | `/posts/{id}/comments`            | 🔒   | 201 `Comment` (`{ body, parent_id? }`)  |
| 🆕 | GET    | `/comments/{id}/replies`          | 👁   | `Page<Comment>`, oldest first           |
| 🆕 | PATCH  | `/comments/{id}`                  | 🔒   | `Comment` (author only)                 |
| 🆕 | DELETE | `/comments/{id}`                  | 🔒   | 204 (soft delete if it has replies)     |
| 🆕 | POST   | `/comments/{id}/like`             | 🔒   | 204 (idempotent)                        |
| 🆕 | DELETE | `/comments/{id}/like`             | 🔒   | 204 (idempotent)                        |
| 🆕 | GET    | `/users/{username}/comments`      | 👁   | `Page<ProfileComment>`                  |
| 🆕 | GET    | `/search/users?q=&limit=`         | 👁   | `[{ id, username, display_name, avatar_url }]` |

**New tables:** `comments` (body ≤1000, one level of nesting via `parent_id`, `deleted`,
`edited_at`) and `comment_likes(user_id, comment_id)`. Comments have **no** spoiler flag.

---

## Cross-cutting rules (apply to every new endpoint)

- **Plain JSON responses** (like `/auth/login` and `/auth/me`), not the `SuccessResponse` envelope.
- **Errors** use the existing `ErrorResponse`: `{ "success": false, "error": { code, message, details? } }`.
  Validation → `422 VALIDATION_ERROR` with `details: [{ field, message }]`, where `field` is the
  bare request field name (the frontend shows the message under that input).
- **Pagination**: `?cursor=&limit=` → `{ "items": [...], "next_cursor": "…" | null }`. The cursor
  is opaque to the frontend; keyset cursors are recommended.
- **`viewer` fields** (`is_self`, `is_following`, `liked`, `is_author`) are computed from the optional
  bearer token; with no token they are all `false`.
- **Case-insensitive usernames** in every `/users/{username}` lookup.
- **Idempotent toggles**: like/unlike and follow/unfollow never fail for "already done".

### New error codes

| Code                     | Status | Used by                          |
| ------------------------ | ------ | -------------------------------- |
| `CANNOT_FOLLOW_SELF`     | 400    | follow                           |
| `UNSUPPORTED_MEDIA_TYPE` | 415    | avatar upload                    |
| `FILE_TOO_LARGE`         | 413    | avatar upload (> 2 MB)           |
| `POST_NOT_FOUND`         | 404    | posts, comments                  |
| `COMMENT_NOT_FOUND`      | 404    | comments                         |

Reused: `USER_NOT_FOUND`, `FORBIDDEN`, `VALIDATION_ERROR`, `INVALID_ACCESS_TOKEN`.

---

## Suggested build order

1. **Profiles**: the columns and `GET /users/{username}` + `PATCH /users/me`. Every page reads the
   reader's `current_chapter` from here, so spoilers depend on it.
2. **Follows**: follow/unfollow and the two lists.
3. **Posts**: CRUD, feed, likes, bookmarks, tags, `/users/{username}/posts`, `/tags/trending`.
4. **Comments** and `/search/users`.
5. **Avatar upload** (needs a storage decision: S3 / Cloudinary).
6. *(Optional)* server-side spoiler redaction on posts.

## Switching the frontend over

In `beta_frontend/.env`:

| `VITE_MOCK_API` | Use when                                                        |
| --------------- | --------------------------------------------------------------- |
| `users` (default) | Only auth is real; all the 🆕 endpoints above are mocked       |
| `off`           | Everything is implemented, so every request goes to the backend |

There is no per-module switch yet. When one module is done but others aren't, remove that module's
`register…Handlers(router)` line in `beta_frontend/src/mocks/index.ts`: requests the mock no
longer matches go to the real backend.
