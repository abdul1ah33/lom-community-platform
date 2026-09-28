# Comments API contract (proposed)

Status: **proposed** by the frontend. The beta frontend runs against an in-browser mock of exactly
this contract (`beta_frontend/src/mocks/handlers/comments.ts`). Matching TypeScript types:
`beta_frontend/src/features/comments/types.ts`.

Conventions are the same as [profiles.md](profiles.md) and [posts.md](posts.md): base path
`/api/v1`, plain JSON, `ErrorResponse` envelope, cursor pages `{ items, next_cursor }`. Reads accept
an optional bearer token (it fills in `viewer`); writes require one.

**Comments have no spoiler flag.** A comment on a spoiler post simply belongs to that post: the
frontend keeps the whole comment section closed until the reader reveals the post.

---

## Data model

**`comments`**

| Column       | Type            | Rules                                                               |
| ------------ | --------------- | ------------------------------------------------------------------- |
| `id`         | uuid PK         |                                                                     |
| `post_id`    | uuid FK posts   | `ON DELETE CASCADE`                                                 |
| `parent_id`  | uuid FK comments NULL | NULL = top level. Always points at a **top-level** comment (one level of nesting) |
| `author_id`  | uuid FK users   | `ON DELETE CASCADE`                                                 |
| `body`       | text NOT NULL   | trimmed, 1–1000 chars                                               |
| `deleted`    | bool            | default false (see Delete)                                          |
| `created_at` | timestamptz     |                                                                     |
| `edited_at`  | timestamptz     | set on every PATCH                                                  |

Indexes: `(post_id, parent_id, created_at)` and `(author_id, created_at DESC)`.

**`comment_likes(user_id, comment_id, created_at)`**: PK on both, cascade on either side.

**Counts**
- `Post.stats.comments` = the post's non-deleted comments, **replies included**.
- `Comment.stats.replies` = the comment's non-deleted replies.
- `UserProfile.stats.comments` = the user's non-deleted comments.

---

## The `Comment` object

```json
{
  "id": "c1b2…",
  "post_id": "5b1e…",
  "parent_id": null,
  "author": { "id": "…", "username": "HangedMan_Enjoyer", "display_name": "Mr. Hanged Man", "avatar_url": null, "favorite_pathway": "hanged-man" },
  "body": "The detail about the grey fog in chapter 1 still gives me chills.",
  "deleted": false,
  "created_at": "2026-09-28T10:02:00Z",
  "edited_at": null,
  "stats": { "likes": 2, "replies": 2 },
  "viewer": { "liked": false, "is_author": false }
}
```

`author` has the same shape as `Post.author`. When `deleted` is true, `body` is `null`.

**Mentions:** bodies are plain text. `@username` is turned into a profile link by the frontend. The
backend doesn't need to parse them for this round; the Notifications module will want to.

---

## Endpoints

### `GET /posts/{post_id}/comments` → `200 Page<Comment>`

**Top-level comments only, newest first.** Query: `cursor`, `limit` (default 20, max 50). A deleted
comment is listed (as a placeholder) only while it still has replies. `404 POST_NOT_FOUND`.

### `POST /posts/{post_id}/comments` → `201 Comment`

```json
{ "body": "Great thread @Justice_of_Backlund", "parent_id": null }
```

- `parent_id` is optional. If it points at a **reply**, attach the new comment to that reply's
  top-level comment instead, so nesting stays one level deep.
- `422 VALIDATION_ERROR`: empty body, over 1000 chars (`field: "body"`), or a `parent_id` that
  isn't on this post (`field: "parent_id"`).
- `404 POST_NOT_FOUND`.

### `GET /comments/{comment_id}/replies` → `200 Page<Comment>`

Replies of a top-level comment, **oldest first** (reads like a conversation). Deleted replies are
not listed. `404 COMMENT_NOT_FOUND`.

### `PATCH /comments/{comment_id}` → `200 Comment`

`{ "body": "…" }`. Author only (`403 FORBIDDEN`). Sets `edited_at`. `404 COMMENT_NOT_FOUND` if
missing or already deleted.

### `DELETE /comments/{comment_id}` → `204`

Author only (`403 FORBIDDEN`). Later, moderators too (Phase 4).

- **Top-level comment with replies** → soft delete: `deleted = true`, body hidden, replies kept.
- **Anything else** → hard delete (and its likes).

The frontend mirrors exactly this rule when it updates its cache, so keep it.

### `POST /comments/{comment_id}/like` → `204` and `DELETE /comments/{comment_id}/like` → `204`

Idempotent. `404 COMMENT_NOT_FOUND`.

### `GET /users/{username}/comments` → `200 Page<ProfileComment>`

The member's non-deleted comments, newest first. Each item is a `Comment` plus:

```json
"post": { "id": "5b1e…", "author_username": "HangedMan_Enjoyer", "spoiler_chapter": 1150 }
```

`spoiler_chapter` lets the profile keep comments on spoiler posts sealed with their post.
`404 USER_NOT_FOUND`.

### `GET /search/users?q=…&limit=…` → `200 MentionCandidate[]`

Powers @mention autocomplete (and later the Search page). Case-insensitive match on username or
display name, **username prefix matches first**; `limit` default 8, max 20. Auth optional.

```json
[{ "id": "…", "username": "Justice_of_Backlund", "display_name": "Miss Justice", "avatar_url": null }]
```

Kept under `/search/…` on purpose: `/users/search` would collide with `/users/{username}`.

---

## New error codes

`COMMENT_NOT_FOUND`. Reused: `POST_NOT_FOUND`, `USER_NOT_FOUND`, `FORBIDDEN`, `VALIDATION_ERROR`,
`INVALID_ACCESS_TOKEN`.
